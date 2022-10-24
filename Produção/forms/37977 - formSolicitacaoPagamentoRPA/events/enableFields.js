function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 4) || (activity == 11));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("inputNrCPF", habilita);
	form.setEnabled("inputNomePrestador", habilita);
	form.setEnabled("zoomCentroCusto", habilita);
	form.setEnabled("valorTotalDocumento", habilita);
	form.setEnabled("tipoPagamento", habilita);
	form.setEnabled("inputCliente", habilita);
	form.setEnabled("inputLocal", habilita);
	form.setEnabled("inputFuncao", habilita);
	form.setEnabled("radiobtnNovoPrestador", habilita);
	form.setEnabled("radiobtnOutroVinculo", habilita);


	
	form.setEnabled("dataVencimentoNota", habilita);
	form.setEnabled("descricao", habilita);

	form.setEnabled("comentarioAprovacao", activity == 27 || activity == 5);

	if (activity != 0 || activity != 4 || activity != 18){
		form.setEnabled("valorRequisicao", false);		
	}

	if (activity != 0 && activity != 4 && activity != 11){
		form.setEnabled("obsDadosSolicitacao", false);
		form.setEnabled("inputNrCPF", false);
		form.setEnabled("inputNrRPA", false);
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