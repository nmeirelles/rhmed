function enableFields(form){
	
	var activity = getValue('WKNumState');
	
	var habilita = ((activity == 0) || (activity == 2) || (activity == 26));
	var habilitaRH = ((activity == 12));
	
	//Painel Dados da Vaga
	form.setEnabled("inputNome", habilita);
	form.setEnabled("inputEmail", habilita);
	form.setEnabled("inputDataInicio", habilita);
	form.setEnabled("selectSexo", habilita);
	form.setEnabled("selectEstadoCivil", habilita);
	form.setEnabled("inputDataNasc", habilita);
	form.setEnabled("inputLocalNasc", habilita);
	form.setEnabled("selectUFNasc", habilita);	
	form.setEnabled("inputNrCTPS", habilita);	
	form.setEnabled("inputNrSerieCTPS", habilita);
	form.setEnabled("selectUfCTPS", habilita);
	form.setEnabled("inputDataEmissaoCTPS", habilita);
	form.setEnabled("inputNrIdentidade", habilita);
	form.setEnabled("inputOrgaoEmissorIdent", habilita);
	form.setEnabled("selectUfIdentidade", habilita);
	form.setEnabled("inputDataEmissaoIdent", habilita);
	form.setEnabled("inputNrCpf", habilita);
	form.setEnabled("inputNrPis", habilita);
	form.setEnabled("inputCEP", habilita);
	form.setEnabled("inputTelefone", habilita);
	form.setEnabled("inputCelular", habilita);
	form.setEnabled("inputEndereco", habilita);
	form.setEnabled("inputBairro", habilita);
	form.setEnabled("inputCidade", habilita);
	form.setEnabled("selectEstado", habilita);
	form.setEnabled("selectGrauEscolaridade", habilita);
	form.setEnabled("selectSituacao", habilita);
	form.setEnabled("inputFormado", habilita);
	form.setEnabled("selectEstudaAtual", habilita);
	form.setEnabled("inputQualCurso", habilita);
	form.setEnabled("inputCodBanco", habilita);
	form.setEnabled("inputCodBanco", habilita);
	form.setEnabled("inputBanco", habilita);
	form.setEnabled("inputAgencia", habilita);
	form.setEnabled("inputContaCorrente", habilita);
}