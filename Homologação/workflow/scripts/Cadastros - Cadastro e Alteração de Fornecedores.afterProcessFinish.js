function afterProcessFinish(processId){

	//hAPI.setCardValue("Status", "Pagamento programado");

		// Get SLA - Célula Cadastro
		var numeroSolicitacaoCC = processId;
		var numeroAtividadeCC = 5;
		var numeroProximaAtividadeCF = 9;
		var nomeGrupoCC = "Pool:Group:PROC_Suprimentos_Cadastro_Fornecedores";
		var cNumeroSolicitacao = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoCC, numeroSolicitacaoCC, ConstraintType.MUST);
		var cNumeroAtividade = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeCC, numeroAtividadeCC, ConstraintType.MUST);
		var cNumeroProximaAtividade = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeCF, numeroProximaAtividadeCF, ConstraintType.MUST);
		var cNomeGrupo = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoCC, nomeGrupoCC, ConstraintType.MUST);
		var constraintsCC = [cNumeroSolicitacao,cNumeroAtividade,cNumeroProximaAtividade,cNomeGrupo];
		log.dir(constraintsCC);
		var dsSLACC = DatasetFactory.getDataset("ds_getSLA", null, constraintsCC, null);
		log.dir(dsSLACC);
		for(var i = 0; i < dsSLACC.rowsCount; i++){
			var dataDisponibilidadeCC = dsSLACC.getValue(i, "dataDisponibilidade");
			var dataAssumiuCC = dsSLACC.getValue(i, "dataAssumiu");
			var dataFinalizouCC = dsSLACC.getValue(i, "dataFinalizou");
			var usuarioCC = dsSLACC.getValue(i, "usuario");
			hAPI.setCardValue("dataDisponibilidadeCC", dataDisponibilidadeCC);
			hAPI.setCardValue("dataAssumiuCC", dataAssumiuCC);
			hAPI.setCardValue("dataFinalizouCC", dataFinalizouCC);
			hAPI.setCardValue("usuarioCC", usuarioCC);
		}
	
	
	
		// Get SLA - Controladoria
		var numeroSolicitacaoC = processId;
		var numeroAtividadeC = 107;
		var numeroProximaAtividadeC = 116;
		var nomeGrupoC = "Pool:Group:PROC_Controladoria_Cadastro_Fornecedores";
		var cNumeroSolicitacaoC = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoC, numeroSolicitacaoC, ConstraintType.MUST);
		var cNumeroAtividadeC = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeC, numeroAtividadeC, ConstraintType.MUST);
		var cNumeroProximaAtividadeC = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeC, numeroProximaAtividadeC, ConstraintType.MUST);
		var cNomeGrupoC = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoC, nomeGrupoC, ConstraintType.MUST);
		var constraintsC = [cNumeroSolicitacaoC, cNumeroAtividadeC, cNumeroProximaAtividadeC, cNomeGrupoC];
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