function validateForm(form){
	var atividadeAtual = Number(getValue("WKNumState"));
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";

	var zoomEmpresa = form.getValue("zoomEmpresa");
	var selectCondicao = form.getValue("selectCondicao");
	var selectTipoServico = form.getValue("selectTipoServico");
	var selectTipoDemanda = form.getValue("selectTipoDemanda");
	var selectTipoProduto = form.getValue("selectTipoProduto");
	var inputQuantidade = form.getValue("inputQuantidade");
	var zoomPlataforma = form.getValue("zoomPlataforma");
	var zoomEmpresaCliente = form.getValue("zoomEmpresaCliente");
	var zoomRegionalCliente = form.getValue("zoomRegionalCliente");
	var zoomUnidadeCliente = form.getValue("zoomUnidadeCliente");
	var inputUnidadeCliente = form.getValue("inputUnidadeCliente");
	var inputSetor = form.getValue("inputSetor");
	var inputDescritivoAtividade = form.getValue("inputDescritivoAtividade");
	var inputNumeroCBO = form.getValue("inputNumeroCBO");
	var inputFuncao = form.getValue("inputFuncao");
	var selectCustoContrato = form.getValue("selectCustoContrato");
	var radioUtilizaProdutoQuimico = form.getValue("radioUtilizaProdutoQuimico");
	var textareaTiposProdutoQuimico = form.getValue("textareaTiposProdutoQuimico");
	var textareaFreqProdutoQuimico = form.getValue("textareaFreqProdutoQuimico");
	var textareaQuandoProdutoQuimico = form.getValue("textareaQuandoProdutoQuimico");
	var textareaOndeProdutoQuimico = form.getValue("textareaOndeProdutoQuimico");
	var radioAtividadeEmCampo = form.getValue("radioAtividadeEmCampo");
	var selectTipoCampo = form.getValue("selectTipoCampo");
	var textareaDescricaoCampo = form.getValue("textareaDescricaoCampo");
	var radioAtividadeAltura = form.getValue("radioAtividadeAltura");
	var textareaAtividadeAltura = form.getValue("textareaAtividadeAltura");
	var radioAtividadeEletricidade = form.getValue("radioAtividadeEletricidade");
	var textareaAtividadEletricidade = form.getValue("textareaAtividadEletricidade");
	var radioAtividadeConfinado = form.getValue("radioAtividadeConfinado");
	var textareaAtividadeConfinado = form.getValue("textareaAtividadeConfinado");
	var radioAtividadeAlimento = form.getValue("radioAtividadeAlimento");
	var textareaAtividadeAlimento = form.getValue("textareaAtividadeAlimento");
	var radioAtividadeArmada = form.getValue("radioAtividadeArmada");
	var textareaAtividadeArmada = form.getValue("textareaAtividadeArmada");
	var radioAtividadeVeiculo = form.getValue("radioAtividadeVeiculo");
	var selectTipoVeiculo = form.getValue("selectTipoVeiculo");
	var radioEPI = form.getValue("radioEPI");
	var textareaEPI = form.getValue("textareaEPI");
	var radioEPC = form.getValue("radioEPC");
	var textareaEPC = form.getValue("textareaEPC");
    var tabelaRisco = form.getChildrenIndexes('tabelaRisco');
	if((atividadeAtual == 0) || (atividadeAtual == 4) || (atividadeAtual == 21)){

        if(zoomEmpresa == "" || zoomEmpresa == null) msgErro += "<li>Não foi informado <b>Empresa</b>.</li>";
		if(selectCondicao == "" || selectCondicao == null) msgErro += "<li>Não foi informado <b>Condição</b>.</li>";
		if(selectTipoServico == "" || selectTipoServico == null) msgErro += "<li>Não foi informado <b>Tipo de Serviço</b>.</li>";
		if(selectTipoDemanda == "" || selectTipoDemanda == null) msgErro += "<li>Não foi informado <b>Tipo de Demanda</b>.</li>";
		if(selectTipoProduto == "" || selectTipoProduto == null) msgErro += "<li>Não foi informado <b>Tipo de Produto</b>.</li>";
        if(selectTipoDemanda == "cadastroFuncaoSetor" && (inputQuantidade == "" || inputQuantidade == null)) msgErro += "<li>Não foi informado <b>Quantidade</b>.</li>";
		if(zoomPlataforma == "" || zoomPlataforma == null) msgErro += "<li>Não foi informado <b>Plataforma</b>.</li>";
		if(zoomEmpresaCliente == "" || zoomEmpresaCliente == null) msgErro += "<li>Não foi informado <b>Empresa (Cliente)</b>.</li>";
        if(zoomPlataforma == "EVIDAMED" && (zoomRegionalCliente == "" || zoomRegionalCliente == null)) msgErro += "<li>Não foi informado <b>Regional</b>.</li>";

        if((zoomPlataforma == "EVIDAMED" || zoomPlataforma == "SOC") && (zoomUnidadeCliente == "" || zoomUnidadeCliente == null) && selectTipoDemanda != "atualizacaoBancoDados" && selectTipoDemanda != "cadastroFilialFuncaoSetor") msgErro += "<li>Não foi informado <b>Unidade/Filial</b>.</li>";

        if(zoomPlataforma == "SOC NET" && (selectTipoDemanda != "atualizacaoBancoDados" && selectTipoDemanda != "cadastroFilialFuncaoSetor") && (inputUnidadeCliente == "" || inputUnidadeCliente == null)) msgErro += "<li>Não foi informado <b>Unidade/Filial</b>.</li>";
		
		if(selectTipoDemanda != "atualizacaoBancoDados" && (inputSetor == "" || inputSetor == null)) msgErro += "<li>Não foi informado <b>Setor</b>.</li>";
		if(selectTipoDemanda != "atualizacaoBancoDados" && (inputDescritivoAtividade == "" || inputDescritivoAtividade == null)) msgErro += "<li>Não foi informado <b>Descritivo Atividade</b>.</li>";
		if(selectTipoDemanda != "atualizacaoBancoDados" && (inputNumeroCBO == "" || inputNumeroCBO == null)) msgErro += "<li>Não foi informado <b>Número CBO</b>.</li>";
		if(selectCustoContrato == "" || selectCustoContrato == null) msgErro += "<li>Não foi informado <b>Custo em Contrato</b>.</li>";
		if(selectTipoDemanda == "atrelamentoRisco" && (inputFuncao == "" || inputFuncao == null)) msgErro += "<li>Não foi informado <b>Função</b>.</li>";
		if(radioUtilizaProdutoQuimico == "sim" && (textareaTiposProdutoQuimico == "" || textareaTiposProdutoQuimico == null)) msgErro += "<li>Não foi informado <b>Tipos Produtos Utilizados</b>.</li>";
		if(radioUtilizaProdutoQuimico == "sim" && (textareaFreqProdutoQuimico == "" || textareaFreqProdutoQuimico == null)) msgErro += "<li>Não foi informado <b>Frequência Utilização</b>.</li>";
		if(radioUtilizaProdutoQuimico == "sim" && (textareaQuandoProdutoQuimico == "" || textareaQuandoProdutoQuimico == null)) msgErro += "<li>Não foi informado <b>Quando São Utilizados</b>.</li>";
		if(radioUtilizaProdutoQuimico == "sim" && (textareaOndeProdutoQuimico == "" || textareaOndeProdutoQuimico == null)) msgErro += "<li>Não foi informado <b>Onde São Utilizados</b>.</li>";
		if(radioAtividadeEmCampo == "sim" && (selectTipoCampo == "" || selectTipoCampo == null)) msgErro += "<li>Não foi informado <b>Tipo de Campo</b>.</li>";
		if(radioAtividadeEmCampo == "sim" && (textareaDescricaoCampo == "" || textareaDescricaoCampo == null)) msgErro += "<li>Não foi informado <b>Descrição Atividades de Campo</b>.</li>";
		if(radioAtividadeAltura == "sim" && (textareaAtividadeAltura == "" || textareaAtividadeAltura == null)) msgErro += "<li>Não foi informado <b>Observação Atividade em Altura</b>.</li>";
		if(radioAtividadeEletricidade == "sim" && (textareaAtividadEletricidade == "" || textareaAtividadEletricidade == null)) msgErro += "<li>Não foi informado <b>Observação Atividade com Eletricidade</b>.</li>";
		if(radioAtividadeConfinado == "sim" && (textareaAtividadeConfinado == "" || textareaAtividadeConfinado == null)) msgErro += "<li>Não foi informado <b>Observação Atividade em Espaço Confinado</b>.</li>";
		if(radioAtividadeAlimento == "sim" && (textareaAtividadeAlimento == "" || textareaAtividadeAlimento == null)) msgErro += "<li>Não foi informado <b>Observação Atividade com Alimento</b>.</li>";
		if(radioAtividadeArmada == "sim" && (textareaAtividadeArmada == "" || textareaAtividadeArmada == null)) msgErro += "<li>Não foi informado <b>Observação Atividade de Vigilância Armada</b>.</li>";
		if(radioAtividadeVeiculo == "sim" && (selectTipoVeiculo == "" || selectTipoVeiculo == null)) msgErro += "<li>Não foi informado <b>Observação Atividade com Veículo</b>.</li>";
		if(radioEPI == "sim" && (textareaEPI == "" || textareaEPI == null)) msgErro += "<li>Não foi informado <b>Descrição EPI</b>.</li>";
		if(radioEPC == "sim" && (textareaEPC == "" || textareaEPC == null)) msgErro += "<li>Não foi informado <b>Descrição EPC</b>.</li>";
		if((selectTipoProduto == "clienteEmpresa" || selectTipoProduto == "clienteCliente") && tabelaRisco.length < 1){
			msgErro += "<li>Não foram informados <b>Riscos e/ou Exames</b>.</li>";
		}else{
			for(var i = 0; i < tabelaRisco.length; i++){
				var count = i == 0 ? 1 : i + 1;
                if(selectTipoProduto == "clienteEmpresa" && campoVazio(form, "inputTabelaRisco___" + tabelaRisco[i])) msgErro += "<li>Informe o <b>Exame</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteEmpresa" && campoVazio(form, "inputTabelaFuncao___" + tabelaRisco[i])) msgErro += "<li>Informe a <b>Função</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteCliente" && campoVazio(form, "inputTabelaRisco___" + tabelaRisco[i])) msgErro += "<li>Informe o <b>Risco</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteCliente" && campoVazio(form, "inputTabelaTempo___" + tabelaRisco[i])) msgErro += "<li>Informe o <b>Tempo</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteCliente" && campoVazio(form, "inputTabelaExame___" + tabelaRisco[i])) msgErro += "<li>Informe o <b>Exame</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteCliente" && campoVazio(form, "inputTabelaPeriodicidade___" + tabelaRisco[i])) msgErro += "<li>Informe a <b>Periodicidade</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteCliente" && campoVazio(form, "inputTabelaTipoExame___" + tabelaRisco[i])) msgErro += "<li>Informe a <b>Tipo Exame</b> na linha " + count +"</li>";
                if(selectTipoProduto == "clienteCliente" && campoVazio(form, "inputTabelaFuncao___" + tabelaRisco[i])) msgErro += "<li>Informe a <b>Função</b> na linha " + count +"</li>";
			}
		}
	}

	var inputTotalFuncoes = form.getValue("inputTotalFuncoes");

	var selectAprovacaoCadastro = form.getValue("selectAprovacaoCadastro");
	var textareaAprovacaoCadastro = form.getValue("textareaAprovacaoCadastro");
	if(atividadeAtual == 29){
		if((textareaAprovacaoCadastro == "" || textareaAprovacaoCadastro == null) && selectAprovacaoCadastro != "aprovado") msgErro += "<li>Não foi informado <b>Observação</b>.</li>";
	}

	var selectAprovacaoSeguranca = form.getValue("selectAprovacaoSeguranca");
	var textareaAprovacaoSeguranca = form.getValue("textareaAprovacaoSeguranca");
	if(atividadeAtual == 7){
		if((textareaAprovacaoSeguranca == "" || textareaAprovacaoSeguranca == null) && selectAprovacaoSeguranca != "aprovado") msgErro += "<li>Não foi informado <b>Observação</b>.</li>";
		if((inputTotalFuncoes == "" || inputTotalFuncoes == null) && selectAprovacaoSeguranca == "aprovado") msgErro += "<li>Não foi informado <b>Total Funções</b>.</li>";
	}
	
	var selectAprovacaoSaude = form.getValue("selectAprovacaoSaude");
	var textareaAprovacaoSaude = form.getValue("textareaAprovacaoSaude");
	if(atividadeAtual == 14){
		if((textareaAprovacaoSaude == "" || textareaAprovacaoSaude == null) && selectAprovacaoSaude != "aprovado") msgErro += "<li>Não foi informado <b>Observação</b>.</li>";
		if(zoomEmpresa == "RHMED" && (inputTotalFuncoes == "" || inputTotalFuncoes == null) && selectAprovacaoSaude == "aprovado") msgErro += "<li>Não foi informado <b>Total Funções</b>.</li>";
	}
	
	var inputDataFinanceiro = form.getValue("inputDataFinanceiro");
	if(atividadeAtual == 32){
		if(inputDataFinanceiro == "" || inputDataFinanceiro == null) msgErro += "<li>Não foi informado <b>Data de Controller</b>.</li>";
	}


	if(msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
	} 
} 

function campoVazio(form, fieldname){
    if((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")) return true;
    else return false;
}

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
    if (mobile) {
        throw mensagem;
    } else {
        throw   "<div class='alert alert-warning' role='alert'>" +
                "<strong>Atenção:</strong> "+mensagem+
                "</div>"+
                "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";		
    }
}