function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";

	if (atividadeAtual == 2 || atividadeAtual == 0 || atividadeAtual == 26){
		var estudaAtual = form.getValue("selectEstudaAtual");

		if(campoVazio(form, "inputNome")){
			msgErro += "<li>Nome</li>";
		}
		if(campoVazio(form, "inputEmail")){
			msgErro += "<li>E-mail</li>";
		}
		// if(campoVazio(form, "inputDataInicio")){
		// 	msgErro += "<li>Data de Início</li>";
		// }
		if(campoVazio(form, "selectSexo")){
			msgErro += "<li>Sexo</li>";
		}
		if(campoVazio(form, "selectEstadoCivil")){
			msgErro += "<li>Estado Civil</li>";
		}
		if(campoVazio(form, "inputDataNasc")){
			msgErro += "<li>Data de Nascimento</li>";
		}
		if(campoVazio(form, "inputLocalNasc")){
			msgErro += "<li>Local (Nascimento)</li>";
		}
		if(campoVazio(form, "selectUFNasc")){
			msgErro += "<li>UF (Nascimento)</li>";
		}
		if(campoVazio(form, "inputNrCTPS")){
			msgErro += "<li>Nº (CTPS)</li>";
		}
		if(campoVazio(form, "inputNrSerieCTPS")){
			msgErro += "<li>Série (CTPS)</li>";
		}
		if(campoVazio(form, "selectUfCTPS")){
			msgErro += "<li>UF (CTPS)</li>";
		}
		if(campoVazio(form, "inputDataEmissaoCTPS")){
			msgErro += "<li>Data de Emissão (CTPS)</li>";
		}
		if(campoVazio(form, "inputNrIdentidade")){
			msgErro += "<li>Nº (RG)</li>";
		}
		if(campoVazio(form, "inputOrgaoEmissorIdent")){
			msgErro += "<li>Órgão Emissor (RG)</li>";
		}
		if(campoVazio(form, "selectUfIdentidade")){
			msgErro += "<li>UF (RG)</li>";
		}
		if(campoVazio(form, "inputDataEmissaoIdent")){
			msgErro += "<li>Data de Emissão (RG)</li>";
		}
		if(campoVazio(form, "inputNrCpf")){
			msgErro += "<li>Nº (CPF)</li>";
		}
		if(campoVazio(form, "inputNrPis")){
			msgErro += "<li>PIS/NIT</li>";
		}
		if(campoVazio(form, "inputCEP")){
			msgErro += "<li>CEP</li>";
		}
		if(campoVazio(form, "inputCelular")){
			msgErro += "<li>Celular</li>";
		}
		if(campoVazio(form, "inputEndereco")){
			msgErro += "<li>Endereço</li>";
		}
		if(campoVazio(form, "inputBairro")){
			msgErro += "<li>Bairro</li>";
		}
		if(campoVazio(form, "inputCidade")){
			msgErro += "<li>Cidade</li>";
		}
		if(campoVazio(form, "selectEstado")){
			msgErro += "<li>Estado (UF)</li>";
		}
		if(campoVazio(form, "selectGrauEscolaridade")){
			msgErro += "<li>Grau de Escolaridade</li>";
		}
		if(campoVazio(form, "selectSituacao")){
			msgErro += "<li>Situação</li>";
		}
		if(campoVazio(form, "inputFormado")){
			msgErro += "<li>Data de Conclusão</li>";
		}
		if(campoVazio(form, "selectEstudaAtual")){
			msgErro += "<li>Estuda Atualmente</li>";
		}
		if(estudaAtual == "sim"){
			if(campoVazio(form, "inputQualCurso")){
				msgErro += "<li>Qual Curso?</li>";
			}
		}
		if(campoVazio(form, "inputCodBanco")){
			msgErro += "<li>Código do Banco</li>";
		}
		if(campoVazio(form, "inputBanco")){
			msgErro += "<li>Código do Banco</li>";
		}
		if(campoVazio(form, "inputAgencia")){
			msgErro += "<li>Agência</li>";
		}
		if(campoVazio(form, "inputContaCorrente")){
			msgErro += "<li>Conta Corrente</li>";
		}
	}

	if(atividadeAtual == 12){
		let aprovacaoSolicitacao = form.getValue("aprovacaoCoordenador");
		if(campoVazio(form, "aprovacaoCoordenador")){
			msgErro += "<li>Aprovação da Solicitação</li>";
		}
		if(aprovacaoSolicitacao == "Nao" || aprovacaoSolicitacao == "Cancelado"){
			if(campoVazio(form, "origem")){
				msgErro += "<li>Observações</li>";
			}
		}
	}

	if(atividadeAtual == 109){
		let aprovacaoSolicitacao = form.getValue("aprovacaoCoordenador");
		if(campoVazio(form, "aprovacaoCoordenador")){
			msgErro += "<li>Aprovação da Solicitação</li>";
		}
		if(aprovacaoSolicitacao == "Nao" || aprovacaoSolicitacao == "Cancelado"){
			if(campoVazio(form, "origem")){
				msgErro += "<li>Observações</li>";
			}
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

function campoNegativo(form, fieldname){
	if ((form.getValue(fieldname) == "nao")){
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

/* function format2Number(valorStr){
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
} */