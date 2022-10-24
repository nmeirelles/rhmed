function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 2) || (activity == 26));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("zoomCentroCusto", habilita);	
	form.setEnabled("formaPagamento", habilita);
	form.setEnabled("colabForn", habilita);
	form.setEnabled("tipoRequisicao", habilita);
	form.setEnabled("obsDadosSolicitacao", habilita);
	form.setEnabled("inputProduto", habilita);
	form.setEnabled("Quantidade", habilita);
	form.setEnabled("valorUnit", habilita);
	form.setEnabled("numeroNota", habilita);
	form.setEnabled("dataEmissaoNota", habilita);
	form.setEnabled("selectTipoBusca", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("dataVencimentoNota", habilita);
	form.setEnabled("numBoleto", habilita);
	form.setEnabled("consultaFornecedor", habilita);
	form.setEnabled("bancoPag", habilita);
	form.setEnabled("contaPag", habilita);
	form.setEnabled("agenciaPag", habilita);

	form.setEnabled("valorRequisicao", habilita);
	form.setEnabled("selectTipoBuscaEmissorNF", habilita);
	form.setEnabled("inputEmissorNF", habilita);
	form.setEnabled("radioPagamento", habilita);
	form.setEnabled("selectTipoFornecedor", habilita);


	/*
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
	*/
}