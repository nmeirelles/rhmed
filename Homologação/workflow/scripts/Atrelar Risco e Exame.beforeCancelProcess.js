function beforeCancelProcess(colleagueId,processId){
    // var newDate = new Date();
    // var formatDate = new java.text.SimpleDateFormat("dd/MM/yyyy");
    // var dataLocal = formatDate.format(newDate);

    var data = new Date();
    var dia  = data.getDate();
    var mes  = data.getMonth() + 1;
    var ano  = data.getFullYear();
    dia = (dia<=9 ? "0"+dia : dia);
    mes = (mes<=9 ? "0"+mes : mes);
    var dataLocal = dia+"/"+mes+"/"+ano;

    hAPI.setCardValue("inputStatusSolicitacao", "Cancelado");
        hAPI.setCardValue("inputDataCancelamento", dataLocal);
        hAPI.setCardValue("inputMesCancelamento", mes);
        hAPI.setCardValue("inputAnoCancelamento", ano);
        
        hAPI.setCardValue("inputDataFim", dataLocal);
        hAPI.setCardValue("inputMesFim", mes);
        hAPI.setCardValue("inputAnoFim", ano);
}