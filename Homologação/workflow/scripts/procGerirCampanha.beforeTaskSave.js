function beforeTaskSave(colleagueId,nextSequenceId,userList){

    if(nextSequenceId == 75){
        var data = new Date();
        var dia  = data.getDate();
        var mes  = data.getMonth() + 1;
        var ano  = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        var dataLocal = dia+"/"+mes+"/"+ano;
        hAPI.setCardValue("dataListaPresenca", dataLocal);
    }

    hAPI.setCardValue("atividadeAtual", nextSequenceId);
		
	var numState = getValue("WKNumState");
    var process = getValue("WKNumProces");
    var anexado = false;
    var message = "";
    var contrato = hAPI.getCardValue("tipoContrato");
    
    if((numState == 0) && (contrato == "os") && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- Para Prosseguir, é necessario anexar a OS.";
    }
    
    if((numState == 0) && (contrato == "propCom") && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- Para Prosseguir, é necessario anexar a Proposta Comercial.";
    }
    
    if((numState == 4) && (contrato == "os") && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- Para Prosseguir, é necessario anexar a OS.";
    }
    
    if((numState == 4) && (contrato == "propCom") && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- Para Prosseguir, é necessario anexar a Proposta Comercial.";
    }
    
    if(numState == 73 && hAPI.listAttachments().size() < 1 ) {
        message += "<br/>- Para Prosseguir, é necessario anexar a Lista de Presença.";
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