function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		var plataforma = obterParametro(constraints, "COD_PLATAFORMA");
		//var plataforma = "soc";
		if (plataforma == ""){
			throw "PLATAFORMA não encontrada.";
		}
		// https://www.rhmed.com.br/evidamed/web/Fluig/hierarquia
		// var endpointStr = "/ws/"+plataforma+"/json/";
		// var endpointStr = "/empresa/?plataforma=soc";
		
		var codEmpresa = obterParametro(constraints, "COD_EMPRESA");
		var codRegional = obterParametro(constraints, "COD_REGIONAL");
		
		var meuEndpoint = "/unidade/?plataforma="+plataforma;
			if(plataforma == "evidamed"){
				meuEndpoint = meuEndpoint+"&codRegional="+codRegional;
				
			} else if(plataforma == "soc"){
				meuEndpoint = meuEndpoint+"&codEmpresa="+codEmpresa;
			}
		
		//log.info("###### PLATAFORMA");
		//log.dir(plataforma);
		//log.info("###### MEU ENDPOINT");
		//log.dir(meuEndpoint);

			
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//endpoint: '/unidade/?plataforma=evidamed&codRegional=7929',
			endpoint: meuEndpoint,
			method: 'get', 
			timeoutService: '100'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			var resultJson = vo.getResult().replace("\t", " ");
			var resultado = JSON.parse(resultJson);
			
			for each(item in resultado){
				dataset.addRow(new Array(
						plataforma,
						item.codigo,
						item.unidade

						
					));	
			} // for each
		
		}catch(e){
			throw "UNIDADE não encontrada.";
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
	dataset.addColumn("COD_UNIDADE");
	dataset.addColumn("UNIDADE");
	

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

