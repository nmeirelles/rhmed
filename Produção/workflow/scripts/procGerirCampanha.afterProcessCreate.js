function afterProcessCreate(processId){
	
	// [Inicio] Campos de controle
	hAPI.setCardValue("numeroFluxo", processId);
	hAPI.setCardValue("situacao", "Novo");
	// [Fim] Campos de controle
	
	
	var campoDescritor = 
		 "Empresa: " + hAPI.getCardValue("nomeEmpresa") + " \n" +
		 "Unidade: "  + hAPI.getCardValue("nomeFilial") + " \n";
	  	 hAPI.setCardValue("campoDescritor", campoDescritor);
}