function createDataset(fields, constraints, sortFields){
    log.info("$$$$$$$$$$ ds_getSLA");
    log.dir(constraints);

    var datasetSLA = DatasetBuilder.newDataset();

    datasetSLA.addColumn("dataDisponibilidade");
    datasetSLA.addColumn("dataAssumiu");
    datasetSLA.addColumn("dataFinalizou");
    datasetSLA.addColumn("usuario");

    var numeroSolicitacao = "";
	var numeroAtividade = "";
	var numeroProximaAtividade = "";
	var nomeGrupo = "";
	var nomeUsuario = "";

    if(constraints != null){
        for(var i = 0; i < constraints.length; i++){
            if(constraints[i].fieldName == "numeroSolicitacao") numeroSolicitacao = constraints[i].initialValue;
            if(constraints[i].fieldName == "numeroAtividade") numeroAtividade = constraints[i].initialValue;
            if(constraints[i].fieldName == "numeroProximaAtividade") numeroProximaAtividade = constraints[i].initialValue;
            if(constraints[i].fieldName == "nomeGrupo") nomeGrupo = constraints[i].initialValue;
            if(constraints[i].fieldName == "nomeUsuario") nomeUsuario = constraints[i].initialValue;
        }
    }
    log.dir([{
        "numeroSolicitacao": numeroSolicitacao,
        "numeroAtividade": numeroAtividade,
        "numeroProximaAtividade": numeroProximaAtividade,
        "nomeGrupo": nomeGrupo,
        "nomeUsuario": nomeUsuario
    }]);

    var ct1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
    var ct2 = DatasetFactory.createConstraint("choosedSequence", numeroAtividade, numeroAtividade, ConstraintType.SHOULD);
    var ct3 = DatasetFactory.createConstraint("choosedSequence", numeroProximaAtividade, numeroProximaAtividade, ConstraintType.SHOULD);
    var constraintsProcessTask = [ct1,ct2,ct3];
    log.dir(constraintsProcessTask);
    var fieldsProcessTask = ["processTaskPK.processInstanceId", "choosedSequence", "assignEndDate", "processTaskPK.colleagueId", "completeColleagueId"];
    var dsProcessTask = DatasetFactory.getDataset("processTask", fieldsProcessTask, constraintsProcessTask, null);
    var dataDisponibilidadeSLA = ""; // Data Disponibilidade para Atividade
    var dataAssumiuSLA = ""; // Data que assumiu a atividade
    var dataFinalizouSLA = ""; // Data que finalizou a atividade
    var usuarioSLA = ""; // Usuario
    var usuarioSubsSLA = ""; // Usuario
    var tmpDisponibilidade = false;
    var tmpFim = false;
    for(var i = 0; i < dsProcessTask.rowsCount; i++){
        var choosedSequence = dsProcessTask.getValue(i, "choosedSequence");
        var assignEndDate = dsProcessTask.getValue(i, "assignEndDate");
        var colleagueId = dsProcessTask.getValue(i, "processTaskPK.colleagueId");
        var completeColleagueId = dsProcessTask.getValue(i, "completeColleagueId");
        if(nomeGrupo != ""){
            if(choosedSequence == numeroProximaAtividade){
                usuarioSLA = colleagueId;
                dataFinalizouSLA = assignEndDate;
            }
            else if(choosedSequence == numeroAtividade && colleagueId == nomeGrupo) dataAssumiuSLA = assignEndDate;
            else if(choosedSequence == numeroAtividade) dataDisponibilidadeSLA = assignEndDate;
        }
        if(nomeUsuario != ""){
            if(choosedSequence == numeroAtividade && colleagueId == "System:Auto" && tmpDisponibilidade == false){
                dataDisponibilidadeSLA = assignEndDate;
                tmpDisponibilidade = true;
            }
            if(choosedSequence == numeroProximaAtividade && colleagueId != "System:Auto" && tmpFim == false){
                dataFinalizouSLA = assignEndDate;
                if(colleagueId != completeColleagueId && completeColleagueId != "") usuarioSLA = completeColleagueId;
                else usuarioSLA = colleagueId;
                tmpFim = true;
            }
        }
    }

    log.dir([{
        "dataDisponibilidadeSLA": dataDisponibilidadeSLA,
        "dataAssumiuSLA": dataAssumiuSLA,
        "dataFinalizouSLA": dataFinalizouSLA,
        "usuarioSLA": usuarioSLA
    }]);

    var c4 = DatasetFactory.createConstraint("colleaguePK.colleagueId", usuarioSLA, usuarioSLA, ConstraintType.MUST);
    log.dir([c4]);
    var dsColleague = DatasetFactory.getDataset("colleague", null, [c4], null);
    log.dir(dsColleague);
    var colleagueNameSLA = "";
    if(dsColleague.rowsCount > 0) colleagueNameSLA = dsColleague.getValue(0, "colleagueName");
    if(colleagueNameSLA == "") colleagueNameSLA = usuarioSLA;

    datasetSLA.addRow([
        dataDisponibilidadeSLA, 
        dataAssumiuSLA, 
        dataFinalizouSLA, 
        colleagueNameSLA
    ]);

    return datasetSLA;
}