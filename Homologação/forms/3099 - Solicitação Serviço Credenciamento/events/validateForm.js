function validateForm(form){
    let msgErro = "";
    let WKNumState = getValue("WKNumState");
    let WKNextState = getValue("WKNextState");

    const servicos = {
        "link": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "codigoCredenciado": true,
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
            "codigoCredenciado": false,
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
            "codigoCredenciado": true,
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
            "codigoCredenciado": true,
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
            "codigoCredenciado": true,
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
            "codigoCredenciado": true,
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
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": true
        }
    };

    if(WKNumState == INICIO || WKNumState == INICIO2 || WKNumState == CORRIGIR_SOLICITACAO){
        let grupoExecutor = form.getValue("grupoExecutor");
        if(grupoExecutor == "" || grupoExecutor == null) msgErro += "<li>Não foi possível definir <b>Grupo Executor</b>.</li>";

        let campoDescritor = form.getValue("campoDescritor");
        if(campoDescritor == "" || campoDescritor == null) msgErro += "<li>Não foi possível definir <b>Campo Descritor</b>.</li>";
        
        let selectCarteira = form.getValue("selectCarteira");
        if(selectCarteira == "" || selectCarteira == null) msgErro += "<li>Não foi informado <b>Carteira</b>.</li>";

        let zoomPlataforma = form.getValue("zoomPlataforma");
        if(zoomPlataforma == "" || zoomPlataforma == null) msgErro += "<li>Não foi informado <b>Plataforma</b>.</li>";

        let zoomEmpresa = form.getValue("zoomEmpresa");
        if(selectCarteira != "Pool:Group:Proc_ServicosCredenciamento_GestaoExames" && zoomEmpresa == "" || zoomEmpresa == null) msgErro += "<li>Não foi informado <b>Empresa</b>.</li>";

        let zoomRegional = form.getValue("zoomRegional");
        if(selectCarteira != "Pool:Group:Proc_ServicosCredenciamento_GestaoExames" && zoomPlataforma == "EVIDAMED" && (zoomRegional == "" || zoomRegional == null)) msgErro += "<li>Não foi informado <b>Regional</b>.</li>";

        let switchTodasUnidadesFiliais = form.getValue("switchTodasUnidadesFiliais");

        let zoomUnidadeFilial = form.getValue("zoomUnidadeFilial");
        if(selectCarteira != "Pool:Group:Proc_ServicosCredenciamento_GestaoExames" && switchTodasUnidadesFiliais != "on" && zoomPlataforma != "SOC NET" && (zoomUnidadeFilial == "" || zoomUnidadeFilial == null)) msgErro += "<li>Não foi informado <b>Unidade/Filial</b>.</li>";

        let inputUnidadeFilial = form.getValue("inputUnidadeFilial");
        if(selectCarteira != "Pool:Group:Proc_ServicosCredenciamento_GestaoExames" && switchTodasUnidadesFiliais != "on" && zoomPlataforma == "SOC NET" && (inputUnidadeFilial == "" || inputUnidadeFilial == null)) msgErro += "<li>Não foi informado <b>Unidade/Filial</b>.</li>";
        
        let zoomCidade = form.getValue("zoomCidade");
        if(zoomCidade == "" || zoomCidade == null) msgErro += "<li>Não foi informado <b>Cidade</b>.</li>";

        let servico = form.getValue("servico");
        if(servico == "" || zoomEmpresa == null) msgErro += "<li>Não foi informado <b>Serviço</b>.</li>";
        else {
            let servicoSelecionado = servicos[servico];
            // if(servicoSelecionado["anexarGradeExames"] == true) $("#anexarGradeExames").on("click");
    
            let zoomOrientacao = form.getValue("zoomOrientacao");
            if(servicoSelecionado["zoomOrientacao"] == true && (zoomOrientacao == "" || zoomOrientacao == null)) msgErro += "<li>Não foi informado <b>Tipo de Orientação</b>.</li>";
    
            let zoomAtualizacao = form.getValue("zoomAtualizacao");
            if(servicoSelecionado["zoomAtualizacao"] == true && (zoomAtualizacao == "" || zoomAtualizacao == null)) msgErro += "<li>Não foi informado <b>Tipo de Atualização Cadastral</b>.</li>";
    
            let codigoCredenciado = form.getValue("codigoCredenciado");
            if((zoomPlataforma == "SOC" || zoomPlataforma == "SOC NET") && servicoSelecionado["codigoCredenciado"] == true && (codigoCredenciado == "" || codigoCredenciado == null)) msgErro += "<li>Não foi informado <b>Código do Credenciado</b>.</li>";
            
            let nomeCredenciado = form.getValue("nomeCredenciado");
            if(servicoSelecionado["nomeCredenciado"] == true && (nomeCredenciado == "" || nomeCredenciado == null)) msgErro += "<li>Não foi informado <b>Nome do Credenciado</b>.</li>";
    
            let cnpjCredenciado = form.getValue("cnpjCredenciado");
            if(servicoSelecionado["cnpjCredenciado"] == true && (cnpjCredenciado == "" || cnpjCredenciado == null)) msgErro += "<li>Não foi informado <b>CNPJ do Credenciado</b>.</li>";
    
            let detalhamentoSolicitacao = form.getValue("detalhamentoSolicitacao");
            if(servicoSelecionado["detalhamentoSolicitacao"] == true && (detalhamentoSolicitacao == "" || detalhamentoSolicitacao == null)) msgErro += "<li>Não foi informado <b>Detalhamento</b>.</li>";
    
            let tipoSolicitacao = form.getValue("tipoSolicitacao");
            if(servicoSelecionado["tipoSolicitacao"] == true && (tipoSolicitacao == "" || tipoSolicitacao == null)) msgErro += "<li>Não foi informado <b>Tipo de Solicitação</b>.</li>";
    
            if(selectCarteira != "Pool:Group:Proc_ServicosCredenciamento_GestaoExames" && servicoSelecionado["tipoExame"] == true){
                let exameClinico = form.getValue("exameClinico");
                let exameComplementar = form.getValue("exameComplementar");
                if((exameClinico == "" || exameClinico == null) && (exameComplementar == "" || exameComplementar == null)) msgErro += "<li>Não foi informado <b>Tipo de Exame</b>.</li>"
            }
        }
    }

    if(WKNumState == REALIZAR_ATENDIMENTO){
        let selectAnaliseExecucao = form.getValue("selectAnaliseExecucao");
        if(selectAnaliseExecucao == "" || selectAnaliseExecucao == null) msgErro += "<li>Não foi informado <b>Aprovação</b>.</li>";
        
        let zoomMotivoCancelamento = form.getValue("zoomMotivoCancelamento");
        if(selectAnaliseExecucao == "cancelar" && (zoomMotivoCancelamento == "" || zoomMotivoCancelamento == null)) msgErro += "<li>Não foi informado <b>Motivo Cancelamento</b>.</li>";

        let justificativaExecucao = form.getValue("justificativaExecucao");
        if(selectAnaliseExecucao != "aprovar" && (justificativaExecucao == "" || justificativaExecucao == null)) msgErro += "<li>Não foi informado <b>Justificativa</b>.</li>";

        let switchNecessarioProspeccao = form.getValue("switchNecessarioProspeccao");
        let motivoProspeccao = form.getValue("motivoProspeccao");
        if(selectAnaliseExecucao == "confirmarProspeccao" && (switchNecessarioProspeccao == "" || switchNecessarioProspeccao == null)) msgErro += "<li>Não foi informado <b>Prospecção</b>.</li>";
        if(selectAnaliseExecucao == "confirmarProspeccao" && (motivoProspeccao == "" || motivoProspeccao == null)) msgErro += "<li>Não foi informado <b>Motivo Prospecção</b>.</li>";
    }

    if(WKNumState == ANALISAR_SOLICITACAO_ACIMA_ORCADO){
        let selectAnaliseGestor = form.getValue("selectAnaliseGestor");
        if(selectAnaliseGestor == "" || selectAnaliseGestor == null) msgErro += "<li>Não foi informado <b>Análise</b>.</li>";

        let justificativaSolicitante = form.getValue("justificativaSolicitante");
        if(justificativaSolicitante == "" || justificativaSolicitante == null) msgErro += "<li>Não foi informado <b>Justificativa</b>.</li>";
    }

    if(msgErro != ""){
        msgErro = "<ul>" + msgErro + "</ul>";
        exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
    }
}
function exibirMensagem(form, mensagem){
    let mobile = form.getMobile() != null && form.getMobile();
    if(mobile){
        throw mensagem;
    }else{
        throw   "<div class='alert alert-warning' role='alert'>" +
        "<strong>Atenção:</strong> "+mensagem+
        "</div>"+
        "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";
    }
}