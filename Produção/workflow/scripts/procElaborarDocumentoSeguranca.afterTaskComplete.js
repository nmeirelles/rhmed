function afterTaskComplete(colleagueId,nextSequenceId,userList){
var state = getValue("WKNumState");
var completTask = getValue("WKCompletTask");

	if (completTask.equals("true")) {

		if (state == 181) {
			try { 
            var param = new java.util.HashMap();
            var dest = new java.util.ArrayList();
            var server = "rhmedconsultores114678.fluig.cloudtotvs.com.br";
            var destinatarioEmail = "renato.avellar@xplanning.com.br";
            //var notificador = hAPI.getCardValue("solicitanteMatricula");
            var numSolicitacao = getvalue("WKNumProces");
   
					
            dest.add(destinatarioEmail);
				                      

            param.put("SERVER_URL", server);
            param.put("TENANT_ID", getValue("WKCompany"));
            param.put("subject", "Atualização de base");
            param.put("Solicitacao", numSolicitacao);
          
           

                            
            if (dest.size() > 0)
                notifier.notify("Admin", "templateAberturaSeguranca", param, dest, "text/html");    
        	} catch (e) {
            log.error(">>>>> Erro Envio de email: " + e);
        	}
		} 
	}
}
