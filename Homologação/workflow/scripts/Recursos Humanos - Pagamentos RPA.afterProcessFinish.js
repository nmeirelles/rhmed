function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - Supervisor
	var numeroSolicitacaoS = processId;
	var numeroAtividadeS = 27;
	var numeroProximaAtividadeS = 50;
	var nomeGrupoS = "";
	var nomeUsuarioS = hAPI.getCardValue("aprovadorSupervisor");
	var cNumeroSolicitacaoS = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoS, numeroSolicitacaoS, ConstraintType.MUST);
	var cNumeroAtividadeS = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeS, numeroAtividadeS, ConstraintType.MUST);
	var cNumeroProximaAtividadeS = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeS, numeroProximaAtividadeS, ConstraintType.MUST);
	var cNomeGrupoS = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoS, nomeGrupoS, ConstraintType.MUST);
	var cNomeUsuarioS = DatasetFactory.createConstraint("nomeUsuario", nomeUsuarioS, nomeUsuarioS, ConstraintType.MUST);
	var constraintsS = [cNumeroSolicitacaoS, cNumeroAtividadeS, cNumeroProximaAtividadeS, cNomeGrupoS, cNomeUsuarioS];
	log.dir(constraintsS);
	var dsSLAS = DatasetFactory.getDataset("ds_getSLA", null, constraintsS, null);
	log.dir(dsSLAS);
	for(var i = 0; i < dsSLAS.rowsCount; i++){
		var dataDisponibilidadeS = dsSLAS.getValue(i, "dataDisponibilidade");
		var dataAssumiuS = dsSLAS.getValue(i, "dataAssumiu");
		var dataFinalizouS = dsSLAS.getValue(i, "dataFinalizou");
		var usuarioS = dsSLAS.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeS", dataDisponibilidadeS);
		hAPI.setCardValue("dataAssumiuS", dataAssumiuS);
		hAPI.setCardValue("dataFinalizouS", dataFinalizouS);
		hAPI.setCardValue("usuarioS", usuarioS);
	}

	// Get SLA - Coordenador
	var tmpCoordenador = false;
	var numeroSolicitacaoC = processId;
	var numeroAtividadeC = 55;
	var numeroProximaAtividadeC = 57;
	var nomeGrupoC = "";
	var nomeUsuarioC = hAPI.getCardValue("aprovadorCoordenador");
	var cNumeroSolicitacaoC = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoC, numeroSolicitacaoC, ConstraintType.MUST);
	var cNumeroAtividadeC = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeC, numeroAtividadeC, ConstraintType.MUST);
	var cNumeroProximaAtividadeC = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeC, numeroProximaAtividadeC, ConstraintType.MUST);
	var cNomeGrupoC = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoC, nomeGrupoC, ConstraintType.MUST);
	var cNomeUsuarioC = DatasetFactory.createConstraint("nomeUsuario", nomeUsuarioC, nomeUsuarioC, ConstraintType.MUST);
	var constraintsC = [cNumeroSolicitacaoC, cNumeroAtividadeC, cNumeroProximaAtividadeC, cNomeGrupoC, cNomeUsuarioC];
	log.dir(constraintsC);
	var dsSLAC = DatasetFactory.getDataset("ds_getSLA", null, constraintsC, null);
	log.dir(dsSLAC);
	for(var i = 0; i < dsSLAC.rowsCount; i++){
		var dataDisponibilidadeC = dsSLAC.getValue(i, "dataDisponibilidade");
		var dataAssumiuC = dsSLAC.getValue(i, "dataAssumiu");
		var dataFinalizouC = dsSLAC.getValue(i, "dataFinalizou");
		var usuarioC = dsSLAC.getValue(i, "usuario");
		if(dataDisponibilidadeC == ""){
			tmpCoordenador = true;
			break;
		}
		hAPI.setCardValue("dataDisponibilidadeC", dataDisponibilidadeC);
		hAPI.setCardValue("dataAssumiuC", dataAssumiuC);
		hAPI.setCardValue("dataFinalizouC", dataFinalizouC);
		hAPI.setCardValue("usuarioC", usuarioC);
	}
	if(tmpCoordenador == true){
		var numeroSolicitacaoC = processId;
		var numeroAtividadeC = 25;
		var numeroProximaAtividadeC = 29;
		var nomeGrupoC = "";
		var nomeUsuarioC = hAPI.getCardValue("aprovadorCoordenador");
		var cNumeroSolicitacaoC = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoC, numeroSolicitacaoC, ConstraintType.MUST);
		var cNumeroAtividadeC = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeC, numeroAtividadeC, ConstraintType.MUST);
		var cNumeroProximaAtividadeC = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeC, numeroProximaAtividadeC, ConstraintType.MUST);
		var cNomeGrupoC = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoC, nomeGrupoC, ConstraintType.MUST);
		var cNomeUsuarioC = DatasetFactory.createConstraint("nomeUsuario", nomeUsuarioC, nomeUsuarioC, ConstraintType.MUST);
		var constraintsC = [cNumeroSolicitacaoC, cNumeroAtividadeC, cNumeroProximaAtividadeC, cNomeGrupoC, cNomeUsuarioC];
		log.dir(constraintsC);
		var dsSLAC = DatasetFactory.getDataset("ds_getSLA", null, constraintsC, null);
		log.dir(dsSLAC);
		for(var i = 0; i < dsSLAC.rowsCount; i++){
			var dataDisponibilidadeC = dsSLAC.getValue(i, "dataDisponibilidade");
			var dataAssumiuC = dsSLAC.getValue(i, "dataAssumiu");
			var dataFinalizouC = dsSLAC.getValue(i, "dataFinalizou");
			var usuarioC = dsSLAC.getValue(i, "usuario");
			hAPI.setCardValue("dataDisponibilidadeC", dataDisponibilidadeC);
			hAPI.setCardValue("dataAssumiuC", dataAssumiuC);
			hAPI.setCardValue("dataFinalizouC", dataFinalizouC);
			hAPI.setCardValue("usuarioC", usuarioC);
		}
	}

	// Get SLA - Gerente
	var numeroSolicitacaoG = processId;
	var numeroAtividadeG = 34;
	var numeroProximaAtividadeG = 36;
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
	var numeroAtividadeD = 41;
	var numeroProximaAtividadeD = 43;
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

	// Get SLA - Recursos Humanos 1
	var numeroSolicitacaoRH1 = processId;
	var numeroAtividadeRH1 = 5;
	var numeroProximaAtividadeRH1 = 9;
	var nomeGrupoRH1 = "Pool:Group:PROC_Recursos_Humanos";
	var cNumeroSolicitacaoRH1 = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoRH1, numeroSolicitacaoRH1, ConstraintType.MUST);
	var cNumeroAtividadeRH1 = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeRH1, numeroAtividadeRH1, ConstraintType.MUST);
	var cNumeroProximaAtividadeRH1 = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeRH1, numeroProximaAtividadeRH1, ConstraintType.MUST);
	var cNomeGrupoRH1 = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoRH1, nomeGrupoRH1, ConstraintType.MUST);
	var constraintsRH1 = [cNumeroSolicitacaoRH1,cNumeroAtividadeRH1,cNumeroProximaAtividadeRH1,cNomeGrupoRH1];
	log.dir(constraintsRH1);
	var dsSLARH1 = DatasetFactory.getDataset("ds_getSLA", null, constraintsRH1, null);
	log.dir(dsSLARH1);
	for(var i = 0; i < dsSLARH1.rowsCount; i++){
		var dataDisponibilidadeRH1 = dsSLARH1.getValue(i, "dataDisponibilidade");
		var dataAssumiuRH1 = dsSLARH1.getValue(i, "dataAssumiu");
		var dataFinalizouRH1 = dsSLARH1.getValue(i, "dataFinalizou");
		var usuarioRH1 = dsSLARH1.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeRH1", dataDisponibilidadeRH1);
		hAPI.setCardValue("dataAssumiuRH1", dataAssumiuRH1);
		hAPI.setCardValue("dataFinalizouRH1", dataFinalizouRH1);
		hAPI.setCardValue("usuarioRH1", usuarioRH1);
	}

	// Get SLA - Solicitante
	var numeroSolicitacaoSolicitante = processId;
	var numeroAtividadeSolicitante = 102;
	var numeroProximaAtividadeSolicitante = 104;
	var nomeGrupoSolicitante = "";
	var nomeUsuarioSolicitante = hAPI.getCardValue("solicitanteMatricula");
	var cNumeroSolicitacaoSolicitante = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoSolicitante, numeroSolicitacaoSolicitante, ConstraintType.MUST);
	var cNumeroAtividadeSolicitante = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeSolicitante, numeroAtividadeSolicitante, ConstraintType.MUST);
	var cNumeroProximaAtividadeSolicitante = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeSolicitante, numeroProximaAtividadeSolicitante, ConstraintType.MUST);
	var cNomeGrupoSolicitante = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoSolicitante, nomeGrupoSolicitante, ConstraintType.MUST);
	var cNomeUsuarioSolicitante = DatasetFactory.createConstraint("nomeUsuario", nomeUsuarioSolicitante, nomeUsuarioSolicitante, ConstraintType.MUST);
	var constraintsSolicitante = [cNumeroSolicitacaoSolicitante, cNumeroAtividadeSolicitante, cNumeroProximaAtividadeSolicitante, cNomeGrupoSolicitante, cNomeUsuarioSolicitante];
	log.dir(constraintsSolicitante);
	var dsSLASolicitante = DatasetFactory.getDataset("ds_getSLA", null, constraintsSolicitante, null);
	log.dir(dsSLASolicitante);
	for(var i = 0; i < dsSLASolicitante.rowsCount; i++){
		var dataDisponibilidadeSolicitante = dsSLASolicitante.getValue(i, "dataDisponibilidade");
		var dataAssumiuSolicitante = dsSLASolicitante.getValue(i, "dataAssumiu");
		var dataFinalizouSolicitante = dsSLASolicitante.getValue(i, "dataFinalizou");
		var usuarioSolicitante = dsSLASolicitante.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeSolicitante", dataDisponibilidadeSolicitante);
		hAPI.setCardValue("dataAssumiuSolicitante", dataAssumiuSolicitante);
		hAPI.setCardValue("dataFinalizouSolicitante", dataFinalizouSolicitante);
		hAPI.setCardValue("usuarioSolicitante", usuarioSolicitante);
	}

	// Get SLA - Recursos Humanos 2
	var numeroSolicitacaoRH2 = processId;
	var numeroAtividadeRH2 = 104;
	var numeroProximaAtividadeRH2 = 106;
	var nomeGrupoRH2 = "Pool:Group:PROC_Recursos_Humanos";
	var cNumeroSolicitacaoRH2 = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoRH2, numeroSolicitacaoRH2, ConstraintType.MUST);
	var cNumeroAtividadeRH2 = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeRH2, numeroAtividadeRH2, ConstraintType.MUST);
	var cNumeroProximaAtividadeRH2 = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeRH2, numeroProximaAtividadeRH2, ConstraintType.MUST);
	var cNomeGrupoRH2 = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoRH2, nomeGrupoRH2, ConstraintType.MUST);
	var constraintsRH2 = [cNumeroSolicitacaoRH2,cNumeroAtividadeRH2,cNumeroProximaAtividadeRH2,cNomeGrupoRH2];
	log.dir(constraintsRH2);
	var dsSLARH2 = DatasetFactory.getDataset("ds_getSLA", null, constraintsRH2, null);
	log.dir(dsSLARH2);
	for(var i = 0; i < dsSLARH2.rowsCount; i++){
		var dataDisponibilidadeRH2 = dsSLARH2.getValue(i, "dataDisponibilidade");
		var dataAssumiuRH2 = dsSLARH2.getValue(i, "dataAssumiu");
		var dataFinalizouRH2 = dsSLARH2.getValue(i, "dataFinalizou");
		var usuarioRH2 = dsSLARH2.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeRH2", dataDisponibilidadeRH2);
		hAPI.setCardValue("dataAssumiuRH2", dataAssumiuRH2);
		hAPI.setCardValue("dataFinalizouRH2", dataFinalizouRH2);
		hAPI.setCardValue("usuarioRH2", usuarioRH2);
	}


}