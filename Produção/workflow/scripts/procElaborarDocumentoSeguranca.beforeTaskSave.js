function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	/*
		if (!verificarSePossuiAnexo(64)){
		  // não tem anexo
		}
		
		if (!verificarSePossuiAnexo(90)){
			  // não tem anexo
			}
		
		if (!verificarSePossuiAnexo(95)){
			  // não tem anexo
			}
	
	
	function verificarSePossuiAnexo(atividade){        
	    var processo = getValue("WKNumProces");    
	    var filtroAnexo = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', processo, processo, ConstraintType.MUST);
	    var dsAnexosProcesso = DatasetFactory.getDataset('processAttachment', null, new Array(filtroAnexo), null);
	    for (var i = 0; i < dsAnexosProcesso.rowsCount; i++) {
	        var filtro1 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', dsAnexosProcesso.getValue(i, "originalMovementSequence"), dsAnexosProcesso.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
	        var filtro2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', processo, processo, ConstraintType.MUST);
	        var filtro3 = DatasetFactory.createConstraint('processHistoryPK.companyId', dsAnexosProcesso.getValue(i, "processAttachmentPK.companyId"), dsAnexosProcesso.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
	        var filtro4 = DatasetFactory.createConstraint('stateSequence', atividade, atividade, ConstraintType.MUST);
	        var constraints = new Array(filtro1, filtro2, filtro3, filtro4);
	        var dsHistoricoProcesso = DatasetFactory.getDataset('processHistory', null, constraints, null);
	        //return dsHistoricoProcesso.rowsCount > 0;
	        if (dsHistoricoProcesso.rowsCount > 0){
	        	return true;
	        }
	    } // for anexos
	    return false;    
	}
	*/
	
	
	var numState = getValue("WKNumState");
	var nextState = getValue("WKNextState");
    var process = getValue("WKNumProces");
    var anexado = false;
    var message = "";

    if((numState == 64) && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- É necessario anexar o checklist, documentos e mídias.";
    }
    
    if((numState == 45) && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- É necessario anexar o checklist, documentos e mídias.";
    }
    
    if((numState == 90) && (nextState == 92) && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- É necessario anexar o Documento elaborado/atualizado.";
    }
    
    if((numState == 95) && (nextState == 158) && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- É necessario anexar o Documento assinado.";
    }

    if (message != "") throw "<br/><strong><u>ANEXO OBRIGATÓRIO</u></strong><br/>" + message;

    function temAnexo(){        
        var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', process, process, ConstraintType.MUST);
        var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, new Array(constraintProcessAttachment), null);

        for(var i = 0; i < datasetProcessAttachment.rowsCount; i++) {
            var constraintProcessHistory1 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', datasetProcessAttachment.getValue(i, "originalMovementSequence"), datasetProcessAttachment.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
            var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', process, process, ConstraintType.MUST);
            var constraintProcessHistory3 = DatasetFactory.createConstraint('processHistoryPK.companyId', datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
            var constraintProcessHistory4 = DatasetFactory.createConstraint('stateSequence', numState, numState, ConstraintType.MUST);
            var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null, new Array(constraintProcessHistory1, constraintProcessHistory2, constraintProcessHistory3, constraintProcessHistory4), null);
            for(var j = 0; j < datasetProcessHistory.rowsCount; j++) {                
                return true;            
            }    
        }
        return false;    
    }
}