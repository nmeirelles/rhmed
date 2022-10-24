function beforeCancelProcess(colleagueId,processId){

    var idSolicitante = hAPI.getCardValue("idSolicitante");
    if(colleagueId == idSolicitante) {
        hAPI.setCardValue("status", "Cancelado Pelo Solicitante");
    }else{
        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
        var constraints = [c1, c2];
        var dsColleague = DatasetFactory.getDataset("colleague", null, constraints, null);
        var nomeUsuario = dsColleague.getValue(0, "colleagueName");
        var msg = "Cancelado Pelo Gestor Processo: "+nomeUsuario;
        hAPI.setCardValue("status", msg);
    }
}