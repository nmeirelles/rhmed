function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		var plataforma = "evidamed";
		var codEmpresa = obterParametro(constraints, "COD_EMPRESA");
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//endpoint: "/regional/?plataforma=evidamed&codEmpresa=0201", 
			endpoint: "/regional/?plataforma=" + plataforma + "&codEmpresa=" + codEmpresa,
			
			method: 'get', 
			timeoutService: '100'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			//log.dir("#####VARIAVELVO " + vo);
			var resultado = JSON.parse(vo.getResult());
			//log.dir("#####VARIAVELRESULTADO" + resultado[0].regional);
			
			for each(item in resultado){
				dataset.addRow(new Array(
						plataforma,
						item.codigo,
						item.regional
						
						
					));	
			} // for each
		
		}catch(e){
			throw "REGIONAL não encontrada.";
		} // try catch
	} catch(e){
		log.error(e);
		var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("ERROR_CODIGO", DatasetFieldType.NUMBER);
		dataset.addColumn("ERRO", DatasetFieldType.STRING);
		dataset.addRow(new Array(-1, e));
	} // try catch
	return dataset;
} // createDataset

function criarEstrutura(dataset){
	dataset.addColumn("COD_PLATAFORMA");
	dataset.addColumn("COD_REGIONAL");
	dataset.addColumn("REGIONAL");
	

} // criarEstrutura

function obterParametro(constraints, campo){
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
} // obterParametro

