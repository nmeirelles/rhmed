function createDataset(fields, constraints, sortFields){
	log.info("ds_postProtheus_007|begin");
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("response");

	var filial = "";
	var tituloPagamento = {};
	var empresa = "";
	var cnpjFilial = "";

	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
			if (constraints[i].fieldName == "tITPAG") tituloPagamento = JSON.parse(constraints[i].initialValue);
			if (constraints[i].fieldName == "empresa") empresa = constraints[i].initialValue;
			if (constraints[i].fieldName == "cnpjFilial") cnpjFilial = constraints[i].initialValue;
        }
	}
	log.info("$$$$$$$$$$ Filial: "+filial);
	log.info("$$$$$$$$$$ Empresa: "+empresa);
	log.info("$$$$$$$$$$ CNPJ Filial: "+cnpjFilial);
	log.dir(tituloPagamento);

	for(let index = 1; index <= 3; index++){
		log.info("index: "+index);
		let service = postTitPag(empresa, filial, cnpjFilial, tituloPagamento);
		log.dir(service);
		let status = service[0];
		let result = service[1];
		log.info(status == true || index == 3);
		if(status == true || index == 3) {
			dataset.addRow([result]);
			break;
		}
	}

    log.info("ds_postProtheus_007|end");
    return dataset;
}
function postTitPag(empresa, filial, cnpjFilial, tituloPagamento){
    try{
        var url = new java.net.URL('https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/RHMWS007');
        log.info(url);
        var connection = url.openConnection();
        var postData = new java.lang.StringBuilder();
		var json = {
			"Empresa":empresa == null ? "" : empresa,
			"Filial":filial == null ? "" : filial,
			"CNPJFilial":cnpjFilial == null ? "" : cnpjFilial,
			"ProcFluig":tituloPagamento.pROCFLUIG == null ? "" : tituloPagamento.pROCFLUIG,
			"TITPAG":{
				"NatFluig":tituloPagamento.nATFLUIG == null ? "" : tituloPagamento.nATFLUIG,
				"CodForn":tituloPagamento.cODFORN == null ? "" : tituloPagamento.cODFORN,
				"LojaForn":tituloPagamento.lOJAFORN == null ? "" : tituloPagamento.lOJAFORN,
				"DtEmissao":tituloPagamento.dTEMISSAO == null ? "" : tituloPagamento.dTEMISSAO,
				"DtVencto":tituloPagamento.dTVENCTO == null ? "" : tituloPagamento.dTVENCTO,
				"CCustoDeb":tituloPagamento.cCUSTODEB == null ? "" : tituloPagamento.cCUSTODEB,
				"VlrPrincipal":tituloPagamento.vLRPRINCIPAL == null ? 0 : tituloPagamento.vLRPRINCIPAL,
				"TpPagto":tituloPagamento.tPPAGTO == null ? "" : tituloPagamento.tPPAGTO,
				"CodBen":tituloPagamento.cODBEN == null ? "" : tituloPagamento.cODBEN,
				"LojBen":tituloPagamento.lOJBEN == null ? "" : tituloPagamento.lOJBEN,
				"NumTit":tituloPagamento.nUMTIT == null ? "" : tituloPagamento.nUMTIT,
				"ContaDeb":tituloPagamento.cONTADEB == null ? "" : tituloPagamento.cONTADEB,
				"ContaCre":tituloPagamento.cONTACRE == null ? "" : tituloPagamento.cONTACRE,
				"Historico":tituloPagamento.hISTORICO == null ? "" : tituloPagamento.hISTORICO,
				"DtAPuracao":tituloPagamento.dTAPURACAO == null ? "" : tituloPagamento.dTAPURACAO,
				"CodReceita":tituloPagamento.cODRECEITA == null ? "" : tituloPagamento.cODRECEITA,
				"NumReferencia":tituloPagamento.nUMREFERENCIA == null ? "" : tituloPagamento.nUMREFERENCIA,
				"VlrMulta":tituloPagamento.vLRMULTA == null ? 0 : tituloPagamento.vLRMULTA,
				"VlrJuros":tituloPagamento.vLRJUROS == null ? 0 : tituloPagamento.vLRJUROS,
				"VlrTotPag":tituloPagamento.vLRTOTPAG == null ? 0 : tituloPagamento.vLRTOTPAG,
				"DtPagamento":tituloPagamento.dTPAGAMENTO == null ? "" : tituloPagamento.dTPAGAMENTO,
				"NomeForBenef":tituloPagamento.nOMEFORBENEF == null ? "" : tituloPagamento.nOMEFORBENEF,
				"CnpjForBenef":tituloPagamento.cNPJFORBENEF == null ? "" : tituloPagamento.cNPJFORBENEF,
				"TipoForBenef":tituloPagamento.tIPOFORBENEF == null ? "" : tituloPagamento.tIPOFORBENEF,
				"CodBarras":tituloPagamento.cODBARRAS == null ? "" : tituloPagamento.cODBARRAS,
				"LinDigitavel":tituloPagamento.lINDIGITAVEL == null ? "" : tituloPagamento.lINDIGITAVEL,
				"DtCompetencia":tituloPagamento.dTCOMPETENCIA == null ? "" : tituloPagamento.dTCOMPETENCIA,
				"CodPagamento":tituloPagamento.cODPAGAMENTO == null ? "" : tituloPagamento.cODPAGAMENTO,
				"VlrOutEntid":tituloPagamento.vLROUTENTID == null ? 0 : tituloPagamento.vLROUTENTID,
				"TipoAdianta":tituloPagamento.tIPOADIANTA == null ? "" : tituloPagamento.tIPOADIANTA,
				"Observacao":tituloPagamento.oBSERVACAO == null ? "" : tituloPagamento.oBSERVACAO,
				"ModeloPag":tituloPagamento.mODELOPAG == null ? "" : tituloPagamento.mODELOPAG,
				"NatAdit":tituloPagamento.nATADIT == null ? "" : tituloPagamento.nATADIT
			}
		};
		log.dir(json);
        var cParams = JSONUtil.toJSON(json);
        log.dir(cParams);
        postData.append(cParams);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true); 
        //connection.setRequestProperty("Authorization", "Basic d3NmbHVpZzp3c2ZsdWln");
        connection.setRequestProperty("Content-Type", "application/json");
		//connection.setConnectTimeout(15000);
        //connection.setReadTimeout(15000);
        var os = connection.getOutputStream();
        os.write(postData.toString().getBytes());
        os.flush();
        var codRetorno = connection.getResponseCode();
        log.info("codRetorno");
        log.info(codRetorno);
        var isr = new java.io.InputStreamReader(connection.getInputStream()); 
        var la = new java.io.BufferedReader(isr);
        var responseString = "";
        var outputString = "";
        while((responseString = la.readLine()) != null){
            outputString = outputString + responseString;
        }
        var result = JSON.parse(outputString);
		log.info("result");
        log.dir(result);
        if(result.OK != "" && result.OK != null){
			return [true, result['OK']];
        }else if(result.erro != null && result.erro != ""){
			if(isr != null) isr.close();
			if(la != null) la.close();
			if(connection != null) connection.disconnect();
			return [true, result['erro']];
		}else{
			if(isr != null) isr.close();
            if(la != null) la.close();
            if(connection != null) connection.disconnect();
			return [false, result['erro']];
        }
    }catch(error){
		log.info("error: try-catch");
        log.dir(error);
		return [false, error];
    }
}