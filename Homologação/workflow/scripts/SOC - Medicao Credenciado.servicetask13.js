function servicetask13(attempt, message) {
    log.info("$$$$$$$$$$ SPS Serviços, Concessionárias e Contas de Consumo - servicetask13 $$$$$$$$$$");
    var filial = hAPI.getCardValue("codFilial");
	var empresa = hAPI.getCardValue("empresaCod");
	var cODFORN = ""+hAPI.getCardValue("codFornecedor");
	var dTEMISSAO = convertDate(hAPI.getCardValue("dataEmissaoNota"));
	var dTVENCIMENTO = convertDate(hAPI.getCardValue("dataVencimentoNota"));
	var iTENSNF = [];
	var lOJA = hAPI.getCardValue("loja");
	var nATFLUIG = hAPI.getCardValue("colabForn");
	var nUMDOC = hAPI.getCardValue("numeroNota");
	var pROCFLUIG = hAPI.getCardValue("numeroFluxo");
	var sERIE = hAPI.getCardValue("serieNota") != null ? hAPI.getCardValue("serieNota") : "";
	var cnpjFilial = hAPI.getCardValue("cnpjFilial");
    var valorCorreio = hAPI.getCardValue("inputValorTaxa");
    var cdsNaturezaConcessionarias = DatasetFactory.createConstraint("natPagas", nATFLUIG, nATFLUIG, ConstraintType.MUST);
    var dsNaturezaConcessionarias = DatasetFactory.getDataset("ds_SocNaturezaCabecalho", null, [cdsNaturezaConcessionarias], null);
    var cONTADEB = "";
    var cONTACRE = "";
    if(dsNaturezaConcessionarias != null){
        cONTADEB = dsNaturezaConcessionarias.getValue(0,"contaDebito");
        cONTACRE = dsNaturezaConcessionarias.getValue(0,"contaCredito");
        hAPI.setCardValue("contaDebito",cONTADEB);
        hAPI.setCardValue("contaCredito",cONTACRE);
    }
    var inputRadioTaxaInlcusa = hAPI.getCardValue("inputRadioTaxaInlcusa");
    var tableItens = hAPI.getChildrenIndexes("tabelaItens");
    if(tableItens.length > 0){
        var idCentroCusto = hAPI.getCardValue("idCentroCusto");
        for(var i = 0; i < tableItens.length; i++){
            log.info("$$$$$$$$$$$Index: "+i);
            var cODPROD = hAPI.getCardValue('CodItem___' + tableItens[i]);
            var itenscONTACRE = hAPI.getCardValue('itemContaCred___' + tableItens[i]);
            var itenscONTADEB = hAPI.getCardValue('itemContaDebt___' + tableItens[i]);
            var qUANTIDADE = hAPI.getCardValue('itemQuantidade___' + tableItens[i]);
            var vALUNIT = hAPI.getCardValue('itempreco___' + tableItens[i]);
            var tOTAL = hAPI.getCardValue('itemVlrOrcado___' + tableItens[i]);
            if(inputRadioTaxaInlcusa == "0"){
                if(i == 0){
                    iTENSNF.push({
                        "cODCCUSTO" : idCentroCusto,
                        "cODPROD" : cODPROD,
                        "cONTACRE" : itenscONTACRE,
                        "cONTADEB" : itenscONTADEB,
                        "qUANTIDADE" : qUANTIDADE,
                        "tOTAL" : convertFloat(tOTAL),
                        "vALUNIT" : convertFloat(vALUNIT),
                        "tXCORREIOS" : convertFloat(valorCorreio)
                    });
                }else{
                    iTENSNF.push({
                        "cODCCUSTO" : idCentroCusto,
                        "cODPROD" : cODPROD,
                        "cONTACRE" : itenscONTACRE,
                        "cONTADEB" : itenscONTADEB,
                        "qUANTIDADE" : qUANTIDADE,
                        "tOTAL" : convertFloat(tOTAL),
                        "vALUNIT" : convertFloat(vALUNIT),
                        "tXCORREIOS" : 0
                    });
                }
            }else{
                iTENSNF.push({
                    "cODCCUSTO" : idCentroCusto,
                    "cODPROD" : cODPROD,
                    "cONTACRE" : itenscONTACRE,
                    "cONTADEB" : itenscONTADEB,
                    "qUANTIDADE" : qUANTIDADE,
                    "tOTAL" : convertFloat(tOTAL),
                    "vALUNIT" : convertFloat(vALUNIT),
                    "tXCORREIOS" : 0
                });
            }
        }
        if(inputRadioTaxaInlcusa == "1"){
            var c1_2 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
            var correioDataset = DatasetFactory.getDataset("dsCadastroCorreios", null, [c1_2], null);
            var correioCodProd = correioDataset.getValue(0,"codigoProduto");
            var correioContaCre = correioDataset.getValue(0,"contaCredito");
            var correioContaDbt = correioDataset.getValue(0,"contaDebito");
            var correioQtd = "1";
            iTENSNF.push({
                "cODCCUSTO" : idCentroCusto,
                "cODPROD" : correioCodProd,
                "cONTACRE" : correioContaCre,
                "cONTADEB" : correioContaDbt,
                "qUANTIDADE" : correioQtd,
                "tOTAL" : convertFloat(valorCorreio),
                "vALUNIT" : convertFloat(valorCorreio),
                "tXCORREIOS" : 0
            });
        }
    }
    var codigoFornecedor = hAPI.getCardValue("inputCodFornecedor");
    var cFornecedor = DatasetFactory.createConstraint("codforn", codigoFornecedor, codigoFornecedor, ConstraintType.MUST);
    var dsFornecedor = DatasetFactory.getDataset("dsBuscaFornecedores_3", null, [cFornecedor], null);
    if(dsFornecedor != null){
        var error = dsFornecedor.getValue(0,"error");
        if(error == "" || error == null || error == undefined){
            cODFORN = dsFornecedor.getValue(0,"CodForn");
            var codFornecedor = dsFornecedor.getValue(0,"CodForn");
            var agencia = dsFornecedor.getValue(0,"Agencia");
            var banco = dsFornecedor.getValue(0,"Banco");
            var cnpj = dsFornecedor.getValue(0,"CNPJ");
            var conta = dsFornecedor.getValue(0,"Conta");
            var nome = dsFornecedor.getValue(0,"Nome");
            var loja = dsFornecedor.getValue(0,"LojaForn");
            hAPI.setCardValue("inputFornecedor","Cód: "+codFornecedor+" | Nome: "+nome+" | CNPJ: "+cnpj);
            hAPI.setCardValue("inputCodFornecedor",codFornecedor);
            hAPI.setCardValue("codFornecedor",codFornecedor);
            hAPI.setCardValue("cnpj",cnpj);
            hAPI.setCardValue("loja",loja);
            hAPI.setCardValue("bancoPag",banco);
            hAPI.setCardValue("agenciaPag",agencia);
            hAPI.setCardValue("contaPag",conta);
        }
    }
    var c1 = DatasetFactory.createConstraint("filial", filial, "", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("empresa", empresa, "", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("cODFORN", cODFORN, "", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("dTEMISSAO", dTEMISSAO, "", ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("dTVENCIMENTO", dTVENCIMENTO, "", ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("iTENSNF", JSONUtil.toJSON(iTENSNF), "", ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("lOJA", lOJA, "", ConstraintType.MUST);
    var c8 = DatasetFactory.createConstraint("nATFLUIG", nATFLUIG, "", ConstraintType.MUST);
    var c9 = DatasetFactory.createConstraint("nUMDOC", nUMDOC, "", ConstraintType.MUST);
    var c10 = DatasetFactory.createConstraint("pROCFLUIG", pROCFLUIG, "", ConstraintType.MUST);
    var c11 = DatasetFactory.createConstraint("sERIE", sERIE, "", ConstraintType.MUST);
    var c12 = DatasetFactory.createConstraint("cnpjFilial", cnpjFilial, "", ConstraintType.MUST);
    log.info("constraints ds_postProtheus_009");
    log.dir([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12]);
    var dataset = DatasetFactory.getDataset("ds_postProtheus_009", null, [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12], null);
    if(dataset != null){
        var response = dataset.getValue(0,"response");
        log.info("$$$$$$$$$$ Response: "+response);
        if(response.indexOf("Pre Nota Gerada") > -1){
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