function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var inputCNPJ = "";
	var inputRazaoSocial = "";
	var inputFantasia = "";
	var inputCEP = "";
	var inputLogradouro = "";
	var inputComplemento = "";
	var inputBairro = "";
	var inputMunicipio = "";
	var inputEstado = "";
	var inputNomeContato = "";
	var inputDDDTelefoneContato = "";
	var inputTelefoneContato = "";
	var inputEmailContato = "";
	var inputBanco = "";
	var inputAgencia = "";
	var inputConta = "";
	var selectTipoFornec = "";
	var inputCodMunicipal = "";
	var inputCodPaisBacen = "";	
	var inputContaContabil = "";
	var inputCodPais = "";
	var inputNatureza = "";
	var selectSimplesNacional = "";
	var selectRecISS = "";
	var selectRecPIS = "";
	var selectRecCOFINS = "";
	var selectRecCSLL = "";
	var selectCalcINSS = "";
	var selectCalcIRRF = "";
	var inputFormaPag = "";
	var selectTipoConta = "";
	var solicitanteEmail = "";
	var inputDigitoConta = "";
	var selectTipoFornecedor = "";
	var inputCPFMEI = "";
	var inputCNPJFilial = "";
	var meiRecebeComoPF = "";
	var recebePelaMatriz = "";

	if(constraints != null){
		for(var i = 0; i < constraints.length; i++){
			if (constraints[i].fieldName == "inputCNPJ") inputCNPJ = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputRazaoSocial") inputRazaoSocial = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputFantasia") inputFantasia = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputCEP") inputCEP = constraints[i].initialValue.replace("-","");
			if (constraints[i].fieldName == "inputLogradouro") inputLogradouro = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputComplemento") inputComplemento = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputBairro") inputBairro = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputMunicipio") inputMunicipio = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputEstado") inputEstado = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputNomeContato") inputNomeContato = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputDDDTelefoneContato") inputDDDTelefoneContato = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputTelefoneContato") inputTelefoneContato = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputEmailContato") inputEmailContato = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputBanco") inputBanco = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputAgencia") inputAgencia = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputConta") inputConta = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectTipoFornec") selectTipoFornec = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputCodMunicipal") inputCodMunicipal = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputCodPaisBacen") inputCodPaisBacen = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputContaContabil") inputContaContabil = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputCodPais") inputCodPais = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputNatureza") inputNatureza = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectRecISS") selectRecISS = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectRecPIS") selectRecPIS = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectRecCOFINS") selectRecCOFINS = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectRecCSLL") selectRecCSLL = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectCalcINSS") selectCalcINSS = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectCalcIRRF") selectCalcIRRF = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputFormaPag") inputFormaPag = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectTipoConta") selectTipoConta = constraints[i].initialValue;
			if (constraints[i].fieldName == "solicitanteEmail") solicitanteEmail = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputDigitoConta") inputDigitoConta = constraints[i].initialValue;
			if (constraints[i].fieldName == "selectSimplesNacional") selectSimplesNacional = constraints[i].initialValue;

			if (constraints[i].fieldName == "selectTipoFornecedor") selectTipoFornecedor = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputCPFMEI") inputCPFMEI = constraints[i].initialValue;
			if (constraints[i].fieldName == "inputCNPJFilial") inputCNPJFilial = constraints[i].initialValue;

			if (constraints[i].fieldName == "meiRecebeComoPF") meiRecebeComoPF = constraints[i].initialValue;
			if (constraints[i].fieldName == "recebePelaMatriz") recebePelaMatriz = constraints[i].initialValue;
		}
	}

	var serviceData = data(inputCNPJ, inputRazaoSocial, inputFantasia, inputCEP, inputLogradouro, inputComplemento, inputBairro, inputMunicipio, inputEstado, inputNomeContato, inputDDDTelefoneContato, 
		inputTelefoneContato, inputEmailContato, inputBanco, inputAgencia, inputConta, selectTipoFornec, inputCodMunicipal, inputCodPaisBacen, inputContaContabil, inputCodPais, inputNatureza, selectRecISS, 
		selectRecPIS, selectRecCOFINS, selectRecCSLL, selectCalcINSS, selectCalcIRRF, inputFormaPag, selectTipoConta, solicitanteEmail, inputDigitoConta, selectSimplesNacional, selectTipoFornecedor, inputCPFMEI, 
		inputCNPJFilial, meiRecebeComoPF, recebePelaMatriz);
	var params = serviceData.inputValues;

	log.info("params");
	log.dir(params);
	var user = "wsfluig";
	var pass = "wsfluig";
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS003SOAP();
	var authIwsDataServer = serviceHelper.getBasicAuthenticatedClient(service, 'br.com.cloudtotvs.protheus.rhmedconsultores119083._4040.RHMWS003SOAP', user, pass);
	var response = authIwsDataServer.fornecedor(
		params.cnpjempresa, 
		params.ccnpj, 
		params.cnome, 
		params.cnomereduz, 
		params.cendereco, 
		params.ccep, 
		params.cpais, 
		params.cpaisbacen, 
		params.cestado, 
		params.ccodmun, 
		params.cbairro, 
		params.ctipo, 
		params.ccondpagto, 
		params.ccontato, 
		params.cinscest, 
		params.cinscmun, 
		params.cemail, 
		params.cddd, 
		params.ctelefone, 
		params.ccontactb, 
		params.cnatureza, 
		params.cformapag, 
		params.ccodbanco, 
		params.cagencia, 
		params.cnumcontacc, 
		params.cdvcta, 
		params.ctipoconta, 
		params.cpagenvemail, 
		params.cpagemaildes, 
		params.cpagemailcc, 
		params.creciss, 
		params.crecinss, 
		params.crecpis, 
		params.creccofi, 
		params.creccsll, 
		params.ccalcirf, 
		params.csimpnac, 
		params.cbancmat, 
		params.ccnpjmat, 
		params.cfornmei, 
		params.ccpfmei, 
		params.ctpforn
	);

	return response;
}

