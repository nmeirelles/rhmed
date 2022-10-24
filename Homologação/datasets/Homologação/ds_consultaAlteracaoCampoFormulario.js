function defineStructure(){}
function onSync(lastSyncDate){}
function createDataset(fields, constraints, sortFields){
    log.info("ds_consultaAlteracaoCampoFormulario | createDataset | begin");
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("status");
    dataset.addColumn("nomeCampo");
    dataset.addColumn("valorAnteriorCampo");
    dataset.addColumn("valorPosteriorCampo");
    var nomeCampoNrFluig = "";
    var numeroFluig = "";
    var nomeDatasetFormulario = "";
    var arrayCamposAnalisar = [];
    if(constraints != null){
        for(var i = 0; i < constraints.length; i++){
            if (constraints[i].fieldName == "nomeCampoNrFluig") nomeCampoNrFluig = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "numeroFluig") numeroFluig = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "nomeDatasetFormulario") nomeDatasetFormulario = "" + constraints[i].initialValue;
            if (constraints[i].fieldName == "arrayCamposAnalisar") arrayCamposAnalisar = JSON.parse(constraints[i].initialValue);
        }  
    }
    log.info("nomeCampoNrFluig: "+nomeCampoNrFluig);
    log.info("numeroFluig: "+numeroFluig);
    log.info("nomeDatasetFormulario: "+nomeDatasetFormulario);
    log.info("arrayCamposAnalisar");
    log.dir(arrayCamposAnalisar);
    var ct1 = DatasetFactory.createConstraint(nomeCampoNrFluig, numeroFluig, numeroFluig, ConstraintType.MUST);
    var ct2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var constraints = [ct1,ct2];
    log.dir(constraints);
    var dsFormularioAtual = DatasetFactory.getDataset(nomeDatasetFormulario, null, constraints, null);
    log.dir(dsFormularioAtual);
    var versaoAtual = dsFormularioAtual.getValue(0, "metadata#version");
    log.info("versaoAtual: "+versaoAtual);
    var versaoAnterior = parseInt(versaoAtual) - 1000;
    log.info("versaoAnterior: "+versaoAnterior);
    var ct11 = DatasetFactory.createConstraint(nomeCampoNrFluig, numeroFluig, numeroFluig, ConstraintType.MUST);
    var ct22 = DatasetFactory.createConstraint("metadata#version", versaoAnterior, versaoAnterior, ConstraintType.MUST);
    var constraintss = [ct11,ct22];
    log.dir(constraintss);
    var dsFormularioAnterior = DatasetFactory.getDataset(nomeDatasetFormulario, null, constraintss, null);
    log.dir(dsFormularioAnterior);
    log.info("arrayCamposAnalisar.length: "+arrayCamposAnalisar.length);
    for(var i = 0; i < arrayCamposAnalisar.length; i++){
        var nomeCampo = arrayCamposAnalisar[i];
        log.info("nomeCampo: "+nomeCampo);
        var valorCampoAtual = dsFormularioAtual.getValue(0, nomeCampo);
        log.info("valorCampoAtual: "+valorCampoAtual);
        var valorCampoAnterior = dsFormularioAnterior.getValue(0, nomeCampo);
        log.info("valorCampoAnterior: "+valorCampoAnterior);

        if(valorCampoAtual == valorCampoAnterior) dataset.addRow(["ok",nomeCampo,valorCampoAnterior,valorCampoAtual]);
        else dataset.addRow(["not",nomeCampo,valorCampoAnterior,valorCampoAtual]);
    }
    log.info("ds_consultaAlteracaoCampoFormulario | createDataset | end");
    return dataset;
}
function onMobileSync(user){}