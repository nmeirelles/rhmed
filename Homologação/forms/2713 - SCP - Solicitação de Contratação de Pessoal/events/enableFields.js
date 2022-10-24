function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 2) || (activity == 26));
	var habilitaRH = ((activity == 124) || (activity == 125));
	
	//Painel Dados da Vaga
	form.setEnabled("selectMotivoContratacao", habilita);
	form.setEnabled("zoomCentroCusto", habilita);
	form.setEnabled("selectUrgencia", habilita);
	form.setEnabled("selectTipoContratacao", habilita);
	form.setEnabled("selectAreaRH", habilita);
	form.setEnabled("selectCargo", habilita);
	form.setEnabled("selectFuncao", habilita);
	form.setEnabled("inputNumeroProposta", habilita);	
	form.setEnabled("inputNomeColabSubst", habilita);	
	form.setEnabled("inputEscala", habilita);
	form.setEnabled("inputHorario", habilita);
	form.setEnabled("dataPrevIniProf", habilita);
	form.setEnabled("inputClienteUnidade", habilita);
	form.setEnabled("inputEnderecoTrabalho", habilita);
	form.setEnabled("inputTempoDias", habilita);
	form.setEnabled("zoomFilial", habilita);
	form.setEnabled("obsDadosSolicitacao", habilita);

	//Painel Salario e Beneficios
	form.setEnabled("inputSalario", habilita);
	form.setEnabled("selectInsalubridade", habilita);
	form.setEnabled("selectPericulosidade", habilita);
	form.setEnabled("selectResponsTecnica", habilita);
	form.setEnabled("selectRefeicaoLocal", habilita);
	form.setEnabled("selectPlanoMedico", habilita);
	form.setEnabled("selectPlanoOdonto", habilita);
	form.setEnabled("selectVrVa", habilita);
	form.setEnabled("selectFretadoCliente", habilita);
	form.setEnabled("selectVt", habilita);
	form.setEnabled("selectAuxCombustivel", habilita);
	form.setEnabled("selectVtFixo", habilita);
	form.setEnabled("inputValorOrcado", habilita);
	form.setEnabled("inputPorcentInsalub", habilita);
	form.setEnabled("inputPorcentPericulos", habilita);

	//Painel Outras Informações
	form.setEnabled("selectDocSolidaria", habilita);
	form.setEnabled("selectIntegracao", habilita);
	form.setEnabled("selectCNH", habilita);
	form.setEnabled("textAreaDescAtividades", habilita);
	form.setEnabled("textAreaHabilidades", habilita);
	form.setEnabled("textAreaCompetencia", habilita);

	//Painel Equipamentos
	form.setEnabled("selectNotebook", habilita);
	form.setEnabled("selectDesktop", habilita);
	form.setEnabled("selectCelular", habilita);
	form.setEnabled("selectEPI", habilita);
	form.setEnabled("selectMesa", habilita);
	form.setEnabled("selectCadeira", habilita);
	form.setEnabled("selectRamal", habilita);
	
	//Painel Aprovação
	form.setEnabled("inputDataInicioColab", habilitaRH);
	form.setEnabled("inputNomeColab", habilitaRH);
	form.setEnabled("inputTelefoneContato", habilitaRH);
}