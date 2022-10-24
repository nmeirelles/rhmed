function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		var cep = removerMask(obterParametro(constraints, "CEP"));
		if (cep == ""){
			throw "CEP não informado.";
		}
		// https://viacep.com.br/ws/53130540/json/
		var endpointStr = "/ws/"+cep+"/json/";
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsViaCEP', 
			endpoint: endpointStr, 
			method: 'get', 
			timeoutService: '100'
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			var resultado = JSON.parse(vo.getResult());
			
			dataset.addRow(new Array(
					cep,
					resultado.logradouro,
					resultado.complemento,
					resultado.bairro,
					resultado.localidade,
					resultado.uf,
					resultado.unidade,
					resultado.ibge,
					resultado.gia
				));	
		}catch(e){
			throw "CEP não encontrado.";
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
	dataset.addColumn("CEP");
	dataset.addColumn("LOGRADOURO");
	dataset.addColumn("COMPLEMENTO");
	dataset.addColumn("BAIRRO");
	dataset.addColumn("CIDADE");
	dataset.addColumn("UF");
	dataset.addColumn("UNIDADE");
	dataset.addColumn("IBGE");
	dataset.addColumn("GIA");
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

function removerMask(documento){
	//var semMask = documento.replace(/[^0-9]+/g,"");
	while (documento.indexOf(".") >= 0){
		documento = documento.replace(".", "");
	}
	while (documento.indexOf("-") >= 0){
		documento = documento.replace("-", "");
	}
	while (documento.indexOf("/") >= 0){
		documento = documento.replace("/", "");
	}
	while (documento.indexOf(" ") >= 0){
		documento = documento.replace(" ", "");
	}
	return documento;
} // removerMask