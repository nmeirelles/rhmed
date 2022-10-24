function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		//var plataforma = obterParametro(constraints, "PLATAFORMA");
		var plataforma = "evidamed";
		if (plataforma == ""){
			throw "PLATAFORMA não encontrada.";
		}
		
		var codEmpresa = obterParametro(constraints, "COD_EMPRESA")
		var codUnidade = obterParametro(constraints, "COD_UNIDADE")
		
		
		// https://www.rhmed.com.br/evidamed/web/Fluig/hierarquia
		var meuEndpoint = "/setor/?plataforma=" + plataforma;
			if (plataforma == "soc"){
				meuEndpoint = meuEndpoint + "&codEmpresa=" + codEmpresa + "&codUnidade=" + codUnidade;
			}else if(plataforma == "evidamed"){
				meuEndpoint = meuEndpoint + "&codUnidade=" + codUnidade;
			}
			
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//endpoint: '/setor/?plataforma=evidamed&codUnidade=16603',
			endpoint: meuEndpoint,
			method: 'get', 
			timeoutService: '100'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			//log.dir("#####VARIAVELVO " + vo);
			var resultado = JSON.parse(vo.getResult());
			//log.dir("#####VARIAVELRESULTADO" + resultado[0].setor);
			
			for each(item in resultado){
				dataset.addRow(new Array(
						item.codigo,
						item.setor

						
					));	
			} // for each
		
		}catch(e){
			throw "SETOR não encontrado.";
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
	dataset.addColumn("COD_SETOR");
	dataset.addColumn("SETOR");
	

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

