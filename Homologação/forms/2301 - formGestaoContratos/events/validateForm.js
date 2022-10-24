function validateForm(form){
var atividadeAtual = getValue("WKNumState");
var proximaAtividade = getValue("WKNextState");
	
		var msgErro = "";
		if (atividadeAtual == 4 || atividadeAtual == 0 || atividadeAtual == 86){
			var tipoRequisicao = form.getValue('tipoRequisicao');
			var tipoPagamento = form.getValue('tipoPagamento');	

			if (campoVazio(form, "tipoRequisicao")){
				msgErro += "<li>Tipo da Requisição</li>";
			}if (campoVazio(form, "tipoPagamento")){
				msgErro += "<li>Tipo</li>";
			}if (campoVazio(form, "zoomFilial")){
				msgErro += "<li>Filial</li>";
			}if (campoVazio(form, "zoomCentroCusto")){
				msgErro += "<li>Centro de Custo</li>"
			}if (campoVazio(form, "inputCodFornecedor")){
				msgErro += "<li>Nome do Fornecedor</li>"
			}if (campoVazio(form, "selectQuestionario3")){
				msgErro += "<li>Qualidade do atendimento do fornecedor</li>"
			}if (campoVazio(form, "inputQuestionario4")){
				msgErro += "<li>Spend total do contrato nos últimos 12 meses</li>"
			}if(tipoRequisicao == 'pleito' || tipoRequisicao == 'reajuste'){
				if (campoVazio(form, "inputQuestionario2")){
					msgErro += "<li>Quando foi aplicado o último reajuste?</li>"
				}if (campoVazio(form, "inputQuestionario2_1")){
					msgErro += "<li>Qual foi a porcentagem?</li>"
				}if (campoVazio(form, "inputQuestionario1")){
					msgErro += "<li>Nome do Fornecedor 1</li>"
				}if (campoVazio(form, "inputQuestionario1_1")){
					msgErro += "<li>Qualidade do atendimento do fornecedor 1</li>"
				}if (campoVazio(form, "inputQuestionario5")){
					msgErro += "<li>Nome do Fornecedor 2</li>"
				}if (campoVazio(form, "inputQuestionario5_1")){
					msgErro += "<li>Qualidade do atendimento do fornecedor 2</li>"
				}
			}if(form.getValue('selectQuestionario3') == 'regular' || form.getValue('selectQuestionario3') == 'ruim' || form.getValue('selectQuestionario3') == 'pessimo'){
				if (campoVazio(form, "textJustQualiAtend")){
					msgErro += "<li>Justificativa (Qualidade Atendimento)</li>"
				}
			}if(form.getValue('inputQuestionario1_1') == 'regular' || form.getValue('inputQuestionario1_1') == 'ruim' || form.getValue('inputQuestionario1_1') == 'pessimo'){
				if (campoVazio(form, "textJustQualiAtend1")){
					msgErro += "<li>Justificativa (Qualidade Atendimento Fornecedor 1)</li>"
				}
			}if(form.getValue('inputQuestionario5_1') == 'regular' || form.getValue('inputQuestionario5_1') == 'ruim' || form.getValue('inputQuestionario5_1') == 'pessimo'){
				if (campoVazio(form, "textJustQualiAtend2")){
					msgErro += "<li>Justificativa (Qualidade Atendimento Fornecedor 2)</li>"
				}
			}if(form.getValue('inputQuestionario6_1') == 'regular' || form.getValue('inputQuestionario6_1') == 'ruim' || form.getValue('inputQuestionario6_1') == 'pessimo'){
				if (campoVazio(form, "textJustQualiAtend3")){
					msgErro += "<li>Justificativa (Qualidade Atendimento Fornecedor 3)</li>"
				}
			}if(tipoPagamento == 'emergencial'){
				if (campoVazio(form, "obsDadosSolicitacao")){
					msgErro += "<li>Para solicitações emergenciais, é necessário preenchimento do campo Observações</li>"
				}
			}
		}
		
		if (atividadeAtual == 5 || atividadeAtual == 9 || atividadeAtual == 17 || atividadeAtual == 21 || atividadeAtual == 23 || atividadeAtual == 35 || atividadeAtual == 44 || atividadeAtual == 110 || atividadeAtual == 119){
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

		if (atividadeAtual == 110){
			if (form.getValue("tipoRequisicao") != "aditivo"){
				if (campoVazio(form, "selectReajuste")) msgErro += "<li>Reajuste Concedido?</li>";
				if (campoVazio(form, "inputDataInicialAcordo")) msgErro += "<li>Data Inicial do Acordo</li>";
				if (campoVazio(form, "inputDataFinalAcordo")) msgErro += "<li>Data Final do Acordo</li>";
				if (campoVazio(form, "inputImpactoAnualReajuste")) msgErro += "<li>Impacto Anual do Reajuste</li>";
				if (campoVazio(form, "inputPorcentagemImpactoAnual")) msgErro += "<li>Porcentagem Impacto Anual</li>";
			}else{
				if (campoVazio(form, "inputDataInicialAcordo")) msgErro += "<li>Data Inicial do Acordo</li>";
				if (campoVazio(form, "inputDataFinalAcordo")) msgErro += "<li>Data Final do Acordo</li>";
				if (campoVazio(form, "inputImpactoAnualReajuste")) msgErro += "<li>Impacto Anual do Reajuste</li>";
				if (campoVazio(form, "inputPorcentagemImpactoAnual")) msgErro += "<li>Porcentagem Impacto Anual</li>";
			}
		}
		
		if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 86){
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