function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		var plataforma = obterParametro(constraints, "COD_PLATAFORMA");
		var codEmpresa = obterParametro(constraints, "COD_EMPRESA");
		var codUnidade = obterParametro(constraints, "COD_UNIDADE");
		//var plataforma = "evidamed";
		//var codEmpresa = "0201";
		//var codUnidade = "1819";
		
		if (plataforma == ""){
			throw "PLATAFORMA não encontrada.";
		}
		// https://www.rhmed.com.br/evidamed/web/Fluig/hierarquia
		
		var meuEndpoint = "/vidasunidades/?plataforma="+plataforma+"&codEmpresa="+codEmpresa+"&codUnidade="+codUnidade;
			if(plataforma == "evidamed"){
				meuEndpoint = meuEndpoint+"&situacao=1";
				
			} else if(plataforma == "soc"){
				meuEndpoint = meuEndpoint+"&situacao=ativo";
			}
		
		log.info("###### PLATAFORMA");
		log.dir(plataforma);
		log.info("###### MEU ENDPOINT");
		log.dir(meuEndpoint);

			
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//endpoint: '/vidasunidades/?plataforma=evidamed&codEmpresa=0201&codUnidade=16603&situacao=1',
			endpoint: meuEndpoint,
			method: 'get', 
			timeoutService: '600'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			//log.dir("#####VARIAVELVO " + vo);
			var resultado = JSON.parse(vo.getResult());
			//log.dir("#####VARIAVELRESULTADO" + resultado[0].unidade);
			
			for each(item in resultado){
				dataset.addRow(new Array(
						plataforma,
						codEmpresa,
						codUnidade,
						item.numvidas
						
					));	
			} // for each
		
		}catch(e){
			throw "VIDAS ATIVAS não encontrada.";
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
	dataset.addColumn("COD_UNIDADE");
	dataset.addColumn("VIDAS");
	

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

