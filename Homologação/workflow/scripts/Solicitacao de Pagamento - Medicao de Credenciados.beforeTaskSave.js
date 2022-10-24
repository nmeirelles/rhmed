function beforeTaskSave(colleagueId,nextSequenceId,userList){

	hAPI.setCardValue("atividadeAtual", nextSequenceId);

    var atividade = getValue("WKNumState");
	if(atividade == 4 || atividade == 0){
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
    }
    /*
	if(atividade == 11){
		if(currencyToNumber($("#valorTotalDocumento").val()) < currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("supervisor")
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador")
		}		
	}
	if(atividade == 27){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
	if(atividade == 34){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
			$("#aprovadorDestino").val("diretor")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
    */
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