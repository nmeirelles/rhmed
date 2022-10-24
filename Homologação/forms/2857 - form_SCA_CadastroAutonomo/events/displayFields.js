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

	form.setValue("atividadeAtual",getValue("WKNumState"));
	form.setValue("currentEmail", usuario.getEmail());

	var motivoContratacao = form.getValue("selectMotivoContratacao");
	var aprovadorAnterior = form.getValue("nomeAprovadorAnterior");
	if(motivoContratacao == "coberturaFalta" || motivoContratacao == "coberturaFerias" || motivoContratacao == "substituicao"){
		form.setVisibleById("divNomeColabSubstituido", true);
	}
	if(motivoContratacao == "aumentoQuadro" || motivoContratacao == "implantacao"){
		form.setVisibleById("painelSalarioBeneficios", true);
	}


	if(atividade == 0){
		form.setValue("solicitanteMatricula", usuario.getCode());
	}

	if (atividade == 12 || atividade == 109){
		form.setVisibleById('painelAprovadores', true);
		//form.setVisibleById('divButtonAnexo', true);
	}else{
		form.setVisibleById('painelAprovadores', false);
		//form.setVisibleById('divButtonAnexo', false);
	}

	if (modo == "ADD"){
		form.setValue("solicitanteNome", usuario.getFullName());
		form.setValue("solicitanteEmail", usuario.getEmail());
		form.setValue("solicitanteTelefone", usuario.getValueExtData("UserRamal"));
		form.setValue("solicitanteDepartamento", usuario.getValueExtData("UserProjects"));
		
		var dataCorrente = obterDataCorrente();
		form.setValue("dataCriacao", dataCorrente);

		var data = new Date();
        var dia  = data.getDate();
        var mes  = data.getMonth() + 1;
        var ano  = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        var dataLocal = dia+"/"+mes+"/"+ano;
		form.setValue("dataEntrada", dataLocal);
		form.setValue("mesEntrada", mes);
		form.setValue("anoEntrada", ano);
	}
	
	if (form.getValue('documentoAnexo') != "") {
		form.setVisibleById('btnAnexo', false);
		form.setVisibleById('btnDownload', true);
		form.setVisibleById('btnViewer', true);
	}
	
	form.setValue("currentNome", usuario.getFullName());
	form.setValue("currentLogin", usuario.getLogin());

	if (atividade == 9 || atividade == 12 || atividade == 26 || atividade == 109){
		if(aprovadorAnterior == "" || aprovadorAnterior == null){
			form.setValue("nomeAprovador", usuario.getFullName());
			form.setValue("nomeAprovadorAnterior", form.getValue("nomeAprovador"));
		}		
		form.setValue("nomeAprovadorAnterior", form.getValue("nomeAprovador"));
		form.setValue("loginAprovadorAnterior", form.getValue("loginAprovador"));
		form.setValue("nomeAprovador", usuario.getFullName());
		form.setValue("loginAprovador", usuario.getLogin());
		form.setValue("matriculaAprovador", usuario.getCode()); //Valida Substituto
	}


}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente