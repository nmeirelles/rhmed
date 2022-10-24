function beforeTaskSave(colleagueId,nextSequenceId,userList){
    hAPI.setCardValue("atividadeAtual", nextSequenceId);

    //Tratativa Aprovadores
    var matriculaSolicitante = hAPI.getCardValue("solicitanteMatricula");
    var ccusto = hAPI.getCardValue("zoomCentroCusto");
    var c1 = DatasetFactory.createConstraint("ccusto", ccusto, ccusto, ConstraintType.MUST);
    var constraints = [c1];
    var datasetCentroCusto = DatasetFactory.getDataset("dsCadastroCentrodeCusto", null, constraints, null);
    if(dataset != null){
        //Verifica Retorno
        var response = dataset.getValue(0,"response");
        log.info("$$$$$$$$$$ Response: "+response);

        //Alimenta Tabela "tableAprovadores"
        var tableName = 'tableAprovadores';
        var id = wdkAddChild(tableName);

        //Supervisor
        var matriculaSupervisor = datasetCentroCusto.getValue(0, "supervisor");
        hAPI.setCardValue("inputMatriculaSupervisor___"+id, matriculaSupervisor);
        hAPI.setCardValue("inputResponsavelSupervisor___"+id, matriculaAprovadores(matriculaSupervisor));
        if(matriculaSupervisor == matriculaSolicitante){
            hAPI.setCardValue("inputStatusSupervisor___"+id, "true");
        }

        //Coordenador
        var matriculaCoordenador = datasetCentroCusto.getValue(0, "coordenador");
        hAPI.setCardValue("inputMatriculaCoordenador___"+id, matriculaCoordenador);
        hAPI.setCardValue("inputResponsavelCoordenador___"+id, matriculaAprovadores(matriculaCoordenador));
        if(matriculaCoordenador == matriculaSolicitante){
            hAPI.setCardValue("inputStatusCoordenador___"+id, "true");
        }

        //Gerente
        var matriculaGerente = datasetCentroCusto.getValue(0, "gerente");
        hAPI.setCardValue("inputMatriculaGerente___"+id, matriculaGerente);
        hAPI.setCardValue("inputResponsavelGerente___"+id, matriculaAprovadores(matriculaGerente));
        if(matriculaGerente == matriculaSolicitante){
            hAPI.setCardValue("inputStatusGerente___"+id, "true");
        }

        //Diretor
        var matriculaDiretor = datasetCentroCusto.getValue(0, "diretor");
        hAPI.setCardValue("inputMatriculaDiretor___"+id, matriculaDiretor);
        hAPI.setCardValue("inputResponsavelDiretor___"+id, matriculaAprovadores(matriculaDiretor));
        if(matriculaDiretor == matriculaSolicitante){
            hAPI.setCardValue("inputStatusDiretor___"+id, "true");
        }

    }else{
        throw "Erro ao acecssar o Dataset";
    }
}

//Converte Matricula em Nome do Aprovador
function matriculaAprovadores(matricula){
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
    var constraintsColleague = new Array(c1);
    var datasetColleague = DatasetFactory.getDataset("colleague", null, constraintsColleague, null);
    return datasetColleague.getValue(0, "colleagueName");
}