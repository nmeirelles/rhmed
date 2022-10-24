function servicetask109(attempt, message){
    log.info("$$$$$$$$$$ Solicitação Pagamento RPA - servicetask109 - begin $$$$$$$$$$");
    var cnpj = hAPI.getCardValue("cnpjFilial");
    var cnpjMask = 
        cnpj.substring(0,2) + '.' +
        cnpj.substring(2,5) + '.' +
        cnpj.substring(5,8) + '/' +
        cnpj.substring(8,12) + '-' +
        cnpj.substring(12,14);
    var cpf = hAPI.getCardValue("inputNrCPF");
    var dataPagamento = hAPI.getCardValue("dataVencimentoNota");
    var valor = convertFloat(hAPI.getCardValue("valorTotalDocumento"));
    var valorRecolhido = convertFloat(hAPI.getCardValue("inputValorRecolhido"));
    var c1 = DatasetFactory.createConstraint("cnpj", cnpjMask, cnpjMask, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("dataPagamento", dataPagamento, dataPagamento, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("valorRecolhido", valorRecolhido, valorRecolhido, ConstraintType.MUST);
    var constraints = [c1,c2,c3,c4,c5];
    log.dir(constraints);
    var dataset = DatasetFactory.getDataset("ds_enviar_dados_rpa", null, constraints, null);
    log.dir(dataset);
    if(dataset != null){
        var CODIGO = dataset.getValue(0,"CODIGO");
        var DESCRICAO = dataset.getValue(0,"DESCRICAO");
        log.info("$$$$$$$$$$ CODIGO: "+CODIGO);
        log.info("$$$$$$$$$$ DESCRICAO: "+DESCRICAO);
        if(CODIGO != -9){
            hAPI.setCardValue("codcoligada", dataset.getValue(0,"CODIGOCOLIGADA"));
            hAPI.setCardValue("chapa", dataset.getValue(0,"CHAPA"));
            hAPI.setCardValue("anocomp", dataset.getValue(0,"ANOCOMPETENCIA"));
            hAPI.setCardValue("mescomp", dataset.getValue(0,"MESCOMPETENCIA"));
            hAPI.setCardValue("nroperiodo", dataset.getValue(0,"NUMEROPERIODO"));
            hAPI.setCardValue("inserted", dataset.getValue(0,"INSERTED"));
            hAPI.setCardValue("inputValorINSS", dataset.getValue(0,"VALORINSS"));
            hAPI.setCardValue("inputValorIRRF", dataset.getValue(0,"VALORIRRF"));
            hAPI.setCardValue("inputValorLiquido", dataset.getValue(0,"VALORLIQUIDO"));
        }else{
            throw DESCRICAO;
        }
    }else{
        throw "Erro ao acessar o dataset de integração";
    }
}
function convertFloat(valor){
	return parseFloat(valor.replace(".","").replace(",","."));
}
function convertDate(valor){
    return valor.split("-")[2]+"/"+valor.split("-")[1]+"/"+valor.split("-")[0];
}