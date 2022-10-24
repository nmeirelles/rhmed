function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	criarEstrutura(dataset);
	try{
		// https://www.rhmed.com.br/evidamed/web/Fluig/hierarquia
		var codCredenciado = obterParametro(constraints, "COD_CREDENCIADO");
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: ''+getValue("WKCompany"),
			serviceCode: 'wsEvidamedSOC', 
			//responsaveltecnico/?codCredenciado=10894
			endpoint: "/responsaveltecnico/?codCredenciado=" + codCredenciado,
			method: 'get', 
			timeoutService: '600'
				
		} // data
		
		try{
			var vo = clientService.invoke(JSON.stringify(data));
			//log.dir("#####VARIAVELVO " + vo);
			var resultado = JSON.parse(vo.getResult());
			//log.dir("#####VARIAVELRESULTADO" + resultado[0].credenciado);
			
			for each(item in resultado){
				dataset.addRow(new Array(
						codCredenciado,
						item.codigo,
						item.responsavel,
						item.REG,
						item.CPF,
						item.tipo,
						item.ddd,
						item.celular,
						item.email
						
					));	
			} // for each
		
		}catch(e){
			throw "RESPONSÁVEL TÉCNICO não encontrado.";
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
	dataset.addColumn("COD_CREDENCIADO");
	dataset.addColumn("COD_RESPONSAVEL");
	dataset.addColumn("RESPONSAVEL");
	dataset.addColumn("REG");
	dataset.addColumn("CPF");
	dataset.addColumn("TIPO");
	dataset.addColumn("DDD");
	dataset.addColumn("CELULAR");
	dataset.addColumn("EMAIL");
	

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

