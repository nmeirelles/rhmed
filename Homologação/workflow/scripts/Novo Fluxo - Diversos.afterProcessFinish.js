function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

	// Get SLA - Célula Fiscal
	var numeroSolicitacaoCF = processId;
	var numeroAtividadeCF = 35;
	var numeroProximaAtividadeCF = 69;
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
	var numeroAtividadeCP = 97;
	var numeroProximaAtividadeCP = 47;
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

	// Get SLA - Supervisor
	var numeroSolicitacaoS = processId;
	var numeroAtividadeS = 5;
	var numeroProximaAtividadeS = 18;
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
	var numeroAtividadeC = 17;
	var numeroProximaAtividadeC = 65;
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
		var numeroAtividadeC = 9;
		var numeroProximaAtividadeC = 56;
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
	var numeroAtividadeG = 21;
	var numeroProximaAtividadeG = 30;
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
	var numeroAtividadeD = 23;
	var numeroProximaAtividadeD = 60;
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