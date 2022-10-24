function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 2) || (activity == 26));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("zoomCentroCusto", habilita);	
	form.setEnabled("valorTotalDocumento", habilita);
	form.setEnabled("formaPagamento", habilita);
	form.setEnabled("descricao", habilita);
	form.setEnabled("dataVencimento", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("selectTipoBusca", habilita);
	form.setEnabled("obsDadosSolicitacao", habilita);
	form.setEnabled("colabForn", habilita);
	form.setEnabled("tipoPagamento", habilita);
	form.setEnabled("numBoleto", habilita);
	form.setEnabled("consultaFornecedor", habilita);

	form.setEnabled("comentarioAprovacao", activity == 27 || activity == 5);

	if (activity != 0 || activity != 2 || activity != 26){
		form.setEnabled("valorRequisicao", false);		
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