function defineStructure(){
    addColumn("A2_COD");
    addColumn("A2_LOJA");
    addColumn("A2_NOME");
    addColumn("A2_NREDUZ");
    addColumn("A2_TIPO");
    addColumn("A2_CGC");
    addColumn("A2_CEP");
    addColumn("A2_PAIS");
    addColumn("A2_CODPAIS");
    addColumn("A2_END");
    addColumn("A2_EST");
    addColumn("A2_COD_MUN");
    addColumn("A2_BAIRRO");
    addColumn("A2_CONTA");
    addColumn("A2_BANCO");
    addColumn("A2_AGENCIA");
    addColumn("A2_NUMCON");
    addColumn("A2_DVCTA");
    addColumn("A2_FORMPAG");
    addColumn("A2_TIPCTA");
    addColumn("A2_COND");
    addColumn("A2_CONTATO");
    addColumn("A2_INSCR");
    addColumn("A2_INSCRM");
    addColumn("A2_EMAIL");
    addColumn("A2_DDD");
    addColumn("A2_TEL");
    addColumn("A2_NATUREZ");
    addColumn("A2_XPAGENV");
    addColumn("A2_XPAGDES");
    addColumn("A2_XDESCC");
    addColumn("A2_RECISS");
    addColumn("A2_RECINSS");
    addColumn("A2_RECPIS");
    addColumn("A2_RECCOFI");
    addColumn("A2_CALCIRF");
    addColumn("A2_SIMPNAC");
    addColumn("A2_MUN");
    addColumn("A2_COMPLEM");
    addColumn("A2_NR_END");
    addColumn("A2_XBCOMAT");
    addColumn("A2_XCNPJMA");
    addColumn("A2_XFORMEI");
    addColumn("A2_XCPFMEI");
    addColumn("A2_XTPFORN");
    setKey(["A2_COD"]);
    addIndex(["A2_COD"]);
}
function clearDataset(datasetName){
    var datasetClear = DatasetFactory.getDataset(datasetName, null, null, null);
    if(datasetClear != null){
        for(var i = 0 ; i < datasetClear.rowsCount; i++){
            var row = datasetClear.values[i];
            datasetClear.deleteRow(row);
        }
    }
}
function getService(url){
    try {
        var urlOpen = new java.net.URL(url);
        var connection = urlOpen.openConnection();
        connection.setRequestProperty("Accept", "application/json");
        //connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setRequestProperty("Authorization", "Basic YWRtaW46cmhtZWQyMDIxMDE=");
        connection.setRequestMethod("GET");
        connection.setConnectTimeout(15000);
        connection.setReadTimeout(15000);
        var codRetorno = connection.getResponseCode();
        log.info("Código Retorno: "+codRetorno);
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
            log.dir(result);
            return [true, result];
        }else{
            if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
            return [false, codRetorno];
        }
    } catch (error) {
        log.info("Error Catch");
        log.dir(error);
        return [false, error.message];
    }
}
function onSync(lastSyncDate){
    log.info("ds_consulta_fornecedores_protheus | onsync | begin");
    var dataset = DatasetBuilder.newDataset();
    var url = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_NREDUZ|A2_TIPO|A2_CGC|A2_CEP|A2_PAIS|A2_CODPAIS|A2_END|A2_EST|A2_COD_MUN|A2_BAIRRO|A2_CONTA|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_COND|A2_CONTATO|A2_INSCR|A2_INSCRM|A2_EMAIL|A2_DDD|A2_TEL|A2_NATUREZ|A2_XPAGENV|A2_XPAGDES|A2_XDESCC|A2_RECISS|A2_RECINSS|A2_RECPIS|A2_RECCOFI|A2_RECCSLL|A2_CALCIRF|A2_SIMPNAC|A2_MUN|A2_COMPLEM|A2_NR_END|A2_XBCOMAT|A2_XCNPJMA|A2_XFORMEI|A2_XCPFMEI|A2_XTPFORN";
    log.info(url);
    for(var i = 0; i <= 15; i++){
        log.info("Tentativa: "+i);
        var result = getService(url);
        log.dir(result[0]);
        if(result[0] == true){
            clearDataset("ds_consulta_fornecedores_protheus");
            var response = result[1];
            var SA2 = response["SA2"];
            log.dir(SA2.length);
            for(var k = 0; k < SA2.length; k++){
                dataset.addOrUpdateRow([
                    SA2[k]["A2_COD"],
                    SA2[k]["A2_LOJA"],
                    SA2[k]["A2_NOME"],
                    SA2[k]["A2_NREDUZ"],
                    SA2[k]["A2_TIPO"],
                    SA2[k]["A2_CGC"],
                    SA2[k]["A2_CEP"],
                    SA2[k]["A2_PAIS"],
                    SA2[k]["A2_CODPAIS"],
                    SA2[k]["A2_END"],
                    SA2[k]["A2_EST"],
                    SA2[k]["A2_COD_MUN"],
                    SA2[k]["A2_BAIRRO"],
                    SA2[k]["A2_CONTA"],
                    SA2[k]["A2_BANCO"],
                    SA2[k]["A2_AGENCIA"],
                    SA2[k]["A2_NUMCON"],
                    SA2[k]["A2_DVCTA"],
                    SA2[k]["A2_FORMPAG"],
                    SA2[k]["A2_TIPCTA"],
                    SA2[k]["A2_COND"],
                    SA2[k]["A2_CONTATO"],
                    SA2[k]["A2_INSCR"],
                    SA2[k]["A2_INSCRM"],
                    SA2[k]["A2_EMAIL"],
                    SA2[k]["A2_DDD"],
                    SA2[k]["A2_TEL"],
                    SA2[k]["A2_NATUREZ"],
                    SA2[k]["A2_XPAGENV"],
                    SA2[k]["A2_XPAGDES"],
                    SA2[k]["A2_XDESCC"],
                    SA2[k]["A2_RECISS"],
                    SA2[k]["A2_RECINSS"],
                    SA2[k]["A2_RECPIS"],
                    SA2[k]["A2_RECCOFI"],
                    SA2[k]["A2_CALCIRF"],
                    SA2[k]["A2_SIMPNAC"],
                    SA2[k]["A2_MUN"],
                    SA2[k]["A2_COMPLEM"],
                    SA2[k]["A2_NR_END"],
                    SA2[k]["A2_XBCOMAT"],
                    SA2[k]["A2_XCNPJMA"],
                    SA2[k]["A2_XFORMEI"],
                    SA2[k]["A2_XCPFMEI"],
                    SA2[k]["A2_XTPFORN"]
                ]);
            }
            break;
        }else{
            log.info("Tentativa: "+i);
            log.dir(result[1]);
            if(result[1] != "java.net.SocketTimeoutException: Read timed out"){
                dataset.addOrUpdateRow([result[1], result[1]]);
                break;
            }
        }
    }
    log.info("ds_consulta_fornecedores_protheus | onsync | end");
    return dataset;
}
function createDataset(fields, constraints, sortFields){
}
function onMobileSync(user){}