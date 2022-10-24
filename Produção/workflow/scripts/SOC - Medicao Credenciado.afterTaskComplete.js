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
	if(proxAtividade == 3 || proxAtividade == 5){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 7){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 9){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 10){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 12){
		hAPI.setCardValue("Status", "Em Análise do Formulário");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 91){
		hAPI.setCardValue("Status", "Em Análise Fiscal");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 14){
		hAPI.setCardValue("Status", "Em análise TI");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 26){
		hAPI.setCardValue("Status", "SP Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 27 || proxAtividade == 28){
		hAPI.setCardValue("Status", "SP Encaminhada Para Pagamento");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 15){
		hAPI.setCardValue("Status", "SP - Pagamento Programado");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 20 || proxAtividade == 21 || proxAtividade == 22 || proxAtividade == 23 || proxAtividade == 24 || proxAtividade == 25){
		hAPI.setCardValue("Status", "Cancelada");
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