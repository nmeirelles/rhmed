function displayFields(form,customHTML){
    form.setShowDisabledFields(true);
	var user = fluigAPI.getUserService().getCurrent();
    form.setValue("inputCurrentNome", user.getFullName());
	form.setValue("inputCurrentLogin", user.getLogin());
    form.setValue("inputCurrentMatricula", user.getCode());
    form.setValue("inputCurrentEmail", user.getEmail());
    form.setValue("inputCurrentAtividade",getValue("WKNumState"));

	customHTML.append("<script> var MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + atividade + "';</script>");
	customHTML.append("<script>function getWKNumState(){ return '" + atividade + "'; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return '" + getValue("WKCompany") + "'; }</script>");
	customHTML.append("<script>function getMobile(){ return '" + form.getMobile() + "'; }</script>");
    
	var atividade = getValue("WKNumState");
	if(atividade == 0 || atividade == 4){
		form.setValue("inputSolicitanteLogin", user.getLogin());
		form.setValue("inputSolicitanteMatricula", user.getCode());
		form.setValue("inputNomeSolicitante", user.getFullName());
		form.setValue("inputEmailSolicitante", user.getEmail());
		form.setValue("inputTelefoneSolicitante", user.getValueExtData("UserRamal"));
		form.setValue("inputDepartamentoSolicitante", user.getValueExtData("UserProjects"));

		// var newDate = new Date();
		// var formatDate = new java.text.SimpleDateFormat("dd/MM/yyyy");
		// var dataLocal = formatDate.format(newDate);
		// form.setValue("inputDataCriacao", dataLocal);

		var data = new Date();
        var dia  = data.getDate();
        var mes  = data.getMonth() + 1;
        var ano  = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        var dataLocal = dia+"/"+mes+"/"+ano;
		form.setValue("inputDataCriacao", dataLocal);
		form.setValue("inputMesCriacao", mes);
		form.setValue("inputAnoCriacao", ano);

		form.setVisibleById('panelAprovacaoCadastro', false);
		form.setVisibleById('panelAprovacaoSeguranca', false);
		form.setVisibleById('panelAprovacaoSaude', false);
		form.setVisibleById('panelFinanceiro', false);
	}

	if(atividade == 21){
		form.setVisibleById('panelAprovacaoCadastro', true);
		form.setVisibleById('panelAprovacaoSeguranca', true);
		form.setVisibleById('panelAprovacaoSaude', true);
		form.setVisibleById('panelFinanceiro', false);
	}

	if(atividade == 29){
		form.setVisibleById('panelAprovacaoCadastro', true);
		form.setVisibleById('panelAprovacaoSeguranca', false);
		form.setVisibleById('panelAprovacaoSaude', false);
		form.setVisibleById('panelFinanceiro', false);
	}
	
	if(atividade == 7){
		form.setVisibleById('panelAprovacaoCadastro', true);
		form.setVisibleById('panelAprovacaoSeguranca', true);
		form.setVisibleById('panelAprovacaoSaude', true);
		form.setVisibleById('panelFinanceiro', false);
	}

	if(atividade == 14){
		form.setVisibleById('panelAprovacaoCadastro', false);
		form.setVisibleById('panelAprovacaoSeguranca', false);
		form.setVisibleById('panelAprovacaoSaude', true);
		form.setVisibleById('panelFinanceiro', false);
	}
	
	if(atividade == 32){
		form.setVisibleById('panelAprovacaoCadastro', false);
		form.setVisibleById('panelAprovacaoSeguranca', false);
		form.setVisibleById('panelAprovacaoSaude', false);
		form.setVisibleById('panelFinanceiro', true);
	}

}