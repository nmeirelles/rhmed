function servicetask13(attempt, message) {
    log.info("$$$$$$$$$$ SPS Serviços, Concessionárias e Contas de Consumo - servicetask13 $$$$$$$$$$");

    var empresa = hAPI.getCardValue("empresaCod");
    var filial = hAPI.getCardValue("codFilial");
    var cnpjFilial = hAPI.getCardValue("cnpjFilial");

    var colabForn = hAPI.getCardValue("colabForn");
    var cdsNaturezaConcessionarias = DatasetFactory.createConstraint("natPagas", colabForn, colabForn, ConstraintType.MUST);
    log.dir(cdsNaturezaConcessionarias);
    var dsNaturezaConcessionarias = DatasetFactory.getDataset("dsNaturezaConcessionarias", null, [cdsNaturezaConcessionarias], null);
    log.dir(dsNaturezaConcessionarias);
    var cONTADEB = "";
    var cONTACRE = "";
    if(dsNaturezaConcessionarias != null){
        cONTADEB = dsNaturezaConcessionarias.getValue(0,"contaDebito");
        cONTACRE = dsNaturezaConcessionarias.getValue(0,"contaCredito");
        hAPI.setCardValue("contaDebito",cONTADEB);
        hAPI.setCardValue("contaCredito",cONTACRE);
    }
    log.info("\ncONTADEB: "+cONTADEB+"\ncONTACRE: "+cONTACRE);

    var codigoFornecedor = hAPI.getCardValue("codFornecedor"); //Alterado PIVA valor antigo (inputCodEmissorNF)
    var cFornecedor = DatasetFactory.createConstraint("codforn", codigoFornecedor, codigoFornecedor, ConstraintType.MUST);
    log.dir(cFornecedor);
    var dsFornecedor = DatasetFactory.getDataset("dsBuscaFornecedores_3", null, [cFornecedor], null);
    log.dir(dsFornecedor);
    var codFornecedor = "";
    var loja = "";
    if(dsFornecedor != null){
        var error = dsFornecedor.getValue(0,"error");
        if(error == "" || error == null || error == undefined){
            var agencia = dsFornecedor.getValue(0,"Agencia");
            var banco = dsFornecedor.getValue(0,"Banco");
            var cnpj = dsFornecedor.getValue(0,"CNPJ");
            codFornecedor = dsFornecedor.getValue(0,"CodForn");
            var conta = dsFornecedor.getValue(0,"Conta");
            loja = dsFornecedor.getValue(0,"LojaForn");
            var nome = dsFornecedor.getValue(0,"Nome");
            // hAPI.setCardValue("inputFornecedor","Cód: "+codFornecedor+" | Nome: "+nome+" | CNPJ: "+cnpj);
            // hAPI.setCardValue("inputCodFornecedor",codFornecedor);
            // hAPI.setCardValue("codFornecedor",codFornecedor);
            // hAPI.setCardValue("cnpj",cnpj);
            // hAPI.setCardValue("loja",loja);
            // hAPI.setCardValue("bancoPag",banco);
            // hAPI.setCardValue("agenciaPag",agencia);
            // hAPI.setCardValue("contaPag",conta);
        }
    }

    var radioPagamento = hAPI.getCardValue("radioPagamento");
    var codBen = codFornecedor; //Alterado PIVA valor antigo ("")
    var lojBen = loja; //Alterado PIVA valor antigo ("")
    if(radioPagamento == "2"){
        codBen = hAPI.getCardValue("inputCodFornecedor");
        lojBen = hAPI.getCardValue("inputLojFornecedor");
    }

    log.info("radioPagamento: "+radioPagamento);
    log.info("codFornecedor: "+codFornecedor);
    log.info("loja: "+loja);
    log.info("codBen: "+codBen);
    log.info("lojBen: "+lojBen);

    var nfentrada = {
        'cODBEN' : radioPagamento == "2" ? codBen : codFornecedor,
        'lOJBEN' : radioPagamento == "2" ? lojBen : loja,
        'tPPAGTO' : hAPI.getCardValue("selectTipoFornecedor"),
        'pROCFLUIG': "SPS - " + hAPI.getCardValue("numeroFluxo"),
        'nATFLUIG': hAPI.getCardValue("colabForn"),
        'nUMDOC': hAPI.getCardValue("numeroNota"),
        'sERIE': "",
        'cODFORN': codFornecedor == "" ? hAPI.getCardValue("codFornecedor") : codFornecedor,
        'lOJA': loja == "" ? hAPI.getCardValue("loja") : loja,
        'dTEMISSAO': convertDate(hAPI.getCardValue("dataEmissaoNota")),
        'dTVENCIMENTO': convertDate(hAPI.getCardValue("dataVencimentoNota")),
        'cODBARRAS': hAPI.getCardValue("numBoleto"),
        'iTENSNF': [{
            'cODPROD': hAPI.getCardValue("CodItem"),
            'qUANTIDADE': currencyToNumber(hAPI.getCardValue("Quantidade")),
            'vALUNIT': convertFloat(hAPI.getCardValue("valorUnit")),
            'tOTAL': convertFloat(hAPI.getCardValue("valorTotalDocumento")),
            'cODCCUSTO': hAPI.getCardValue("idCentroCusto"),
            'cONTADEB': cONTADEB,
            'cONTACRE': cONTACRE
        }]
    };

    var c1 = DatasetFactory.createConstraint("filial", filial, "", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("empresa", empresa, "", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("cnpjFilial", cnpjFilial, "", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("nfentrada", JSONUtil.toJSON(nfentrada), "", ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("ds_postProtheus_005", null, [c1,c2,c3,c4], null);
    if(dataset != null){
        var response = dataset.getValue(0,"response");
        log.info("$$$$$$$$$$ Response: "+response);
        if(response.indexOf("Processo: SPS") > -1){
            var nProtheus = response.split("Pre Nota Gerada: ")[1];
            log.info("$$$$$$$$$$ Pre Nota Gerado: "+nProtheus);
            //hAPI.setCardValue("nProtheus",nProtheus);
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
function convertDate(valor){
    return valor.split("-")[2]+"/"+valor.split("-")[1]+"/"+valor.split("-")[0];
}
function currencyToNumber(numero){
	if(numero!=null && numero!=undefined && numero!=''){
		numero = numero.split(',');
		numero[0] = numero[0].split('.').join('');
		return parseFloat(numero.join('.'))
	}else{
		return 0
	}
}