function defineStructure() {
	addColumn('response');
}

function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("response");
	dataset.addRow([result]);

	log.info("processResult");
	log.dir(result);

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();
	var params = data().inputValues;

	dataset.addColumn('error');
	dataset.addColumn('ccontactb');
	dataset.addColumn('cbairro');
	dataset.addColumn('cformapag');
	dataset.addColumn('ccondpagto');
	dataset.addColumn('cendereco');
	dataset.addColumn('cpaisbacen');
	dataset.addColumn('crecinss');
	dataset.addColumn('cddd');
	dataset.addColumn('cbancmat');
	dataset.addColumn('ctelefone');
	dataset.addColumn('cdvcta');
	dataset.addColumn('creciss');
	dataset.addColumn('cinscest');
	dataset.addColumn('cinscmun');
	dataset.addColumn('csimpnac');
	dataset.addColumn('cpais');
	dataset.addColumn('cnome');
	dataset.addColumn('cpagenvemail');
	dataset.addColumn('cfornmei');
	dataset.addColumn('cagencia');
	dataset.addColumn('crecpis');
	dataset.addColumn('cestado');
	dataset.addColumn('ccep');
	dataset.addColumn('cnpjempresa');
	dataset.addColumn('ccalcirf');
	dataset.addColumn('ccnpj');
	dataset.addColumn('creccofi');
	dataset.addColumn('ccpfmei');
	dataset.addColumn('cemail');
	dataset.addColumn('creccsll');
	dataset.addColumn('ccontato');
	dataset.addColumn('ccodbanco');
	dataset.addColumn('cnumcontacc');
	dataset.addColumn('ctpforn');
	dataset.addColumn('ccodmun');
	dataset.addColumn('cpagemaildes');
	dataset.addColumn('ccnpjmat');
	dataset.addColumn('ctipoconta');
	dataset.addColumn('cnomereduz');
	dataset.addColumn('cnatureza');
	dataset.addColumn('ctipo');
	dataset.addColumn('cpagemailcc');

	var ccontactb = params.ccontactb
	var cbairro = params.cbairro;
	var cformapag = params.cformapag;
	var ccondpagto = params.ccondpagto;
	var cendereco = params.cendereco;
	var cpaisbacen = params.cpaisbacen;
	var crecinss = params.crecinss;
	var cddd = params.cddd;
	var cbancmat = params.cbancmat;
	var ctelefone = params.ctelefone;
	var cdvcta = params.cdvcta;
	var creciss = params.creciss;
	var cinscest = params.cinscest;
	var cinscmun = params.cinscmun;
	var csimpnac = params.csimpnac;
	var cpais = params.cpais;
	var cnome = params.cnome;
	var cpagenvemail = params.cpagenvemail;
	var cfornmei = params.cfornmei;
	var cagencia = params.cagencia;
	var crecpis = params.crecpis;
	var cestado = params.cestado;
	var ccep = params.ccep;
	var cnpjempresa = params.cnpjempresa;
	var ccalcirf = params.ccalcirf;
	var ccnpj = params.ccnpj;
	var creccofi = params.creccofi;
	var ccpfmei = params.ccpfmei;
	var cemail = params.cemail;
	var creccsll = params.creccsll;
	var ccontato = params.ccontato;
	var ccodbanco = params.ccodbanco;
	var cnumcontacc = params.cnumcontacc;
	var ctpforn = params.ctpforn;
	var ccodmun = params.ccodmun;
	var cpagemaildes = params.cpagemaildes;
	var ccnpjmat = params.ccnpjmat;
	var ctipoconta = params.ctipoconta;
	var cnomereduz = params.cnomereduz;
	var cnatureza = params.cnatureza;
	var ctipo = params.ctipo;
	var cpagemailcc = params.cpagemailcc;
	
	dataset.addRow([
		error.message, 
		ccontactb, 
		cbairro, 
		cformapag, 
		ccondpagto, 
		cendereco, 
		cpaisbacen, 
		crecinss, 
		cddd, 
		cbancmat,
		ctelefone, 
		cdvcta, 
		creciss, 
		cinscest, 
		cinscmun, 
		csimpnac,
		cpais, 
		cnome, 
		cpagenvemail, 
		cfornmei,
		cagencia, 
		crecpis, 
		cestado, 
		ccep, 
		cnpjempresa, 
		ccalcirf, 
		ccnpj, 
		creccofi, 
		ccpfmei,
		cemail, 
		creccsll, 
		ccontato, 
		ccodbanco, 
		cnumcontacc, 
		ctpforn,
		ccodmun, 
		cpagemaildes, 
		ccnpjmat,
		ctipoconta, 
		cnomereduz, 
		cnatureza, 
		ctipo, 
		cpagemailcc
	]);

	log.info("processErrorResult");
	log.dir(error);
	log.info(error.message);

	return dataset;
}

