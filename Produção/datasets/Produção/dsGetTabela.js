function createDataset(fields, constraints, sortFields) {
	//Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NumFormulario");
    dataset.addColumn("Id");
	dataset.addColumn("Cliente");
	dataset.addColumn("Tipo Contrato");
	dataset.addColumn("Mes Realizado");
    dataset.addColumn("Procedimento");
    dataset.addColumn("Quantidade");

	var respCliente = "";
	var filial = "";
	var tipoContrato = "";
	var mesRealizacao = "";
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "respCliente") respCliente = constraints[i].initialValue;
			if (constraints[i].fieldName == "filial") filial = constraints[i].initialValue;
            if (constraints[i].fieldName == "tipoContrato") tipoContrato = constraints[i].initialValue;
			if (constraints[i].fieldName == "mesRealizacao") mesRealizacao = constraints[i].initialValue;
        }
	}
	//Cria a constraint para buscar os formulários ativos
    var c1_1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var c2_1 = DatasetFactory.createConstraint("zoomBuscaEmpresa", respCliente, respCliente, ConstraintType.MUST);
    var c3_1 = DatasetFactory.createConstraint("tipoContrato", tipoContrato, tipoContrato, ConstraintType.MUST);
	var c4_1 = DatasetFactory.createConstraint("mesRealizacao", mesRealizacao, mesRealizacao, ConstraintType.MUST);
	var c5_1 = DatasetFactory.createConstraint("zoomBuscaUnidade", filial, filial, ConstraintType.MUST);
    var constraints = new Array(c1_1, c2_1, c3_1, c4_1, c5_1);
     
    var datasetPrincipal = DatasetFactory.getDataset("dsGerirCampanha", null, constraints, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
    	var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
        
		//Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
	    var c1_2 = DatasetFactory.createConstraint("tablename", "tabelaProcedimentos" ,"tabelaProcedimentos", ConstraintType.MUST);
	    var c2_2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
	    var c3_2 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);	    
	    var constraintsFilhos = new Array(c1_2, c2_2, c3_2);
	
	    //Busca o dataset
	    var datasetFilhos = DatasetFactory.getDataset("dsGerirCampanha", null, constraintsFilhos, null);
	
	    for (var j = 0; j < datasetFilhos.rowsCount; j++) {
	        //Adiciona os valores nas colunas respectivamente.
	        dataset.addRow(new Array(
	                documentId,
	                datasetFilhos.getValue(j, "wdk_sequence_id"),
					datasetPrincipal.getValue(i, "zoomBuscaEmpresa"),
					datasetPrincipal.getValue(i, "tipoContrato"),
					datasetPrincipal.getValue(i, "mesRealizacao"),
	                datasetFilhos.getValue(j, "zoomProcedimento"), 
	                datasetFilhos.getValue(j, "qtdSolicitada")));
	    }
    }
    
    return dataset;
}