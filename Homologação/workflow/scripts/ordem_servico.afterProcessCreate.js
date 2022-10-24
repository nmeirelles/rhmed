function afterProcessCreate(processId){
    hAPI.setCardValue("numeroSolicitacao", processId);

    var numeroOrdemServico = processId.toString() + "/" + new Date().getFullYear();
    hAPI.setCardValue("numeroOrdemServico", numeroOrdemServico);

    hAPI.setCardValue("status", "Pendente");

    var empresa = hAPI.getCardValue("zoomCliente");
    hAPI.setCardValue("campoDescritor", empresa);

}