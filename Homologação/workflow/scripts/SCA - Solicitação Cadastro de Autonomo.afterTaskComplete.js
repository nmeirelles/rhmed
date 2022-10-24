function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var atividade = getValue("WKNumState")
	var proxAtividade = getValue("WKNextState");
	var hora = obterDataCorrente();
	var hora2 = obterDataCorrente2();
	var nome = hAPI.getCardValue("currentNome")
	
	if(atividade == 0 || atividade == 2){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 12){
		hAPI.setCardValue("Status", "Em Análise do RH");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 26){
		hAPI.setCardValue("Status", "Solicitação Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 25){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 15){
		hAPI.setCardValue("Status", "Finalizada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 109){
		hAPI.setCardValue("Status", "Em Cadastro no Sistema");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoDataHora = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoDataHora.format(dateCorrente);
} // obterDataCorrente

function obterDataCorrente2(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente