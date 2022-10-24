function displayFields(form, customHTML){
	form.setShowDisabledFields(true);
	var usuarioSubstituto = getValue("WKReplacement");
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
	if(atividade == 0){
		form.setValue("solicitanteMatricula", usuario.getCode());
	}

	if(usuarioSubstituto != "" || usuarioSubstituto != null){
		form.setValue("matriculaAprovadorSubst", usuarioSubstituto);
		//log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Substituto");
		//log.info(usuarioSubstituto);
	}

	if (atividade == 0 || atividade == 1 || atividade == 3 || atividade == 6){
		form.setVisibleById('painelAprovadores', false);
	}else{
		form.setVisibleById('painelAprovadores', true);
	}

	if (atividade != 0 && atividade != 1 && atividade != 3){
		let formaPagamento = form.getValue("formaPagamento");
		if (formaPagamento == "semCodigo"){
			form.setVisibleById('divSemCodigo', true);
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divDadosBancarios', true);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "comCodigo"){
			form.setVisibleById('divComCodigo', true);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "darf"){
			var codBarras = form.getValue("codBarrasDARF");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasDARF', true);
			}else{
				form.setVisibleById('divCodBarrasDARF', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', true);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "darm"){
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', true);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "gps"){
			var codBarras = form.getValue("codBarrasGPS");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasGPS', true);
			}else{
				form.setVisibleById('divCodBarrasGPS', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', true);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "grf"){
			var codBarras = form.getValue("codBarrasGRF");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasGRF', true);
			}else{
				form.setVisibleById('divCodBarrasGRF', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', true);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "damsp"){
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', true);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "darfWeb"){
			var codBarras = form.getValue("codBarrasDARFWEB");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasDARFWEB', true);
			}else{
				form.setVisibleById('divCodBarrasDARFWEB', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', true);
		}
		//form.setVisibleById('divButtonAnexo', false);
	}else{
		let formaPagamento = form.getValue("formaPagamento");
		if (formaPagamento == "semCodigo"){
			form.setVisibleById('divSemCodigo', true);
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
			
		}
		if (formaPagamento == "comCodigo"){
			form.setVisibleById('divComCodigo', true);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "darf"){
			var codBarras = form.getValue("codBarrasDARF");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasDARF', true);
			}else{
				form.setVisibleById('divCodBarrasDARF', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', true);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "darm"){
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', true);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "gps"){
			var codBarras = form.getValue("codBarrasGPS");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasGPS', true);
			}else{
				form.setVisibleById('divCodBarrasGPS', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', true);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "grf"){
			var codBarras = form.getValue("codBarrasGRF");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasGRF', true);
			}else{
				form.setVisibleById('divCodBarrasGRF', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', true);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "damsp"){
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', true);
			form.setVisibleById('divDARFWEB', false);
		}
		if (formaPagamento == "darfWeb"){
			var codBarras = form.getValue("codBarrasDARFWEB");
			if (codBarras == "sim"){
				form.setVisibleById('divCodBarrasDARFWEB', true);
			}else{
				form.setVisibleById('divCodBarrasDARFWEB', false);
			}
			form.setVisibleById('divComCodigo', false);
			form.setVisibleById('divSemCodigo', false);
			form.setVisibleById('divDadosBancarios', false);
			form.setVisibleById('divDARF', false);
			form.setVisibleById('divDARM', false);
			form.setVisibleById('divGPS', false);
			form.setVisibleById('divGRF', false);
			form.setVisibleById('divDAMSP', false);
			form.setVisibleById('divDARFWEB', true);
		}
		//form.setVisibleById('divButtonAnexo', true);
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
	form.setValue("currentMatricula", usuario.getCode());


	if (atividade == 2 || atividade == 3 || atividade == 4 || atividade == 19){
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
} // obterDataCorrente