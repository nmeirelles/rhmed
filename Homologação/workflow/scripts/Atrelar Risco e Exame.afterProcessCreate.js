function afterProcessCreate(processId){
    hAPI.setCardValue("inputNumeroSolicitacao", processId);

    var empresa = hAPI.getCardValue("zoomEmpresaCliente");
    var filial1 = hAPI.getCardValue("zoomUnidadeCliente");
    var filial2 = hAPI.getCardValue("inputUnidadeCliente");

    if(filial1 != "" && filial1 != null) hAPI.setCardValue("campoDescritor", empresa + " | " + filial1);
    else if(filial2 != "" && filial2 != null) hAPI.setCardValue("campoDescritor", empresa + " | " + filial2);
    else hAPI.setCardValue("campoDescritor", empresa);
}