function createDataset(fields, constraints, sortFields){
	try{
		return processResult(callService(fields, constraints, sortFields));
	}catch(e){
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {

	var filial = "";
	var empresa = "";
	var tIPOREQUIS = "";
	var dTEMISSAO = "";
	var nATFLUIG = "";
	var pROCFLUIG = "";
	var iTENSSC = [];
	var sOLICITANTE = "";
	var tIPOPRIORI = "";
	var lOCENTREGA = "";
	var aPROVADOR = "";
	var fORNSUGERIDO = "";

	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if (constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if (constraints[i].fieldName == "tIPOREQUIS") tIPOREQUIS = constraints[i].initialValue;
			if (constraints[i].fieldName == "dTEMISSAO") dTEMISSAO = constraints[i].initialValue;
			if (constraints[i].fieldName == "nATFLUIG") nATFLUIG = constraints[i].initialValue;
			if (constraints[i].fieldName == "pROCFLUIG") pROCFLUIG = constraints[i].initialValue;
			if (constraints[i].fieldName == "iTENSSC") iTENSSC = JSON.parse(constraints[i].initialValue);
			if (constraints[i].fieldName == "sOLICITANTE") sOLICITANTE = constraints[i].initialValue;
			if (constraints[i].fieldName == "tIPOPRIORI") tIPOPRIORI = constraints[i].initialValue;
			if (constraints[i].fieldName == "lOCENTREGA") lOCENTREGA = constraints[i].initialValue;
			if (constraints[i].fieldName == "aPROVADOR") aPROVADOR = constraints[i].initialValue;
			if (constraints[i].fieldName == "fORNSUGERIDO") fORNSUGERIDO = constraints[i].initialValue;
        }
	}

	log.info("$$$$$$$$$$ ds_postProtheus_006 $$$$$$$$$$");
	log.info("$$$$$$$$$$ Empresa: "+empresa);
	log.info("$$$$$$$$$$ Filial: "+filial);
	log.info("$$$$$$$$$$ Tipo Requisição: "+tIPOREQUIS);
	log.info("$$$$$$$$$$ Data Emissão: "+dTEMISSAO);
	log.info("$$$$$$$$$$ Natureza Fluig: "+nATFLUIG);
	log.info("$$$$$$$$$$ Processo Fluig: "+pROCFLUIG);
	log.info("$$$$$$$$$$ Solicitante: "+sOLICITANTE);
	log.info("$$$$$$$$$$ Tipo Prioridade: "+tIPOPRIORI);
	log.info("$$$$$$$$$$ Local Entrega: "+lOCENTREGA);
	log.info("$$$$$$$$$$ Aprovador: "+aPROVADOR);
	log.info("$$$$$$$$$$ Fornecedor Sugerido: "+fORNSUGERIDO);
	log.dir(iTENSSC);
	var user = "wsfluig";
	var pass = "wsfluig";
	var serviceData = data(filial,empresa,tIPOREQUIS,dTEMISSAO,nATFLUIG,pROCFLUIG,iTENSSC,sOLICITANTE,tIPOPRIORI,lOCENTREGA,aPROVADOR,fORNSUGERIDO);
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS006SOAP();
    var authIwsDataServer = serviceHelper.getBasicAuthenticatedClient(service, 'br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS006SOAP', user, pass);
	var response = authIwsDataServer.rhmws006A(
		getParamValue(params.empresa, assigns.empresa), 
		getParamValue(params.filial, assigns.filial), 
		fillSolcomp(serviceHelper, params.solcomp, assigns.solcomp)
	);

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

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("response");
	dataset.addRow([result]);
	log.info("################PROCESS RESULT###############");
	log.dir(dataset);
	return dataset;
}

function processErrorResult(error, constraints) {
	var filial = "";
	var empresa = "";
	var tIPOREQUIS = "";
	var dTEMISSAO = "";
	var nATFLUIG = "";
	var pROCFLUIG = "";
	var iTENSSC = [];
	var sOLICITANTE = "";
	var tIPOPRIORI = "";
	var lOCENTREGA = "";
	var aPROVADOR = "";
	var fORNSUGERIDO = "";

	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if (constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if (constraints[i].fieldName == "tIPOREQUIS") tIPOREQUIS = constraints[i].initialValue;
			if (constraints[i].fieldName == "dTEMISSAO") dTEMISSAO = constraints[i].initialValue;
			if (constraints[i].fieldName == "nATFLUIG") nATFLUIG = constraints[i].initialValue;
			if (constraints[i].fieldName == "pROCFLUIG") pROCFLUIG = constraints[i].initialValue;
			if (constraints[i].fieldName == "iTENSSC") iTENSSC = JSON.parse(constraints[i].initialValue);
			if (constraints[i].fieldName == "sOLICITANTE") sOLICITANTE = constraints[i].initialValue;
			if (constraints[i].fieldName == "tIPOPRIORI") tIPOPRIORI = constraints[i].initialValue;
			if (constraints[i].fieldName == "lOCENTREGA") lOCENTREGA = constraints[i].initialValue;
			if (constraints[i].fieldName == "aPROVADOR") aPROVADOR = constraints[i].initialValue;
			if (constraints[i].fieldName == "fORNSUGERIDO") fORNSUGERIDO = constraints[i].initialValue;
        }
	}

	var dataset = DatasetBuilder.newDataset();

	var params = data(filial,empresa,tIPOREQUIS,dTEMISSAO,nATFLUIG,pROCFLUIG,iTENSSC,sOLICITANTE,tIPOPRIORI,lOCENTREGA,aPROVADOR,fORNSUGERIDO).inputValues;
	verifyConstraints(params, constraints);

	dataset.addColumn('response');
	dataset.addColumn('filial');
	dataset.addColumn('solcomp');
	dataset.addColumn('empresa');

	var filial = isPrimitive(params.filial) ? params.filial : JSONUtil.toJSON(params.filial);
	var solcomp = isPrimitive(params.solcomp) ? params.solcomp : JSONUtil.toJSON(params.solcomp);
	var empresa = isPrimitive(params.empresa) ? params.empresa : JSONUtil.toJSON(params.empresa);

	dataset.addRow([error.message, filial, solcomp, empresa]);
	log.info("$$$$$$$$$$ PROCESS ERROR RESULT $$$$$$$$$$");
	log.dir(dataset);
	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}

