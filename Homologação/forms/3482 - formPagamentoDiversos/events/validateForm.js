function validateForm(form){
	/*
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");

		var msgErro = "";
		if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 86){
			let tipoPagamento = form.getValue("tipoPagamento");
			let obsSolicitacao = form.getValue("obsDadosSolicitacao");
			let formaPagamento = form.getValue("formaPagamento");
			let valorTotal = form.getValue("valorTotalDocumentoReal");
			//let valorTotal2 = form.getValue("valorTotalComCodigo");
			let nrBanco = form.getValue("banco");
			let nrAgencia = form.getValue("agencia");
			let nrConta = form.getValue("conta");

			if(campoVazio(form, "colabForn")){
				msgErro += "<li>Natureza do Pagamento</li>";
			}
			if(campoVazio(form, "contaDebito")){
				msgErro += "<li>Conta Débito</li>";
			}
			if(campoVazio(form, "contaCredito")){
				msgErro += "<li>Conta Crédito</li>";
			}
			if(campoVazio(form, "tipoPagamento")){
				msgErro += "<li>Tipo</li>";
			}
			if(campoVazio(form, "zoomFilial")){
				msgErro += "<li>Filial</li>";
			}
			if(campoVazio(form, "zoomCentroCusto")){
				msgErro += "<li>Centro de Custo</li>";
			}
			if(campoVazio(form, "formaPagamento")){
				msgErro += "<li>Forma de Pagamento</li>";
			}
			if (campoVazio(form, "inputCodFornecedor")){
				msgErro += "<li>Nome do Fornecedor</li>";
			}
			if (format2Number(valorTotal) <= 0){
				msgErro += "<li>Valor Total deve ser maior que zero.</li>";
			}
			if(formaPagamento == "semCodigo"){
				if(campoVazio(form, "valorPrincipal")){
					msgErro += "<li>Valor Principal</li>";
				}
				if(campoVazio(form, "dataVencimentoNota")){
					msgErro += "<li>Data de Vencimento</li>";
				}
				if(campoVazio(form, "datapagamentoNota")){
					msgErro += "<li>Data de Pagamento</li>";
				}
				if (nrBanco == "" || nrAgencia == "" || nrConta == "" || nrConta == 0 || nrAgencia == 0 || nrBanco == 0){
					msgErro += "<li>Favor adicionar dados bancários ao cadastro do fornecedor no Protheus.</li>";
				}	
			}
			if(formaPagamento == "comCodigo"){
				if(campoVazio(form, "numCodigo")){
					msgErro += "<li>Número do Código de Barras</li>";
				}
				if(campoVazio(form, "valorTotalComCodigo")){
					msgErro += "<li>Valor Total</li>";
				}
				if(campoVazio(form, "dataVencimento")){
					msgErro += "<li>Data do Vencimento</li>";
				}
				if(campoVazio(form, "dataPagamento")){
					msgErro += "<li>Data do Pagamento</li>";
				}
			}
			if(formaPagamento == "darf"){
				let codBarrasDarf = form.getValue("codBarrasDARF");;
				if(codBarrasDarf == "sim"){
					if(campoVazio(form, "nrCodigoBarrasDARF")){
						msgErro += "<li>Código de Barras</li>";
					}
				}
				if(campoVazio(form, "periodoApuracaoDARF")){
					msgErro += "<li>02 - Período de Apuração</li>";
				}
				if(campoVazio(form, "nrCPFCNPJDARF")){
					msgErro += "<li>03 - Número CPF/CNPJ</li>";
				}
				if(campoVazio(form, "codigoReceitaDARF")){
					msgErro += "<li>04 - Código da Receita</li>";
				}
				if(campoVazio(form, "dataVencimentoDARF")){
					msgErro += "<li>06 - Data de Vencimento</li>";
				}
				if(campoVazio(form, "valorPrincipalDARF")){
					msgErro += "<li>07 - Valor do Principal</li>";
				}
			}
			if(formaPagamento == "darm"){
				if(campoVazio(form, "nrCodigoBarrasDARM")){
					msgErro += "<li>Código de Barras</li>";
				}
				if(campoVazio(form, "dataVencimentoDARM")){
					msgErro += "<li>03 - Data Vencimento</li>";
				}
				if(campoVazio(form, "valorTributoDARM")){
					msgErro += "<li>06 - Valor do Tributo</li>";
				}
			}
			if(formaPagamento == "gps"){
				let codBarrasDarf = form.getValue("codBarrasGPS");;
				if(codBarrasDarf == "sim"){
					if(campoVazio(form, "nrCodigoBarrasGPS")){
						msgErro += "<li>Código de Barras</li>";
					}
				}
				if(campoVazio(form, "codVencimentoGPS")){
					msgErro += "<li>02 - Vencimento</li>";
				}

				if(campoVazio(form, "codPagamentoGPS")){
					msgErro += "<li>03 - Código Pagamento</li>";
				}
				if(campoVazio(form, "nrCompetenciaGPS")){
					msgErro += "<li>04 - Competência</li>";
				}
				if(campoVazio(form, "nrIdentificadorGPS")){
					msgErro += "<li>05 - Identificador</li>";
				}
				if(campoVazio(form, "valorInssGPS")){
					msgErro += "<li>06 - Valor do INSS</li>";
				}
			}
			if(formaPagamento == "grf"){
				let codBarrasDarf = form.getValue("codBarrasGRF");;
				if(codBarrasDarf == "sim"){
					if(campoVazio(form, "nrCodigoBarrasGRF")){
						msgErro += "<li>Código de Barras</li>";
					}
				}
				if(campoVazio(form, "dataValidadeGRF")){
					msgErro += "<li>12 - Data Validade</li>";
				}
				if(campoVazio(form, "valorDepostioGRF")){
					msgErro += "<li>13 - Depósito + Contrib. Social</li>";
				}
			}
			if(formaPagamento == "damsp"){
				if(campoVazio(form, "nrCodigoBarrasDAMSP")){
					msgErro += "<li>Código de Barras</li>";
				}
				if(campoVazio(form, "nrCPFCNPJDAMSP")){
					msgErro += "<li>CPF/CNPJ</li>";
				}
				if(campoVazio(form, "dataVencimentoDAMSP")){
					msgErro += "<li>Vencimento</li>";
				}
				if(campoVazio(form, "valorDAMSP")){
					msgErro += "<li>Valor (R$)</li>";
				}
			}
			if(formaPagamento == "darfWeb"){
				let codBarrasDarf = form.getValue("codBarrasDARFWEB");;
				if(codBarrasDarf == "sim"){
					if(campoVazio(form, "nrCodigoBarrasDARFWEB")){
						msgErro += "<li>Código de Barras</li>";
					}
				}
				if(campoVazio(form, "cnpjDARFWEB")){
					msgErro += "<li>CNPJ</li>";
				}
				if(campoVazio(form, "dataVencimentoDARFWEB")){
					msgErro += "<li>Data Vencimento</li>";
				}
				if(campoVazio(form, "dataPagamentoDARFWEB")){
					msgErro += "<li>Data Pagamento</li>";
				}
				if(campoVazio(form, "valorPrincipalDARFWEB")){
					msgErro += "<li>Valor do Principal</li>";
				}
			}
			if((tipoPagamento == "Emergencial") && (obsSolicitacao == "" || obsSolicitacao == null)){
				msgErro += "<li>Caso a contratação seja Emergencial, o campo Observações deverá ser preenchido</li>";
			}	
		}

		if (atividadeAtual == 5 || atividadeAtual == 9 || atividadeAtual == 17 || atividadeAtual == 21 || atividadeAtual == 23 || atividadeAtual == 35 || atividadeAtual == 44){
			let aprovacao = form.getValue("aprovacaoCoordenador");
			if(aprovacao == "" || aprovacao == null){
				msgErro += "<li>Favor selecionar uma opção de Aprovação.</li>";
			}
			if (aprovacao == "Cancelado" || aprovacao == "Nao"){
				let observacao = form.getValue("origem");
				if (observacao == "" || observacao == null){
					msgErro += "<li>Obrigatório Campo Observação ser preenchido</li>";
				}
			}
		}

		if (msgErro != ""){
			msgErro = "<ul>" + msgErro + "</ul>";
			exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
		}
		*/
} 


function campoVazio(fieldname){
	if (($("#"+fieldname) == null) || ($("#"+fieldname) == undefined) || ($("#"+fieldname).trim() == "")){
		return true;
	} // if
	return false;
} // campoVazio

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	
	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato conosco através do <a href='https://atendimento-web' target='_blank'><font color='blue' style='font-weight: bold'>atendimento</font></a>.";		
	} // else if
} // exibirMensagem

function format2Number(valorStr){
	if (valorStr == null || valorStr == undefined || valorStr == ""){
		return 0;
	} // if
	while (valorStr.indexOf(".") >= 0){
		valorStr = valorStr.replace(".", "");
	} // while
	if (valorStr.indexOf(",") >= 0){
		valorStr = valorStr.replace(",", ".");
	} // if
	var valor = Number(valorStr);
	if (isNaN(valor)){
		valor = 0;
	} // if
	return valor;
} // format2Number

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente

function formatarMoney2Str(valor){
	var unusualSymbols = new java.text.DecimalFormatSymbols();
	unusualSymbols.setDecimalSeparator(',');
	unusualSymbols.setGroupingSeparator('.');
	var formato = new java.text.DecimalFormat("#,##0.00000", unusualSymbols).format(valor);
	return formato;
}