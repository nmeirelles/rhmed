function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");

		var msgErro = "";
		if (atividadeAtual == 4 || atividadeAtual == 0 || atividadeAtual == 11){
			let formaPagamento = form.getValue("formaPagamento");
			let nrBoleto = form.getValue("numBoleto");
			let nrBanco = form.getValue("bancoPag");
			let nrAgencia = form.getValue("agenciaPag");
			let nrConta = form.getValue("contaPag");
			let valorTotal = form.getValue("valorTotalDocumento");

			if (campoVazio(form, "inputFornecedor")){
				msgErro += "<li>Nome do Fornecedor</li>";
			}
			if (campoVazio(form, "inputNrPedido")){
				msgErro += "<li>Número Pedido de Compra</li>";
			}
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
			if (campoVazio(form, "dataVencimentoNota")){
				msgErro += "<li>Data de Vencimento do Pagamento</li>";
			}
			if (campoVazio(form, "inputNrNotaFiscal")){
				msgErro += "<li>Número Nota Fiscal</li>";
			}
			if (campoVazio(form, "inputCodFornecedor")){
				msgErro += "<li>Fornecedor</li>";
			}
			if (format2Number(valorTotal) <= 0){
				msgErro += "<li>Valor Total deve ser maior que zero.</li>";
			}
			if (campoVazio(form, "formaPagamento")){
				msgErro += "<li>Forma de Pagamento</li>";
			}
			if ((formaPagamento == "Boleto") && (nrBoleto == "" || nrBoleto == null)){
				msgErro += "<li>Número do Boleto</li>";
			}
			if ((formaPagamento == "Credito em Conta") && (nrBanco == "" || nrAgencia == "" || nrConta == "" || nrBanco == 0 || nrAgencia == 0 || nrConta == 0)){
				msgErro += "<li>Favor adicionar dados bancários ao cadastro do fornecedor no Protheus.</li>";
			}
			
			validaDuplicidadeNF(form);
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
			}if (campoVazio(form, "corpoEmail")){
				msgErro += "<li>Corpo do E-mail</li>";
			}
		}

		if (msgErro != ""){
			msgErro = "<ul>" + msgErro + "</ul>";
			exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
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
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o administrador do sistema</font></a>.";		
	} // else if
} // exibirMensagem

function validaDuplicidadeNF(form){ //Valida duplicidade de NF para o Favorecido
	log.info("::::::::::::: VALIDA DUPLICIDADE NF");
	
	var cnpj = form.getValue("cnpj");
	var numeroNF = form.getValue("inputNrNotaFiscal");
	
	if(cnpj != "" && numeroNF != "" && cnpj != null && numeroNF != null){
		var processoAtual = getValue("WKNumProces");
		var c1 = DatasetFactory.createConstraint("inputNrNotaFiscal", numeroNF, numeroNF, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("cnpj", cnpj, cnpj, ConstraintType.MUST);
	    var constraints = new Array(c1,c2);
	    var dataset1 = DatasetFactory.getDataset("dsSolicitacaoPagamentoCredenciados", null, constraints, null);
		var dsCount = [dataset1];
		
		for(var c = 0; c < dsCount.length ; c++){
			if(dsCount[c].rowsCount > 0){
				for(var i = 0; i < dsCount[c].rowsCount ; i++){
					//captura o numero do processo aberto
					var numFluxo = dsCount[c].getValue(i,"numeroFluxo");
					var processoAtual = form.getValue("numeroFluxo");
					var c01 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", numFluxo, numFluxo, ConstraintType.MUST);
					var datasetProcess = DatasetFactory.getDataset("workflowProcess", null, [c01], null);
					
					if(datasetProcess.rowsCount > 0){
						//Verifica Status da solicitação - 0=ABERTO 1=CANCELADO 2=FINALIZADO
						var status = datasetProcess.getValue(0,"status");
					}
				}
				
				if(dsCount[c].rowsCount > 0 && status != 1 && numFluxo != processoAtual){
					exibirMensagem(form, "Nota Fiscal / RPA já lançada para este CNPJ na solicitação <b>"+numFluxo+"</b>.");
				}
			}
		}
	}
}

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

