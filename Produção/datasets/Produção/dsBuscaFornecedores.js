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
	log.dir("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<INPUT VALUES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	log.dir(serviceData.inputValues);
	var user = "wsfluig";
	var pass = "wsfluig";
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS004SOAP();
	var authIwsDataServer = serviceHelper.getBasicAuthenticatedClient(service, 'br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS004SOAP', user, pass);
	var response = authIwsDataServer.rhmws004D(getParamValue(params.empresa, assigns.empresa), getParamValue(params.filial, assigns.filial), 
		getParamValue(params.cnpj, assigns.cnpj), getParamValue(params.pesq, assigns.pesq), 
		getParamValue(params.codforn, assigns.codforn));

	return response;
}

function defineStructure() {
		addColumn("aGENCIA");
	addColumn("bANCO");
	addColumn("cNPJ");
	addColumn("cODFORN");
	addColumn("cONTA");
	addColumn("fORMAPAG");
	addColumn("lOJAFORN");
	addColumn("nOME");
	addColumn("tIPOCONTA");
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
	dataset.addColumn("bANCO");
	dataset.addColumn("cNPJ");
	dataset.addColumn("cODFORN");
	dataset.addColumn("cONTA");
	dataset.addColumn("fORMAPAG");
	dataset.addColumn("lOJAFORN");
	dataset.addColumn("nOME");
	dataset.addColumn("tIPOCONTA");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getAGENCIA(), result.get(i).getBANCO(), result.get(i).getCNPJ(), result.get(i).getCODFORN(), result.get(i).getCONTA(), result.get(i).getFORMAPAG(), result.get(i).getLOJAFORN(), result.get(i).getNOME(), result.get(i).getTIPOCONTA()]);
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