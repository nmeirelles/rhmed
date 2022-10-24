function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");

		var msgErro = "";
		if (atividadeAtual == 2 || atividadeAtual == 0 || atividadeAtual == 26){
			let indexesItems = form.getChildrenIndexes("tabelaItens");
			let formaPagamento = form.getValue("formaPagamento");
			let nrBoleto = form.getValue("numBoleto");
			let nrBanco = form.getValue("bancoPag");
			let nrAgencia = form.getValue("agenciaPag");
			let nrConta = form.getValue("contaPag");
			let valorTotal = form.getValue("valorTotalDocumento");
			let possuiTaxa = form.getValue("inputRadioButtonCorreio");
			let statusTaxa = form.getValue("inputRadioTaxaInlcusa");

			if (campoVazio(form, "tipoRequisicao")){
				msgErro += "<li>Tipo da Requisição</li>";
			}if (campoVazio(form, "zoomFilial")){
				msgErro += "<li>Filial</li>";
			}if (campoVazio(form, "zoomCentroCusto")){
				msgErro += "<li>Centro de Custo</li>";
			}if (campoVazio(form, "colabForn")){
				msgErro += "<li>Natureza do Pagamento</li>";
			}if (campoVazio(form, "inputCodFornecedor")){
				msgErro += "<li>Selecione um Fornecedor válido.</li>";
			}if (campoVazio(form, "dataVencimentoNota")){
				msgErro += "<li>Data de Vencimento do Pagamento</li>";
			}if (campoVazio(form, "numeroNota")){
				msgErro += "<li>Número da Nota Fiscal</li>";
			}if (campoVazio(form, "codSoc")){
				msgErro += "<li>Código Soc</li>";
			}if (campoVazio(form, "dataEmissaoNota")){
				msgErro += "<li>Data de Emissão da Nota Fiscal</li>";
			}if (campoVazio(form, "formaPagamento")){
				msgErro += "<li>Forma de Pagamento</li>";
			}if ((formaPagamento == "Boleto") && (nrBoleto == "" || nrBoleto == null)){
				msgErro += "<li>Número do Boleto</li>";
			}if ((formaPagamento == "Credito em Conta") && (nrBanco == "" || nrAgencia == "" || nrConta == "" || nrBanco == 0 || nrAgencia == 0 || nrConta == 0)){
				msgErro += "<li>Favor adicionar dados bancários ao cadastro do fornecedor no Protheus.</li>";
			}if (campoVazio(form, "inputRadioButtonCorreio")){
				msgErro += "<li>Possui Taxa de Correio?</li>";
			}if(possuiTaxa == "1"){
				if (campoVazio(form, "inputRadioTaxaInlcusa")){
					msgErro += "<li>Taxa está inlcusa no valor da Nota Fiscal?</li>";
				}if (campoVazio(form, "inputValorTaxa")){
					msgErro += "<li>Valor da Taxa</li>";
				}
			}if (indexesItems.length < 1){
				msgErro += "<li>Necessário inlcuir ao menos um Item.</li>";
			}if (indexesItems.length >= 1){
				for (var i = 0; i < indexesItems.length; i++) {
					let valorTotal = form.getValue("itemVlrOrcado___"+indexesItems[i]);
					if (campoVazio(form, "inputCodProduto___"+indexesItems[i])){
						msgErro += "<li>Selecione um Item válido na lista. | Item: "+indexesItems[i]+".</li>";
					}
					if (campoVazio(form, "itemNatureza___"+indexesItems[i])){
						msgErro += "<li>Selecione uma Natureza. | Item: "+indexesItems[i]+".</li>";
					}
					if (campoVazio(form, "itemQuantidade___"+indexesItems[i])){
						msgErro += "<li>Campo Quantidade | Item: "+indexesItems[i]+".</li>";
					}
					if (campoVazio(form, "itempreco___"+indexesItems[i])){
						msgErro += "<li>Campo Preço Unitário | Item: "+indexesItems[i]+".</li>";
					}
					if (format2Number(valorTotal) <= 0){
						msgErro += "<li>Valor Total deve ser maior que zero. | Item: "+indexesItems[i]+".</li>";
					}
				}
			}
			
			
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