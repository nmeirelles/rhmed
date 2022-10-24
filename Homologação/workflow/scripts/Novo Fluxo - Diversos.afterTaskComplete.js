function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var atividade = getValue("WKNumState")
	var proxAtividade = getValue("WKNextState");
	var hora2 = obterDataCorrente2();
	var hora = obterDataCorrente();
	var nome = hAPI.getCardValue("currentNome")
	
	if(proxAtividade == 9){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 5){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 17){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 21){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 23){
		hAPI.setCardValue("Status", "Em Aprovação");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 35){
		hAPI.setCardValue("Status", "Em Analise pela Célula Fiscal");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 86){
		hAPI.setCardValue("Status", "SP Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 94 || proxAtividade == 97){
		hAPI.setCardValue("Status", "SP Encaminhada Para Pagamento");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(atividade == 99){
		hAPI.setCardValue("Status", "SP - Pagamento Programado");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 74 || proxAtividade == 76 || proxAtividade == 78 || proxAtividade == 80 || proxAtividade == 82 || proxAtividade == 84){
		hAPI.setCardValue("Status", "Cancelada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 44){
		hAPI.setCardValue("Status", "Em análise TI");
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