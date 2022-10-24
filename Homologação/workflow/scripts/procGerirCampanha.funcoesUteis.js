function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
} 

function notificarUsuario(matricula, status){
	if (matricula == null || matricula == undefined || matricula == ""){
		return false;
	} // if
	if (status == null || status == undefined || status == ""){
		return false;
	} // if
	
	var processo = getValue("WKNumProces");
	try{
		var parametros = new java.util.HashMap();
		parametros.put("subject", "Fluig ["+processo+"] - " + status);
		parametros.put("FLUXO", ""+processo);
		parametros.put("STATUS", ""+status);
		var destinatarios = new java.util.ArrayList();
		destinatarios.add(matricula);
		notifier.notify("admin", "template_FinalizacaoFluxo", parametros, destinatarios, "text/html");
		return true;
	}catch(e){
		log.error("Erro ao notificar o usuário do processo["+processo+"]: " + e)
		return false;
	} // try catch
} // notificarUsuario

function isSolicitanteDiferente(){
	var matriculaAtendente = hAPI.getCardValue("matriculaAtendente");
	var solicitanteMatricula = hAPI.getCardValue("solicitanteMatricula");
	return (matriculaAtendente != solicitanteMatricula);
} // isSolicitanteDiferente()

function format2Number(valor){
	if (valor == null || valor == undefined || valor == ""){
		return 0;
	}
	while (valor.indexOf(".") >= 0){
		valor = valor.replace(".", "");
	}
	if (valor.indexOf(",") >= 0){
		valor = valor.replace(",", ".");
	}
	var novoValor = Number(valor);
	if (isNaN(novoValor)){
		novoValor = 0;
	}
	return novoValor;
} // format2Number