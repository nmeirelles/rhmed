function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	try{
		var grupo = getParametro(constraints, "GRUPO");
		var addSolicitante = getParametro(constraints, "ADD_SOLICITANTE") == "";
		
		//grupo = "CSC_ATENDIMENTO";
		
		if (grupo == ""){
			return dataset;
		}
		
		log.info("#### grupo: " + grupo)
		log.info("#### addSolicitante: " +addSolicitante )
		
		var c0 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupo, grupo, ConstraintType.MUST); 
		var filtros = new Array(c0, c1);
		var dsColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, filtros, null);
		if (dsColleagueGroup.rowsCount > 0){
			for (var i = 0; i < dsColleagueGroup.rowsCount; i++) {
				var matricula = dsColleagueGroup.getValue(i, "colleagueGroupPK.colleagueId");
				
				var dsUsuario = obterDatasetUsuario(matricula);
				if (dsUsuario.rowsCount > 0){
					dataset.addRow(new Array(
								dsUsuario.getValue(0, "mail"),
								dsUsuario.getValue(0, "colleaguePK.colleagueId"),
								dsUsuario.getValue(0, "colleagueName"),
								dsUsuario.getValue(0, "extensionNr"),
								dsUsuario.getValue(0, "currentProject")
							))
				}
		    }
		} // if
		
		
		if (addSolicitante){
			var matricula = getValue("WKUser");
			var jaExiste = false;
			for (var i = 0; i < dataset.rowsCount; i++){
				if (dataset.getValue(i, "MATRICULA") == matricula){
					jaExiste = true;
					break;
				}
			}
			if (!jaExiste){
				var dsUsuario = obterDatasetUsuario(matricula);
				if (dsUsuario.rowsCount > 0){
					dataset.addRow(new Array(
								dsUsuario.getValue(0, "mail"),
								dsUsuario.getValue(0, "colleaguePK.colleagueId"),
								dsUsuario.getValue(0, "colleagueName"),
								dsUsuario.getValue(0, "extensionNr"),
								dsUsuario.getValue(0, "currentProject")
							));
				}	
			}
		}
	}catch(e){
        var mensagemErro = e;
        log.error("dsUsuariosPorGrupo.createDataset: " + mensagemErro);
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("ERROR");
        dataset.addColumn("MESSAGE_ERROR");
        dataset.addRow(new Array(-1, mensagemErro));	
	}
	return dataset;
}

function criarEstrutura(dataset){
	dataset.addColumn("EMAIL", DatasetFieldType.STRING);
	dataset.addColumn("MATRICULA", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);
	dataset.addColumn("TELEFONE", DatasetFieldType.STRING);
	dataset.addColumn("DEPARTAMENTO", DatasetFieldType.STRING);
} // criarEstrutura

function getParametro(constraints, campo) {
	var valor = "";
	if ((constraints != null) && (constraints.length > 0)) {
		for each(con in constraints) {
			if (con.getFieldName().trim().toUpperCase() == campo.trim().toUpperCase()) {
				valor = con.getInitialValue();
				break;
			}
		}
	}
	return valor;
} // getParametro

function obterDatasetUsuario(matricula){
	var c0 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var filtros = new Array(c0, c1, c2);
	var dsUsuario = DatasetFactory.getDataset("colleague", null, filtros, null);
	return dsUsuario; 
} // obterDatasetUsuario



/*
CAMPO ZOOM no formulario:
<div class="col-md-6">
	<div class="form-group">
		<label class="control-label required" atividades="0,4" for="zoomEmpresa">Empresa</label>
		<input type="hidden" id="codEmpresa" name="codEmpresa" value="" />
		<input type="zoom" class="form-control" id="zoomSolicitante" name="zoomSolicitante"
		data-zoom="{
				'displayKey': 'NOME',
				'datasetId': 'dsUsuariosPorGrupo',
				'filterValues': 'GRUPO,NOME_GRUPO',
				'fields': [
				   {
					   'field': 'NOME',
					   'label': 'Nome',	
					   'standard': 'true',					       
					   'search': 'true'
					},
					{
					   'field': 'EMAIL',
					   'label': 'E-mail',	
					   'standard': 'true',					       
					   'search': 'true'
					}
				 ]
		}" value="" />
	</div>
</div>





*/