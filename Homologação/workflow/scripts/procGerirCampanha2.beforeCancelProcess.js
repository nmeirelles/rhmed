function beforeCancelProcess(colleagueId,processId){
	var idSolicitante = hAPI.getCardValue("idSolicitante");
	var idUsuarioAtual = colleagueId;
	log.info(">>>>>>>idSolicitante>>>>>>>>>"+idSolicitante+"<<<<<<<<<<<<<<<<");
	log.info(">>>>>>>idUsuarioAtual>>>>>>>>>"+idUsuarioAtual+"<<<<<<<<<<<<<<<<");
	if (idSolicitante == idUsuarioAtual) {
		log.info(">>>>>>>entrou na condição>>>>>>>>><<<<<<<<<<<<<<<<");
		throw "Não é possível cancelar a solciitação!"
	}
}