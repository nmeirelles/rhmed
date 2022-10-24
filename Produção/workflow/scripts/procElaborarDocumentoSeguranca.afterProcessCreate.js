function afterProcessCreate(processId){
	
	// [Inicio] Campos de controle
	hAPI.setCardValue("numeroFluxo", processId);
	var emissao = obterDataCorrente();
	hAPI.setCardValue("dataCriacao", emissao);
	hAPI.setCardValue("situacao", "Novo");
	// [Fim] Campos de controle
	
	
	var campoDescritor = 
		 "Empresa: " + hAPI.getCardValue("solicRazaoSocialEmp") + " \n"+
		 "Unidade: "  + hAPI.getCardValue("nomeUnidFilial") + " \n"+
		 "Setor: " + hAPI.getCardValue("setorEmpresa") + " \n";
	  	 hAPI.setCardValue("campoDescritor", campoDescritor);
}