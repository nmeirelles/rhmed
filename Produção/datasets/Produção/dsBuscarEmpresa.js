function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		var plataforma = obterParametro(constraints, "COD_PLATAFORMA");
		//var plataforma = "evidamed";
		if (plataforma == ""){
			throw "PLATAFORMA não encontrada.";
		}
		// https://www.rhmed.com.br/evidamed/web/Fluig/hierarquia
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//endpoint: "/empresa/?plataforma=evidamed", 
			endpoint: "/empresa/?plataforma="+plataforma,
			method: 'get', 
			timeoutService: '600'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			//log.dir("#####VARIAVELVO " + vo);
			var resultado = JSON.parse(vo.getResult());
			//log.dir("#####VARIAVELRESULTADO" + resultado[0].empresa);
			for each(item in resultado){
				dataset.addRow(new Array(
						plataforma,
						item.codigo,
						item.empresa
						
						
					));	
			} // for each
		
		}catch(e){
			throw "EMPRESA não encontrada.";
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
	dataset.addColumn("COD_EMPRESA");
	dataset.addColumn("EMPRESA");
	

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

