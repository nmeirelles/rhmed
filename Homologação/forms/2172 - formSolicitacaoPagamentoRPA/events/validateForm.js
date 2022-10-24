function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");

	var msgErro = "";
	if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 11){
		let valorTotal = form.getValue("valorTotalDocumento");

		if(campoVazio(form, "inputNomePrestador")) msgErro += "<li>Nome do Prestador</li>";
		if(campoVazio(form, "inputNrCPF")) msgErro += "<li>Nº CPF</li>";
		if(campoVazio(form, "tipoPagamento")) msgErro += "<li>Tipo</li>";
		if(campoVazio(form, "zoomCentroCusto")) msgErro += "<li>Centro de Custo</li>";
		if(campoVazio(form, "zoomFilial")) msgErro += "<li>Filial</li>";
		//if(campoVazio(form, "hiddenNovoPrestador")) msgErro += "<li>Novo Prestador?</li>";
		if(campoVazio(form, "hiddenOutroVinculo")) msgErro += "<li>Prestador possui outro vínculo empregatício?</li>";
		if(campoVazio(form, "valorTotalDocumento")) msgErro += "<li>Valor Bruto do RPA</li>";
		if(campoVazio(form, "dataVencimentoNota")) msgErro += "<li>Data Sugerida para Pagamento</li>";

		var switchRecolheuImpPeriodo = form.getValue("switchRecolheuImpPeriodo");
		if(switchRecolheuImpPeriodo != '' && campoVazio(form, "inputValorRecolhido")) msgErro += "<li>Valor Recolhido no Período</li>";
		if(format2Number(valorTotal) <= 0) msgErro += "<li>Valor Total deve ser maior que zero.</li>";

		let tipoPagamento = form.getValue("tipoPagamento");
		let obsSolicitacao = form.getValue("obsDadosSolicitacao");
		if ((tipoPagamento == "Emergencial") && (obsSolicitacao == "" || obsSolicitacao == null)){
			msgErro += "<li>Caso o pagamento seja Emergencial, o campo Observações deverá ser preenchido</li>";
		}
		
		if(campoVazio(form, "inputOutroTipoProfissional") && campoVazio(form, "zoomProfissional")) msgErro += "<li>Tipo de Profissional.</li>";
		if(campoVazio(form, "inputOutroTipoServico") && campoVazio(form, "zoomServico")) msgErro += "<li>Tipo de Serviço.</li>";
		// if(campoVazio(form, "inputNumeroSCP")) msgErro += "<li>Número SCP.</li>";
		if(campoVazio(form, "textareaDescricaoAtividade")) msgErro += "<li>Descrição Atividade.</li>";

		
		var tabelaClientes = form.getChildrenIndexes("tabelaClientes");
		if(tabelaClientes.length == 0) msgErro += "<li>Informar dados de pagamento.</li>";
		if(tabelaClientes.length > 0){
			for (var i = 0; i < tabelaClientes.length; i++) {
				if (campoVazio(form, "tdCliente___"+tabelaClientes[i])) msgErro += "<li>Cliente | Item: "+tabelaClientes[i]+".</li>";
				if (campoVazio(form, "tdUnidade___"+tabelaClientes[i])) msgErro += "<li>Unidade | Item: "+tabelaClientes[i]+".</li>";
				if (campoVazio(form, "tdDataInicio___"+tabelaClientes[i])) msgErro += "<li>Data Inicio | Item: "+tabelaClientes[i]+".</li>";
				if (campoVazio(form, "tdDataFim___"+tabelaClientes[i])) msgErro += "<li>Data Fim | Item: "+tabelaClientes[i]+".</li>";
				if (campoVazio(form, "tdValorCliente___"+tabelaClientes[i])) msgErro += "<li>Valor Cliente | Item: "+tabelaClientes[i]+".</li>";
			}
		}

	}
	
	if(atividadeAtual == 27 || atividadeAtual == 55 || atividadeAtual == 25 || atividadeAtual == 34 || atividadeAtual == 41 || atividadeAtual == 5 || atividadeAtual == 112){
		let aprovacao = form.getValue("aprovacaoCoordenador");
		if(aprovacao == "" || aprovacao == null) msgErro += "<li>Favor selecionar uma opção de Aprovação.</li>";
		if(aprovacao == "Cancelado" || aprovacao == "Nao"){
			let observacao = form.getValue("origem");
			if(observacao == "" || observacao == null) msgErro += "<li>Obrigatório Campo Observação ser preenchido</li>";
		}
	}

	if(atividadeAtual == 102 || atividadeAtual == 104){
		if(campoVazio(form, "dataAssinatura")) msgErro += "<li>Data Assinatura</li>";
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
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato conosco através do <a href='https://atendimento-web' target='_blank'><font color='blue' style='font-weight: bold'>atendimento</font></a>.";		
	}
}

function format2Number(valorStr){
	if(valorStr == null || valorStr == undefined || valorStr == "") return 0;
	while(valorStr.indexOf(".") >= 0) valorStr = valorStr.replace(".", "");
	if(valorStr.indexOf(",") >= 0) valorStr = valorStr.replace(",", ".");
	var valor = Number(valorStr);
	if(isNaN(valor)) valor = 0;
	return valor;
} 

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}

function formatarMoney2Str(valor){
	var unusualSymbols = new java.text.DecimalFormatSymbols();
	unusualSymbols.setDecimalSeparator(',');
	unusualSymbols.setGroupingSeparator('.');
	var formato = new java.text.DecimalFormat("#,##0.00000", unusualSymbols).format(valor);
	return formato;
}