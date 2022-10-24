function beforeTaskSave(colleagueId,nextSequenceId,userList){
    log.info("beforeTaskSave SCA");
    hAPI.setCardValue("atividadeAtual", nextSequenceId);
    var message = "";
    log.info(nextSequenceId == 12);
    if(nextSequenceId == 12){
        log.info(hAPI.listAttachments().size());
		if(hAPI.listAttachments().size() == 0){
			message += "<br/>- Comprovante de Domicílio Bancário e/ou Comprovante PIS.";
		}
	}
    log.info(message);
	if (message != "") throw "<br/><strong><u>ANEXO OBRIGATÓRIO</u></strong><br/>" + message;
}