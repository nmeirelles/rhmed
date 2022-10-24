function beforeCancelProcess(colleagueId,processId){
	var dataCorrente = obterDataCorrente();
	var comentario = getValue("WKUserComment");

	hAPI.setCardValue("situacao", "Cancelado");
	hAPI.setCardValue("dataFinalizacao", dataCorrente);
	
	log.info("COMENT "+ comentario)
	
	if (comentario != null && comentario != "") {
		hAPI.setCardValue("motivoCancelamento", comentario);
	}
}