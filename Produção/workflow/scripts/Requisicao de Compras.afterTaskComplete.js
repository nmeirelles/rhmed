function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var atividade = getValue("WKNumState")
	var proxAtividade = getValue("WKNextState");

	var hora = obterDataCorrente();
	var nome = hAPI.getCardValue("currentNome")
	
	if(atividade == 0 || atividade == 2){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);		
	}
	if(atividade == 13){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);		
	}
	if(proxAtividade == 9){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 5){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 17){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 21){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 23){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 35){
		hAPI.setCardValue("Status", "Em Analise por Suprimentos");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 47){
		hAPI.setCardValue("Status", "Processo de Compra Encerrado");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 74){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 76){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 78){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 80){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 82){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 84){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 86){
		hAPI.setCardValue("Status", "SP Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 94){
		hAPI.setCardValue("Status", "Em Cotação por Suprimentos");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 97){
		hAPI.setCardValue("Status", "Em Cotação por Suprimentos");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
	if(proxAtividade == 44){
		hAPI.setCardValue("Status", "Em análise TI");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
} // obterDataCorrente