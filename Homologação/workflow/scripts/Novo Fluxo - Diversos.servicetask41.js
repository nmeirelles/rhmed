function servicetask41(attempt, message){
    log.info("$$$$$$$$$$ Solicitação Pagamento Diversos - servicetask41 $$$$$$$$$$");
    var filial = hAPI.getCardValue("codFilial");
    var empresa = hAPI.getCardValue("empresaCod");
    var cnpjFilial = hAPI.getCardValue("cnpjFilial");

    var PROCFLUIG = "SPD - " + hAPI.getCardValue("numeroFluxo");
    var NATFLUIG = hAPI.getCardValue("colabForn");
    var NUMTIT = "";
    var CODFORN = hAPI.getCardValue("codFornecedor");
    var LOJAFORN = hAPI.getCardValue("loja");
    var DTEMISSAO = hAPI.getCardValue("hora").split(" ")[0];
    var DTVENCTO = "";
    var CCUSTODEB = hAPI.getCardValue("idCentroCusto");
    var VLRPRINCIPAL = 0;
    var CONTADEB = hAPI.getCardValue("contaDebito");
    var CONTACRE = hAPI.getCardValue("contaCredito");
    var HISTORICO = hAPI.getCardValue("obsDadosSolicitacao");
    var DTAPURACAO = "";
    var CODRECEITA = "";
    var NUMREFERENCIA = "";
    var VLRMULTA = 0;
    var VLRJUROS = 0;
    var VLRTOTPAG = 0;
    var DTPAGAMENTO = ""
    var NOMEFORBENEF = hAPI.getCardValue("nomeFornecedor");
    var TIPOFORBENEF = "2";
    var CNPJFORBENEF = hAPI.getCardValue("cnpjFilial");
    var LINDIGITAVEL = "";
    var CODBARRAS = "";
    var DTCOMPETENCIA = "";
    var CODPAGAMENTO = "";
    var VLROUTENTID = 0;
    var TIPOADIANTA = hAPI.getCardValue("tipoPagamento");
    var OBSERVACAO = "";
    var MODELOPAG = hAPI.getCardValue("hiddenChaveProtheus");

    var cnpj = hAPI.getCardValue("cnpj")+"";
    log.info(cnpj);
    cnpj = cnpj.trim();
    log.info(cnpj);
    log.info(cnpj.length);
    log.info(TIPOFORBENEF);
    if(cnpj.length != 14) TIPOFORBENEF = "1";
    log.info(TIPOFORBENEF);
    if((NATFLUIG == "FGTS FUNCIONARIOS" || NATFLUIG == "FGTS SOBRE FERIAS") && (cnpj.length == 14)) TIPOFORBENEF = "1";
    else if((NATFLUIG == "FGTS FUNCIONARIOS" || NATFLUIG == "FGTS SOBRE FERIAS") && (cnpj.length != 14)) TIPOFORBENEF = "2";
    log.info(TIPOFORBENEF);

    var formaPagamento = hAPI.getCardValue("formaPagamento");
    if(formaPagamento == "semCodigo"){
        if(hAPI.getCardValue("dataVencimentoNota").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimentoNota"));
        if(hAPI.getCardValue("valorPrincipal").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorPrincipal"));
        if(hAPI.getCardValue("valorMulta").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorMulta"));
        if(hAPI.getCardValue("valorJuros").toString() != "") VLRJUROS = convertFloat(hAPI.getCardValue("valorJuros"));
        if(hAPI.getCardValue("valorTotalDocumento").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalDocumento"));
        if(hAPI.getCardValue("datapagamentoNota").toString() != "") DTPAGAMENTO = getDateToday(hAPI.getCardValue("datapagamentoNota"));
    }


    if(formaPagamento == "comCodigo"){
        if(hAPI.getCardValue("dataVencimento").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimento"));
        if(hAPI.getCardValue("valorPrincipalCodBarras").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorPrincipalCodBarras"));
        if(hAPI.getCardValue("valorMultaCodBarras").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorMultaCodBarras"));
        if(hAPI.getCardValue("valorJurosCodBarras").toString() != "") VLRJUROS = convertFloat(hAPI.getCardValue("valorJurosCodBarras"));
        if(hAPI.getCardValue("valorTotalComCodigo").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalComCodigo"));
        if(hAPI.getCardValue("dataPagamento").toString() != "") DTPAGAMENTO = getDateToday(hAPI.getCardValue("dataPagamento"));
        if(hAPI.getCardValue("numCodigo").toString() != "") CODBARRAS = hAPI.getCardValue("numCodigo");
    }


    if(formaPagamento == "darf"){
        if(hAPI.getCardValue("dataVencimentoDARF").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimentoDARF"));
        if(hAPI.getCardValue("valorPrincipalDARF").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorPrincipalDARF"));
        if(hAPI.getCardValue("periodoApuracaoDARF").toString() != "") DTAPURACAO = convertDate(hAPI.getCardValue("periodoApuracaoDARF"));
        if(hAPI.getCardValue("codigoReceitaDARF").toString() != "") CODRECEITA = hAPI.getCardValue("codigoReceitaDARF");
        if(hAPI.getCardValue("nrReferenciaDARF").toString() != "") NUMREFERENCIA = hAPI.getCardValue("nrReferenciaDARF");
        if(hAPI.getCardValue("valorMultaDARF").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorMultaDARF"));
        if(hAPI.getCardValue("valorJurosEncargosDARF").toString() != "") VLRJUROS = convertFloat(hAPI.getCardValue("valorJurosEncargosDARF"));
        if(hAPI.getCardValue("valorTotalDARF").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalDARF"));
        if(hAPI.getCardValue("nrCPFCNPJDARF").toString() != "") CNPJFORBENEF = hAPI.getCardValue("nrCPFCNPJDARF");
        if(hAPI.getCardValue("nrCodigoBarrasDARF").toString() != "") CODBARRAS = hAPI.getCardValue("nrCodigoBarrasDARF");
    }


    if(formaPagamento == "darm"){
        if(hAPI.getCardValue("dataVencimentoDARM").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimentoDARM"));
        if(hAPI.getCardValue("valorTributoDARM").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorTributoDARM"));
        if(hAPI.getCardValue("nrReceitaDARM").toString() != "") CODRECEITA = hAPI.getCardValue("nrReceitaDARM");
        if(hAPI.getCardValue("valorMultaDARM").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorMultaDARM"));
        if(hAPI.getCardValue("valorMoraDARM").toString() != "") VLRJUROS = convertFloat(hAPI.getCardValue("valorMoraDARM"));
        if(hAPI.getCardValue("valorTotalDARM").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalDARM"));
        if(hAPI.getCardValue("nrCodigoBarrasDARM").toString() != "") CODBARRAS = hAPI.getCardValue("nrCodigoBarrasDARM");
        if(hAPI.getCardValue("nrCompetenciaDARM").toString() != "") DTCOMPETENCIA = hAPI.getCardValue("nrCompetenciaDARM").replace("/","");
    }


    if(formaPagamento == "gps"){
        if(hAPI.getCardValue("codVencimentoGPS").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("codVencimentoGPS"));
        if(hAPI.getCardValue("valorInssGPS").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorInssGPS"));
        if(hAPI.getCardValue("valorJurosGPS").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorJurosGPS"));
        if(hAPI.getCardValue("valorTotalGPS").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalGPS"));
        if(hAPI.getCardValue("nrIdentificadorGPS").toString() != "") CNPJFORBENEF = hAPI.getCardValue("nrIdentificadorGPS");
        if(hAPI.getCardValue("nrCodigoBarrasGPS").toString() != "") CODBARRAS = hAPI.getCardValue("nrCodigoBarrasGPS");
        if(hAPI.getCardValue("codPagamentoGPS").toString() != "") CODPAGAMENTO = hAPI.getCardValue("codPagamentoGPS");
        if(hAPI.getCardValue("valorOutrasGPS").toString() != "") VLROUTENTID = convertFloat(hAPI.getCardValue("valorOutrasGPS"));
        if(hAPI.getCardValue("nrCompetenciaGPS").toString() != "") DTCOMPETENCIA = hAPI.getCardValue("nrCompetenciaGPS").replace("/","");
    }


    if(formaPagamento == "grf"){
        if(hAPI.getCardValue("dataValidadeGRF").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataValidadeGRF"));
        if(hAPI.getCardValue("valorTotalGRF").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorTotalGRF"));
        if(hAPI.getCardValue("valorTotalGRF").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalGRF"));
        if(hAPI.getCardValue("nrCodigoBarrasGRF").toString() != "") CODBARRAS = hAPI.getCardValue("nrCodigoBarrasGRF");
        if(hAPI.getCardValue("competenciaGRF").toString() != "") DTCOMPETENCIA = hAPI.getCardValue("competenciaGRF").replace("/","");   
    }


    if(formaPagamento == "damsp"){
        if(hAPI.getCardValue("dataVencimentoDAMSP").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimentoDAMSP"));
        if(hAPI.getCardValue("valorDAMSP").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorDAMSP"));
        if(hAPI.getCardValue("valorMultaDAMSP").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorMultaDAMSP"));
        if(hAPI.getCardValue("valorJurosDAMSP").toString() != "") VLRJUROS = convertFloat(hAPI.getCardValue("valorJurosDAMSP"));
        if(hAPI.getCardValue("valorTotalDAMSP").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalDAMSP"));
        if(hAPI.getCardValue("nrCodigoBarrasDAMSP").toString() != "") CODBARRAS = hAPI.getCardValue("nrCodigoBarrasDAMSP");
    }


    if(formaPagamento == "darfWeb"){
        if(hAPI.getCardValue("valorMultaDARFWEB").toString() != "") VLRMULTA = convertFloat(hAPI.getCardValue("valorMultaDARFWEB"));
        if(hAPI.getCardValue("valorJurosEncargosDARFWEB").toString() != "") VLRJUROS = convertFloat(hAPI.getCardValue("valorJurosEncargosDARFWEB"));
        if(hAPI.getCardValue("dataVencimentoDARFWEB").toString() != "") DTVENCTO = getDateToday(hAPI.getCardValue("dataVencimentoDARFWEB"));
        if(hAPI.getCardValue("valorPrincipalDARFWEB").toString() != "") VLRPRINCIPAL = convertFloat(hAPI.getCardValue("valorPrincipalDARFWEB"));
        if(hAPI.getCardValue("valorTotalDARFWEB").toString() != "") VLRTOTPAG = convertFloat(hAPI.getCardValue("valorTotalDARFWEB"));
        if(hAPI.getCardValue("nrCodigoBarrasDARFWEB").toString() != "") CODBARRAS = hAPI.getCardValue("nrCodigoBarrasDARFWEB");
        if(hAPI.getCardValue("observacoesDARFWEB").toString() != "") OBSERVACAO = hAPI.getCardValue("observacoesDARFWEB");
        if(hAPI.getCardValue("apuracaoDARFWEB").toString() != "") DTAPURACAO = convertDate(hAPI.getCardValue("apuracaoDARFWEB"));
        if(hAPI.getCardValue("codReceitaDARFWEB").toString() != "") CODRECEITA = hAPI.getCardValue("codReceitaDARFWEB");
    }

    var tITPAG = {
        'tPPAGTO': '',
        'cODBEN': CODFORN,
        'lOJBEN': LOJAFORN,
        'pROCFLUIG': PROCFLUIG,
        'nATFLUIG': NATFLUIG,
        'nUMTIT': NUMTIT,
        'cODFORN': CODFORN,
        'lOJAFORN': LOJAFORN,
        'dTEMISSAO': DTEMISSAO,
        'dTVENCTO': DTVENCTO,
        'cCUSTODEB': CCUSTODEB,
        'vLRPRINCIPAL': VLRPRINCIPAL,
        'cONTADEB': CONTADEB,
        'cONTACRE': CONTACRE,
        'hISTORICO': HISTORICO,
        'dTAPURACAO': DTAPURACAO,
        'cODRECEITA': CODRECEITA,
        'nUMREFERENCIA': NUMREFERENCIA,
        'vLRMULTA': VLRMULTA,
        'vLRJUROS': VLRJUROS,
        'vLRTOTPAG': VLRTOTPAG,
        'dTPAGAMENTO': DTPAGAMENTO,
        'nOMEFORBENEF': NOMEFORBENEF,
        'tIPOFORBENEF': TIPOFORBENEF,
        'cNPJFORBENEF': convertCPFCNPJ(CNPJFORBENEF),
        'lINDIGITAVEL': LINDIGITAVEL,
        'cODBARRAS': CODBARRAS,
        'dTCOMPETENCIA': DTCOMPETENCIA,
        'cODPAGAMENTO': CODPAGAMENTO,
        'vLROUTENTID': VLROUTENTID,
        'tIPOADIANTA': TIPOADIANTA,
        'oBSERVACAO': OBSERVACAO,
        'mODELOPAG': MODELOPAG
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
        if(response.indexOf("Processo: SPD") > -1){
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
    log.info(typeof(valor));
    log.info("Valor: "+valor);
    var valorFloat = parseFloat(valor.replace(".","").replace(",","."));
    log.info(typeof(valorFloat));
    log.info("Valor Float: "+valorFloat);
	return valorFloat;
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
function convertCPFCNPJ(valor){
    return valor.replace(".","").replace(".","").replace("/","").replace("-","").replace(" ","");
}