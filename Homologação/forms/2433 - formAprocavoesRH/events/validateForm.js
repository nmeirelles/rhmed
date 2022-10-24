function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";
		
		if (atividadeAtual == 4 || atividadeAtual == 0 || atividadeAtual == 11){
			let valorTotal = form.getValue("valorTotalDocumento");

			if (campoVazio(form, "tipoPagamento")){
				msgErro += "<li>Tipo</li>";
			}
			if (campoVazio(form, "zoomCentroCusto")){
				msgErro += "<li>Centro de Custo</li>";
			}
			if (campoVazio(form, "zoomFilial")){
				msgErro += "<li>Filial</li>";
			}
			if (campoVazio(form, "valorTotalDocumento")){
				msgErro += "<li>Valor Total do Pagamento</li>";
			}
			if (campoVazio(form, "dataPagamento")){
				msgErro += "<li>Data de Vencimento do Pagamento</li>";
			}
			if (campoVazio(form, "especiePagamento")){
				msgErro += "<li>Espécie de Pagamento</li>";
			}
			if (format2Number(valorTotal) <= 0){
				msgErro += "<li>Valor Total deve ser maior que zero.</li>";
			}
		}

		if (atividadeAtual == 5 || atividadeAtual == 25 || atividadeAtual == 27 || atividadeAtual == 55 || atividadeAtual == 34 || atividadeAtual == 41){
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
		
		if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 11){
			let tipoPagamento = form.getValue("tipoPagamento");
			let obsSolicitacao = form.getValue("obsDadosSolicitacao");
			if ((tipoPagamento == "Emergencial") && (obsSolicitacao == "" || obsSolicitacao == null)){
				msgErro += "<li>Caso o pagamento seja Emergencial, o campo Observações deverá ser preenchido</li>";
			}
		}
		
		// if (atividadeAtual == 21){
		// 	if (campoVazio(form, "solicitacaoTripulantes")){
		// 		msgErro += "<li>Novos Tripulantes</li>";
		// 	}
		// }
		if (atividadeAtual == 57){
			if (campoVazio(form, "emailMOPES")){
				msgErro += "<li>Endereço E-mail</li>";
			}
			if (campoVazio(form, "corpoEmail")){
				msgErro += "<li>Corpo do E-mail</li>";
			}
		}

		if (msgErro != ""){
			msgErro = "<ul>" + msgErro + "</ul>";
			exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/><br/>"+msgErro);
		}
} 

function campoVazio(form, fieldname){
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")){
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
				"<strong>Atenção:<br></strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com administrador do sistema</a>.";		
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