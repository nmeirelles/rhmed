function afterProcessFinish(processId){
    // var newDate = new Date();
    // var formatDate = new java.text.SimpleDateFormat("dd/MM/yyyy");
    // var dataLocal = formatDate.format(newDate);

    var data = new Date();
    var dia  = data.getDate();
    var mes  = data.getMonth() + 1;
    var ano  = data.getFullYear();
    dia = (dia<=9 ? "0"+dia : dia);
    mes = (mes<=9 ? "0"+mes : mes);
    var dataLocal = dia+"/"+mes+"/"+ano;

    var selectAprovacaoSeguranca = hAPI.getCardValue("selectAprovacaoSeguranca");
    var selectAprovacaoSaude = hAPI.getCardValue("selectAprovacaoSaude");
    
    if(selectAprovacaoSeguranca == "cancelado" || selectAprovacaoSaude == "cancelado"){
        hAPI.setCardValue("inputStatusSolicitacao", "Cancelado");
        
        hAPI.setCardValue("inputDataCancelamento", dataLocal);
        hAPI.setCardValue("inputMesCancelamento", mes);
        hAPI.setCardValue("inputAnoCancelamento", ano);
        
        hAPI.setCardValue("inputDataFim", dataLocal);
        hAPI.setCardValue("inputMesFim", mes);
        hAPI.setCardValue("inputAnoFim", ano);
    }else{
        hAPI.setCardValue("inputStatusSolicitacao", "Finalizado");
        
        hAPI.setCardValue("inputDataFim", dataLocal);
        hAPI.setCardValue("inputMesFim", mes);
        hAPI.setCardValue("inputAnoFim", ano);
    }
    
    // var inputEmpresa = hAPI.getCardValue("inputEmpresa");

    // // Get SLA - Segurança
	// var numeroSolicitacaoSeguranca = processId;
	// var numeroAtividadeSeguranca = 7;	
	// var numeroProximaAtividadeSeguranca = 9;
	// var nomeGrupoSeguranca = inputEmpresa == 'RHMED' ? 'Pool:Group:Proc_AtrelarRiscoExame_SegurancaRHMED' : "Pool:PROC_AtrelarRiscoExame_SegurancaRHVIDA";
	// var cNumeroSolicitacaoSeguranca = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoSeguranca, numeroSolicitacaoSeguranca, ConstraintType.MUST);
	// var cNumeroAtividadeSeguranca = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeSeguranca, numeroAtividadeSeguranca, ConstraintType.MUST);
	// var cNumeroProximaAtividadeSeguranca = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeSeguranca, numeroProximaAtividadeSeguranca, ConstraintType.MUST);
	// var cNomeGrupoSeguranca = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoSeguranca, nomeGrupoSeguranca, ConstraintType.MUST);
	// var constraintsSeguranca = [cNumeroSolicitacaoSeguranca,cNumeroAtividadeSeguranca,cNumeroProximaAtividadeSeguranca,cNomeGrupoSeguranca];
	// log.dir(constraintsSeguranca);
	// var dsSLASeguranca = DatasetFactory.getDataset("ds_getSLA", null, constraintsSeguranca, null);
	// log.dir(dsSLASeguranca);
	// for(var i = 0; i < dsSLASeguranca.rowsCount; i++){
	// 	var dataDisponibilidadeSeguranca = dsSLASeguranca.getValue(i, "dataDisponibilidade");
	// 	var dataAssumiuSeguranca = dsSLASeguranca.getValue(i, "dataAssumiu");
	// 	var dataFinalizouSeguranca = dsSLASeguranca.getValue(i, "dataFinalizou");
	// 	var usuarioSeguranca = dsSLASeguranca.getValue(i, "usuario");
	// 	hAPI.setCardValue("dataDisponibilidadeSeguranca", dataDisponibilidadeSeguranca);
	// 	hAPI.setCardValue("dataAssumiuSeguranca", dataAssumiuSeguranca);
	// 	hAPI.setCardValue("dataFinalizouSeguranca", dataFinalizouSeguranca);
	// 	hAPI.setCardValue("usuarioSeguranca", usuarioSeguranca);
	// }
    
    // Get SLA - Saúde
	// var numeroSolicitacaoSaude = processId;
	// var numeroAtividadeSaude = 14;
	// var numeroProximaAtividadeSaude = 16;
	// var nomeGrupoSaude = inputEmpresa == 'RHMED' ? 'Pool:Group:Proc_AtrelarRiscoExame_SaudeRHMED' : "Pool:Group:PROC_AtrelarRiscoExame_SaudeRHVIDA";
	// var cNumeroSolicitacaoSaude = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacaoSaude, numeroSolicitacaoSaude, ConstraintType.MUST);
	// var cNumeroAtividadeSaude = DatasetFactory.createConstraint("numeroAtividade", numeroAtividadeSaude, numeroAtividadeSaude, ConstraintType.MUST);
	// var cNumeroProximaAtividadeSaude = DatasetFactory.createConstraint("numeroProximaAtividade", numeroProximaAtividadeSaude, numeroProximaAtividadeSaude, ConstraintType.MUST);
	// var cNomeGrupoSaude = DatasetFactory.createConstraint("nomeGrupo", nomeGrupoSaude, nomeGrupoSaude, ConstraintType.MUST);
	// var constraintsSaude = [cNumeroSolicitacaoSaude,cNumeroAtividadeSaude,cNumeroProximaAtividadeSaude,cNomeGrupoSaude];
	// log.dir(constraintsSaude);
	// var dsSLASaude = DatasetFactory.getDataset("ds_getSLA", null, constraintsSaude, null);
	// log.dir(dsSLASaude);
	// for(var i = 0; i < dsSLASaude.rowsCount; i++){
	// 	var dataDisponibilidadeSaude = dsSLASaude.getValue(i, "dataDisponibilidade");
	// 	var dataAssumiuSaude = dsSLASaude.getValue(i, "dataAssumiu");
	// 	var dataFinalizouSaude = dsSLASaude.getValue(i, "dataFinalizou");
	// 	var usuarioSaude = dsSLASaude.getValue(i, "usuario");
	// 	hAPI.setCardValue("dataDisponibilidadeSaude", dataDisponibilidadeSaude);
	// 	hAPI.setCardValue("dataAssumiuSaude", dataAssumiuSaude);
	// 	hAPI.setCardValue("dataFinalizouSaude", dataFinalizouSaude);
	// 	hAPI.setCardValue("usuarioSaude", usuarioSaude);
	// }

}