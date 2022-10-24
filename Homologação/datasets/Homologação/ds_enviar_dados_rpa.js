function createDataset(fields, constraints, sortFields){
    log.info("ds_enviar_dados_rpa|inicio");
    var cnpj = "";
    var cpf = "";
    var dataPagamento = "";
    var valor = 0;
    var valorRecolhido = 0;
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "cnpj") cnpj = constraints[i].initialValue;
            if (constraints[i].fieldName == "cpf") cpf = constraints[i].initialValue;
            if (constraints[i].fieldName == "dataPagamento") dataPagamento = constraints[i].initialValue;
            if (constraints[i].fieldName == "valor") valor = parseFloat(constraints[i].initialValue);
            if (constraints[i].fieldName == "valorRecolhido") valorRecolhido = parseFloat(constraints[i].initialValue);
        }  
    }
    var dsObterToken = DatasetFactory.getDataset("ds_obter_token", null, null, null);
    var token = dsObterToken.getValue(0, "access_token");
    log.info(token);
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("CODIGO");
    dataset.addColumn("DESCRICAO");
    dataset.addColumn("CODIGOCOLIGADA");
    dataset.addColumn("CHAPA");
    dataset.addColumn("ANOCOMPETENCIA");
    dataset.addColumn("MESCOMPETENCIA");
    dataset.addColumn("NUMEROPERIODO");
    dataset.addColumn("INSERTED");
    dataset.addColumn("VALORINSS");
    dataset.addColumn("VALORIRRF");
    dataset.addColumn("VALORLIQUIDO");
    try{
        var url = new java.net.URL('https://rhmed.corporativagestao.com.br/rpa/v1/totvs/rpa');
        log.info(url);
        var connection = url.openConnection();
        var postData = new java.lang.StringBuilder();
        var cParams = '[{"cnpj": "'+cnpj+'","cpf": "'+cpf+'","data_pagamento":"'+dataPagamento+'","valor":"'+valor+'","inss_ja_recolhido":"'+valorRecolhido+'"}]'; 
        log.dir(cParams);
        postData.append(cParams);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true); 
        connection.setRequestProperty("Authorization", "Bearer " + token);
        connection.setRequestProperty("Content-Type", "application/json");
        var os = connection.getOutputStream();
        os.write(postData.toString().getBytes());
        os.flush();
        var codRetorno = connection.getResponseCode();
        log.info(codRetorno);
        var isr = new java.io.InputStreamReader(connection.getInputStream()); 
        var la = new java.io.BufferedReader(isr);
        var responseString = "";
        var outputString = "";
        while((responseString = la.readLine()) != null){
            outputString = outputString + responseString;
        }
        var result = JSON.parse(outputString);
        log.dir(result);
        if(result.CODIGO == -9){
            dataset.addRow([result['CODIGO'],result['DESCRICAO'],'','','','','','','','','']);
        }else{
            dataset.addRow([
                result['CODIGO'],
                result['DESCRICAO'],
                result['DADOS'][0]['codcoligada'],
                result['DADOS'][0]['chapa'],
                result['DADOS'][0]['anocomp'],
                result['DADOS'][0]['mescomp'],
                result['DADOS'][0]['nroperiodo'],
                result['DADOS'][0]['inserted'],
                result['DADOS'][0]['valor_inss'],
                result['DADOS'][0]['valor_irrf'],
                result['DADOS'][0]['valor_liquido']
            ]);
            if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
        }
    }catch(error){
        log.dir(error);
    }
    log.info("ds_enviar_dados_rpa|fim");
    return dataset;
}