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
	form.setEnabled("codSoc", habilita);
	form.setEnabled("valorRequisicao", habilita);
	form.setEnabled("inputValorTaxa", habilita);

	if (activity != 0 || activity != 2 || activity != 26){

		var indexesItems = form.getChildrenIndexes("tabelaItens");
		for (var i = 0; i < indexesItems.length; i++) {
			form.setEnabled("itemNatureza___"+indexesItems[i], false);
			form.setEnabled("inputProduto___"+indexesItems[i], false);
			form.setEnabled("itemQuantidade___"+indexesItems[i], false);
			form.setEnabled("itempreco___"+indexesItems[i], false);
			form.setEnabled("itemObservacoes___"+indexesItems[i], false);
		}
	}else{
		var indexesItems = form.getChildrenIndexes("tabelaItens");
		for (var i = 0; i < indexesItems.length; i++) {
			form.setEnabled("itemNatureza___"+indexesItems[i], true);
			form.setEnabled("inputProduto___"+indexesItems[i], true);
			form.setEnabled("itemQuantidade___"+indexesItems[i], true);
			form.setEnabled("itempreco___"+indexesItems[i], true);
		}
	}


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