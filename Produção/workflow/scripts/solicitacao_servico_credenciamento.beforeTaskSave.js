function beforeTaskSave(colleagueId,nextSequenceId,userList){
    log.info("solicitacao_servico_credenciamento.beforeTaskSave.js begin");
    hAPI.setCardValue("atividadeAtual", nextSequenceId);

    var WKNumState = getValue("WKNumState");
    if(WKNumState == 5 || WKNumState == 8) hAPI.setCardValue("ultimaAtividade", WKNumState);

    var message = "";
    var servicos = {
        "link": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": true,
            "tipoExame": false,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": false
        },
        "prospeccao": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "nomeCredenciado": false,
            "cnpjCredenciado": false,
            "tipoSolicitacao": false,
            "tipoExame": true,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": false
        },
        "extensao": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": true,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": false
        },
        "orientacaoRede": {
            "zoomOrientacao": true,
            "zoomAtualizacao": false,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": false,
            "detalhamentoSolicitacao": true
        },
        "atualizacaoDadosCadastrais": {
            "zoomOrientacao": false,
            "zoomAtualizacao": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": false,
            "detalhamentoSolicitacao": true
        },
        "pga": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": false,
            "detalhamentoSolicitacao": true
        },
        "fiscalZero": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": true
        }
    };
    var servicoSelecionado = hAPI.getCardValue("servico");
    var carteira = hAPI.getCardValue("selectCarteira");
    
    if( (WKNumState == 0 || WKNumState == 4) && 
        servicos[servicoSelecionado]["anexarGradeExames"] == true && 
        hAPI.listAttachments().size() < 1 &&
        carteira != 'Pool:Group:Proc_ServicosCredenciamento_GestaoExames'
    ) message += "<br/>- É necessario anexar a grade de exames.";
    
    var selectAnaliseExecucao = hAPI.getCardValue("selectAnaliseExecucao");
    if(WKNumState == 8 && selectAnaliseExecucao == "solicitarAprovacao" && hAPI.listAttachments().size() < 2) message += "<br/>- É necessario anexar as cotações realizadas.";
    
    var decisaoExecutor = hAPI.getCardValue("selectAnaliseExecucao");

    if(WKNumState == 28 && nextSequenceId == 20) hAPI.setCardValue("status", "Cancelado Pelo Gestor");
    if(WKNumState == 35 && nextSequenceId == 20 && decisaoExecutor == "aprovar") hAPI.setCardValue("status", "Finalizado");
    if(WKNumState == 35 && nextSequenceId == 20 && decisaoExecutor == "cancelar") hAPI.setCardValue("status", "Cancelado Pelo Credenciamento");

    if(message != "") exibirMensagem("<br/><strong><u>ANEXO OBRIGATÓRIO</u></strong><br/>"+message);
}
function exibirMensagem(mensagem){
    throw   "<div class='alert alert-warning' role='alert'>" +
    "<strong>Atenção:</strong> "+mensagem+
    "</div>";
}