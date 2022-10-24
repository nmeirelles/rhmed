function createDataset(fields, constraints, sortFields){
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields){
	var filial = "";
	var nfentrada = {};
	var cnpjFilial = "";
	var empresa = "";

	if(constraints != null){
        for(var i = 0; i < constraints.length; i++){
			if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if (constraints[i].fieldName == "nfentrada") nfentrada = JSON.parse(constraints[i].initialValue);
			if (constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if (constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
        }
	}

	log.info("$$$$$$$$$$ ds_postProtheus_005 $$$$$$$$$$");
	log.info("$$$$$$$$$$ Filial: "+filial);
	log.info("$$$$$$$$$$ Empresa: "+empresa);
	log.info("$$$$$$$$$$ CNPJ Filial: "+cnpjFilial);
	log.dir(nfentrada);
	
	var user = "wsfluig";
	var pass = "wsfluig";
	var serviceData = data(filial, nfentrada, empresa, cnpjFilial);
	var params = serviceData.inputValues;
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS005SOAP();
	var authIwsDataServer = serviceHelper.getBasicAuthenticatedClient(service, 'br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS005SOAP', user, pass);
	var response = authIwsDataServer.rhmws005A(params.empresa, params.filial, params.cnpjFilial, fillTNF(serviceHelper, params.nfentrada));
	log.info("$$$$$$$$$$ Response: "+response);	
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
	return dataset;
}

function processErrorResult(error, constraints) {
	var filial = "";
	var nfentrada = {};
	var empresa = "";
	var cnpjFilial = "";

	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if (constraints[i].fieldName == "nfentrada") nfentrada = JSON.parse(constraints[i].initialValue);
			if (constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if (constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
        }
	}

	var dataset = DatasetBuilder.newDataset();
	var params = data(filial, nfentrada, empresa, cnpjFilial).inputValues;
	dataset.addColumn('response');
	dataset.addColumn('filial');
	dataset.addColumn('empresa');
	dataset.addColumn('nfentrada');
	dataset.addColumn('cnpjFilial');
	var filial = params.filial;
	var empresa = params.empresa;
	var nfentrada = params.nfentrada;
	var cnpjFilial = params.cnpjFilial;
	dataset.addRow([error.message, filial, empresa, nfentrada, cnpjFilial]);
	log.info("$$$$$$$$$$ PROCESS ERROR RESULT $$$$$$$$$$");
	log.dir(dataset);
	return dataset;
}

function fillTSD1(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TSD1");
	result.setCODCCUSTO(params.cODCCUSTO);
	result.setCODPROD(params.cODPROD);
	result.setCONTACRE(params.cONTACRE);
	result.setCONTADEB(params.cONTADEB);
	result.setQUANTIDADE(params.qUANTIDADE);
	result.setTOTAL(params.tOTAL);
	result.setVALUNIT(params.vALUNIT);
	return result;
}

function fillARRAYOFTSD1(serviceHelper, params){
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.ARRAYOFTSD1");
	for (var i = 0; i < params.length; i++) {
		result.getTSD1().add(fillTSD1(serviceHelper, params[i]));
	}
	return result;
}

function fillTNF(serviceHelper, params){
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TNF");
	result.setTPPAGTO(params.tPPAGTO);
	result.setCODBARRAS(params.cODBARRAS);
	result.setCODFORN(params.cODFORN);
	result.setDTEMISSAO(params.dTEMISSAO);
	result.setDTVENCIMENTO(params.dTVENCIMENTO);
	result.setLOJA(params.lOJA);
	result.setNATFLUIG(params.nATFLUIG);
	result.setNUMDOC(params.nUMDOC);
	result.setPROCFLUIG(params.pROCFLUIG);
	result.setSERIE("");
	result.setCODBEN(params.cODBEN);
	result.setLOJBEN(params.lOJBEN);
	result.setITENSNF(fillARRAYOFTSD1(serviceHelper, params.iTENSNF));
	return result;
}

function data(filial, nfentrada, empresa, cnpjFilial) {
	return {
		"fluigService" : "IntegracaoProtheus_005",
		"operation" : "rhmws005A",
		"soapService" : "RHMWS005",
		"portType" : "RHMWS005SOAP",
		"locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS005",
		"portTypeMethod" : "getRHMWS005SOAP",
		"parameters" : [ ],
		"inputValues" : {
			"filial" : filial,
			"empresa" : empresa,
			"nfentrada" : nfentrada,
			"cnpjFilial" : cnpjFilial
		},
		"inputAssignments" : {
			"filial" : "VALUE",
			"empresa" : "VALUE",
			"cnpjFilial" : "VALUE",
			"nfentrada" : {
				"iTENSNF" : [ { } ]
			}
		},
		"outputValues" : { },
		"outputAssignments" : { },
		"extraParams" : {
			"enabled" : false
		}
	}
}