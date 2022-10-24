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
	
/******************************ESCONDE PAINEIS E CAMPOS*****************************************/
	if(atividade != 0 || atividade != 4){
		var plataforma = form.getValue("zoomPlataforma");
		if(plataforma == "SOC NET"){
			form.setVisibleById('divNomeFilial', false);
			form.setVisibleById('divNomeBuscaUnidade', true);
		}else{
			form.setVisibleById('divNomeFilial', true);
			form.setVisibleById('divNomeBuscaUnidade', false);
		}
	}

	if(atividade == 0 || atividade == 4){
		let WKUser = getValue("WKUser");
        let c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", WKUser, WKUser, ConstraintType.MUST);
        let c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
        let constraints = [c1, c2];
        let dsColleague = DatasetFactory.getDataset("colleague", null, constraints, null);
        form.setValue("loginSolicitante", dsColleague.getValue(0, "login") );
        form.setValue("idSolicitante", dsColleague.getValue(0, "colleaguePK.colleagueId"));
	}

	if (atividade != 115) {
			
		form.setVisibleById('anexarLista', false);
	}

	if ((atividade != 54) && (atividade != 48) && (atividade != 50) && (atividade != 54) && 
	    (atividade != 95) && (atividade != 115) && (atividade != 69) && (atividade != 71) && 
	    (atividade != 63) && (atividade != 46) && (atividade != 73) && (atividade != 78)) {
	 	  
		form.setVisibleById('panelControleAtividades', false);
	}
	
	
	if ((atividade == 0) || (atividade == 4) || (atividade == 27)) {
		form.setVisibleById('panelAtend', false);
		form.setVisibleById('panelReagendamento', false);
		form.setVisibleById('panelrespAtend', false);
		//form.setVisibleById('panelControleAtividades', false);
	}
	
	if (atividade == 15) {
		form.setVisibleById('panelAtend', false);
		form.setVisibleById('panelReagendamento', false);
		form.setVisibleById('analiseRequisicao', true);
		//form.setVisibleById('panelControleAtividades', false);
	}

	if (atividade == 15) {
		form.setVisibleById('analiseRequisicao', true);
	}else{
		form.setVisibleById('analiseRequisicao', false);
	}

	if(atividade == 31){
		form.setVisibleById('verificarDisponibilidade', true);
	}else{
		form.setVisibleById('verificarDisponibilidade', false);
	}

	if(atividade == 37){
		form.setVisibleById('verificarAgenda', true);
	}else{
		form.setVisibleById('verificarAgenda', false);
	}

	if(atividade == 69){
		form.setVisibleById('verificarMonitAtendimento', true);
	}else{
		form.setVisibleById('verificarMonitAtendimento', false);
	}

	if(atividade == 115){
		form.setVisibleById('verificarListaPresenca', true);
	}else{
		form.setVisibleById('verificarListaPresenca', false);
	}
	
	if(atividade == 35){
		form.setVisibleById('panelReagendamento', false);
	}
	
	if (atividade != 61) {
		
		form.setVisibleById('panelFaturamento', false);
	}
		
	if (atividade != 31) {
		var indexesTableCred = form.getChildrenIndexes("tabelaCredenciado");
	    for (var i = 0; i < indexesTableCred.length; i++) {
	        form.setVisible("selectProcedimentoNew___" + indexesTableCred[i], false);
	    }

	}

	// if(atividade != 37 && atividade != 48 && atividade != 50 && atividade != 69 && atividade != 95 && atividade != 71 && atividade != 116){
	// 	form.setVisibleById('panelReagendamento', false);
	// }
	
/************************************************************************************************/
		
	form.setValue("currentNome", usuario.getFullName());
	form.setValue("currentLogin", usuario.getLogin());
	form.setValue("atividadeAtual",getValue("WKNumState"));
}

	
function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente