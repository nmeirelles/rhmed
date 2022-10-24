function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var atividade = getValue("WKNumState")
	var proxAtividade = getValue("WKNextState");
	var hora2 = obterDataCorrente2();
	var hora = obterDataCorrente();
	var nome = hAPI.getCardValue("currentNome");
	
	if(atividade == 0 || atividade == 4){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 5){
		hAPI.setCardValue("Status", "Encaminhado para Célula Fiscal");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 25 || proxAtividade == 27){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 55){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 34){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 41){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	
	if(proxAtividade == 11){
		hAPI.setCardValue("Status", "SP Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	
	if(proxAtividade == 18){
		hAPI.setCardValue("Status", "SP Encaminhada Para Pagamento");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 14){
		hAPI.setCardValue("Status", "SP - Pagamento Programado");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
} // obterDataCorrente

function obterDataCorrente2(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente