function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var atividade = getValue("WKNumState");

	hAPI.setCardValue("atividadeAtual", nextSequenceId);
	var processId = hAPI.getCardValue("numeroFluxo");
	/* if(atividade == 5 || atividade == 18 || atividade == 102){
		var c1 = DatasetFactory.createConstraint("processInstanceId", processId, processId, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("choosedSequence", nextSequenceId, nextSequenceId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("atividadeAtual", atividade, atividade, ConstraintType.MUST);
		var constraints = [c1,c2,c3];
		log.dir(constraints);
		var datasetGetSLA = DatasetFactory.getDataset("ds_getSLA", null, constraints, null);
		log.dir(datasetGetSLA);
		var etapa = "";
		var duracao = "";
		var usuario = "";
		var error = "";
		if(datasetGetSLA != null && datasetGetSLA.rowsCount > 0){
			for(var i = 0; datasetGetSLA.rowsCount; i++){
				etapa = datasetGetSLA.getValue(i, "ETAPA");
				duracao = datasetGetSLA.getValue(i, "DURACAO");
				usuario = datasetGetSLA.getValue(i, "USUARIO");
				error = datasetGetSLA.getValue(i, "ERROR");
				if(etapa == 5){
					hAPI.setCardValue("duracaoCelulaFiscal", duracao);
					hAPI.setCardValue("responsavelCelulaFiscal", usuario);
				}
				if(etapa == 18){
					hAPI.setCardValue("duracaoContasPagar", duracao);
					hAPI.setCardValue("responsavelContasPagar", usuario);
				}
			}
		}
		if(error != ""){
			throw "Erro ao calcular o SLA da etapa: " + error;
		}
	} */

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