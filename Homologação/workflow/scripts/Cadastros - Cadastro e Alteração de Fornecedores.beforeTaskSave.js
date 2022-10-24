function beforeTaskSave(colleagueId,nextSequenceId,userList){
	hAPI.setCardValue("atividadeAtual", nextSequenceId);
    var atividade = getValue("WKNumState");
	if(atividade == 0 || atividade == 4 || atividade == 26){
		var anexo = hAPI.listAttachments();
		var mensagem = "<div class='alert alert-warning' role='alert' style='color: #fff; border-color: #e4b73f; background-color: #e4b73f;'>" + "<strong>Atenção:</strong> Favor incluir ao menos 1 anexo antes de prosseguir com a solicitação!</div>"+
		"<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato conosco através do <a href='https://atendimento-web' target='_blank'><font color='blue' style='font-weight: bold'>atendimento</font></a>.";
		if(anexo.size() == 0){
			throw mensagem;
		}
	}
}