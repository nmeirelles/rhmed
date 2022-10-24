function displayFields(form,customHTML){
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    let WKNumState = getValue("WKNumState");
    form.setValue("numeroAtividadeAtual", WKNumState);
    customHTML.append("<script> var WKNumState = '" + WKNumState + "';</script>");

    if(WKNumState == 0 || WKNumState == 1){
        let WKUser = getValue("WKUser");
        let c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", WKUser, WKUser, ConstraintType.MUST);
        let c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
        let constraints = [c1, c2];
        let dsColleague = DatasetFactory.getDataset("colleague", null, constraints, null);
        form.setValue("nomeResponsavel", dsColleague.getValue(0, "colleagueName") );
        form.setValue("dataInclusao", getDatetimeNow());
    }

}
function getDatetimeNow() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}