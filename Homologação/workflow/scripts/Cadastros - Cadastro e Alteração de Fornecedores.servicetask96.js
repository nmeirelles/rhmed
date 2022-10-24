function servicetask96(attempt, message){
	log.info("$$$$$$$$$$ Cadastro e Alteração de Fornecedores servicetask96 $$$$$$$$$$");

	var inputCNPJ = convertCPFCNPJ(hAPI.getCardValue("inputCNPJ"));
	var inputRazaoSocial = hAPI.getCardValue("inputRazaoSocial");
	var inputFantasia = hAPI.getCardValue("inputFantasia");
	var inputCEP = hAPI.getCardValue("inputCEP");
	var inputLogradouro = hAPI.getCardValue("inputLogradouro");
	var inputComplemento = hAPI.getCardValue("inputComplemento");
	var inputBairro = hAPI.getCardValue("inputBairro");
	var inputMunicipio = hAPI.getCardValue("inputMunicipio");
	var inputEstado = hAPI.getCardValue("inputEstado");
	var inputNomeContato = hAPI.getCardValue("inputNomeContato");
	var inputDDDTelefoneContato = ""+hAPI.getCardValue("inputTelefoneContato");
	inputDDDTelefoneContato = inputDDDTelefoneContato.replace(/[()-]+/g, '').slice(0,2);
	var inputTelefoneContato = hAPI.getCardValue("inputTelefoneContato");
	var inputEmailContato = hAPI.getCardValue("inputEmailContato");
	var inputBanco = hAPI.getCardValue("inputBanco");
	var inputAgencia = hAPI.getCardValue("inputAgencia");
	var inputConta = hAPI.getCardValue("inputConta");
	var tipoFornecedor = hAPI.getCardValue("selectTipoFornec");
	var inputCodMunicipal = hAPI.getCardValue("inputCodMunicipal");
	var inputCodPaisBacen = hAPI.getCardValue("inputCodPaisBacen");
	var inputContaContabil = ""+hAPI.getCardValue("zoomContaContabil");
	inputContaContabil = inputContaContabil.trim();
	var inputCodPais = hAPI.getCardValue("inputCodPais");
	var inputNatureza = hAPI.getCardValue("zoomNatFinanc");	
	var selectSimplesNacional = hAPI.getCardValue("selectSimplesNacional");
	var selectRecISS = hAPI.getCardValue("selectRecISS");
	var selectRecPIS = hAPI.getCardValue("selectRecPIS");
	var selectRecCOFINS = hAPI.getCardValue("selectRecCOFINS");
	var selectRecCSLL = hAPI.getCardValue("selectRecCSLL");
	var selectCalcINSS = hAPI.getCardValue("selectCalcINSS");
	var selectCalcIRRF = hAPI.getCardValue("selectCalcIRRF");
	var inputFormaPag = hAPI.getCardValue("selectformaPagamento");
	var selectTipoConta = hAPI.getCardValue("selectTipoConta");
	var solicitanteEmail = hAPI.getCardValue("solicitanteEmail");
	var inputDigitoConta = hAPI.getCardValue("inputDigitoConta");

	var selectTipoFornecedor = hAPI.getCardValue("selectTipoFornecedor");
	
	var meiRecebeComoPF = hAPI.getCardValue("meiRecebeComoPF");

	var inputCPFMEI = ""+hAPI.getCardValue("inputCPFMEI");
	inputCPFMEI = inputCPFMEI.replace(/\.|\-/g, "");

	var recebePelaMatriz = hAPI.getCardValue("recebePelaMatriz");

	var inputCNPJFilial = ""+hAPI.getCardValue("inputCNPJFilial");
	inputCNPJFilial = inputCNPJFilial.replace(/[^\d]+/g,''); 

	//Tratamento Campos
	inputCNPJ = inputCNPJ.trim();
	inputRazaoSocial = inputRazaoSocial.trim();
	inputFantasia = inputFantasia.trim();
	inputCEP = inputCEP.trim();
	inputLogradouro = inputLogradouro.trim();
	inputComplemento = inputComplemento.trim();
	inputBairro = inputBairro.trim();
	inputMunicipio = inputMunicipio.trim();
	inputEstado = inputEstado.trim();
	inputNomeContato = inputNomeContato.trim();
	inputDDDTelefoneContato = inputDDDTelefoneContato.trim();
	inputTelefoneContato = inputTelefoneContato.trim();
	inputEmailContato = inputEmailContato.trim();
	inputBanco = inputBanco.trim();
	inputAgencia = inputAgencia.trim();
	inputConta = inputConta.trim();
	tipoFornecedor = tipoFornecedor.trim();
	inputCodMunicipal = inputCodMunicipal.trim();
	inputCodPaisBacen = inputCodPaisBacen.trim();
	inputContaContabil = inputContaContabil.trim();
	inputCodPais = inputCodPais.trim();
	inputNatureza = inputNatureza.trim();
	selectSimplesNacional = selectSimplesNacional.trim();
	selectRecISS = selectRecISS.trim();
	selectRecPIS = selectRecPIS.trim();
	selectRecCOFINS = selectRecCOFINS.trim();
	selectRecCSLL = selectRecCSLL.trim();
	selectCalcINSS = selectCalcINSS.trim();
	selectCalcIRRF = selectCalcIRRF.trim();
	inputFormaPag = inputFormaPag.trim();
	selectTipoConta = selectTipoConta.trim();
	solicitanteEmail = solicitanteEmail.trim();
	inputDigitoConta = inputDigitoConta.trim();
	inputDDDTelefoneContato = inputDDDTelefoneContato.replace(/[()-]+/g, '').slice(0,2);

	log.info("$$$$$$$$$$ inputCNPJ: "+ inputCNPJ);
	log.info("$$$$$$$$$$ inputRazaoSocial: "+ inputRazaoSocial);
	log.info("$$$$$$$$$$ inputFantasia: "+ inputFantasia);
	log.info("$$$$$$$$$$ inputCEP: "+ inputCEP);
	log.info("$$$$$$$$$$ inputLogradouro: "+ inputLogradouro);
	log.info("$$$$$$$$$$ inputComplemento: "+ inputComplemento);
	log.info("$$$$$$$$$$ inputBairro: "+ inputBairro);
	log.info("$$$$$$$$$$ inputMunicipio: "+ inputMunicipio);
	log.info("$$$$$$$$$$ inputEstado: "+ inputEstado);
	log.info("$$$$$$$$$$ inputNomeContato: "+ inputNomeContato);
	log.info("$$$$$$$$$$ inputDDDTelefoneContato: "+ inputDDDTelefoneContato);
	log.info("$$$$$$$$$$ inputTelefoneContato: "+ inputTelefoneContato);
	log.info("$$$$$$$$$$ inputEmailContato: "+ inputEmailContato);
	log.info("$$$$$$$$$$ inputBanco: "+ inputBanco);
	log.info("$$$$$$$$$$ inputAgencia: "+ inputAgencia);
	log.info("$$$$$$$$$$ inputConta: "+ inputConta);
	log.info("$$$$$$$$$$ tipoFornecedor: "+ tipoFornecedor);
	log.info("$$$$$$$$$$ inputCodMunicipal: "+ inputCodMunicipal);
	log.info("$$$$$$$$$$ inputCodPaisBacen: "+ inputCodPaisBacen);
	log.info("$$$$$$$$$$ inputContaContabil: "+ inputContaContabil);
	log.info("$$$$$$$$$$ inputCodPais: "+ inputCodPais);
	log.info("$$$$$$$$$$ inputNatureza: "+ inputNatureza);
	log.info("$$$$$$$$$$ selectSimplesNacional: "+ selectSimplesNacional);
	log.info("$$$$$$$$$$ selectRecISS: "+ selectRecISS);
	log.info("$$$$$$$$$$ selectRecPIS: "+ selectRecPIS);
	log.info("$$$$$$$$$$ selectRecCOFINS: "+ selectRecCOFINS);
	log.info("$$$$$$$$$$ selectRecCSLL: "+ selectRecCSLL);
	log.info("$$$$$$$$$$ selectCalcINSS: "+ selectCalcINSS);
	log.info("$$$$$$$$$$ selectCalcIRRF: "+ selectCalcIRRF);
	log.info("$$$$$$$$$$ inputFormaPag: "+ inputFormaPag);
	log.info("$$$$$$$$$$ selectTipoConta: "+ selectTipoConta);
	log.info("$$$$$$$$$$ solicitanteEmail: "+ solicitanteEmail);
	log.info("$$$$$$$$$$ inputDigitoConta: "+ inputDigitoConta);

	log.info("$$$$$$$$$$ selectTipoFornecedor: "+ selectTipoFornecedor);
	log.info("$$$$$$$$$$ meiRecebeComoPF: "+ meiRecebeComoPF);
	log.info("$$$$$$$$$$ inputCPFMEI: "+ inputCPFMEI);
	log.info("$$$$$$$$$$ recebePelaMatriz: "+ recebePelaMatriz);
	log.info("$$$$$$$$$$ inputCNPJFilial: "+ inputCNPJFilial);

	var c1 = DatasetFactory.createConstraint("inputCNPJ", inputCNPJ, "", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("inputRazaoSocial", inputRazaoSocial, "", ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("inputFantasia", inputFantasia, "", ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("inputCEP", inputCEP, "", ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("inputLogradouro", inputLogradouro, "", ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("inputComplemento", inputComplemento, "", ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint("inputBairro", inputBairro, "", ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint("inputMunicipio", inputMunicipio, "", ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint("inputEstado", inputEstado, "", ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint("inputNomeContato", inputNomeContato, "", ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("inputDDDTelefoneContato", inputDDDTelefoneContato, "", ConstraintType.MUST);
	var c12 = DatasetFactory.createConstraint("inputTelefoneContato", inputTelefoneContato, "", ConstraintType.MUST);
	var c13 = DatasetFactory.createConstraint("inputEmailContato", inputEmailContato, "", ConstraintType.MUST);
	var c14 = DatasetFactory.createConstraint("inputBanco", inputBanco, "", ConstraintType.MUST);
	var c15 = DatasetFactory.createConstraint("inputAgencia", inputAgencia, "", ConstraintType.MUST);
	var c16 = DatasetFactory.createConstraint("inputConta", inputConta, "", ConstraintType.MUST);
	var c17 = DatasetFactory.createConstraint("selectTipoFornec", tipoFornecedor, "", ConstraintType.MUST);
	var c18 = DatasetFactory.createConstraint("inputCodMunicipal", inputCodMunicipal, "", ConstraintType.MUST);
	var c19 = DatasetFactory.createConstraint("inputCodPaisBacen", inputCodPaisBacen, "", ConstraintType.MUST);
	var c20 = DatasetFactory.createConstraint("inputContaContabil", inputContaContabil, "", ConstraintType.MUST);
	var c21 = DatasetFactory.createConstraint("inputCodPais", inputCodPais, "", ConstraintType.MUST);
	var c22 = DatasetFactory.createConstraint("inputNatureza", inputNatureza, "", ConstraintType.MUST);

	var c23 = DatasetFactory.createConstraint("selectRecISS", selectRecISS, "", ConstraintType.MUST);
	var c24 = DatasetFactory.createConstraint("selectRecPIS", selectRecPIS, "", ConstraintType.MUST);
	var c25 = DatasetFactory.createConstraint("selectRecCOFINS", selectRecCOFINS, "", ConstraintType.MUST);
	var c26 = DatasetFactory.createConstraint("selectRecCSLL", selectRecCSLL, "", ConstraintType.MUST);
	var c27 = DatasetFactory.createConstraint("selectCalcINSS", selectCalcINSS, "", ConstraintType.MUST);
	var c28 = DatasetFactory.createConstraint("selectCalcIRRF", selectCalcIRRF, "", ConstraintType.MUST);
	var c29 = DatasetFactory.createConstraint("inputFormaPag", inputFormaPag, "", ConstraintType.MUST);
	var c30 = DatasetFactory.createConstraint("selectTipoConta", selectTipoConta, "", ConstraintType.MUST);
	var c31 = DatasetFactory.createConstraint("solicitanteEmail", solicitanteEmail, "", ConstraintType.MUST);
	var c32 = DatasetFactory.createConstraint("inputDigitoConta", inputDigitoConta, "", ConstraintType.MUST);
	var c33 = DatasetFactory.createConstraint("selectSimplesNacional", selectSimplesNacional, "", ConstraintType.MUST);
	
	var c34 = DatasetFactory.createConstraint("selectTipoFornecedor", selectTipoFornecedor, "", ConstraintType.MUST);
	var c35 = DatasetFactory.createConstraint("meiRecebeComoPF", meiRecebeComoPF, "", ConstraintType.MUST);
	var c36 = DatasetFactory.createConstraint("inputCPFMEI", inputCPFMEI, "", ConstraintType.MUST);
	var c37 = DatasetFactory.createConstraint("recebePelaMatriz", recebePelaMatriz, "", ConstraintType.MUST);
	var c38 = DatasetFactory.createConstraint("inputCNPJFilial", inputCNPJFilial, "", ConstraintType.MUST);
	
	var constraints = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38];
	var dataset = DatasetFactory.getDataset("ds_postProtheus_003", null, constraints, null);
	log.dir("dataset");
	log.dir(dataset);
	if(dataset != null){
		var response = dataset.getValue(0,"response");
		var error = dataset.getValue(0,"error");
		log.info("$$$$$$$$$$ Response: "+response);
		log.info("$$$$$$$$$$ error: "+error);
		if(error != null && error != ""){
			throw error;
		}else{
			var processId = getValue("WKNumProces");
			var user = getValue("WKUser");
			var obs = "Resultado Integração: "+response;
			hAPI.setTaskComments(user, processId, 0, obs);
		}
	}else{
		throw "Erro ao acessar o dataset de integração com Protheus";
	}
}
function convertFloat(valor){
	log.info(typeof(valor));
	log.info("Valor: "+valor);
	var valorFloat = parseFloat(valor.replace(".","").replace(",","."));
	log.info(typeof(valorFloat));
	log.info("Valor Float: "+valorFloat);
	return valorFloat;
}
function convertDate(valor){
	return valor.split("-")[2]+"/"+valor.split("-")[1]+"/"+valor.split("-")[0];
}
function convertCPFCNPJ(valor){
	return valor.replace(".","").replace(".","").replace("/","").replace("-","").replace(" ","");
}