function afterProcessCreate(processId){
    hAPI.setCardValue("numeroSolicitacao", processId);
    hAPI.setCardValue("status", "Aberto");

    var empresa = hAPI.getCardValue("zoomEmpresa");
    var filial1 = hAPI.getCardValue("zoomUnidadeFilial");
    var filial2 = hAPI.getCardValue("inputUnidadeFilial");

    if(filial1 != "" && filial1 != null) hAPI.setCardValue("campoDescritor", empresa + " | " + filial1);
    else if(filial2 != "" && filial2 != null) hAPI.setCardValue("campoDescritor", empresa + " | " + filial2);
    else hAPI.setCardValue("campoDescritor", empresa);
}