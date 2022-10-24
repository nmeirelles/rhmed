function defineStructure(){
    addColumn("CC2_EST");
    addColumn("CC2_CODMUN");
    addColumn("CC2_MUN");
    addColumn("ESTADOEMUNICIPIO");
    setKey(["CC2_CODMUN"]);
    addIndex(["CC2_CODMUN"]);
}
function onSync(lastSyncDate){
    log.info("ds_estados_municipios | onsync | begin");
    var dataset = DatasetBuilder.newDataset();
    var url = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=CC2&FILTRO=CC2_FILIAL$%20&COLUNAS=CC2_EST|CC2_CODMUN|CC2_MUN";
    log.info(url);
    var urlOpen = new java.net.URL(url);
    var connection = urlOpen.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept-Charset", "UTF-8");
    var codRetorno = connection.getResponseCode();
    log.info(codRetorno);
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
        var CC2 = result["CC2"];
        log.dir(CC2.length);
        for(var k = 0; k < CC2.length; k++){
            dataset.addOrUpdateRow([CC2[k]["CC2_EST"], CC2[k]["CC2_CODMUN"], CC2[k]["CC2_MUN"], CC2[k]["CC2_EST"] + " - " + CC2[k]["CC2_MUN"]]);
        }
    }else{
        if(isr != null) isr.close();
        if(la != null) la.close();
        if(connection != null) connection.disconnect();
    }
    log.info("ds_estados_municipios | onsync | end");
    return dataset;
}
function createDataset(fields, constraints, sortFields){}
function onMobileSync(user){}