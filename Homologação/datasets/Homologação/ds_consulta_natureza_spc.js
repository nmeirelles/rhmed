function defineStructure(){
    addColumn("ZZF_FILIAL");
    addColumn("ZZF_FLGCOD");
    addColumn("ZZF_FLGNAT");
    addColumn("ZZF_NATURE");
    addColumn("ZZF_ESPECI");
    addColumn("ZZF_TIPO");
    addColumn("ZZF_TES");
    addColumn("ZZF_CTADEB");
    addColumn("ZZF_CTACRE");
    addColumn("ZZF_FORMPG");
    addColumn("ZZF_FLGCTB");

    setKey(["ZZF_FLGNAT"]);
    addIndex(["ZZF_FLGNAT"]);
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
    log.info("de_consulta_natureza_spc | onsync | begin");
    var dataset = DatasetBuilder.newDataset();
    var url = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=ZZF&FILTRO=ZZF_FLGCOD$SPC";
    log.info(url);
    for(var i = 0; i < 6; i++){
        log.info("Tentativa: "+i);
        var result = getService(url);
        log.dir(result[0]);
        if(result[0] == true){
            clearDataset("de_consulta_natureza_spc");
            var response = result[1];
            var ZZF = response["ZZF"];
            log.dir(ZZF.length);
            for(var k = 0; k < ZZF.length; k++){
                dataset.addOrUpdateRow([
                    ZZF[k]["ZZF_FILIAL"], 
                    ZZF[k]["ZZF_FLGCOD"],
                    ZZF[k]["ZZF_FLGNAT"],
                    ZZF[k]["ZZF_NATURE"],
                    ZZF[k]["ZZF_ESPECI"],
                    ZZF[k]["ZZF_TIPO"],
                    ZZF[k]["ZZF_TES"],
                    ZZF[k]["ZZF_CTADEB"],
                    ZZF[k]["ZZF_CTACRE"],
                    ZZF[k]["ZZF_FORMPG"],
                    ZZF[k]["ZZF_FLGCTB"]
                ]);
            }
            break;
        }else{
            if(result[1] != "java.net.SocketTimeoutException: Read timed out"){
                dataset.addOrUpdateRow([result[1], result[1]]);
                break;
            }
        }
    }
    log.info("de_consulta_natureza_spc | onsync | end");
    return dataset;
}
function createDataset(fields, constraints, sortFields){
}
function onMobileSync(user){}