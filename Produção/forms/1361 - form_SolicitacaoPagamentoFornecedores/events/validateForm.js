function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");

		var msgErro = "";
		if (atividadeAtual == 0 || atividadeAtual == 2 | atividadeAtual == 26){
			let valorTotal = form.getValue("valorTotalDocumento");
			let nrBanco = form.getValue("bancoPag");
			let nrAgencia = form.getValue("agenciaPag");
			let nrConta = form.getValue("contaPag");
			let formaPagamento = form.getValue("formaPagamento");
			let nrBoleto = form.getValue("numBoleto");


			if (campoVazio(form, "colabForn")){
				msgErro += "<li>Natureza do Adiantamento</li>";
			}if (campoVazio(form, "tipoPagamento")){
				msgErro += "<li>Tipo</li>";
			}if (campoVazio(form, "dataVencimento")){
				msgErro += "<li>Data Sugerida Para Pagamento</li>";
			}if (campoVazio(form, "zoomCentroCusto")){
				msgErro += "<li>Centro de Custo</li>";
			}if (campoVazio(form, "zoomFilial")){
				msgErro += "<li>Filial</li>";
			}if (campoVazio(form, "inputCodFornecedor")){
				msgErro += "<li>Nome do Fornecedor/Colaborador</li>";
			}if (campoVazio(form, "descricao")){
				msgErro += "<li>Motivo do Adiantamento";
			}if (campoVazio(form, "valorTotalDocumento")){
				msgErro += "<li>Valor Total do Adiantamento</li>";
			}if (format2Number(valorTotal) <= 0){
				msgErro += "<li>Valor Total deve ser maior que zero.</li>";
			}if (campoVazio(form, "formaPagamento")){
				msgErro += "<li>Forma de Pagamento</li>";
			}if ((formaPagamento == "Boleto") && (nrBoleto == "" || nrBoleto == null)){
				msgErro += "<li>Número do Boleto</li>";
			}if ((formaPagamento == "Credito em Conta") && (nrBanco == "" || nrAgencia == "" || nrConta == "" || nrBanco == 0 || nrAgencia == 0 || nrConta == 0)){
				msgErro += "<li>Favor adicionar dados bancários ao cadastro do fornecedor no Protheus.</li>";
			}
		}
		if (atividadeAtual == 3 || atividadeAtual == 5 || atividadeAtual == 7 || atividadeAtual == 9 || atividadeAtual == 10 || atividadeAtual == 12 || atividadeAtual == 14){
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
		if (atividadeAtual == 0 || atividadeAtual == 2 || atividadeAtual == 26){
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

		if(atividadeAtual == 12){
			var numeroFluig = form.getValue("numeroFluxo");
			var filial = form.getValue("codFilial");
			var consulta = consultaSP(numeroFluig, filial);
			var status = consulta[0];
			var response = consulta[1];
			if(status == false) msgErro += "<li>" + response + "</li>";
		}

		if (msgErro != ""){
			msgErro = "<ul>" + msgErro + "</ul>";
			exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
		}

	
	/*Função para validar itens da tabela Pai x Filho*/
	//validaPedido(form,atividadeAtual);
} 

function consultaSP(numeroFluig, filial){
	var c1 = DatasetFactory.createConstraint("tipoSP", "SPA", "SPA", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("numeroFluig", numeroFluig, numeroFluig, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("filial", filial, filial, ConstraintType.MUST);
	var constraints = [c1, c2, c3];
	var dsConsultaNF = DatasetFactory.getDataset("ds_consultaSP_protheus", null, constraints, null);
	var ultimoRegistro = dsConsultaNF.rowsCount - 1;
	log.info("ultimoRegistro: "+ultimoRegistro);
	var status = dsConsultaNF.getValue(ultimoRegistro, "status");
	var response = dsConsultaNF.getValue(ultimoRegistro, "response");
	return [status, response];
}

/*
function validaPedido(form,atividadeAtual){

	var indexes = form.getChildrenIndexes("tabelaColaborador");
	
	if (indexes.length < 1){
		throw ("\n Não foram informados <b>Colaboradores</b> nesta solicitação, favor verificar! \n\n");
	} else {
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue("colaboradorChapa___" + indexes[i]) == null || form.getValue("colaboradorChapa___" + indexes[i]) == ""){
				if(atividadeAtual == 0 || atividadeAtual == 4){
					throw ("Campo <b>Chapa</b> Obrigatório \n\r");
				}
			}
			if (form.getValue("colaboradorCompareceu___" + indexes[i]) == null || form.getValue("colaboradorCompareceu___" + indexes[i]) == ""){
				if(atividadeAtual == 11){
					throw ("Campo <b>Colaborador Compareceu?</b> Obrigatório \n\r");
				}
		}if (form.getValue("embarqueDesembarque___" + indexes[i]) == null || form.getValue("embarqueDesembarque___" + indexes[i]) == ""){
				if(atividadeAtual == 0 || atividadeAtual == 4){
					throw ("Campo <b>Embarque/Desembarque?</b> Obrigatório \n\r");
				}
		}if (form.getValue("colaboradorEmail___" + indexes[i]) == null || form.getValue("colaboradorEmail___" + indexes[i]) == ""){
				if(atividadeAtual == 0 || atividadeAtual == 4){
					throw ("Campo <b>Email do Colaborador?</b> Obrigatório \n\r");
				}
		}if (form.getValue("tripulantecorpoEmail___" + indexes[i]) == null || form.getValue("tripulantecorpoEmail___" + indexes[i]) == ""){
				if(atividadeAtual == 12){
					throw ("Campo <b>Corpo do E-mail</b> Obrigatório \n\r");
				}
		}if (form.getValue("vaiEmbarcar___" + indexes[i]) == null || form.getValue("vaiEmbarcar___" + indexes[i]) == ""){
				if(atividadeAtual == 21){
					throw ("Campo <b>Tripulante Vai Embarcar?</b> Obrigatório \n\r");
				}
		}


	}
}
}
*/

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