function fillITENSSC(serviceHelper, params) {
	if (params == null) {
		return null;
	}
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TCOLSSC1");
	result.setCODPROD(params.CodProd);
	result.setDTNECESSID(params.DtNecessid);
	result.setOBSERVACAO(params.Observacao);
	result.setQUANTIDADE(params.Quantidade);
	result.setTOTAL(params.Total);
	result.setVALUNIT(params.ValUnit);
	result.setCODCCUSTO(params.CodCCusto);
	return result;
}

function fillITENSSCArray(serviceHelper, params) {
	if (params == null) {
		return null;
	}
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.ARRAYOFTCOLSSC1");
	for (var i = 0; i < params.length; i++) {
		result.getTCOLSSC1().add(fillITENSSC(serviceHelper, params[i]));
	}
	return result;
}

function fillSolcomp(serviceHelper, params, assigns) {	
	if (params == null) {
		return null;
	}
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TCABSC1");
	var aPROVADOR = getParamValue(params.aPROVADOR, assigns.aPROVADOR);
	if (hasValue(aPROVADOR)) result.setAPROVADOR(aPROVADOR);
	var dTEMISSAO = getParamValue(params.dTEMISSAO, assigns.dTEMISSAO);
	if (hasValue(dTEMISSAO)) result.setDTEMISSAO(dTEMISSAO);
	var lOCENTREGA = getParamValue(params.lOCENTREGA, assigns.lOCENTREGA);
	if (hasValue(lOCENTREGA)) result.setLOCENTREGA(lOCENTREGA);
	var nATFLUIG = getParamValue(params.nATFLUIG, assigns.nATFLUIG);
	if (hasValue(nATFLUIG)) result.setNATFLUIG(nATFLUIG);
	var pROCFLUIG = getParamValue(params.pROCFLUIG, assigns.pROCFLUIG);
	if (hasValue(pROCFLUIG)) result.setPROCFLUIG(pROCFLUIG);
	var sOLICITANTE = getParamValue(params.sOLICITANTE, assigns.sOLICITANTE);
	if (hasValue(sOLICITANTE)) result.setSOLICITANTE(sOLICITANTE);
	var tIPOPRIORI = getParamValue(params.tIPOPRIORI, assigns.tIPOPRIORI);
	if (hasValue(tIPOPRIORI)) result.setTIPOPRIORI(tIPOPRIORI);
	var tIPOREQUIS = getParamValue(params.tIPOREQUIS, assigns.tIPOREQUIS);
	if (hasValue(tIPOREQUIS)) result.setTIPOREQUIS(tIPOREQUIS);
	var fORNSUGERIDO = getParamValue(params.fORNSUGERIDO, assigns.fORNSUGERIDO);
	if (hasValue(fORNSUGERIDO)) result.setFORNSUGERIDO(fORNSUGERIDO);
	result.setITENSSC(fillITENSSCArray(serviceHelper, params.iTENSSC));
	return result;
}

function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("br.com.totvscloud.protheus.tst.k7and8._48104.ObjectFactory");
	return objectFactory;
}

function data(filial,empresa,tIPOREQUIS,dTEMISSAO,nATFLUIG,pROCFLUIG,iTENSSC,sOLICITANTE,tIPOPRIORI,lOCENTREGA,aPROVADOR,fORNSUGERIDO) {
	return {
		"fluigService" : "IntegracaoProtheus_006",
		"operation" : "rhmws006A",
		"soapService" : "RHMWS006",
		"portType" : "RHMWS006SOAP",
		"locatorClass" : "br.com.totvscloud.protheus.tst.k7and8._48104.RHMWS006",
		"portTypeMethod" : "getRHMWS006SOAP",
		"parameters" : [ ],
		"inputValues" : {
			"filial" : filial,
			"solcomp" : {
			"tIPOREQUIS" : tIPOREQUIS,
			"dTEMISSAO" : dTEMISSAO,
			"aPROVADOR" : aPROVADOR,
			"nATFLUIG" : nATFLUIG,
			"pROCFLUIG" : pROCFLUIG,
			"iTENSSC" : iTENSSC,
			"sOLICITANTE" : sOLICITANTE,
			"tIPOPRIORI" : tIPOPRIORI,
			"lOCENTREGA" : lOCENTREGA,
			"fORNSUGERIDO" : fORNSUGERIDO,
			},
			"empresa" : empresa
		},
		"inputAssignments" : {
			"filial" : "VALUE",
			"solcomp" : {
			"tIPOREQUIS" : "VALUE",
			"dTEMISSAO" : "VALUE",
			"aPROVADOR" : "VALUE",
			"nATFLUIG" : "VALUE",
			"pROCFLUIG" : "VALUE",
			"iTENSSC" : [ ],
			"sOLICITANTE" : "VALUE",
			"tIPOPRIORI" : "VALUE",
			"lOCENTREGA" : "VALUE",
			"fORNSUGERIDO" : "VALUE",
			},
			"empresa" : "VALUE"
		},
		"outputValues" : { },
		"outputAssignments" : { },
		"extraParams" : {
			"enabled" : false
		}
	}
}