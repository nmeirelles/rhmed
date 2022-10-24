function createDataset(fields, constraints, sortFields){
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("response");

	var filial = "";
	var tITPAG = {};
	var empresa = "";
	var cnpjFilial = "";

	if(constraints != null){
        for(var i = 0; i < constraints.length; i++){
			if(constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if(constraints[i].fieldName == "tITPAG") tITPAG = JSON.parse(constraints[i].initialValue);
			if(constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if(constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
        }
	}

	log.info("$$$$$$$$$$ ds_postProtheus_008 $$$$$$$$$$");
	log.info("$$$$$$$$$$ Filial: "+filial);
	log.info("$$$$$$$$$$ Empresa: "+empresa);
	log.info("$$$$$$$$$$ CNPJ Filial: "+cnpjFilial);
	log.dir(tITPAG);

	try{
		var serviceHelper = ServiceManager.getService("IntegracaoProtheus_008");
		var serviceLocator = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119083._4040.RHMWS008");
		var service = serviceLocator.getRHMWS008SOAP();
		var response = service.rhmws008A(empresa, filial, cnpjFilial , fillTTITULO2(tITPAG));
		dataset.addRow([response]);
	}catch(error){
		var message = error.message;
		dataset.addRow([message]);
	}
	
	return dataset;
}

function fillTRATEIO(params){
	var serviceHelper = ServiceManager.getService("IntegracaoProtheus_008");
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119083._4040.TRATEIO");
	result.setCONTACRE(params.cONTACRE); 
	result.setCONTADEB(params.cONTADEB); 
	result.setHISTRATEIO(params.hISTRATEIO); 
	result.setVLRRATEIO(params.vLRRATEIO); 
	return result;
}

function fillARRAYOFTRATEIO(params){
	var serviceHelper = ServiceManager.getService("IntegracaoProtheus_008");
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119083._4040.ARRAYOFTRATEIO");
	for(var i = 0; i < params.length; i++) {
		result.getTRATEIO().add(fillTRATEIO(params[i]));
	}
	return result;
}

function fillTTITULO2(params){
	var serviceHelper = ServiceManager.getService("IntegracaoProtheus_008");
	var result = serviceHelper.instantiate("br.com.cloudtotvs.protheus.rhmedconsultores119083._4040.TTITULO2");
	result.setCCUSTODEB(params.cCUSTODEB);
	result.setCODBARRAS(params.cODBARRAS);
	result.setCODFORN(params.cODFORN); 
	result.setDTEMISSAO(params.dTEMISSAO);
	result.setDTPAGAMENTO(params.dTPAGAMENTO);
	result.setDTVENCTO(params.dTVENCTO);
	result.setHISTORICO(params.hISTORICO);
	result.setITENSRATEIO(fillARRAYOFTRATEIO(params.iTENSRATEIO));
	result.setLINDIGITAVEL(params.lINDIGITAVEL);
	result.setLOJAFORN(params.lOJAFORN); 
	result.setNATFLUIG(params.nATFLUIG); 
	result.setNUMTIT(params.nUMTIT); 
	result.setOBSERVACAO(params.oBSERVACAO); 
	result.setPROCFLUIG(params.pROCFLUIG); 
	return result;
}