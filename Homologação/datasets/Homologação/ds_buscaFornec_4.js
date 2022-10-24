function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS004SOAP();
	var response = service.rhmws004D(getParamValue(params.empresa, assigns.empresa), getParamValue(params.filial, assigns.filial), 
		getParamValue(params.cnpj, assigns.cnpj), getParamValue(params.pesq, assigns.pesq), 
		getParamValue(params.codforn, assigns.codforn));

	return response;
}

function defineStructure() {
		addColumn("aGENCIA");
	addColumn("bAIRRO");
	addColumn("bANCO");
	addColumn("cCALCIRF");
	addColumn("cCONDPAGTO");
	addColumn("cCONTATO");
	addColumn("cDDD");
	addColumn("cDVCTA");
	addColumn("cEMAIL");
	addColumn("cEP");
	addColumn("cINSCEST");
	addColumn("cINSCMUN");
	addColumn("cNATUREZA");
	addColumn("cNOMEREDUZ");
	addColumn("cNPJ");
	addColumn("cODFORN");
	addColumn("cODMUNIC");
	addColumn("cOMPLEMENTO");
	addColumn("cONTA");
	addColumn("cONTACTB");
	addColumn("cPAGEMAILCC");
	addColumn("cPAGEMAILDES");
	addColumn("cPAGENVEMAIL");
	addColumn("cRECCOFI");
	addColumn("cRECCSLL");
	addColumn("cRECINSS");
	addColumn("cRECISS");
	addColumn("cRECPIS");
	addColumn("cSIMPNAC");
	addColumn("cTELEFONE");
	addColumn("fORMAPAG");
	addColumn("lOGRADOURO");
	addColumn("lOJAFORN");
	addColumn("mUNICIPIO");
	addColumn("nOME");
	addColumn("nUMERO");
	addColumn("pAISBACEN");
	addColumn("pAISIBGE");
	addColumn("tIPOCONTA");
	addColumn("tIPOFOR");
	addColumn("uF");
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

	result = result.getTFORN();

		dataset.addColumn("aGENCIA");
	dataset.addColumn("bAIRRO");
	dataset.addColumn("bANCO");
	dataset.addColumn("cCALCIRF");
	dataset.addColumn("cCONDPAGTO");
	dataset.addColumn("cCONTATO");
	dataset.addColumn("cDDD");
	dataset.addColumn("cDVCTA");
	dataset.addColumn("cEMAIL");
	dataset.addColumn("cEP");
	dataset.addColumn("cINSCEST");
	dataset.addColumn("cINSCMUN");
	dataset.addColumn("cNATUREZA");
	dataset.addColumn("cNOMEREDUZ");
	dataset.addColumn("cNPJ");
	dataset.addColumn("cODFORN");
	dataset.addColumn("cODMUNIC");
	dataset.addColumn("cOMPLEMENTO");
	dataset.addColumn("cONTA");
	dataset.addColumn("cONTACTB");
	dataset.addColumn("cPAGEMAILCC");
	dataset.addColumn("cPAGEMAILDES");
	dataset.addColumn("cPAGENVEMAIL");
	dataset.addColumn("cRECCOFI");
	dataset.addColumn("cRECCSLL");
	dataset.addColumn("cRECINSS");
	dataset.addColumn("cRECISS");
	dataset.addColumn("cRECPIS");
	dataset.addColumn("cSIMPNAC");
	dataset.addColumn("cTELEFONE");
	dataset.addColumn("fORMAPAG");
	dataset.addColumn("lOGRADOURO");
	dataset.addColumn("lOJAFORN");
	dataset.addColumn("mUNICIPIO");
	dataset.addColumn("nOME");
	dataset.addColumn("nUMERO");
	dataset.addColumn("pAISBACEN");
	dataset.addColumn("pAISIBGE");
	dataset.addColumn("tIPOCONTA");
	dataset.addColumn("tIPOFOR");
	dataset.addColumn("uF");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getAGENCIA(), result.get(i).getBAIRRO(), result.get(i).getBANCO(), result.get(i).getCCALCIRF(), result.get(i).getCCONDPAGTO(), result.get(i).getCCONTATO(), result.get(i).getCDDD(), result.get(i).getCDVCTA(), result.get(i).getCEMAIL(), result.get(i).getCEP(), result.get(i).getCINSCEST(), result.get(i).getCINSCMUN(), result.get(i).getCNATUREZA(), result.get(i).getCNOMEREDUZ(), result.get(i).getCNPJ(), result.get(i).getCODFORN(), result.get(i).getCODMUNIC(), result.get(i).getCOMPLEMENTO(), result.get(i).getCONTA(), result.get(i).getCONTACTB(), result.get(i).getCPAGEMAILCC(), result.get(i).getCPAGEMAILDES(), result.get(i).getCPAGENVEMAIL(), result.get(i).getCRECCOFI(), result.get(i).getCRECCSLL(), result.get(i).getCRECINSS(), result.get(i).getCRECISS(), result.get(i).getCRECPIS(), result.get(i).getCSIMPNAC(), result.get(i).getCTELEFONE(), result.get(i).getFORMAPAG(), result.get(i).getLOGRADOURO(), result.get(i).getLOJAFORN(), result.get(i).getMUNICIPIO(), result.get(i).getNOME(), result.get(i).getNUMERO(), result.get(i).getPAISBACEN(), result.get(i).getPAISIBGE(), result.get(i).getTIPOCONTA(), result.get(i).getTIPOFOR(), result.get(i).getUF()]);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('filial');
	dataset.addColumn('pesq');
	dataset.addColumn('codforn');
	dataset.addColumn('cnpj');
	dataset.addColumn('empresa');

	var filial = isPrimitive(params.filial) ? params.filial : JSONUtil.toJSON(params.filial);
	var pesq = isPrimitive(params.pesq) ? params.pesq : JSONUtil.toJSON(params.pesq);
	var codforn = isPrimitive(params.codforn) ? params.codforn : JSONUtil.toJSON(params.codforn);
	var cnpj = isPrimitive(params.cnpj) ? params.cnpj : JSONUtil.toJSON(params.cnpj);
	var empresa = isPrimitive(params.empresa) ? params.empresa : JSONUtil.toJSON(params.empresa);

	dataset.addRow([error.message, filial, pesq, codforn, cnpj, empresa]);

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


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "IntegracaoProtheus",
  "operation" : "rhmws004D",
  "soapService" : "RHMWS004",
  "portType" : "RHMWS004SOAP",
  "locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS004",
  "portTypeMethod" : "getRHMWS004SOAP",
  "parameters" : [ ],
  "inputValues" : {
    "filial" : "0101",
    "pesq" : "",
    "codforn" : "",
    "cnpj" : "",
    "empresa" : "01"
  },
  "inputAssignments" : {
    "filial" : "VALUE",
    "pesq" : "VALUE",
    "codforn" : "VALUE",
    "cnpj" : "VALUE",
    "empresa" : "VALUE"
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