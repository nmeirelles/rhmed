function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 4) || (activity == 11));
	var habilitaAssinatura = ((activity == 102) || (activity == 104));
	form.setEnabled("zoomEmpresa", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("inputNrCPF", habilita);
	form.setEnabled("zoomCentroCusto", habilita);
	form.setEnabled("valorTotalDocumento", habilita);
	form.setEnabled("tipoPagamento", habilita);
	form.setEnabled("zoomProfissional", habilita);
	form.setEnabled("inputOutroTipoProfissional", habilita);
	form.setEnabled("zoomServico", habilita);
	form.setEnabled("inputOutroTipoServico", habilita);
	form.setEnabled("inputNumeroSCP", habilita);
	form.setEnabled("textareaDescricaoAtividade", habilita);
	form.setEnabled("dataVencimentoNota", habilita);
	form.setEnabled("descricao", habilita);
	form.setEnabled("obsDadosSolicitacao", habilita);
	//form.setEnabled("radiobtnNovoPrestador", habilita);
	form.setEnabled("radiobtnOutroVinculo", habilita);
	form.setEnabled("inputValorRecolhido", habilita);

	//Painel Anexar Recibo Assinado
	form.setEnabled("dataAssinatura", habilitaAssinatura);

	var tabelaClientes = form.getChildrenIndexes("tabelaClientes");
	for (var i = 0; i < tabelaClientes.length; i++) {
		form.setEnabled("tdCliente___" + tabelaClientes[i], habilita);
		form.setEnabled("tdUnidade___" + tabelaClientes[i], habilita);
		form.setEnabled("tdDataInicio___" + tabelaClientes[i], habilita);
		form.setEnabled("tdDataFim___" + tabelaClientes[i], habilita);
	    form.setEnabled("tdValorCliente___" + tabelaClientes[i], habilita);
	}
}