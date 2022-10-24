function enableFields(form){
    let WKNumState = getValue("WKNumState");

    if(WKNumState != INICIO && WKNumState != INICIO2 && WKNumState != CORRIGIR_SOLICITACAO){
        form.setEnabled("selectCarteira", false);
        form.setEnabled("zoomPlataforma", false);
        form.setEnabled("zoomEmpresa", false);
        form.setEnabled("zoomRegional", false);
        form.setEnabled("zoomUnidadeFilial", false);
        form.setEnabled("inputUnidadeFilial", false);
        form.setEnabled("zoomCidade", false);
        form.setEnabled("servico", false);
        form.setEnabled("zoomOrientacao", false);
        form.setEnabled("zoomAtualizacao", false);
        form.setEnabled("codigoCredenciado", false);
        form.setEnabled("nomeCredenciado", false);
        form.setEnabled("cnpjCredenciado", false);
        form.setEnabled("tipoSolicitacao", false);
        form.setEnabled("exameClinico", false);
        form.setEnabled("exameComplementar", false);
        form.setEnabled("detalhamentoSolicitacao", false);
    }

    if(WKNumState != REALIZAR_ATENDIMENTO){
        form.setEnabled("motivoProspeccao", false);
        form.setEnabled("zoomMotivoCancelamento", false);
        form.setEnabled("justificativaExecucao", false);
        form.setEnabled("selectAnaliseExecucao", false);
    }

    if(WKNumState != ANALISAR_SOLICITACAO_ACIMA_ORCADO){
        form.setEnabled("selectAnaliseGestor", false);
        form.setEnabled("justificativaSolicitante", false);
    }

}