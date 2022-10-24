function defineStructure(){
    addColumn("CGC");
    addColumn("NOME");
    setKey(["CGC"]);
    addIndex(["CGC"]);
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
function onSync(lastSyncDate){
    log.info("ds_consulta_clientes_protheus | onsync | begin");
    var dataset = DatasetBuilder.newDataset();
    var url = "https://rhmedconsultores119083.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA1&FILTRO=A1_MSBLQL$2&COLUNAS=A1_CGC|A1_NOME";
    log.info(url);
    for(var i = 0; i < 6; i++){
        log.info("Tentativa: "+i);
        var result = getService(url);
        log.dir(result);
        if(result[0] == true){
            clearDataset("ds_consulta_clientes_protheus");
            var response = result[1];
            var SA1 = response["SA1"];
            log.dir(SA1.length);
            for(var k = 0; k < SA1.length; k++){
                dataset.addOrUpdateRow([SA1[k]["A1_CGC"], SA1[k]["A1_NOME"]]);
            }
            break;
        }else{
            if(result[1] != "java.net.SocketTimeoutException: Read timed out"){
                dataset.addOrUpdateRow([result[1], result[1]]);
                break;
            }
        }
    }
    log.info("ds_consulta_clientes_protheus | onsync | end");
    return dataset;
}
function createDataset(fields, constraints, sortFields){
    // log.info("ds_consulta_clientes_protheus | createDataset | begin");
    // var dataset = DatasetBuilder.newDataset();
    // dataset.addColumn("CGC");
    // dataset.addColumn("NOME");
    // var url = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA1&FILTRO=A1_MSBLQL$2&COLUNAS=A1_CGC|A1_NOME";
    // log.info(url);
    // var result = getService(url);
    // if(result[0] == true){
    //     var response = result[1];
    //     var SA1 = response["SA1"];
    //     log.dir(SA1.length);
    //     for(var k = 0; k < SA1.length; k++){
    //         dataset.addRow([SA1[k]["A1_CGC"], SA1[k]["A1_NOME"]]);
    //     }
    // }else{
    //     dataset.addRow([result[1], result[1]]);
    // }
    // log.info("ds_consulta_clientes_protheus | createDataset | end");
    // return dataset;
}
function onMobileSync(user){}