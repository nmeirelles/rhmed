function displayFields(form, customHTML){
	form.setShowDisabledFields(true);
	
	var atividade = getValue("WKNumState");
	form.setValue("nrAtividade", atividade);
	
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
	if(atividade == 0){
		form.setValue("solicitanteMatricula", usuario.getCode());
	}

	if (atividade != 0 && atividade != 4){
		if(form.getValue('tipoRequisicao') == 'pleito' || form.getValue('tipoRequisicao') == 'reajuste'){
			form.setVisibleById('divQuestionario', true);
		}else{
			form.setVisibleById('divQuestionario', false);
		}

		if(form.getValue('selectQuestionario3') == 'regular' || form.getValue('selectQuestionario3') == 'ruim' || form.getValue('selectQuestionario3') == 'pessimo'){
			form.setVisibleById('divJustQualiAtend', true);
		}else{
			form.setVisibleById('divJustQualiAtend', false);
		}

		if(form.getValue('inputQuestionario1_1') == 'regular' || form.getValue('inputQuestionario1_1') == 'ruim' || form.getValue('inputQuestionario1_1') == 'pessimo'){
			form.setVisibleById('divJustQualiAtend1', true);
		}else{
			form.setVisibleById('divJustQualiAtend1', false);
		}

		if(form.getValue('inputQuestionario5_1') == 'regular' || form.getValue('inputQuestionario5_1') == 'ruim' || form.getValue('inputQuestionario5_1') == 'pessimo'){
			form.setVisibleById('divJustQualiAtend2', true);
		}else{
			form.setVisibleById('divJustQualiAtend2', false);
		}

		if(form.getValue('inputQuestionario6_1') == 'regular' || form.getValue('inputQuestionario6_1') == 'ruim' || form.getValue('inputQuestionario6_1') == 'pessimo'){
			form.setVisibleById('divJustQualiAtend3', true);
		}else{
			form.setVisibleById('divJustQualiAtend3', false);
		}
	}

	if (atividade != 0 && atividade != 4 && atividade != 86){
		form.setVisibleById('divButtonAnexo', false);
	}else{
		form.setVisibleById('divButtonAnexo', true);
	}

	if (atividade == 0 || atividade == 4 || atividade == 86 || atividade == 41){
		form.setVisibleById('painelAprovadores', false);
	}else{
		form.setVisibleById('painelAprovadores', true);
	}

	if (atividade == 110 || atividade == 119){
		form.setVisibleById('painelResultados', true);
		form.setVisibleById('divButtonAnexoResultado', true);
	}else{
		form.setVisibleById('painelResultados', false);
		form.setVisibleById('divButtonAnexoResultado', false);
		
	}

	if(atividade == 110){
		if (form.getValue("tipoRequisicao") != "aditivo"){
			form.setVisibleById("divReajusteConcedido", true);
		}else{
			form.setVisibleById("divReajusteConcedido", false);
		}
	}

	if(atividade == 47){
		form.setVisibleById('painelResultados', true);
	}

	if (modo == "ADD"){		
		form.setValue("solicitanteMatricula", usuario.getCode());
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

	if (atividade == 5 || atividade == 9 || atividade == 17 || atividade == 21 || atividade == 23 || atividade == 35 || atividade == 44 || atividade == 86 || atividade == 97 || atividade == 110 || atividade == 119){
		var aprovadorAnterior = form.getValue("nomeAprovadorAnterior");
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
}