function data(inputCNPJ, inputRazaoSocial, inputFantasia, inputCEP, inputLogradouro, inputComplemento, inputBairro, inputMunicipio, inputEstado, inputNomeContato, inputDDDTelefoneContato, inputTelefoneContato, 
	inputEmailContato, inputBanco, inputAgencia, inputConta, selectTipoFornec, inputCodMunicipal, inputCodPaisBacen, inputContaContabil, inputCodPais, inputNatureza, selectRecISS, selectRecPIS, selectRecCOFINS, 
	selectRecCSLL, selectCalcINSS, selectCalcIRRF, inputFormaPag, selectTipoConta, solicitanteEmail, inputDigitoConta, csimpnac, selectTipoFornecedor, inputCPFMEI, inputCNPJFilial, meiRecebeComoPF, recebePelaMatriz) {
	
	log.info("meiRecebeComoPF: "+meiRecebeComoPF);
	
	log.info("recebePelaMatriz: "+recebePelaMatriz);

	var pf = meiRecebeComoPF == "" ? "2" : meiRecebeComoPF;
	var pj = recebePelaMatriz == "" ? "2" : recebePelaMatriz;

	log.info("pf: "+pf);
	
	log.info("pj: "+pj);

	return {
		"fluigService" : "IntegracaoProtheus_003",
		"operation" : "fornecedor",
		"soapService" : "RHMWS003",
		"portType" : "RHMWS003SOAP",
		"locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119083._4040.RHMWS003",
		"portTypeMethod" : "getRHMWS003SOAP",
		"parameters" : [ ],
		"inputValues" : {
			"ccontactb" : inputContaContabil,
			"cbairro" : inputBairro,
			"cformapag" : inputFormaPag,
			"ccondpagto" : "",
			"cendereco" : inputLogradouro,
			"cpaisbacen" : inputCodPaisBacen,
			"crecinss" : selectCalcINSS,
			"cddd" : inputDDDTelefoneContato,
			"cbancmat" : pj,
			"ctelefone" : inputTelefoneContato,
			"cdvcta" : inputDigitoConta,
			"creciss" : selectRecISS,
			"cinscest" : "",
			"cinscmun" : "",
			"csimpnac" : csimpnac,
			"cpais" : inputCodPais,
			"cnome" : inputRazaoSocial,
			"cpagenvemail" : "1",
			"cfornmei" : pf,
			"cagencia" : inputAgencia,
			"crecpis" : selectRecPIS,
			"cestado" : inputEstado,
			"ccep" : inputCEP,
			"cnpjempresa" : "01430943000117",
			"ccalcirf" : selectCalcIRRF,
			"ccnpj" : inputCNPJ,
			"creccofi" : selectRecCOFINS,
			"ccpfmei" : inputCPFMEI,
			"cemail" : inputEmailContato,
			"creccsll" : selectRecCSLL,
			"ccontato" : inputNomeContato,
			"ccodbanco" : inputBanco,
			"cnumcontacc" : inputConta,
			"ctpforn" : selectTipoFornecedor,
			"ccodmun" : inputCodMunicipal,
			"cpagemaildes" : solicitanteEmail,
			"ccnpjmat" : inputCNPJFilial,
			"ctipoconta" : selectTipoConta,
			"cnomereduz" : inputFantasia,
			"cnatureza" : inputNatureza,
			"ctipo" : selectTipoFornec,
			"cpagemailcc" : ""
		},
		"inputAssignments" : {
			"ccontactb" : "VALUE",
			"cbairro" : "VALUE",
			"cformapag" : "VALUE",
			"ccondpagto" : "VALUE",
			"cendereco" : "VALUE",
			"cpaisbacen" : "VALUE",
			"crecinss" : "VALUE",
			"cddd" : "VALUE",
			"cbancmat" : "VALUE",
			"ctelefone" : "VALUE",
			"cdvcta" : "VALUE",
			"creciss" : "VALUE",
			"cinscest" : "VALUE",
			"cinscmun" : "VALUE",
			"csimpnac" : "VALUE",
			"cpais" : "VALUE",
			"cnome" : "VALUE",
			"cpagenvemail" : "VALUE",
			"cfornmei" : "VALUE",
			"cagencia" : "VALUE",
			"crecpis" : "VALUE",
			"cestado" : "VALUE",
			"ccep" : "VALUE",
			"cnpjempresa" : "VALUE",
			"ccalcirf" : "VALUE",
			"ccnpj" : "VALUE",
			"creccofi" : "VALUE",
			"ccpfmei" : "VALUE",
			"cemail" : "VALUE",
			"creccsll" : "VALUE",
			"ccontato" : "VALUE",
			"ccodbanco" : "VALUE",
			"cnumcontacc" : "VALUE",
			"ctpforn" : "VALUE",
			"ccodmun" : "VALUE",
			"cpagemaildes" : "VALUE",
			"ccnpjmat" : "VALUE",
			"ctipoconta" : "VALUE",
			"cnomereduz" : "VALUE",
			"cnatureza" : "VALUE",
			"ctipo" : "VALUE",
			"cpagemailcc" : "VALUE"
		},
		"outputValues" : { },
		"outputAssignments" : { },
		"extraParams" : {
			"enabled" : false
		}
	}
}

 function stringToBoolean(param) {
	 if(typeof(param) === 'boolean') { 
		 return param; 
	 } 
	 if (param == null || param === 'null') { 
		 return false; 
	 } 
	 switch(param.toLowerCase().trim()) { 
		 case 'true': case 'yes': case '1': return true; 
		 case 'false': case 'no': case '0': case null: return false; 
		 default: return Boolean(param); 
	 } 
} 