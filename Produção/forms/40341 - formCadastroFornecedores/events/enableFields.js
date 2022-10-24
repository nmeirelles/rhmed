function enableFields(form){
	
	var activity = getValue('WKNumState');

	var switchMEI = form.getValue("switchMEI");
	var switchRecebeFilial = form.getValue("switchRecebeFilial");
	
	var habilita = ((activity == 0) || (activity == 4) || (activity == 11));

	if(switchMEI != "") form.setEnabled("inputCPFMEI", habilita);
	if(switchRecebeFilial != "") form.setEnabled("inputCNPJFilial", habilita);

	form.setEnabled("inputCNPJ", habilita);
	form.setEnabled("inputRazaoSocial", habilita);
	form.setEnabled("inputFantasia", habilita);
	form.setEnabled("inputCEP", habilita);
	form.setEnabled("inputLogradouro", habilita);
	form.setEnabled("inputNumero", habilita);
	form.setEnabled("inputComplemento", habilita);
	form.setEnabled("inputBairro", habilita);
	form.setEnabled("inputMunicipio", habilita);
	form.setEnabled("zoomMunicipio", habilita);
	form.setEnabled("inputEstado", habilita);
	form.setEnabled("inputNomeContato", habilita);
	form.setEnabled("inputTelefoneContato", habilita);
	form.setEnabled("inputEmailContato", habilita);
	form.setEnabled("inputBanco", habilita);
	form.setEnabled("inputAgencia", habilita);
	form.setEnabled("inputConta", habilita);
	form.setEnabled("inputDigitoConta", habilita);
	form.setEnabled("selectTipoConta", habilita);
	form.setEnabled("selectformaPagamento", habilita);
	form.setEnabled("selectTipoFornecedor", habilita);


/* 	if(activity != 107 || activity != 4 || activity != 0){
		form.setEnabled("inputCodMunicipal", false);
		form.setEnabled("inputCodPais", false);
		form.setEnabled("inputCodPaisBacen", false);
		form.setEnabled("selectTipoFornec", false);
		form.setEnabled("zoomContaContabil", false);
		form.setEnabled("zoomNatFinanc", false);		
		form.setEnabled("selectRecISS", false);
		form.setEnabled("selectRecPIS", false);
		form.setEnabled("selectRecCOFINS", false);
		form.setEnabled("selectRecCSLL", false);
		form.setEnabled("selectSimplesNacional", false);
		form.setEnabled("selectCalcINSS", false);
		form.setEnabled("selectCalcIRRF", false);
		form.setEnabled("zoomFormaPag", false);
	} */



	form.setEnabled("comentarioAprovacao", activity == 27 || activity == 5);

	if (activity != 0 || activity != 4 || activity != 18){
		form.setEnabled("valorRequisicao", false);		
	}

	if (activity != 0 && activity != 4 && activity != 11){
		form.setEnabled("numBoleto", false);
		form.setEnabled("obsDadosSolicitacao", false);
		form.setEnabled("inputNrNotaFiscal", false);
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