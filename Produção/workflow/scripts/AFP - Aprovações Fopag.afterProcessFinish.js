function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - Recursos Humanos
	var numeroSolicitacaoRH = processId;
	var numeroAtividadeRH = 5;
	var numeroProximaAtividadeRH = 9;
	var nomeGrupoRH = "Pool:Group:PROC_RH_Fopag";
	var cNumeroSolicitacao = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoRH, numeroSolicitacaoRH, ConstraintType.MUST);
	var cNumeroAtividade = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeRH, numeroAtividadeRH, ConstraintType.MUST);
	var cNumeroProximaAtividade = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeRH, numeroProximaAtividadeRH, ConstraintType.MUST);
	var cNomeGrupo = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoRH, nomeGrupoRH, ConstraintType.MUST);
	var constraintsRH = [cNumeroSolicitacao,cNumeroAtividade,cNumeroProximaAtividade,cNomeGrupo];
	log.dir(constraintsRH);
	var dsSLARH = DatasetFactory.getDataset("ds_getSLA", null, constraintsRH, null);
	log.dir(dsSLARH);
	for(var i = 0; i < dsSLARH.rowsCount; i++){
		var dataDisponibilidadeRH = dsSLARH.getValue(i, "dataDisponibilidade");
		var dataAssumiuRH = dsSLARH.getValue(i, "dataAssumiu");
		var dataFinalizouRH = dsSLARH.getValue(i, "dataFinalizou");
		var usuarioRH = dsSLARH.getValue(i, "usuario");
		hAPI.setCardValue("dataDisponibilidadeRH", dataDisponibilidadeRH);
		hAPI.setCardValue("dataAssumiuRH", dataAssumiuRH);
		hAPI.setCardValue("dataFinalizouRH", dataFinalizouRH);
		hAPI.setCardValue("usuarioRH", usuarioRH);
	}

	// Get SLA - Contas a Pagar
	var numeroSolicitacaoCP = processId;
	var numeroAtividadeCP = 102;
	var numeroProximaAtividadeCP = 14;
	var nomeGrupoCP = "Pool:Group:PROC-Aprovadores_Bancarios";
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

}