function servicetask69(attempt, message){
    log.info("$$$$$$$$$$ Adiantamento de Fornecedor - servicetask69 $$$$$$$$$$");
    var filial = hAPI.getCardValue("codFilial");
    var empresa = hAPI.getCardValue("empresaCod");
    var cnpjFilial = hAPI.getCardValue("cnpjFilial");
    var tITPAG = {
        'pROCFLUIG': "SPA - " + hAPI.getCardValue("numeroFluxo"),
        //'nATFLUIG': hAPI.getCardValue("colabForn"),
        'nATFLUIG': "00202",
        'nUMTIT': "",
        'cODFORN': hAPI.getCardValue("codFornecedor"),
        'lOJAFORN': hAPI.getCardValue("loja"),
        'dTEMISSAO': hAPI.getCardValue("dataVencimento").split("-")[2] + "/" + hAPI.getCardValue("dataVencimento").split("-")[1] + "/" + hAPI.getCardValue("dataVencimento").split("-")[0],
        'dTVENCTO': hAPI.getCardValue("dataVencimento").split("-")[2] + "/" + hAPI.getCardValue("dataVencimento").split("-")[1] + "/" + hAPI.getCardValue("dataVencimento").split("-")[0],
        'cCUSTODEB': hAPI.getCardValue("idCentroCusto"),
        'vLRPRINCIPAL': convertFloat(hAPI.getCardValue("valorTotalDocumento")),
        'cONTADEB': "",
        'cONTACRE': "",
        'hISTORICO': "Motivo: " + hAPI.getCardValue("descricao") + " | Observação: "+ hAPI.getCardValue("obsDadosSolicitacao"),
        'dTAPURACAO': "",
        'cODRECEITA': "",
        'nUMREFERENCIA': "",
        'vLRMULTA': 0,
        'vLRJUROS': 0,
        'vLRTOTPAG': convertFloat(hAPI.getCardValue("valorTotalDocumento")),
        'dTPAGAMENTO': "",
        'nOMEFORBENEF': hAPI.getCardValue("nomeFornecedor"),
        'tIPOFORBENEF': hAPI.getCardValue("tipoFornecedor"),
        'cNPJFORBENEF': hAPI.getCardValue("cnpj"),
        'lINDIGITAVEL': "",
        'cODBARRAS': hAPI.getCardValue("numBoleto"),
        'dTCOMPETENCIA': "",
        'cODPAGAMENTO': "",
        'vLROUTENTID': 0,
        'tIPOADIANTA': hAPI.getCardValue("tipoPagamento"),
        'oBSERVACAO' : hAPI.getCardValue("obstextAreaDadosSolicitacao"),
        'mODELOPAG': "",
        'nATADIT': hAPI.getCardValue("colabForn")
    };
    log.info("$$$$$$$$$$ Filial: "+filial);
    log.info("$$$$$$$$$$ Empresa: "+empresa);
    log.dir(tITPAG);
    var c1 = DatasetFactory.createConstraint("filial", filial, "", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("empresa", empresa, "", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("cnpjFilial", cnpjFilial, "", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("tITPAG", JSONUtil.toJSON(tITPAG), "", ConstraintType.MUST);
    var constraints = [c1,c2,c3,c4];
    var dataset = DatasetFactory.getDataset("ds_postProtheus_007", null, constraints, null);
    if(dataset != null){
        var response = dataset.getValue(0,"response");
        log.info("$$$$$$$$$$ Response: "+response);
        if(response.indexOf("Processo: SPA") > -1){
            var titulo = response.split("Titulo Gerado: ")[1];
            log.info("$$$$$$$$$$ Titulo Gerado: "+titulo);
            //hAPI.setCardValue("nrProtheus",titulo);
        }else{
            if(response.indexOf("INTERNAL SERVER ERROR") !== -1){
                throw "Problemas de Integração com Protheus, favor acionar a equipe de TI!";
            }else{
                throw response;
            }
        }
    }else{
        throw "Erro ao acessar o dataset de integração com Protheus";
    }
}
function convertFloat(valor){
	return parseFloat(valor.replace(".","").replace(",","."));
}