function afterTaskComplete(colleagueId,nextSequenceId,userList){

    var zoomEmpresa = hAPI.getCardValue("zoomEmpresa");

	var nomeAtividade = "";
	if(nextSequenceId == "7") nomeAtividade = "Segurança";
	if(nextSequenceId == "14") nomeAtividade = "Saúde";

    var msg = "Encaminhado para " + zoomEmpresa + " | " + nomeAtividade;

	if(nextSequenceId == 21) hAPI.setCardValue("inputStatusSolicitacao", "Em Correção com o Solicitante");
	if(nextSequenceId == 7) hAPI.setCardValue("inputStatusSolicitacao", msg);
	if(nextSequenceId == 14) hAPI.setCardValue("inputStatusSolicitacao", msg);

}