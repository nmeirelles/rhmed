function validateForm(form) {
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var profissionalVist = form.getValue("profissionalVistoria");
	var msgErro = "";

	if (atividadeAtual == 144) {
		if (campoVazio(form, "envAtualizacao")) {
			msgErro += "<li>Enviar Documento para Atualização?</li>";
		}
	}

	if ((atividadeAtual == 38) && (proximaAtividade == 40)) {
		if (campoVazio(form, "profissionalVistoria")) {
			msgErro += "<li>Profissional Vistoria</li>";
		}
	}
	
	if ((atividadeAtual == 38) && (profissionalVist == "cred")) {
		if (campoVazio(form, "zoomBuscaCredenciado")) {
			msgErro += "<li>Credenciado</li>";
		}
		
		if (campoVazio(form, "zoomTipoServico")) {
			msgErro += "<li>Tipo de Serviço</li>";
		}
	}

	if ((atividadeAtual == 43) && (profissionalVist == "cred")) {
		if (campoVazio(form, "zoomBuscaCredenciado")) {
			msgErro += "<li>Credenciado</li>";
		}
		
		if (campoVazio(form, "zoomTipoServico")) {
			msgErro += "<li>Tipo de Serviço</li>";
		}
	}
	
	if ((atividadeAtual == 38) && (profissionalVist == "RHMED") || (profissionalVist == "RHVIDA") ) {
		if (campoVazio(form, "zoomTecProprio")) {
			msgErro += "<li>Responsável pela Vistoria (Técnico Próprio)</li>";
		}
	}
	
	if ((atividadeAtual == 43) && (profissionalVist == "RHMED") || (profissionalVist == "RHVIDA") ) {
		if (campoVazio(form, "zoomTecProprio")) {
			msgErro += "<li>Responsável pela Vistoria (Técnico Próprio)</li>";
		}
	}
	
	if (atividadeAtual == 67) {
		if (campoVazio(form, "servExecutados")) {
			msgErro += "<li>Serviços executados</li>";
		}
	}
	
	
	

	// if (((atividadeAtual == 0) || (atividadeAtual == 4))){
	// if (campoVazio(form, "zoomColigada")){
	// msgErro += "<li>Coligada</li>";
	// }
	//	
	// if (campoVazio(form, "documentoAnexo")){
	// msgErro += "<li>Anexo</li>";
	// }
	// }

	if (msgErro != "") {
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form,
				"Favor informar os campos <b>obrigatórios:</b><br/>" + msgErro);
	}

	/* Função para validar itens da tabela Pai x Filho */
	// validaPedido(form);
}

function validaPedido(form) {

	var indexes = form.getChildrenIndexes("pedido");

	if (indexes.length < 1) {
		throw ("\n Não foram informados <b>Pedidos</b> nesta solicitação, favor verificar! \n\n");
	} else {
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue("zoomOC___" + indexes[i]) == null
					|| form.getValue("zoomOC___" + indexes[i]) == "") {
				throw ("Campo <b>Pedido</b> Obrigatório \n\r");
			}
			if (form.getValue("np___" + indexes[i]) == null
					|| form.getValue("np___" + indexes[i]) == "") {
				throw ("Campo <b>Número do Pedido</b> Obrigatório \n\r");
			}
			if (form.getValue("dataEmissaoOC___" + indexes[i]) == null
					|| form.getValue("dataEmissaoOC___" + indexes[i]) == "") {
				throw ("Campo <b>Data de Emissão</b> Obrigatório \n\r");
			}
			if (form.getValue("codCondicaoPgto___" + indexes[i]) == null
					|| form.getValue("codCondicaoPgto___" + indexes[i]) == "") {
				throw ("Campo <b>Condição de Pagamento</b> Obrigatório \n\r");
			}
			if (form.getValue("valorPedido___" + indexes[i]) == null
					|| form.getValue("valorPedido___" + indexes[i]) == "") {
				throw ("Campo <b>Total</b> Obrigatório \n\r");
			}
		}
	}
}

function campoVazio(form, fieldname) {
	if ((form.getValue(fieldname) == null)
			|| (form.getValue(fieldname) == undefined)
			|| (form.getValue(fieldname).trim() == "")
			|| (form.getValue(fieldname).trim() == "vazio")) {
		return true;
	} // if
	return false;
} // campoVazio

function exibirMensagem(form, mensagem) {
	var mobile = form.getMobile() != null && form.getMobile();

	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>"
				+ "<strong>Atenção:</strong> "
				+ mensagem
				+ "</div>"
				+ "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";
	} // else if
} // exibirMensagem

function format2Number(valorStr) {
	if (valorStr == null || valorStr == undefined || valorStr == "") {
		return 0;
	} // if
	while (valorStr.indexOf(".") >= 0) {
		valorStr = valorStr.replace(".", "");
	} // while
	if (valorStr.indexOf(",") >= 0) {
		valorStr = valorStr.replace(",", ".");
	} // if
	var valor = Number(valorStr);
	if (isNaN(valor)) {
		valor = 0;
	} // if
	return valor;
} // format2Number

function obterDataCorrente() {
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente

function formatarMoney2Str(valor) {
	var unusualSymbols = new java.text.DecimalFormatSymbols();
	unusualSymbols.setDecimalSeparator(',');
	unusualSymbols.setGroupingSeparator('.');
	var formato = new java.text.DecimalFormat("#,##0.00000", unusualSymbols)
			.format(valor);
	return formato;
}