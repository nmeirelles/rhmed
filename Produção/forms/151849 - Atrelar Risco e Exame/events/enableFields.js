function enableFields(form){
    var atividade = getValue("WKNumState");

    if(atividade != 0 && atividade != 4 && atividade != 21){
		form.setEnabled("zoomEmpresa", false);
		form.setEnabled("selectCondicao", false);
		form.setEnabled("selectTipoServico", false);
		form.setEnabled("selectTipoDemanda", false);
		form.setEnabled("selectTipoProduto", false);
		form.setEnabled("inputQuantidade", false);
		form.setEnabled("zoomPlataforma", false);
		form.setEnabled("inputCodigoEmpresaCliente", false);
		form.setEnabled("zoomEmpresaCliente", false);
		form.setEnabled("inputCodigoRegional", false);
		form.setEnabled("zoomRegionalCliente", false);
		form.setEnabled("inputCodigoUnidadeCliente", false);
		form.setEnabled("zoomUnidadeCliente", false);
		form.setEnabled("inputUnidadeCliente", false);
		form.setEnabled("inputPostoTrabalho", false);
		form.setEnabled("inputSetor", false);
        form.setEnabled("selectCustoContrato", false);
		form.setEnabled("inputDescritivoAtividade", false);
		form.setEnabled("inputNumeroCBO", false);
		form.setEnabled("inputFuncao", false);
		form.setEnabled("inputNomeFuncionario", false);
		form.setEnabled("observacoes", false);
		form.setEnabled("btnAnexarDocumento", false);
		form.setEnabled("btnAdicionarRisco", false);
        
        var tabelaRisco = form.getChildrenIndexes("tabelaRisco");
        for(var i = 0; i < tabelaRisco.length; i++){
            form.setEnabled("inputTabelaRisco___" + tabelaRisco[i], false);
            form.setEnabled("inputTabelaTempo___" + tabelaRisco[i], false);
            form.setEnabled("inputTabelaExame___" + tabelaRisco[i], false);
            form.setEnabled("inputTabelaPeriodicidade___" + tabelaRisco[i], false);
            form.setEnabled("inputTabelaTipoExame___" + tabelaRisco[i], false);
            form.setEnabled("inputTabelaFuncao___" + tabelaRisco[i], false);
            form.setEnabled("btnExcluirRisco" + tabelaRisco[i], false);
        }

        form.setEnabled("radioUtilizaProdutoQuimico", false);
        form.setEnabled("textareaTiposProdutoQuimico", false);
        form.setEnabled("textareaFreqProdutoQuimico", false);
        form.setEnabled("textareaQuandoProdutoQuimico", false);
        form.setEnabled("textareaOndeProdutoQuimico", false);
        form.setEnabled("radioAtividadeEmCampo", false);
        form.setEnabled("radioAtividadesOperacionais", false);
        form.setEnabled("selectTipoCampo", false);
        form.setEnabled("textareaDescricaoCampo", false);
        form.setEnabled("radioAtividadeAltura", false);
        form.setEnabled("textareaAtividadeAltura", false);
        form.setEnabled("radioAtividadeEletricidade", false);
        form.setEnabled("textareaAtividadEletricidade", false);
        form.setEnabled("radioAtividadeConfinado", false);
        form.setEnabled("textareaAtividadeConfinado", false);
        form.setEnabled("radioAtividadeAlimento", false);
        form.setEnabled("textareaAtividadeAlimento", false);
        form.setEnabled("radioAtividadeArmada", false);
        form.setEnabled("textareaAtividadeArmada", false);
        form.setEnabled("radioAtividadeVeiculo", false);
        form.setEnabled("selectTipoVeiculo", false);
        form.setEnabled("radioEPI", false);
        form.setEnabled("textareaEPI", false);
        form.setEnabled("radioEPC", false);
        form.setEnabled("textareaEPC", false);
        form.setEnabled("textareaEPIEPC", false);
	}else{
        form.setEnabled("inputTotalFuncoes", false);
    }
    
    if(atividade != 29){
        form.setEnabled("selectAprovacaoCadastro", false);
        form.setEnabled("textareaAprovacaoCadastro", false);
    }

    if(atividade != 7){
        form.setEnabled("selectAprovacaoSeguranca", false);
        form.setEnabled("textareaAprovacaoSeguranca", false);
    }

    if(atividade != 7 && atividade != 14){
        form.setEnabled("inputTotalFuncoes", false);
    }

    if(atividade != 14){
        form.setEnabled("selectAprovacaoSaude", false);
        form.setEnabled("textareaAprovacaoSaude", false);
    }
    
    if(atividade != 32){
        form.setEnabled("inputDataControle", false);
    }
}