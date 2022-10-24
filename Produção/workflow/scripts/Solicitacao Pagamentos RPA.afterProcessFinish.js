function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - Recursos Humanos
	var numeroSolicitacaoCF = processId;
	var numeroAtividadeCF = 5;
	var numeroProximaAtividadeCF = 9;
	var nomeGrupoCF = "Pool:Group:PROC_Recursos_Humanos";
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
		hAPI.setCardValue("dataDisponibilidadeRH", dataDisponibilidadeCF);
		hAPI.setCardValue("dataAssumiuRH", dataAssumiuCF);
		hAPI.setCardValue("dataFinalizouRH", dataFinalizouCF);
		hAPI.setCardValue("usuarioRH", usuarioCF);
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