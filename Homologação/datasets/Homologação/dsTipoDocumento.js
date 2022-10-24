function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	try{
		dataset.addRow(new Array("01", "PPRA"));
		dataset.addRow(new Array("02", "AE"));
		dataset.addRow(new Array("03", "LTCAT"));
		dataset.addRow(new Array("04", "PRG"));
		dataset.addRow(new Array("05", "RVT"));
		dataset.addRow(new Array("06", "MR"));
		dataset.addRow(new Array("07", "INSPEÇÃO COVID-19"));
		dataset.addRow(new Array("08", "LAUDO AMBIENTAL"));
		dataset.addRow(new Array("09", "ROTA DE FUGA"));

		return dataset;
		
		var documentos = getParametro(constraints, "DOCUMENTO");
		
//		if (coligada == null || coligada == "") {
//			return dataset;
//		}
		
	} catch(e){
		log.error("dsEmpresa.createDataset: " + e);
	}
	return dataset;
}

function criarEstrutura(dataset){
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("DOCUMENTO", DatasetFieldType.STRING);
	
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