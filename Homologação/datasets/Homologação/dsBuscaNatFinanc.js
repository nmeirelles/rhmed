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
	var response = service.rhmws004G(getParamValue(params.empresa, assigns.empresa), getParamValue(params.filial, assigns.filial)
		);

	return response;
}

function defineStructure() {
		addColumn("cODNATUR");
	addColumn("dESCNATUR");
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

	result = result.getTNATUREZA();

		dataset.addColumn("cODNATUR");
	dataset.addColumn("dESCNATUR");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getCODNATUR(), result.get(i).getDESCNATUR()]);
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

	var filial = isPrimitive(params.filial) ? params.filial : JSONUtil.toJSON(params.filial);
	var empresa = isPrimitive(params.empresa) ? params.empresa : JSONUtil.toJSON(params.empresa);

	dataset.addRow([error.message, filial, empresa]);

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
  "operation" : "rhmws004G",
  "soapService" : "RHMWS004",
  "portType" : "RHMWS004SOAP",
  "locatorClass" : "br.com.cloudtotvs.protheus.rhmedconsultores119082._4040.RHMWS004",
  "portTypeMethod" : "getRHMWS004SOAP",
  "parameters" : [ ],
  "inputValues" : {
    "filial" : "0101",
    "empresa" : "01"
  },
  "inputAssignments" : {
    "filial" : "VALUE",
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