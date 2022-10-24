function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	log.info("callService ds_postProtheus_009");

	var filial = "";
	var empresa = "";
	var cODFORN = "";
	var dTEMISSAO = "";
	var dTVENCIMENTO = "";
	var iTENSNF = [];
	var lOJA = "";
	var nATFLUIG = "";
	var nUMDOC = "";
	var pROCFLUIG = "";
	var sERIE = "";
	var cnpjFilial = "";

	if(constraints != null){
        for(var i = 0; i < constraints.length; i++){
			if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if (constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if (constraints[i].fieldName == "cODFORN") cODFORN = constraints[i].initialValue;
			if (constraints[i].fieldName == "dTEMISSAO") dTEMISSAO = constraints[i].initialValue;
			if (constraints[i].fieldName == "dTVENCIMENTO") dTVENCIMENTO = constraints[i].initialValue;
			if (constraints[i].fieldName == "iTENSNF") iTENSNF = JSON.parse(constraints[i].initialValue);
			if (constraints[i].fieldName == "lOJA") lOJA = constraints[i].initialValue;
			if (constraints[i].fieldName == "nATFLUIG") nATFLUIG = constraints[i].initialValue;
			if (constraints[i].fieldName == "nUMDOC") nUMDOC = constraints[i].initialValue;
			if (constraints[i].fieldName == "pROCFLUIG") pROCFLUIG = constraints[i].initialValue;
			if (constraints[i].fieldName == "sERIE") sERIE = constraints[i].initialValue;
			if (constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
        }
	}

	var serviceData = data(filial, empresa, cODFORN, dTEMISSAO, dTVENCIMENTO, iTENSNF, lOJA, nATFLUIG, nUMDOC, pROCFLUIG, sERIE, cnpjFilial);
	var params = serviceData.inputValues;
	log.info("params");
	log.dir(params);
	var user = "wsfluig";
	var pass = "wsfluig";
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS009SOAP();
	var authIwsDataServer = serviceHelper.getBasicAuthenticatedClient(service, 'br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS009SOAP', user, pass);
	var response = authIwsDataServer.rhmws009A(
		params.empresa,
		params.filial, 
		params.cnpjfilial,
		fillTNF9(serviceHelper, params.nfentrada)
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
	dataset.addColumn('error');
	dataset.addRow([error.message]);
	log.info("processErrorResult");
	log.dir(error.message);
	return dataset;
}

function fillTSD19(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TSD19");
	log.info("fillTSD19");
	log.dir(params);
	result.setCODCCUSTO(params.cODCCUSTO);
	result.setCODPROD(params.cODPROD);
	result.setCONTACRE(params.cONTACRE);
	result.setCONTADEB(params.cONTADEB);
	result.setQUANTIDADE(params.qUANTIDADE);
	result.setTOTAL(params.tOTAL);
	result.setTXCORREIOS(params.tXCORREIOS);
	result.setVALUNIT(params.vALUNIT);	
	return result;
}

function fillARRAYOFTSD19(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.ARRAYOFTSD19");
	log.info("fillARRAYOFTSD19");
	log.dir(params);
	for (var i = 0; i < params.length; i++) {
		result.getTSD19().add(fillTSD19(serviceHelper, params[i]));
	}
	return result;
}

function fillTNF9(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TNF9");
	log.info("fillTNF9");
	log.dir(params)
	result.setCODBARRAS(params.cODBARRAS);
	result.setCODFORN(params.cODFORN);
	result.setDTEMISSAO(params.dTEMISSAO);
	result.setDTVENCIMENTO(params.dTVENCIMENTO);
	result.setITENSNF(fillARRAYOFTSD19(serviceHelper, params.iTENSNF));
	result.setLINDIGITAVEL(params.lINDIGITAVEL);
	result.setLOJA(params.lOJA);
	result.setNATFLUIG(params.nATFLUIG);
	result.setNUMDOC(params.nUMDOC);
	result.setPROCFLUIG(params.pROCFLUIG);
	result.setSERIE(params.sERIE);
	return result;
}

function data(filial, empresa, cODFORN, dTEMISSAO, dTVENCIMENTO, iTENSNF, lOJA, nATFLUIG, nUMDOC, pROCFLUIG, sERIE, cnpjfilial) {
	return {
		"fluigService" : "IntegracaoProtheus_009",
		"operation" : "rhmws009A",
		"soapService" : "RHMWS009",
		"portType" : "RHMWS009SOAP",
		"locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS009",
		"portTypeMethod" : "getRHMWS009SOAP",
		"parameters" : [ ],
		"inputValues" : {
			"filial" : filial,
			"empresa" : empresa,
			"nfentrada" : {
				"iTENSNF" : iTENSNF,
				"dTEMISSAO" : dTEMISSAO,
				"nUMDOC" : nUMDOC,
				"dTVENCIMENTO" : dTVENCIMENTO,
				"nATFLUIG" : nATFLUIG,
				"pROCFLUIG" : pROCFLUIG,
				"lOJA" : lOJA,
				"sERIE" : sERIE,
				"cODFORN" : cODFORN,
				"cODBARRAS" : "",
				"lINDIGITAVEL" : ""
			},
			"cnpjfilial" : cnpjfilial
		},
		"inputAssignments" : {
			"filial" : "VALUE",
			"empresa" : "VALUE",
			"nfentrada" : {
			"iTENSNF" : [ ],
			"sIMULACAO" : "VALUE",
			"dTEMISSAO" : "VALUE",
			"nUMDOC" : "VALUE",
			"dTVENCIMENTO" : "VALUE",
			"nATFLUIG" : "VALUE",
			"pROCFLUIG" : "VALUE",
			"lOJA" : "VALUE",
			"sERIE" : "VALUE",
			"cODFORN" : "VALUE",
			"cODBARRAS" : "VALUE",
			"lINDIGITAVEL" : "VALUE"
			},
			"cnpjfilial" : "VALUE"
		},
		"outputValues" : { },
		"outputAssignments" : { },
		"extraParams" : {
			"enabled" : false
		}
	}
}