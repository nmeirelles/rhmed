function createDataset(fields, constraints, sortFields){
    log.info("ds_whatsapp begin");

    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("service");
    dataset.addColumn("status");
    dataset.addColumn("response");

    let SessionName = "2OCSA1GRAFEQVRRVPCKA";
    let numeroFluig = "";
    let phonefull = "";
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "numeroFluig") numeroFluig = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "phonefull") phonefull = "" + constraints[i].initialValue;
        }  
    }

    log.info("numeroFluig: "+numeroFluig);
    log.info("phonefull: "+phonefull);

    let msg = ""+
        "*Aprovação de Solicitação de Pagamento*\n\n"+
        "A Solicitação de Pagamento n. "+numeroFluig+" foi enviado para sua aprovação.\n"+
        "Clique no link abaixo para abrir o documento:\n\n"+
        "https://rhmedconsultores114677.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numeroFluig+".";
    
    log.info("msg: "+msg);

    let start = iniciarApp(SessionName);
    log.dir("start");
    log.dir(start);
    dataset.addRow(["Start", start[0], start[1]]);
    
    let sendText = enviarMensagem(SessionName, phonefull, msg);
    log.dir("sendText");
    log.dir(sendText);
    dataset.addRow(["sendText", sendText[0], sendText[1]]);
   
    log.info("ds_whatsapp end");
    return dataset;
}
function iniciarApp(SessionName){
    log.info("iniciarApp");
    try{
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'servico_whatsapp',
            endpoint : '/Start',
            method : 'post',
            timeoutService: '120',
            params : {
                SessionName : SessionName
            }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        log.dir(vo);
        if(vo.getResult() != null && !vo.getResult().isEmpty()){
            var response = String(vo.result);
            log.dir(response);
            var result = JSON.parse(response);
            log.dir(result);
            var state = result.Status.state;
            log.info("state: "+state);
            var message = result.Status.message;
            log.info("message: "+message);
            if(state == "CONNECTED") return [true, message];
            return [false, message];
        }
    } catch(err){
        log.dir("err");
        log.dir(err);
        return [false, err.message];
    }
}
function enviarMensagem(SessionName, phonefull, msg){
    log.info("enviarMensagem");
    try{
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'servico_whatsapp',
            endpoint : '/sendText',
            method : 'post',
            timeoutService: '120',
            params : {
                SessionName : SessionName,
                phonefull: phonefull,
                msg: msg
            }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        log.dir(vo);
        if(vo.getResult() != null && !vo.getResult().isEmpty()){
            var response = String(vo.result);
            log.dir(response);
            var result = JSON.parse(response);
            log.dir(result);
            var state = result.Status.state;
            var message = result.Status.message;
            if(state == "FAILURE") return [false, message];
            return [true, message];
        }
    } catch(err){
        log.dir("err");
        log.dir(err);
        return [false, err.message];
    }
}