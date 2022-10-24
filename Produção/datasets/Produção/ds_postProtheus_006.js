function createDataset(fields, constraints, sortFields){
	try{
		return processResult(callService(fields, constraints, sortFields));
	}catch(e){
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {

	var empresa = "";
	var filial = "";
	var cnpjFilial = "";
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
	var nUMSCSUBSTIT = "";

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
			if (constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
			if (constraints[i].fieldName == "nUMSCSUBSTIT") nUMSCSUBSTIT = constraints[i].initialValue;
        }
	}

	log.info("$$$$$$$$$$ ds_postProtheus_006 $$$$$$$$$$");
	log.info("$$$$$$$$$$ Empresa: "+empresa);
	log.info("$$$$$$$$$$ Filial: "+filial);
	log.info("$$$$$$$$$$ CNPJ Filial: "+cnpjFilial);
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
	var serviceData = data(filial,empresa,cnpjFilial,tIPOREQUIS,dTEMISSAO,nATFLUIG,pROCFLUIG,iTENSSC,sOLICITANTE,tIPOPRIORI,lOCENTREGA,aPROVADOR,fORNSUGERIDO,nUMSCSUBSTIT);
	var params = serviceData.inputValues;
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS006SOAP();
    var authIwsDataServer = serviceHelper.getBasicAuthenticatedClient(service, 'br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS006SOAP', user, pass);
	var response = authIwsDataServer.rhmws006A(
		empresa, 
		filial,
		cnpjFilial,
		fillSolcomp(serviceHelper, params.solcomp)
	);

	log.info("$$$$$$$$$$ Response: "+response);
	return response;
}

function defineStructure() {
	addColumn('response');
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
	var empresa = "";
	var filial = "";
	var cnpjFilial = "";
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
	var nUMSCSUBSTIT = "";

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
			if (constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
			if (constraints[i].fieldName == "nUMSCSUBSTIT") nUMSCSUBSTIT = constraints[i].initialValue;
        }
	}

	var params = data(filial,empresa,cnpjFilial,tIPOREQUIS,dTEMISSAO,nATFLUIG,pROCFLUIG,iTENSSC,sOLICITANTE,tIPOPRIORI,lOCENTREGA,aPROVADOR,fORNSUGERIDO).inputValues;
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn('response');
	dataset.addColumn('filial');
	dataset.addColumn('solcomp');
	dataset.addColumn('empresa');
	dataset.addColumn('cnpjFilial');

	var filial = params.filial;
	var solcomp = JSONUtil.toJSON(params.solcomp);
	var empresa = params.empresa;
	var cnpjFilial = params.cnpjFilial;

	dataset.addRow([error.message, filial, solcomp, empresa, cnpjFilial]);
	log.info("$$$$$$$$$$ PROCESS ERROR RESULT $$$$$$$$$$");
	log.dir(dataset);
	return dataset;
}

function fillITENSSC(serviceHelper, params) {
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
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.ARRAYOFTCOLSSC1");
	for (var i = 0; i < params.length; i++) {
		result.getTCOLSSC1().add(fillITENSSC(serviceHelper, params[i]));
	}
	return result;
}

function fillSolcomp(serviceHelper, params) {	
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.TCABSC1");
	result.setAPROVADOR(params.aPROVADOR);
	result.setDTEMISSAO(params.dTEMISSAO);
	result.setLOCENTREGA(params.lOCENTREGA);
	result.setNATFLUIG(params.nATFLUIG);
	result.setPROCFLUIG(params.pROCFLUIG);
	result.setSOLICITANTE(params.sOLICITANTE);
	result.setTIPOPRIORI(params.tIPOPRIORI);
	result.setTIPOREQUIS(params.tIPOREQUIS);
	result.setFORNSUGERIDO(params.fORNSUGERIDO);
	result.setNUMSCSUBSTIT(params.nUMSCSUBSTIT);
	result.setITENSSC(fillITENSSCArray(serviceHelper, params.iTENSSC));
	return result;
}

function data(filial,empresa,cnpjFilial,tIPOREQUIS,dTEMISSAO,nATFLUIG,pROCFLUIG,iTENSSC,sOLICITANTE,tIPOPRIORI,lOCENTREGA,aPROVADOR,fORNSUGERIDO,nUMSCSUBSTIT) {
	return {
		"fluigService" : "IntegracaoProtheus_006",
		"operation" : "rhmws006A",
		"soapService" : "RHMWS006",
		"portType" : "RHMWS006SOAP",
		"locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS006",
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
			"nUMSCSUBSTIT": nUMSCSUBSTIT
			},
			"cnpjFilial": cnpjFilial,
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
			"cNPJFILIAL": "VALUE",
			"nUMSCSUBSTIT": "VALUE"
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