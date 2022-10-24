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
    log.info("ds_consultaSP_protheus | createDataset | begin");
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("status");
    dataset.addColumn("response");
    var tipoSP = ""; // Tipo de Solicitação de Pagamento: SPA, SPS, SPD, SPC, SPM
    var numeroFluig = ""; // Número da Solicitação do Fluig
    var filial = ""; // Número da filial
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "tipoSP") tipoSP = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "numeroFluig") numeroFluig = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "filial") filial = "" + constraints[i].initialValue;
        }  
    }
    var url = "https://rhmedconsultores119083.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL="+filial+"&TABELA=SE2&FILTRO=E2_XFLGPRC$"+tipoSP+"%20-%20"+numeroFluig+"&COLUNAS=E2_NUM|E2_FORNECE";
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
                var SE2 = response["SE2"];
                log.dir(SE2.length);
                dataset.addRow([false, "Solicitação de Pagamento já cadastrada no Protheus"]);
                break;
            }else{
                dataset.addRow([true, erro]);
                break;
            }
        }else{
            dataset.addRow([result[0], result[1]]);
        }

    }


    log.info("ds_consultaSP_protheus | createDataset | end");
    return dataset;
}
function onMobileSync(user){}