function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 1) || (activity == 3));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("zoomCentroCusto", habilita);	
	form.setEnabled("valorTotalDocumento", habilita);
	form.setEnabled("formaPagamento", habilita);
	form.setEnabled("descricao", habilita);
	form.setEnabled("colabForn", habilita);
	form.setEnabled("tipoPagamento", habilita);
	form.setEnabled("obsDadosSolicitacao", habilita);
	form.setEnabled("dataApuracao", habilita);
	form.setEnabled("codigoReceita", habilita);
	form.setEnabled("numReferencia", habilita);
	form.setEnabled("valorPrincipal", habilita);
	form.setEnabled("valorMulta", habilita);
	form.setEnabled("valorJuros", habilita);
	form.setEnabled("dataVencimentoNota", habilita);
	form.setEnabled("datapagamentoNota", habilita);
	form.setEnabled("valorTotalDocumento", habilita);
	form.setEnabled("selectTipoBusca", habilita);
	form.setEnabled("inputFornecedor", habilita);
	form.setEnabled("numCodigo", habilita);
	form.setEnabled("valorTotalComCodigo", habilita);
	form.setEnabled("dataVencimento", habilita);
	form.setEnabled("dataPagamento", habilita);
	form.setEnabled("competenciaPagamento", habilita);
	form.setEnabled("codigoPagamento", habilita);
	form.setEnabled("valorRequisicao", habilita);
	form.setEnabled("valorPrincipalCodBarras", habilita);
	form.setEnabled("valorMultaCodBarras", habilita);
	form.setEnabled("valorJurosCodBarras", habilita);
	form.setEnabled("consultaFornecedor", habilita);

	form.setEnabled("codBarrasDARF", habilita);
	form.setEnabled("nrCodigoBarrasDARF", habilita);
	form.setEnabled("periodoApuracaoDARF", habilita);
	form.setEnabled("nrCPFCNPJDARF", habilita);
	form.setEnabled("codigoReceitaDARF", habilita);
	form.setEnabled("nrReferenciaDARF", habilita);
	form.setEnabled("dataVencimentoDARF", habilita);
	form.setEnabled("valorPrincipalDARF", habilita);
	form.setEnabled("valorMultaDARF", habilita);
	form.setEnabled("valorJurosEncargosDARF", habilita);

	//form.setEnabled("codBarrasDARM", habilita);
	form.setEnabled("nrCodigoBarrasDARM", habilita);
	form.setEnabled("nrReceitaDARM", habilita);
	form.setEnabled("nrContribuinteDARM", habilita);
	form.setEnabled("dataVencimentoDARM", habilita);
	form.setEnabled("nrCompetenciaDARM", habilita);
	form.setEnabled("nrGuiaDARM", habilita);
	form.setEnabled("valorTributoDARM", habilita);
	form.setEnabled("valorMoraDARM", habilita);
	form.setEnabled("valorMultaDARM", habilita);

	form.setEnabled("codBarrasGPS", habilita);
	form.setEnabled("nrCodigoBarrasGPS", habilita);
	form.setEnabled("codPagamentoGPS", habilita);
	form.setEnabled("nrCompetenciaGPS", habilita);
	form.setEnabled("nrIdentificadorGPS", habilita);
	form.setEnabled("valorInssGPS", habilita);
	form.setEnabled("valorOutrasGPS", habilita);
	form.setEnabled("valorJurosGPS", habilita);
	form.setEnabled("codVencimentoGPS", habilita);


	form.setEnabled("codBarrasGRF", habilita);
	form.setEnabled("nrCodigoBarrasGRF", habilita);
	form.setEnabled("nrTelefoneGRF", habilita);
	form.setEnabled("nrFPASGRF", habilita);
	form.setEnabled("nrSimplesGRF", habilita);
	form.setEnabled("valorRemuneracaoGRF", habilita);
	form.setEnabled("nrTrabalhadoresGRF", habilita);
	form.setEnabled("aliquotaFGTSGRF", habilita);
	form.setEnabled("codRecolhimentoGRF", habilita);
	form.setEnabled("idRecolhimentoGRF", habilita);
	form.setEnabled("inscricaoGRF", habilita);
	form.setEnabled("competenciaGRF", habilita);
	form.setEnabled("dataValidadeGRF", habilita);
	form.setEnabled("valorDepostioGRF", habilita);
	form.setEnabled("valorEncargosGRF", habilita);

	//form.setEnabled("codBarrasDAMSP", habilita);
	form.setEnabled("nrIncidenciaDAMSP", habilita);
	form.setEnabled("nrCCMDAMSP", habilita);
	form.setEnabled("nrCPFCNPJDAMSP", habilita);
	form.setEnabled("nrCodigoBarrasDAMSP", habilita);
	form.setEnabled("dataVencimentoDAMSP", habilita);
	form.setEnabled("valorDAMSP", habilita);
	form.setEnabled("valorMultaDAMSP", habilita);
	form.setEnabled("valorJurosDAMSP", habilita);
	form.setEnabled("valorAtualizaMonetariaDAMSP", habilita);
	form.setEnabled("valorOutrosEncargosDAMSP", habilita);

	form.setEnabled("codBarrasDARFWEB", habilita);
	form.setEnabled("nrCodigoBarrasDARFWEB", habilita);
	form.setEnabled("apuracaoDARFWEB", habilita);
	form.setEnabled("dataVencimentoDARFWEB", habilita);
	form.setEnabled("nrDocumentoDARFWEB", habilita);
	form.setEnabled("valorPrincipalDARFWEB", habilita);
	form.setEnabled("valorMultaDARFWEB", habilita);
	form.setEnabled("valorJurosEncargosDARFWEB", habilita);
	form.setEnabled("observacoesDARFWEB", habilita);
	form.setEnabled("cnpjDARFWEB", habilita);
	form.setEnabled("dataPagamentoDARFWEB", habilita);
	form.setEnabled("codReceitaDARFWEB", habilita);


	//form.setEnabled("comentarioAprovacao", activity == 27 || activity == 5);
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