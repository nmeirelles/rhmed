function createDataset(fields, constraints, sortFields){
    log.info("ds_enviar_whatsapp begin");
    
    let endpoint = "https://api.connectzap.com.br/sistema";
    let SessionName = "2OCSA1GRAFEQVRRVPCKA";
    let numeroFluig = "3590";
    let phonefull = "5516997104545";
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "numeroFluig") numeroFluig = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "phonefull") phonefull = "" + constraints[i].initialValue;
        }  
    }
    /* 
        Palavra em negrito: *exemplo*
        Quebrar linha: \n
        Pular linha: \n\n 
    */
    let msg = "Teste Fluig <i> Teste Fluig 2";
    
    let start = iniciarApp(endpoint, SessionName);

    log.info("start: "+start);

    if(start == true) enviarMensagem(endpoint, SessionName, phonefull, msg);
    
    log.info("ds_enviar_whatsapp end");
}
function iniciarApp(endpoint, SessionName){
    try{
        var url = new java.net.URL(endpoint+'/Start');
        log.info(url);
        var connection = url.openConnection();
        var postData = new java.lang.StringBuilder();
        var cParams = '{"SessionName": "'+SessionName+'"}'; 
        log.dir(cParams);
        postData.append(cParams);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true); 
        // connection.setRequestProperty("Authorization", "Bearer " + token);
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
        if(result.Status.state == "CONNECTED") return true;
        return false;
    }catch(error){
        log.dir(error);
        return false;
    }
}
function enviarMensagem(endpoint, SessionName, phonefull, msg){
    try{
        var url = new java.net.URL(endpoint+'/sendText');
        log.info(url);
        var connection = url.openConnection();
        var postData = new java.lang.StringBuilder();
        var cParams = '{"SessionName": "'+SessionName+'","phonefull": "'+phonefull+'","msg":"'+msg+'"}'; 
        log.dir(cParams);
        postData.append(cParams);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true); 
        // connection.setRequestProperty("Authorization", "Bearer " + token);
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
        if(result.Status.erro == false) return true;
        return false;
    }catch(error){
        log.dir(error);
        return false;
    }
}