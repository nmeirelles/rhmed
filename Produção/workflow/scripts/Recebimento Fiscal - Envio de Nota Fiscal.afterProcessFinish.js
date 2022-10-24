function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - Célula Fiscal
	var numeroSolicitacaoCF = processId;
	var numeroAtividadeCF = 5;
	var numeroProximaAtividadeCF = 9;
	var nomeGrupoCF = "Pool:Group:PROC_Celula_Fiscal";
	var cNumeroSolicitacao = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoCF, numeroSolicitacaoCF, ConstraintType.MUST);
	var cNumeroAtividade = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeCF, numeroAtividadeCF, ConstraintType.MUST);
	var cNumeroProximaAtividade = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeCF, numeroProximaAtividadeCF, ConstraintType.MUST);
	var cNomeGrupo = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoCF, nomeGrupoCF, ConstraintType.MUST);
	var constraintsCF = [cNumeroSolicitacao,cNumeroAtividade,cNumeroProximaAtividade,cNomeGrupo];
	log.dir(constraintsCF);
	var dsSLACF = DatasetFactory.getDataset("ds_getSLA", null, constraintsCF, null);
	log.dir(dsSLACF);
	for(var i = 0; i < dsSLACF.rowsCount; i++){
		var dataDisponibilidadeCF = dsSLACF.getValue(i, "dataDisponibilidade");
		var dataAssumiuCF = dsSLACF.getValue(i, "dataAssumiu");
		var dataFinalizouCF = dsSLACF.getValue(i, "dataFinalizou");
		var usuarioCF = dsSLACF.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeCF", dataDisponibilidadeCF);
		hAPI.setCardValue("dataAssumiuCF", dataAssumiuCF);
		hAPI.setCardValue("dataFinalizouCF", dataFinalizouCF);
		hAPI.setCardValue("usuarioCF", usuarioCF);
	}
	// Get SLA - Contas a Pagar
	var numeroSolicitacaoCP = processId;
	var numeroAtividadeCP = 18;
	var numeroProximaAtividadeCP = 14;
	var nomeGrupoCP = "Pool:Group:PROC_Contas_a_Pagar";
	var cNumeroSolicitacaoCP = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoCP, numeroSolicitacaoCP, ConstraintType.MUST);
	var cNumeroAtividadeCP = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeCP, numeroAtividadeCP, ConstraintType.MUST);
	var cNumeroProximaAtividadeCP = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeCP, numeroProximaAtividadeCP, ConstraintType.MUST);
	var cNomeGrupoCP = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoCP, nomeGrupoCP, ConstraintType.MUST);
	var constraintsCP = [cNumeroSolicitacaoCP, cNumeroAtividadeCP, cNumeroProximaAtividadeCP, cNomeGrupoCP];
	log.dir(constraintsCP);
	var dsSLACP = DatasetFactory.getDataset("ds_getSLA", null, constraintsCP, null);
	log.dir(dsSLACP);
	for(var i = 0; i < dsSLACP.rowsCount; i++){
		var dataDisponibilidadeCP = dsSLACP.getValue(i, "dataDisponibilidade");
		var dataAssumiuCP = dsSLACP.getValue(i, "dataAssumiu");
		var dataFinalizouCP = dsSLACP.getValue(i, "dataFinalizou");
		var usuarioCP = dsSLACP.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeCP", dataDisponibilidadeCP);
		hAPI.setCardValue("dataAssumiuCP", dataAssumiuCP);
		hAPI.setCardValue("dataFinalizouCP", dataFinalizouCP);
		hAPI.setCardValue("usuarioCP", usuarioCP);
	}


}