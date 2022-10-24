function displayFields(form, customHTML){
	form.setShowDisabledFields(true);
	
	var atividade = getValue("WKNumState");
	customHTML.append("<script> var MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + atividade + "';</script>");
	customHTML.append("<script>function getWKNumState(){ return '" + atividade + "'; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return '" + getValue("WKCompany") + "'; }</script>");
	customHTML.append("<script>function getMobile(){ return '" + form.getMobile() + "'; }</script>");

	var modo = form.getFormMode();
	var usuario = fluigAPI.getUserService().getCurrent();
	if (modo == "ADD"){		
		form.setValue("solicitanteMatricula", usuario.getCode());
		form.setValue("solicitanteNome", usuario.getFullName());
		form.setValue("solicitanteEmail", usuario.getEmail());
		form.setValue("solicitanteTelefone", usuario.getValueExtData("UserRamal"));
		form.setValue("solicitanteDepartamento", usuario.getValueExtData("UserProjects"));
		
		var dataCorrente = obterDataCorrente();
		form.setValue("dataCriacao", dataCorrente);
	}
	
	if (form.getValue('documentoAnexo') != "") {
		form.setVisibleById('btnAnexo', false);
		form.setVisibleById('btnDownload', true);
		form.setVisibleById('btnViewer', true);
	}
	
	form.setValue("currentNome", usuario.getFullName());
	form.setValue("currentLogin", usuario.getLogin());
	form.setValue("currentEmail", usuario.getEmail());	
	
	
/*****************************ESCONDE PAINEIS*******************************************/
	if (atividade == 0 || atividade == 4 || atividade == 21 || atividade == 181){
	form.setVisibleById("panelDadosAgendamento", false);
	form.setVisibleById("panelValidacaoDocumento", false);
	form.setVisibleById("panelExpedicao", false);
	form.setVisibleById("panelFinanceiro", false);
	}
	
	if (atividade == 29 || atividade == 38 || atividade == 40 || atividade == 43 || 
		atividade == 45 || atividade == 64){
	form.setVisibleById("panelValidacaoDocumento", false);
	form.setVisibleById("panelExpedicao", false);
	form.setVisibleById("panelFinanceiro", false);
	}
	
	if (atividade == 67 || atividade == 66 || atividade == 31 || atividade == 90 || 
		atividade == 92 || atividade == 95){
	form.setVisibleById("panelFinanceiro", false);
	form.setVisibleById("panelExpedicao", false);
	}
	
	if (atividade == 79 || atividade == 81 || atividade == 84 ){
	form.setVisibleById("panelExpedicao", false);
	}
	
	if (atividade == 99 || atividade == 101 || atividade == 144){
	form.setVisibleById("panelFinanceiro", false);
	}
/***************************************************************************************/
	
	if (atividade != 29 && atividade != 38){
		form.setVisibleById("botaoPlanilha", false);
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente