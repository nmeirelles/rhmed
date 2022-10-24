function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	try{
		dataset.addRow(new Array("evidamed", "EVIDAMED"));
		dataset.addRow(new Array("soc", "SOC"));
		dataset.addRow(new Array("soc", "SOC NET"));
		return dataset;
		
	} catch(e){
		log.error("dsPlataforma.createDataset: " + e);
	}
	return dataset;
}

function criarEstrutura(dataset){
	dataset.addColumn("COD_PLATAFORMA", DatasetFieldType.STRING);
	dataset.addColumn("PLATAFORMA", DatasetFieldType.STRING);
}

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
}

function trim(valorStr){
	if ((valorStr == null) || (valorStr == undefined)){
		return "";
	}
	return valorStr.trim();
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		} // if
	} // for
} // function sleep