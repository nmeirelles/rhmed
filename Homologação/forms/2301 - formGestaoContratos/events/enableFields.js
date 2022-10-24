function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 4) || (activity == 86));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("zoomCentroCusto", habilita);
	form.setEnabled("tipoRequisicao", habilita);
	form.setEnabled("tipoPagamento", habilita);
	form.setEnabled("dataEmissaoNota", habilita);
	form.setEnabled("obsDadosSolicitacao", habilita);
	form.setEnabled("itemObservacoes", habilita);
	form.setEnabled("formaPagamento", habilita);
	form.setEnabled("descricao", habilita);
	form.setEnabled("inputLocalEntrega", habilita);
	form.setEnabled("tipoEndereco", habilita);
	form.setEnabled("ruaFornecedor", habilita);
	form.setEnabled("cidadeFornecedor", habilita);
	form.setEnabled("estadoFornecedor", habilita);
	form.setEnabled("CEPFornecedor", habilita);
	form.setEnabled("nomeFornecedor", habilita);
	form.setEnabled("telefoneFornecedor", habilita);
	form.setEnabled("valorRequisicao", habilita);
	form.setEnabled("observacoesFornecedor", habilita);
	form.setEnabled("selectTipoBusca", habilita);
	form.setEnabled("selectQuestionario3", habilita);
	form.setEnabled("inputQuestionario4", habilita);
	form.setEnabled("inputQuestionario2", habilita);
	form.setEnabled("inputQuestionario2_1", habilita);
	form.setEnabled("inputQuestionario1", habilita);
	form.setEnabled("inputQuestionario1_1", habilita);
	form.setEnabled("inputQuestionario5", habilita);
	form.setEnabled("inputQuestionario5_1", habilita);
	form.setEnabled("inputQuestionario6", habilita);
	form.setEnabled("inputQuestionario6_1", habilita);
	form.setEnabled("textJustQualiAtend", habilita);
	form.setEnabled("textJustQualiAtend1", habilita);
	form.setEnabled("textJustQualiAtend2", habilita);
	form.setEnabled("textJustQualiAtend3", habilita);
	form.setEnabled("consultaFornecedor", habilita);
	form.setEnabled("obsQuestionario", habilita);

	if(activity == 110){
		form.setEnabled("selectReajuste", true);
		form.setEnabled("inputDataInicialAcordo", true);
		form.setEnabled("inputDataFinalAcordo", true);
		form.setEnabled("inputImpactoAnualReajuste", true);
		form.setEnabled("inputPorcentagemImpactoAnual", true);
	}else{
		form.setEnabled("selectReajuste", false);
		form.setEnabled("inputDataInicialAcordo", false);
		form.setEnabled("inputDataFinalAcordo", false);
		form.setEnabled("inputImpactoAnualReajuste", false);
		form.setEnabled("inputPorcentagemImpactoAnual", false);
	}

	if (activity != 0 || activity != 4 || activity != 86){

		var indexesItems = form.getChildrenIndexes("tabelaItens");
		for (var i = 0; i < indexesItems.length; i++) {
			form.setEnabled("inputProduto___"+indexesItems[i], false);
			form.setEnabled("itemQuantidade___"+indexesItems[i], false);
			form.setEnabled("itempreco___"+indexesItems[i], false);
			form.setEnabled("itemObservacoes___"+indexesItems[i], false);
		}
	
		var indexesFornecedores = form.getChildrenIndexes("tabelaFornecedores");
		for (var i = 0; i < indexesFornecedores.length; i++) {
			form.setEnabled("inputFornecedor___"+indexesFornecedores[i], false);
			form.setEnabled("nomeSugestaoFornecedor___"+indexesFornecedores[i], false);
			form.setEnabled("telefoneSugestaoFornecedor___"+indexesFornecedores[i], false);
			form.setEnabled("contatoSugestaoFornecedor___"+indexesFornecedores[i], false);
			form.setEnabled("emailSugestaoFornecedor___"+indexesFornecedores[i], false);
			form.setEnabled("observacoesSugestaoFornecedor___"+indexesFornecedores[i], false);
		}

	}else{
		var indexesItems = form.getChildrenIndexes("tabelaItens");
		for (var i = 0; i < indexesItems.length; i++) {
			form.setEnabled("inputProduto___"+indexesItems[i], true);
			form.setEnabled("itemQuantidade___"+indexesItems[i], true);
			form.setEnabled("itempreco___"+indexesItems[i], true);
		}
	
		var indexesFornecedores = form.getChildrenIndexes("tabelaFornecedores");
		for (var i = 0; i < indexesFornecedores.length; i++) {
			form.setEnabled("inputFornecedor___"+indexesFornecedores[i], true);
			form.setEnabled("nomeSugestaoFornecedor___"+indexesFornecedores[i], true);
			form.setEnabled("telefoneSugestaoFornecedor___"+indexesFornecedores[i], true);
			form.setEnabled("contatoSugestaoFornecedor___"+indexesFornecedores[i], true);
			form.setEnabled("emailSugestaoFornecedor___"+indexesFornecedores[i], true);
			form.setEnabled("observacoesSugestaoFornecedor___"+indexesFornecedores[i], true);
		}
	}

	form.setEnabled("comentarioAprovacao", activity == 27 || activity == 5);

	
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