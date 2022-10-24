function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 4) || (activity == 11));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("selectTipoBusca", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("zoomCentroCusto", habilita);
	form.setEnabled("valorTotalDocumento", habilita);
	form.setEnabled("formaPagamento", habilita);
	form.setEnabled("tipoPagamento", habilita);
	form.setEnabled("dataVencimentoNota", habilita);
	form.setEnabled("descricao", habilita);
	form.setEnabled("consultaFornecedor", habilita);

	form.setEnabled("comentarioAprovacao", activity == 27 || activity == 5);

	if (activity != 0 || activity != 4 || activity != 18){
		form.setEnabled("valorRequisicao", false);		
	}

	if (activity != 0 && activity != 4 && activity != 11){
		form.setEnabled("numBoleto", false);
		form.setEnabled("obsDadosSolicitacao", false);
		form.setEnabled("inputNrNotaFiscal", false);
		form.setEnabled("inputNrPedido", false);
		form.setEnabled("tipoPagamento", false);
		form.setEnabled("dataVencimentoNota", false);
	}
	
	var indexes = form.getChildrenIndexes("tabelaParcelas");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("valorParcela___" + indexes[i], habilita);
		form.setEnabled("datEmissao___" + indexes[i], habilita);
		form.setEnabled("datVencimento___" + indexes[i], habilita);
		form.setEnabled("zoomNatureza___" + indexes[i], habilita);
	    form.setEnabled("fpCodBarras___" + indexes[i], habilita);
	}
	
	var indexes = form.getChildrenIndexes("tabelaAnexos");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("tipoAnexo___" + indexes[i], habilita);
		form.setEnabled("documento___" + indexes[i], habilita);
	}
}