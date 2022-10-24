function beforeStateEntry(sequenceId){
	log.info("Solicitacao de Pagamento - Adiantamento.beforeStateEntry.js");
	
    var WKNumState = getValue("WKNumState");

	var numeroFluig = hAPI.getCardValue("numeroFluxo");
	var phonefull = "5521993188491";

	if(sequenceId == 5 || sequenceId == 3 || sequenceId == 9 || sequenceId == 7 || sequenceId == 10){ // Aprovações
		var c1 = DatasetFactory.createConstraint("numeroFluig", numeroFluig, "", ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("phonefull", phonefull, "", ConstraintType.MUST);
		var dataset = DatasetFactory.getDataset("ds_whatsapp", null, [c1,c2], null);
	}

    // if(sequenceId == 6 || sequenceId == 8 || sequenceId == 11){
    //     var valorTotalDocumento = hAPI.getCardValue("valorTotalDocumento");
    //     //hAPI.setCardValue("valorTotalDocumento", numberToCurrency(valorTotalDocumento));
    //     hAPI.setCardValue("valorRequisicao", valorTotalDocumento);

    //     var dataset = DatasetFactory.getDataset("dsValoresAtribuicao", null, null, null);
    //     var valorSupervisor = currencyToNumber(dataset.getValue(0,"supervisor"));
    //     var valorCoordenador = currencyToNumber(dataset.getValue(0,"ccusto"));
    //     var valorGerente = currencyToNumber(dataset.getValue(0,"gerente"));
    
    //     var destino = determinaDestino(WKNumState,valorTotalDocumento,valorSupervisor,valorCoordenador,valorGerente);
    //     hAPI.setCardValue("aprovadorDestino", destino);

    // }

}

function currencyToNumber(numero){
	if(numero != null && numero != undefined && numero != ''){
        return parseFloat(numero.replace(".","").replace(",","."));
	}else{
		return 0
	}
}

function numberToCurrency(numero) {
    var numero = parseFloat(numero).toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function determinaDestino(WKNumState,valorTotalDocumento,valorSupervisor,valorCoordenador,valorGerente){
	if(WKNumState == 0 || WKNumState == 2 || WKNumState == 26){
		if(valorTotalDocumento <= valorCoordenador){ // Inicio e Correção
			return "supervisor";
		}else{
			return "coordenador";
		}
	}
	if(WKNumState == 3){ // Supervisor
		if(valorTotalDocumento > valorSupervisor && valorTotalDocumento <= valorCoordenador){
			return "coordenador";
		}else{
			return "celulaFiscal";
		}
	}
	if(WKNumState == 9){ // Gerente
		if(valorTotalDocumento > valorGerente){
			return "diretor";
		}else{
			return "celulaFiscal";
		}
    }
	hAPI.setCardValue("valorRequisicao", valorTotalDocumento);
	
}