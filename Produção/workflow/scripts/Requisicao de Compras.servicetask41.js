function servicetask41(attempt, message){

    log.info("$$$$$$$$$$ Requisição de Compras - servicetask41 $$$$$$$$$$");

    var empresa = hAPI.getCardValue("empresaCod");
    var filial = hAPI.getCardValue("codFilial");
    var tIPOREQUIS = hAPI.getCardValue("tipoRequisicao");
    var dataEmissaoNota = hAPI.getCardValue("dataEmissaoNota");
    var dTEMISSAO = dataEmissaoNota.split("-")[2]+"/"+dataEmissaoNota.split("-")[1]+"/"+dataEmissaoNota.split("-")[0];
    var aPROVADOR = hAPI.getCardValue("ultimoUsuario");
    var nATFLUIG = "";

    var tipoRequisicao = hAPI.getCardValue("tipoRequisicao");
    var numeroFluxo = hAPI.getCardValue("numeroFluxo");
    var pROCFLUIG = "";

    if(tipoRequisicao == "aditivo"){
        pROCFLUIG = 'RCA - ' + numeroFluxo;
    }
    if(tipoRequisicao == "pleito"){
        pROCFLUIG = 'RCP - ' + numeroFluxo;	
    }
    if(tipoRequisicao == "padrao"){
        pROCFLUIG = 'RCN - ' + numeroFluxo;	
    }
    if(tipoRequisicao == "regularizacao"){
        pROCFLUIG = 'RCR - ' + numeroFluxo;	
    }

    var sOLICITANTE = hAPI.getCardValue("currentNome");
    var tIPOPRIORI = hAPI.getCardValue("tipoPagamento");
    var cnpjFilial = hAPI.getCardValue("cnpjFilial");
    var nUMSCSUBSTIT = hAPI.getCardValue("nProtheus");

    var lOCENTREGA =    hAPI.getCardValue("inputLocalEntrega") + " | " + 
                        hAPI.getCardValue("ruaFornecedor") + " | " +
                        hAPI.getCardValue("cidadeFornecedor") + " | " +
                        hAPI.getCardValue("estadoFornecedor") + " | " +
                        hAPI.getCardValue("CEPFornecedor") + " | " +
                        hAPI.getCardValue("nomeFornecedor") + " | " +
                        hAPI.getCardValue("telefoneFornecedor") + " | " +
                        hAPI.getCardValue("observacoesFornecedor");

    var fORNSUGERIDO = "";

    var tabelaFornecedores = hAPI.getChildrenIndexes("tabelaFornecedores");
    if(tabelaFornecedores.length > 0){
        for(var i = 0; i < tabelaFornecedores.length; i++){
            var inputFornecedor = hAPI.getCardValue('inputFornecedor___' + tabelaFornecedores[i]);
            var telefoneSugestaoFornecedor = hAPI.getCardValue('telefoneSugestaoFornecedor___' + tabelaFornecedores[i]);
            var contatoSugestaoFornecedor = hAPI.getCardValue('contatoSugestaoFornecedor___' + tabelaFornecedores[i]);
            var emailSugestaoFornecedor = hAPI.getCardValue('emailSugestaoFornecedor___' + tabelaFornecedores[i]);
            var observacoesSugestaoFornecedor = hAPI.getCardValue('observacoesSugestaoFornecedor___' + tabelaFornecedores[i]);
            fORNSUGERIDO +=     inputFornecedor + " | " + 
                                telefoneSugestaoFornecedor + " | " + 
                                contatoSugestaoFornecedor + " | " + 
                                emailSugestaoFornecedor + " | " + 
                                observacoesSugestaoFornecedor + " || ";
        }
    }

    var iTENSSC = [];
    var idCentroCusto = hAPI.getCardValue("idCentroCusto");
    var tableItens = hAPI.getChildrenIndexes("tabelaItens");
    if(tableItens.length > 0){
        for(var i = 0; i < tableItens.length; i++){
            var CodItem = hAPI.getCardValue('CodItem___' + tableItens[i]);
            var itemQuantidade = hAPI.getCardValue('itemQuantidade___' + tableItens[i]);
            var itempreco = hAPI.getCardValue('itempreco___' + tableItens[i]);
            var itemVlrOrcado = hAPI.getCardValue('itemVlrOrcado___' + tableItens[i]);
            var itemObservacoes = hAPI.getCardValue('itemObservacoes___' + tableItens[i]);
            iTENSSC.push({
                'CodProd':CodItem,
                'Quantidade':convertFloat(itemQuantidade),
                'ValUnit':convertFloat(itempreco),
                'Total':convertFloat(itemVlrOrcado),
                'DtNecessid':dTEMISSAO,
                'CodCCusto':idCentroCusto,
                'Observacao':itemObservacoes
            });
        }
    }

    var c1 = DatasetFactory.createConstraint("filial", filial, "", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("empresa", empresa, "", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("cnpjFilial", cnpjFilial, "", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("tIPOREQUIS", tIPOREQUIS, "", ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("dTEMISSAO", dTEMISSAO, "", ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("nATFLUIG", nATFLUIG, "", ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("pROCFLUIG", pROCFLUIG, "", ConstraintType.MUST);
    var c8 = DatasetFactory.createConstraint("iTENSSC", JSONUtil.toJSON(iTENSSC), "", ConstraintType.MUST);
    var c9 = DatasetFactory.createConstraint("sOLICITANTE", sOLICITANTE, "", ConstraintType.MUST);
    var c10 = DatasetFactory.createConstraint("tIPOPRIORI", tIPOPRIORI, "", ConstraintType.MUST);
    var c11 = DatasetFactory.createConstraint("lOCENTREGA", lOCENTREGA, "", ConstraintType.MUST);
    var c12 = DatasetFactory.createConstraint("aPROVADOR", aPROVADOR, "", ConstraintType.MUST);
    var c13 = DatasetFactory.createConstraint("fORNSUGERIDO", fORNSUGERIDO, "", ConstraintType.MUST);
    var c14 = DatasetFactory.createConstraint("nUMSCSUBSTIT", nUMSCSUBSTIT, "", ConstraintType.MUST);
    var constraints = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14];
    var dataset = DatasetFactory.getDataset("ds_postProtheus_006", null, constraints, null);
    if(dataset != null){
        var response = dataset.getValue(0,"response");
        log.info("$$$$$$$$$$ Response: "+response);
        if(response.indexOf("Num. SC integrada") > -1){
            var nProtheus = response.split(":")[1].replace(" ","");
            hAPI.setCardValue("nProtheus",nProtheus);
        }else if(response.indexOf("Subsituida pela SC integrada") > -1){
            var nProtheus = response.split(":")[1].replace(" ","");
            hAPI.setCardValue("nProtheus",nProtheus);
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