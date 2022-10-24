function beforeTaskSave(colleagueId,nextSequenceId,userList){
    hAPI.setCardValue("inputCurrentAtividade", nextSequenceId);

    var numState = getValue("WKNumState");
    var empresa = hAPI.getCardValue("zoomEmpresa");
    var message = "";

    if((numState == 0 || numState == 4) && hAPI.listAttachments().size() < 1 && empresa == "RHMED") message += "<br/>- É necessario anexar o PGR/PMCSO ou Formulário de Função.";
    if(message != "") exibirMensagem("<br/><strong><u>ANEXO OBRIGATÓRIO</u></strong><br/>"+message); 
}
function exibirMensagem(mensagem){
    throw   "<div class='alert alert-warning' role='alert'>" +
            "<strong>Atenção:</strong> "+mensagem+
            "</div>"+
            "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";		

}