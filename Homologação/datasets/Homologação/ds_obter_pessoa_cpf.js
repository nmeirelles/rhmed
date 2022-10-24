function createDataset(fields, constraints, sortFields){
    log.info("ds_obter_pessoa_cpf|inicio");
    log.dir(constraints);
    var cpf = "";
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "cpf") cpf = constraints[i].initialValue;
        }  
    }
    log.info(cpf);
    var dsObterToken = DatasetFactory.getDataset("ds_obter_token", null, null, null);
    var token = dsObterToken.getValue(0, "access_token");
    log.info(token);
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("CPF");
    dataset.addColumn("NOME");
    try{
        var urlOpen = new java.net.URL('https://rhmed.corporativagestao.com.br/rpa/v1/totvs/pessoa?cpf='+cpf);
        var connection = urlOpen.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Bearer " + token);
        connection.setRequestProperty("Accept", "application/json");
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
            dataset.addRow([result[0].CPF,result[0].NOME]);
        }else{
            if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
            dataset.addRow(['ERRO: '+codRetorno,'ERRO: '+codRetorno]);
        }
    }catch(error){
        log.dir(error);
    }
    log.info("ds_obter_pessoa_cpf|fim");
    return dataset;
}