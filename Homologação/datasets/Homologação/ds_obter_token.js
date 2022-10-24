function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("access_token");
    dataset.addColumn("token_type");
    dataset.addColumn("expires_in");
    dataset.addColumn("issued");
    dataset.addColumn("expires");
    dataset.addColumn("cliente");
    try{
        var url = new java.net.URL('https://rhmed.corporativagestao.com.br/rpa/Token');
        var connection = url.openConnection();
        var postData = new java.lang.StringBuilder();
        var cParams = "username=1111&password=2222&grant_type=password";
        postData.append(cParams);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true); 
        connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        var os = connection.getOutputStream();
        os.write(postData.toString().getBytes());
        os.flush();
        var codRetorno = connection.getResponseCode();
        if(codRetorno == 200){
            var isr = new java.io.InputStreamReader(connection.getInputStream()); 
            var la = new java.io.BufferedReader(isr);
            var responseString = "";
            var outputString = "";
            while((responseString = la.readLine()) != null){
                outputString = outputString + responseString;
            }
            var result = JSON.parse(outputString);
            dataset.addRow([
                result['access_token'],
                result['token_type'],
                result['expires_in'],
                result['.issued'],
                result['.expires'],
                result['cliente']
            ]);
            if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
        }
    }catch(e){
        log.dir(e);
    }
    return dataset;
}