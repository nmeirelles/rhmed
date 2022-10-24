function defineStructure(){}
function onSync(lastSyncDate){}
function getService(url){
    try {
        var urlOpen = new java.net.URL(url);
        var connection = urlOpen.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Basic YWRtaW46cmhtZWQyMDIxMDE=");
        connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setConnectTimeout(6000);
        connection.setReadTimeout(6000);
        var codRetorno = connection.getResponseCode();
        if(codRetorno == 200){
            var isr = new java.io.InputStreamReader(connection.getInputStream());
            var la = new java.io.BufferedReader(isr);
            var responseString = "";
            var outputString = "";
            while ((responseString = la.readLine()) != null) {
                outputString = outputString + responseString;
            }
            if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
            var result = JSON.parse(outputString);
            return [true, result];
        }else{
            if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
            return [false, codRetorno];
        }
    } catch (error) {
        log.dir(error);
        return [false, error.message];
    }

}
function createDataset(fields, constraints, sortFields){
    log.info("ds_consultaNotaFiscal_protheus | createDataset | begin");
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("status");
    dataset.addColumn("response");
    var numeroNF = ""; // Número da nota fiscal 9 digitos
    var codigoFornecedor = ""; // Código do fornecedor
    var filial = ""; // Número da filial
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "numeroNF") numeroNF = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "codigoFornecedor") codigoFornecedor = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "filial") filial = "" + constraints[i].initialValue;
        }  
    }
    var lengthNF = numeroNF.length;
    log.info("lengthNF: "+lengthNF);
    var diferenca = 9 - numeroNF.length;
    log.info("diferenca: "+diferenca);
    for(var i = 0; i < diferenca; i++){
        numeroNF = "0" + numeroNF;
        log.info("numeroNF: "+numeroNF);
    }
    log.info("numeroNF: "+numeroNF);
    var url = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL="+filial+"&TABELA=SF1&FILTRO=F1_DOC$"+numeroNF+"@F1_FORNECE$"+codigoFornecedor+"&COLUNAS=F1_DOC|F1_FORNECE";
    log.info(url);

    for(var i = 0; i < 3; i++){
        log.info("Tentativa: "+i);
        var result = getService(url);
        if(result[0] == true){
            var response = result[1];
            log.dir(response);
            var erro = response["erro"];
            log.info(erro);
            log.info(erro == undefined || erro == "" || erro == null);
            if(erro == undefined || erro == "" || erro == null){
                var SF1 = response["SF1"];
                log.dir(SF1.length);
                dataset.addRow([false, "Nota Fiscal já cadastrada no Protheus"]);
                break;
            }else{
                dataset.addRow([true, erro]);
                break;
            }
        }else{
            dataset.addRow([result[0], result[1]]);
        }
    }

    log.info("ds_consultaNotaFiscal_protheus | createDataset | end");
    return dataset;
}
function onMobileSync(user){}