function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var statusCEP = form.getValue("statusCEP");
	var validaCodMunicipio = form.getValue("hiddenValidaCodMunicipio");
	var codMunicipio = form.getValue("hiddenCodMunicipio");
	var ufEstado = form.getValue("inputEstado");

	var switchMEI = form.getValue("switchMEI");
	var switchRecebeFilial = form.getValue("switchRecebeFilial");

		var msgErro = "";
		if (atividadeAtual == 4 || atividadeAtual == 0 || atividadeAtual == 11){

			if(campoVazio(form, "selectTipoFornecedor")) msgErro += "<li>Tipo de Fornecedor</li>";
			if(switchMEI != "" && campoVazio(form, "inputCPFMEI")) msgErro += "<li>CPF do MEI</li>";
			if(switchRecebeFilial != "" && campoVazio(form, "inputCNPJFilial")) msgErro += "<li>CNPJ matriz/filial</li>";

			if (campoVazio(form, "inputCNPJ")){
				msgErro += "<li>CPF/CNPJ</li>";
			}if (campoVazio(form, "inputRazaoSocial")){
				msgErro += "<li>Razão Social</li>";
			}if (campoVazio(form, "inputFantasia")){
				msgErro += "<li>Nome Fantasia</li>";
			}if (campoVazio(form, "inputCEP")){
				msgErro += "<li>CEP</li>";
			}if (campoVazio(form, "inputLogradouro")){
				msgErro += "<li>Endereço e Número</li>";
			}if (campoVazio(form, "inputBairro")){
				msgErro += "<li>Bairro</li>";
			}if ((campoVazio(form, "inputMunicipio")) && campoVazio(form, "zoomMunicipio")){
				msgErro += "<li>Município</li>";
			}if (campoVazio(form, "inputEstado")){
				msgErro += "<li>Estado</li>";
			}if (campoVazio(form, "inputNomeContato")){
				msgErro += "<li>Nome do Contato</li>";
			}if (campoVazio(form, "inputTelefoneContato")){
				msgErro += "<li>Telefone de Contato</li>";
			}if (campoVazio(form, "inputEmailContato")){
				msgErro += "<li>E-mail de Contato</li>";
			}if (campoVazio(form, "inputBanco")){
				msgErro += "<li>Banco</li>";
			}if (campoVazio(form, "inputAgencia")){
				msgErro += "<li>Agência</li>";
			}if (campoVazio(form, "inputConta")){
				msgErro += "<li>Conta</li>";
			}if (campoVazio(form, "inputDigitoConta")){
				msgErro += "<li>Digito</li>";
			}if (campoVazio(form, "selectformaPagamento")){
				msgErro += "<li>Forma de Pagamento</li>";
			}if(statusCEP == '1'){
				if (campoVazio(form, "inputEstado")){
					msgErro += "<li>UF</li>";
				}if (campoVazio(form, "zoomMunicipio")){
					msgErro += "<li>Municipio</li>";
				}if (campoVazio(form, "inputBairro")){
					msgErro += "<li>Bairro</li>";
				}
			}
			if(validaCodMunicipio == "0"){
				msgErro += "<li>Cadastro do município não encontrado, favor solicitar o cadastro no Protheus! Código Municipal: <strong>"+ codMunicipio +"</strong>, UF: <strong>"+ ufEstado +"</strong></li>";
			}
			if(campoVazio(form, "inputMunicipio")){
				msgErro += "<li>Favor, buscar CEP novamente para verificar o Código Municipal!</li>"
			}
		}

		if (atividadeAtual == 5 || atividadeAtual == 99){
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

		if (atividadeAtual == 107){
			let aprovacao = form.getValue("aprovacaoCoordenador");
			let nrDocumento = form.getValue("inputCNPJ");
			nrDocumento.trim();
			let tipoFornecedor = form.getValue("selectTipoFornec");
			if (campoVazio(form, "selectTipoFornec")){
				msgErro += "<li>Tipo do Fornecedor</li>";
			}
			if (campoVazio(form, "inputCodMunicipal")){
				msgErro += "<li>Código Municipal</li>";
			}
			if (campoVazio(form, "inputCodPais")){
				msgErro += "<li>Código País</li>";
			}
			if (campoVazio(form, "inputCodPaisBacen")){
				msgErro += "<li>Código País Bacen</li>";
			}
			if (campoVazio(form, "zoomContaContabil")){
				msgErro += "<li>Conta Contábil</li>";
			}
			if (campoVazio(form, "zoomNatFinanc")){
				msgErro += "<li>Natureza Financeira</li>";
			}
			if (campoVazio(form, "selectRecISS")){
				msgErro += "<li>ISS</li>";
			}
			if (campoVazio(form, "selectRecPIS")){
				msgErro += "<li>PIS</li>";
			}
			if (campoVazio(form, "selectRecCOFINS")){
				msgErro += "<li>COFINS</li>";
			}
			if (campoVazio(form, "selectRecCSLL")){
				msgErro += "<li>CSLL</li>";
			}
			if (campoVazio(form, "selectSimplesNacional")){
				msgErro += "<li>CSLL</li>";
			}
			if (campoVazio(form, "selectCalcINSS")){
				msgErro += "<li>INSS</li>";
			}
			if (campoVazio(form, "selectCalcIRRF")){
				msgErro += "<li>IRRF</li>";
			}
			if(aprovacao == "" || aprovacao == null){
				msgErro += "<li>Favor selecionar uma opção de Aprovação.</li>";
			}
			if(aprovacao == "Cancelado" || aprovacao == "Nao"){
				let observacao = form.getValue("origem");
				if (observacao == "" || observacao == null){
					msgErro += "<li>Obrigatório Campo Observação ser preenchido</li>";
				}
			}
			/* if(tipoFornecedor == "F" && nrDocumento.length != 11){
				msgErro += "<li>Favor selecionar o Tipo de Fornecedor correto!</li>";
			}else if(tipoFornecedor == "J" && nrDocumento.length != 14){
				msgErro += "<li>Favor selecionar o Tipo de Fornecedor correto!</li>";
			} */
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