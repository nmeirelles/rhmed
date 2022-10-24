function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");

	var msgErro = "";
	if(atividadeAtual == 2 || atividadeAtual == 0 || atividadeAtual == 26){
		let formaPagamento = form.getValue("formaPagamento");
		let nrBoleto = form.getValue("numBoleto");
		let nrBanco = form.getValue("bancoPag");
		let nrAgencia = form.getValue("agenciaPag");
		let nrConta = form.getValue("contaPag");
		let valorTotal = form.getValue("valorTotalDocumento");
		let benefPagamento = form.getValue("hiddenBenefPagamento");

		if(campoVazio(form, "inputCodEmissorNF")) msgErro += "<li>Consultar Fornecedor Emissor NF</li>";
		if(campoVazio(form, "tipoRequisicao")) msgErro += "<li>Tipo da Requisição</li>";
		if(campoVazio(form, "zoomFilial")) msgErro += "<li>Filial</li>";
		if(campoVazio(form, "zoomCentroCusto")) msgErro += "<li>Centro de Custo</li>";
		if(campoVazio(form, "colabForn")) msgErro += "<li>Natureza do Pagamento</li>";
		if(campoVazio(form, "inputCodFornecedor")) msgErro += "<li>Selecione um Fornecedor válido.</li>";
		if(campoVazio(form, "dataVencimentoNota")) msgErro += "<li>Data de Vencimento do Pagamento</li>";
		if(campoVazio(form, "numeroNota")) msgErro += "<li>Número da Nota Fiscal</li>";
		if(campoVazio(form, "inputCodProduto")) msgErro += "<li>Pesquise por um Produto válido.</li>";
		if(campoVazio(form, "dataEmissaoNota")) msgErro += "<li>Data de Emissão da Nota Fiscal</li>";
		if(campoVazio(form, "Quantidade")) msgErro += "<li>Quantidade</li>";
		if(campoVazio(form, "valorUnit")) msgErro += "<li>Valor Unitário</li>";
		if(campoVazio(form, "formaPagamento")) msgErro += "<li>Forma de Pagamento</li>";
		if((formaPagamento == "Boleto") && (nrBoleto == "" || nrBoleto == null)) msgErro += "<li>Número do Boleto</li>";
		if((formaPagamento == "Credito em Conta") && (nrBanco == "" || nrAgencia == "" || nrConta == "" || nrBanco == 0 || nrAgencia == 0 || nrConta == 0)) msgErro += "<li>Favor adicionar dados bancários ao cadastro do fornecedor no Protheus.</li>";
		if(format2Number(valorTotal) <= 0) msgErro += "<li>Valor Total deve ser maior que zero.</li>";
		if(campoVazio(form, "hiddenBenefPagamento")) msgErro += "<li>Favor selecionar o Beneficiário do Pagamento.</li>";
		if(benefPagamento == "2"){
			if(campoVazio(form, "selectTipoFornecedor")) msgErro += "<li>Favor selecionar o Tipo do Fornecedor.</li>";
		}

		var numeroNF = form.getValue("numeroNota");
		var codigoFornecedor = form.getValue("inputCodEmissorNF");
		var filial = form.getValue("codFilial");
		var consulta = consultaNF(numeroNF, codigoFornecedor, filial);
		var status = consulta[0];
		var response = consulta[1];
		if(status == false) msgErro += "<li>" + response + "</li>";
		
	}

	if (atividadeAtual == 5 || atividadeAtual == 75 || atividadeAtual == 9 || atividadeAtual == 78 || atividadeAtual == 10 || atividadeAtual == 12 || atividadeAtual == 14 || atividadeAtual == 91){
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
		let tipoRequisicao = form.getValue("tipoRequisicao");
		let obsSolicitacao = form.getValue("obsDadosSolicitacao");
		if ((tipoRequisicao == "Emergencial") && (obsSolicitacao == "" || obsSolicitacao == null)){
			msgErro += "<li>Caso o pagamento seja Emergencial, o campo Observações deverá ser preenchido</li>";
		}
	}

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

	/*Função para validar itens da tabela Pai x Filho*/
	//validaPedido(form,atividadeAtual);
} 
function consultaNF(numeroNF, codigoFornecedor, filial){
	var c1 = DatasetFactory.createConstraint("numeroNF", numeroNF, numeroNF, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("codigoFornecedor", codigoFornecedor, codigoFornecedor, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("filial", filial, filial, ConstraintType.MUST);
	var constraints = [c1, c2, c3];
	var dsConsultaNF = DatasetFactory.getDataset("ds_consultaNotaFiscal_protheus", null, constraints, null);
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