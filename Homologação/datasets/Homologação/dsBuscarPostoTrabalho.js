function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		var plataforma = "evidamed";
		var codUnidade = obterParametro(constraints, "COD_UNIDADE");
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//endpoint: "/postotrabalho/?plataforma=evidamed&codUnidade=1819", 
			endpoint: "/postotrabalho/?plataforma=" + plataforma + "&codUnidade=" + codUnidade,
			
			method: 'get', 
			timeoutService: '100'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			log.dir("#####VARIAVELVO " + vo);
			var resultado = JSON.parse(vo.getResult());
			log.dir("#####VARIAVELRESULTADO" + resultado[0].postotrabalho);
			
			for each(item in resultado){
				dataset.addRow(new Array(
						item.codigo,
						item.postotrabalho
						
						
					));	
			} // for each
		
		}catch(e){
			throw "POSTO DE TRABALHO não encontrado.";
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
	dataset.addColumn("COD_POSTO");
	dataset.addColumn("POSTO");
	

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

