/*function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var atividade = getValue("WKNumState")
	var proxAtividade = getValue("WKNextState");

	var hora = obterDataCorrente();
	var nome = hAPI.getCardValue("currentNome")
	
	if(atividade == 0 || atividade == 2){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);		
	}
	if(atividade == 9){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(atividade == 5){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);

	}
	if(atividade == 17){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(atividade == 21){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(atividade == 23){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 27 || proxAtividade == 28){
		hAPI.setCardValue("Status", "SP Encaminhada Para Pagamento");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 15){
		hAPI.setCardValue("Status", "SP - Pagamento Programado");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 35){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 86){
		hAPI.setCardValue("Status", "SP Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
} // obterDataCorrente */