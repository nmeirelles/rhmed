function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	log.info("callService ds_postProtheus_005-2");

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
	var cODBEN = "";
	var lOJBEN = "";

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
			if (constraints[i].fieldName == "cODBEN") cODBEN = constraints[i].initialValue;
			if (constraints[i].fieldName == "lOJBEN") lOJBEN = constraints[i].initialValue;
        }
	}

	var serviceData = data(filial, empresa, cODFORN, dTEMISSAO, dTVENCIMENTO, iTENSNF, lOJA, nATFLUIG, nUMDOC, pROCFLUIG, sERIE, cnpjFilial, cODBEN, lOJBEN);
	var params = serviceData.inputValues;
	log.info("params");
	log.dir(params);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS005SOAP();
	var response = service.rhmws005A(
		params.empresa, 
		params.filial, 
		params.cnpjfilial, 
		fillTNF(serviceHelper, params.nfentrada)
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

function fillTSD1(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._8300.TSD1");
	log.info("fillTSD1");
	log.dir(params);
	result.setCODCCUSTO(params.cODCCUSTO);
	result.setCODPROD(params.cODPROD);
	result.setCONTACRE(params.cONTACRE);
	result.setCONTADEB(params.cONTADEB);
	result.setQUANTIDADE(params.qUANTIDADE);
	result.setTOTAL(params.tOTAL);
	result.setVALUNIT(params.vALUNIT);
	return result;
}

function fillARRAYOFTSD1(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._8300.ARRAYOFTSD1");
	log.info("fillARRAYOFTSD1");
	log.dir(params);
	for (var i = 0; i < params.length; i++) {
		result.getTSD1().add(fillTSD1(serviceHelper, params[i]));
	}
	return result;
}

function fillTNF(serviceHelper, params) {
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._8300.TNF");
	log.info("fillTNF");
	log.dir(params);
	//result.setCODBARRAS(params.cODBARRAS);
	result.setCODFORN(params.cODFORN);
	result.setDTEMISSAO(params.dTEMISSAO);
	result.setDTVENCIMENTO(params.dTVENCIMENTO);
	result.setITENSNF(fillARRAYOFTSD1(serviceHelper, params.iTENSNF));
	//result.setLINDIGITAVEL(params.lINDIGITAVEL);
	result.setLOJA(params.lOJA);
	result.setNATFLUIG(params.nATFLUIG);
	result.setNUMDOC(params.nUMDOC);
	result.setPROCFLUIG(params.pROCFLUIG);
	result.setSERIE(params.sERIE);
	result.setCODBEN(params.cODBEN);
	result.setLOJBEN(params.lOJBEN);
	//result.setSIMULACAO(params.sIMULACAO);
	return result;
}

function data(filial, empresa, cODFORN, dTEMISSAO, dTVENCIMENTO, iTENSNF, lOJA, nATFLUIG, nUMDOC, pROCFLUIG, sERIE, cnpjfilial, cODBEN, lOJBEN) {
	return {
		"fluigService" : "IntegracaoProtheus_005",
		"operation" : "rhmws005A",
		"soapService" : "RHMWS005",
		"portType" : "RHMWS005SOAP",
		"locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._8300.RHMWS005",
		"portTypeMethod" : "getRHMWS005SOAP",
		"parameters" : [ ],
		"inputValues" : {
			"filial" : filial,
			"empresa" : empresa,
			"nfentrada" : {
				"cODFORN" : cODFORN,
				"dTEMISSAO" : dTEMISSAO,
				"dTVENCIMENTO" : dTVENCIMENTO,
				"iTENSNF" : iTENSNF,
				"lOJA" : lOJA,
				"nATFLUIG" : nATFLUIG,
				"nUMDOC" : nUMDOC,
				"pROCFLUIG" : pROCFLUIG,
				"sERIE" : sERIE,
				"cODBEN": cODBEN,
				"lOJBEN": lOJBEN
			},
			"cnpjfilial" : cnpjfilial
		},
		"inputAssignments" : {
			"filial" : "VALUE",
			"empresa" : "VALUE",
			"nfentrada" : {
				"cODFORN" : "VALUE",
				"dTEMISSAO" : "VALUE",
				"dTVENCIMENTO" : "VALUE",
				"iTENSNF" : [ 
					{
					"cODCCUSTO" : "VALUE",
					"cODPROD" : "VALUE",
					"cONTACRE" : "VALUE",
					"cONTADEB" : "VALUE",
					"qUANTIDADE" : "VALUE",
					"tOTAL" : "VALUE",
					"vALUNIT" : "VALUE"
					}, {
					"cODCCUSTO" : "VALUE",
					"cODPROD" : "VALUE",
					"cONTACRE" : "VALUE",
					"cONTADEB" : "VALUE",
					"qUANTIDADE" : "VALUE",
					"tOTAL" : "VALUE",
					"vALUNIT" : "VALUE"
					} 
				],
				"lOJA" : "VALUE",
				"nATFLUIG" : "VALUE",
				"nUMDOC" : "VALUE",
				"pROCFLUIG" : "VALUE",
				"sERIE" : "VALUE"
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