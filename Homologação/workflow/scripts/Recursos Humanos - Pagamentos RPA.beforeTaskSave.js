function beforeTaskSave(colleagueId,nextSequenceId,userList){

	hAPI.setCardValue("atividadeAtual", nextSequenceId);

	var atividade = getValue("WKNumState");

	var message = "";

	if(atividade == 0 || atividade == 4 || atividade == 11){
		if(currencyToNumber(hAPI.getCardValue("valorTotalDocumento")) < currencyToNumber(hAPI.getCardValue("valorSupervisor")) && currencyToNumber(hAPI.getCardValue("valorTotalDocumento")) < currencyToNumber(hAPI.getCardValue("valorCoordenador"))){
            log.info("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<VALOR SUPERVISOR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            hAPI.setCardValue("aprovadorDestino","supervisor");
            log.info(hAPI.getCardValue("aprovadorDestino"));
		}
		if(currencyToNumber(hAPI.getCardValue("valorTotalDocumento")) > currencyToNumber(hAPI.getCardValue("valorCoordenador"))){
            hAPI.setCardValue("aprovadorDestino","coordenador");
            log.info("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<VALOR COORDENADOR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            log.info(hAPI.getCardValue("aprovadorDestino"));
		}

		//var radiobtnNovoPrestador = hAPI.getCardValue("radiobtnNovoPrestador");
		var radiobtnOutroVinculo = hAPI.getCardValue("radiobtnOutroVinculo");
		if(radiobtnOutroVinculo == "sim" && hAPI.listAttachments().size() < 1){
			message += "<br/>- Contracheque ou Demonstrativo.";
		}
	}
	
	if(atividade == 102){
		//var radiobtnNovoPrestador = hAPI.getCardValue("radiobtnNovoPrestador");
		var radiobtnOutroVinculo = hAPI.getCardValue("radiobtnOutroVinculo");
		if(radiobtnOutroVinculo == "sim" && hAPI.listAttachments().size() < 2){
			message += "<br/>- Recibo Assinado.";
		}
	}

	if (message != "") throw "<br/><strong><u>ANEXO OBRIGATÓRIO</u></strong><br/>" + message;
}
function currencyToNumber(numero) {
    if(numero!=null && numero!=undefined && numero!=''){
        numero = numero.split(',');
        numero[0] = numero[0].split('.').join('');
        return parseFloat(numero.join('.'))
    }else{
        return 0
    }
}