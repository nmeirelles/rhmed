function displayFields(form,customHTML){
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    form.setVisibleById('panelCamposControle', false);

    let WKNumState = getValue("WKNumState");
    form.setValue("atividadeAtual", WKNumState);
    customHTML.append("<script> var WKNumState = '" + WKNumState + "';</script>");

    if(WKNumState == INICIO || WKNumState == INICIO2){
        let WKUser = getValue("WKUser");
        let c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", WKUser, WKUser, ConstraintType.MUST);
        let c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
        let constraints = [c1, c2];
        let dsColleague = DatasetFactory.getDataset("colleague", null, constraints, null);
        form.setValue("loginSolicitante", dsColleague.getValue(0, "login") );
        form.setValue("idSolicitante", dsColleague.getValue(0, "colleaguePK.colleagueId") );
        form.setValue("nomeSolicitante", dsColleague.getValue(0, "colleagueName") );
        form.setValue("emailSolicitante", dsColleague.getValue(0, "mail") );
        form.setValue("dataCriacao", getDatetimeNow());

        form.setVisibleById('panelExecucao', false);
        form.setVisibleById('panelGestor', false);
    }

    let servico = form.getValue("servico");
    if(servico == "link" || servico == "extensao") form.setVisibleById('divProspeccao', true);
    else form.setVisibleById('divProspeccao', false);

    var usuario = fluigAPI.getUserService().getCurrent();
	form.setValue("currentLogin", usuario.getLogin());
    form.setValue("currentNome", usuario.getFullName());

}
function getDatetimeNow(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}