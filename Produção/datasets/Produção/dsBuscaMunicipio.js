function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var pufmunic = "";

	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "pufmunic") pufmunic = constraints[i].initialValue;
        }
	}

	log.info("$$$$$$$$$$ Código Estado: "+pufmunic);

	var serviceData = data(pufmunic);
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRHMWS004SOAP();
	var response = service.rhmws004H(getParamValue(params.empresa, assigns.empresa), getParamValue(params.filial, assigns.filial), 
		getParamValue(params.pufmunic, assigns.pufmunic), getParamValue(params.pcodmunic, assigns.pcodmunic)
		);

	return response;
}

function defineStructure() {
	addColumn("cODMUNIC");
	addColumn("dESCMUNIC");
	addColumn("uFMUNIC");
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

	result = result.getTCODMUNIC();

		dataset.addColumn("cODMUNIC");
		dataset.addColumn("dESCMUNIC");
		dataset.addColumn("uFMUNIC");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([
			result.get(i).getCODMUNIC(), 
			result.get(i).getDESCMUNIC(), 
			result.get(i).getUFMUNIC()]);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

	dataset.addColumn('error');
	dataset.addColumn('filial');
	dataset.addColumn('empresa');
	dataset.addColumn('pcodmunic');
	dataset.addColumn('pufmunic');

	var filial = isPrimitive(params.filial) ? params.filial : JSONUtil.toJSON(params.filial);
	var empresa = isPrimitive(params.empresa) ? params.empresa : JSONUtil.toJSON(params.empresa);
	var pcodmunic = isPrimitive(params.pcodmunic) ? params.pcodmunic : JSONUtil.toJSON(params.pcodmunic);
	var pufmunic = isPrimitive(params.pufmunic) ? params.pufmunic : JSONUtil.toJSON(params.pufmunic);

	dataset.addRow([error.message, filial, empresa, pcodmunic, pufmunic]);

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
	var objectFactory = serviceHelper.instantiate("br.com.totvscloud.protheus.tst.k7and8._48104.ObjectFactory");

	return objectFactory;
}



function data(pufmunic) {
	return {
  "fluigService" : "IntegracaoProtheus",
  "operation" : "rhmws004H",
  "soapService" : "RHMWS004",
  "portType" : "RHMWS004SOAP",
  "locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS004",
  "portTypeMethod" : "getRHMWS004SOAP",
  "parameters" : [ ],
  "inputValues" : {
    "filial" : "0101",
    "empresa" : "01",
    "pcodmunic" : "",
    "pufmunic" : ""
  },
  "inputAssignments" : {
    "filial" : "VALUE",
    "empresa" : "VALUE",
    "pcodmunic" : "VALUE",
    "pufmunic" : "VALUE"
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