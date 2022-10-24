function createDataset(fields, constraints, sortFields) {
	
	log.info("Digte Public Form - @@@ Inicio Dataset ds_dpf_listaCamposDataset.js");
	
	var datasetReturn = DatasetBuilder.newDataset();
	datasetReturn.addColumn("Sequencia");
	datasetReturn.addColumn("Campo");
	
	if (constraints != null && constraints.length > 0) {
		var cDataset = "";
		var sequencia = 0;
		var campo = "";
		
		for (var c = 0; c < constraints.length; c++) {
			if (constraints[c].fieldName == "cDataset") {
				cDataset = (constraints[c].initialValue.trim());
			}
			else if (constraints[c].fieldName == "Campo"){
				campo = (constraints[c].initialValue.trim());
			}
		}

		var companyId = getValue("WKCompany");
		
		var c1 = DatasetFactory.createConstraint("sqlLimit", "1", "1", ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("companyid", companyId, companyId, ConstraintType.MUST);zz
		var dsConsulta = DatasetFactory.getDataset(cDataset, null, [c1,c2], null);
	 		
		for (var i = 0; i < dsConsulta.getColumnsCount(); i++) {
			var nomeColuna = dsConsulta.getColumnName(i);
			if (nomeColuna != "cardid" &&
					nomeColuna != "companyid" &&
					nomeColuna != "documentid" &&
					nomeColuna != "id" &&
					nomeColuna != "metadata#active" &&
					nomeColuna != "metadata#card_index_id" &&
					nomeColuna != "metadata#card_index_version" &&
					nomeColuna != "metadata#id" &&
					nomeColuna != "metadata#parent_id" &&
					nomeColuna != "metadata#version" &&
					nomeColuna != "tableid" &&
					nomeColuna != "version") {
				
				sequencia++;
				
				if (campo == "" || nomeColuna.indexOf(campo) > -1) {
					datasetReturn.addRow(new Array(sequencia, nomeColuna));
				}
			}
		}
	}
	
	log.info("Digte Public Form - @@@ Fim Dataset ds_dpf_listaCamposDataset.js");
	
	return datasetReturn;

}

function retirarPorcento(valor){
	valor = valor.substr(1, valor.length - 2);
	
	return valor;
}