function servicetask13(attempt, message){
    log.info("$$$$$$$$$$ Solicitação Pagamento Prestação de Contas - servicetask13 $$$$$$$$$$");
    var filial = hAPI.getCardValue("codFilial");
    var empresa = hAPI.getCardValue("empresaCod");
    var cnpjFilial = hAPI.getCardValue("cnpjFilial");
    var CCUSTODEB = hAPI.getCardValue("idCentroCusto");
    var CODBARRAS = "";
    var CODFORN = hAPI.getCardValue("codFornecedor");
    var DTEMISSAO = hAPI.getCardValue("hora").split(" ")[0];
    var DTPAGAMENTO = ""
    var DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimento"));
    var HISTORICO = hAPI.getCardValue("descricao");
    var ITENSRATEIO = [];
    var indexes = hAPI.getChildrenIndexes("tabelaItens");
    if(indexes.length > 0){
        for(var i = 0; i < indexes.length; i++){
            var CONTACRE = hAPI.getCardValue('contaCredito___' + indexes[i]);
            var CONTADEB = hAPI.getCardValue('contaDebito___' + indexes[i]);
            var HISTRATEIO = "";
            var VLRRATEIO = convertFloat(hAPI.getCardValue('valorTotalItem___' + indexes[i]));
            ITENSRATEIO.push({
                "cONTACRE" : CONTACRE,
                "cONTADEB" : CONTADEB,
                "vLRRATEIO" : VLRRATEIO,
                "hISTRATEIO" : HISTRATEIO
            })
        }
    }
    var LINDIGITAVEL = "";
    var LOJAFORN = hAPI.getCardValue("loja");
    var NATFLUIG = hAPI.getCardValue("colabForn");
    var NUMTIT = "";
    var OBSERVACAO = hAPI.getCardValue("existeAdiantamento") + " | " + hAPI.getCardValue("obsDadosSolicitacao");
    var PROCFLUIG = "SPC - " + hAPI.getCardValue("numeroFluxo");
    var tITPAG = {
        'cCUSTODEB': CCUSTODEB, 
        'cODBARRAS': CODBARRAS, 
        'cODFORN': CODFORN, 
        'dTEMISSAO': DTEMISSAO,
        'dTPAGAMENTO': DTPAGAMENTO, 
        'dTVENCTO': DTVENCTO, 
        'hISTORICO': HISTORICO, 
        'iTENSRATEIO' : ITENSRATEIO,
        'lINDIGITAVEL': LINDIGITAVEL, 
        'lOJAFORN': LOJAFORN, 
        'nATFLUIG': NATFLUIG, 
        'nUMTIT': NUMTIT, 
        'oBSERVACAO': OBSERVACAO, 
        'pROCFLUIG': PROCFLUIG,
        'rATEIO': 'S'
    };
    log.info("$$$$$$$$$$ Filial: "+filial);
    log.info("$$$$$$$$$$ Empresa: "+empresa);
    log.info("$$$$$$$$$$ CNPJ Filial: "+cnpjFilial);
    log.dir(tITPAG);
    var c1 = DatasetFactory.createConstraint("filial", filial, "", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("empresa", empresa, "", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("cnpjFilial", cnpjFilial, "", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("tITPAG", JSONUtil.toJSON(tITPAG), "", ConstraintType.MUST);
    var constraints = [c1,c2,c3,c4];
    var dataset = DatasetFactory.getDataset("ds_postProtheus_008", null, constraints, null);
    if(dataset != null){
        var response = dataset.getValue(0,"response");
        log.info("$$$$$$$$$$ Response: "+response);
        if(response.indexOf("Processo: SPC") > -1){
            var titulo = response.split("Titulo Gerado: ")[1];
            log.info("$$$$$$$$$$ Titulo Gerado: "+titulo);
            //hAPI.setCardValue("nrProtheus",titulo);
        }else{
            if(response.indexOf("INTERNAL SERVER ERROR") !== -1) throw "Problemas de Integração com Protheus, favor acionar a equipe de TI!";
            else throw response;
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
function getDateToday(tmp){
    var dataVencimento = tmp.toString();
    log.info("Data de Vencimento: "+dataVencimento);
    log.info(typeof(dataVencimento));
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var ano = date.getFullYear();
    dia = (dia<=9 ? "0"+dia : dia);
    mes = (mes<=9 ? "0"+mes : mes);
    var today = ano+"-"+mes+"-"+dia;
    log.info("Today: "+today);
    log.info(typeof(today));    
    log.info(today < dataVencimento);
    log.info(today > dataVencimento);
    if(today < dataVencimento) return convertDate(dataVencimento);
    if(today > dataVencimento) return convertDate(today);
    return convertDate(dataVencimento);
}