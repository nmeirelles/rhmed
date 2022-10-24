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
		hAPI.setCardValue("Status", "Encaminhado para Célula de Cadastro");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 107){
		hAPI.setCardValue("Status", "Encaminhado para Controladoria");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);		
	}
	if(proxAtividade == 99){
		hAPI.setCardValue("Status", "Encaminhado para TI");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 11){
		hAPI.setCardValue("Status", "Solicitação Reprovada");
		hAPI.setCardValue("ultimoUsuario", nome);
		hAPI.setCardValue("hora", hora);
		hAPI.setCardValue("hora2", hora2);
	}
	if(proxAtividade == 14){
		hAPI.setCardValue("Status", "Fornecedor Cadastrado");
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