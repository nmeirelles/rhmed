function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - RH Corporativo
	var numeroSolicitacaoRHC = processId;
	var numeroAtividadeRHC = 121;
	var numeroProximaAtividadeRHC = 19;
	var nomeGrupoRHC = "Pool:Group:PROC_RH_Corporativo";
	var cNumeroSolicitacaoRHC = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoRHC, numeroSolicitacaoRHC, ConstraintType.MUST);
	var cNumeroAtividadeRHC = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeRHC, numeroAtividadeRHC, ConstraintType.MUST);
	var cNumeroProximaAtividadeRHC = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeRHC, numeroProximaAtividadeRHC, ConstraintType.MUST);
	var cNomeGrupoRHC = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoRHC, nomeGrupoRHC, ConstraintType.MUST);
	var constraintsRHC = [cNumeroSolicitacaoRHC,cNumeroAtividadeRHC,cNumeroProximaAtividadeRHC,cNomeGrupoRHC];
	log.dir(constraintsRHC);
	var dsSLARHC = DatasetFactory.getDataset("ds_getSLA", null, constraintsRHC, null);
	log.dir(dsSLARHC);
	for(var i = 0; i < dsSLARHC.rowsCount; i++){
		var dataDisponibilidadeRHC = dsSLARHC.getValue(i, "dataDisponibilidade");
		var dataAssumiuRHC = dsSLARHC.getValue(i, "dataAssumiu");
		var dataFinalizouRHC = dsSLARHC.getValue(i, "dataFinalizou");
		var usuarioRHC = dsSLARHC.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeRHC", dataDisponibilidadeRHC);
		hAPI.setCardValue("dataAssumiuRHC", dataAssumiuRHC);
		hAPI.setCardValue("dataFinalizouRHC", dataFinalizouRHC);
		hAPI.setCardValue("usuarioRHC", usuarioRHC);
	}



	// Get SLA - RH Externo
	var numeroSolicitacaoRHE = processId;
	var numeroAtividadeRHE = 12;
	var numeroProximaAtividadeRHE = 19;
	var nomeGrupoRHE = "Pool:Group:PROC_RH_Externo";
	var cNumeroSolicitacaoRHE = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoRHE, numeroSolicitacaoRHE, ConstraintType.MUST);
	var cNumeroAtividadeRHE = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeRHE, numeroAtividadeRHE, ConstraintType.MUST);
	var cNumeroProximaAtividadeRHE = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeRHE, numeroProximaAtividadeRHE, ConstraintType.MUST);
	var cNomeGrupoRHE = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoRHE, nomeGrupoRHE, ConstraintType.MUST);
	var constraintsRHE = [cNumeroSolicitacaoRHE,cNumeroAtividadeRHE,cNumeroProximaAtividadeRHE,cNomeGrupoRHE];
	log.dir(constraintsRHE);
	var dsSLARHE = DatasetFactory.getDataset("ds_getSLA", null, constraintsRHE, null);
	log.dir(dsSLARHE);
	for(var i = 0; i < dsSLARHE.rowsCount; i++){
		var dataDisponibilidadeRHE = dsSLARHE.getValue(i, "dataDisponibilidade");
		var dataAssumiuRHE = dsSLARHE.getValue(i, "dataAssumiu");
		var dataFinalizouRHE = dsSLARHE.getValue(i, "dataFinalizou");
		var usuarioRHE = dsSLARHE.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeRHE", dataDisponibilidadeRHE);
		hAPI.setCardValue("dataAssumiuRHE", dataAssumiuRHE);
		hAPI.setCardValue("dataFinalizouRHE", dataFinalizouRHE);
		hAPI.setCardValue("usuarioRHE", usuarioRHE);
	}



	// Get SLA - Gerente
	var numeroSolicitacaoG = processId;
	var numeroAtividadeG = 9;
	var numeroProximaAtividadeG = 11;
	var nomeGrupoG = "";
	var nomeUsuarioG = hAPI.getCardValue("aprovadorGerente");
	var cNumeroSolicitacaoG = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoG, numeroSolicitacaoG, ConstraintType.MUST);
	var cNumeroAtividadeG = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeG, numeroAtividadeG, ConstraintType.MUST);
	var cNumeroProximaAtividadeG = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeG, numeroProximaAtividadeG, ConstraintType.MUST);
	var cNomeGrupoG = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoG, nomeGrupoG, ConstraintType.MUST);
	var cNomeUsuarioG = DatasetFactory.createConstraint("nomeUsuario", nomeUsuarioG, nomeUsuarioG, ConstraintType.MUST);
	var constraintsG = [cNumeroSolicitacaoG, cNumeroAtividadeG, cNumeroProximaAtividadeG, cNomeGrupoG, cNomeUsuarioG];
	log.dir(constraintsG);
	var dsSLAG = DatasetFactory.getDataset("ds_getSLA", null, constraintsG, null);
	log.dir(dsSLAG);
	for(var i = 0; i < dsSLAG.rowsCount; i++){
		var dataDisponibilidadeG = dsSLAG.getValue(i, "dataDisponibilidade");
		var dataAssumiuG = dsSLAG.getValue(i, "dataAssumiu");
		var dataFinalizouG = dsSLAG.getValue(i, "dataFinalizou");
		var usuarioG = dsSLAG.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeG", dataDisponibilidadeG);
		hAPI.setCardValue("dataAssumiuG", dataAssumiuG);
		hAPI.setCardValue("dataFinalizouG", dataFinalizouG);
		hAPI.setCardValue("usuarioG", usuarioG);
	}



	// Get SLA - Diretor
	var numeroSolicitacaoD = processId;
	var numeroAtividadeD = 106;
	var numeroProximaAtividadeD = 11;
	var nomeGrupoD = "";
	var nomeUsuarioD = hAPI.getCardValue("aprovadorDiretor");
	var cNumeroSolicitacaoD = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoD, numeroSolicitacaoD, ConstraintType.MUST);
	var cNumeroAtividadeD = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeD, numeroAtividadeD, ConstraintType.MUST);
	var cNumeroProximaAtividadeD = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeD, numeroProximaAtividadeD, ConstraintType.MUST);
	var cNomeGrupoD = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoD, nomeGrupoD, ConstraintType.MUST);
	var cNomeUsuarioD = DatasetFactory.createConstraint("nomeUsuario", nomeUsuarioD, nomeUsuarioD, ConstraintType.MUST);
	var constraintsD = [cNumeroSolicitacaoD, cNumeroAtividadeD, cNumeroProximaAtividadeD, cNomeGrupoD, cNomeUsuarioD];
	log.dir(constraintsD);
	var dsSLAD = DatasetFactory.getDataset("ds_getSLA", null, constraintsD, null);
	log.dir(dsSLAD);
	for(var i = 0; i < dsSLAD.rowsCount; i++){
		var dataDisponibilidadeD = dsSLAD.getValue(i, "dataDisponibilidade");
		var dataAssumiuD = dsSLAD.getValue(i, "dataAssumiu");
		var dataFinalizouD = dsSLAD.getValue(i, "dataFinalizou");
		var usuarioD = dsSLAD.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeD", dataDisponibilidadeD);
		hAPI.setCardValue("dataAssumiuD", dataAssumiuD);
		hAPI.setCardValue("dataFinalizouD", dataFinalizouD);
		hAPI.setCardValue("usuarioD", usuarioD);
	}
}