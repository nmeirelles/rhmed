function beforeStateEntry(sequenceId){
    var WKNumState = getValue("WKNumState");
    log.info("$$$$$$$$$$ WKNumState: "+WKNumState);
    log.info("$$$$$$$$$$ Sequence ID: "+sequenceId);

    if(sequenceId == 6 || sequenceId == 11 || sequenceId == 69){
        var valorTotalDocumento = 0;
        var indexes = hAPI.getChildrenIndexes("tabelaItens");
        log.dir(indexes);
        for (var i = 0; i < indexes.length; i++) {
            var itemVlrOrcado = hAPI.getCardValue("itemVlrOrcado___" + indexes[i]);
            log.info("$$$$$$$$$$ Item Valor Orçado: "+itemVlrOrcado);
            valorTotalDocumento = valorTotalDocumento + currencyToNumber(itemVlrOrcado);
        }
        log.info("$$$$$$$$$$ Valor Total Documento: "+valorTotalDocumento);
        log.info("$$$$$$$$$$ Valor Total Documento Formatado: "+numberToCurrency(valorTotalDocumento));
        var taxaCorreios = hAPI.getCardValue("inputValorTaxa");
        if(taxaCorreios != "" || taxaCorreios != null){
            valorTotalDocumento = valorTotalDocumento + currencyToNumber(taxaCorreios);
        }
        hAPI.setCardValue("valorTotalDocumento", numberToCurrency(valorTotalDocumento));        
        hAPI.setCardValue("valorRequisicao", numberToCurrency(valorTotalDocumento));

        var dataset = DatasetFactory.getDataset("dsValoresAtribuicao", null, null, null);
        var valorSupervisor = currencyToNumber(dataset.getValue(0,"supervisor"));
        var valorCoordenador = currencyToNumber(dataset.getValue(0,"ccusto"));
        var valorGerente = currencyToNumber(dataset.getValue(0,"gerente"));
        log.info("$$$$$$$$$$ Valor Supervisor: "+valorSupervisor);
        log.info("$$$$$$$$$$ Valor Coordenador: "+valorCoordenador);
        log.info("$$$$$$$$$$ Valor Gerente: "+valorGerente);
    
        var destino = determinaDestino(WKNumState,valorTotalDocumento,valorSupervisor,valorCoordenador,valorGerente);
        log.info("$$$$$$$$$$ Destino: "+destino);
        hAPI.setCardValue("aprovadorDestino", destino);

    }

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
	if(WKNumState == 2 || WKNumState == 0 || WKNumState == 26){
		if(valorTotalDocumento <= valorCoordenador){ // Inicio e Correção
			return "supervisor";
		}else{
			return "coordenador";
		}
	}
	if(WKNumState == 75){ // Supervisor
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