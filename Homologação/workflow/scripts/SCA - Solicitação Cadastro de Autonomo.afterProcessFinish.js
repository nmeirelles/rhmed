function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - Recursos Humanos
	var numeroSolicitacao = processId;
	var numeroAtividade = 12;
	var numeroProximaAtividade = 19;
	var nomeGrupo = "Pool:Group:PROC_RH_CadastroAutonomos";
	var cNumeroSolicitacao = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
	var cNumeroAtividade = DatasetFactory.createConstraint("numeroAtividade", numeroAtividade, numeroAtividade, ConstraintType.MUST);
	var cNumeroProximaAtividade = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividade, numeroProximaAtividade, ConstraintType.MUST);
	var cNomeGrupo = DatasetFactory.createConstraint("nomeGrupo", nomeGrupo, nomeGrupo, ConstraintType.MUST);
	var constraints = [cNumeroSolicitacao,cNumeroAtividade,cNumeroProximaAtividade,cNomeGrupo];
	log.dir(constraints);
	var dsSLA = DatasetFactory.getDataset("ds_getSLA", null, constraints, null);
	log.dir(dsSLA);
	for(var i = 0; i < dsSLA.rowsCount; i++){
		var dataDisponibilidadeRH = dsSLA.getValue(i, "dataDisponibilidade");
		var dataAssumiuRH = dsSLA.getValue(i, "dataAssumiu");
		var dataFinalizouRH = dsSLA.getValue(i, "dataFinalizou");
		var usuarioRH = dsSLA.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeRH", dataDisponibilidadeRH);
		hAPI.setCardValue("dataAssumiuRH", dataAssumiuRH);
		hAPI.setCardValue("dataFinalizouRH", dataFinalizouRH);
		hAPI.setCardValue("usuarioRH", usuarioRH);
	}

}