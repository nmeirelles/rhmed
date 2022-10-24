function afterProcessCreate(processId){
	
	// [Inicio] Campos de controle
	hAPI.setCardValue("numeroFluxo", processId);
	var emissao = obterDataCorrente();
	hAPI.setCardValue("dataCriacao", emissao);
	hAPI.setCardValue("situacao", "Novo");
	// [Fim] Campos de controle
	
//	var descritor = 	" Filial: " + hAPI.getCardValue('zoomFilial') + "\n" +
//						" Fornecedor: " + hAPI.getCardValue('cnpj') + " - " + hAPI.getCardValue('razaoSocial') + "\n" +
//						" Emissão: " + dtEmissaoNf + "\n" +
//						" NF: " + hAPI.getCardValue('numeroNF') + " - " + hAPI.getCardValue('serie');
	
	var descritor = 	" Filial: 01 - Filial X \n" +
						" Fornecedor: XXXXXX XXXX XXXXX\n" +
						" Emissão: 08/09/2020 \n";
						
	hAPI.setCardValue("campoDescritor",descritor);
}