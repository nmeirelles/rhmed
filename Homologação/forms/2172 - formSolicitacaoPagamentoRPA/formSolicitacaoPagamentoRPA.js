$(document).ready(function(){

	let nrAtividade = $("#atividadeAtual").val();

	const obterPessoa = (cpf) => {
		const constraint = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
		const dataset = DatasetFactory.getDataset("ds_obter_pessoa_cpf", null, [constraint], null);
		console.log(dataset);
		if(dataset.values.length > 0) return dataset.values[0]['NOME'];
		else return "";
	}

	const enviarRPA = (cnpj, cpf, dataPagamento, valor) => {
		const c1 = DatasetFactory.createConstraint('cnpj', cnpj, cnpj, ConstraintType.MUST);
		const c2 = DatasetFactory.createConstraint('cpf', cpf, cpf, ConstraintType.MUST);
		const c3 = DatasetFactory.createConstraint('dataPagamento', dataPagamento, dataPagamento, ConstraintType.MUST);
		const c4 = DatasetFactory.createConstraint('valor', valor, valor, ConstraintType.MUST);
		const dataset = DatasetFactory.getDataset('ds_enviar_dados_rpa', null, [c1,c2,c3,c4], null);
		const codigo = dataset.values[0]['CODIGO'];
		const descricao = dataset.values[0]['DESCRICAO'];
		const valorINSS = dataset.values[0]['VALOR_INSS'];
		const valorIRRF = dataset.values[0]['VALOR_IRRF'];
		const valorLiquido = dataset.values[0]['VALOR_LIQUIDO'];
		return [{'valorINSS':valorINSS, 'valorIRRF':valorIRRF, 'valorLiquido':valorLiquido}];
	}

	$("#buscarCPF").on("click", () => {
		const atividadeAtual = $("#atividadeAtual").val();
		let myLoading = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações'});
		if(atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 11){
			myLoading.show();
			setTimeout(() => {
				const cpf = $("#inputNrCPF").val();
				const nome = obterPessoa(cpf);
				if(nome == ""){
					FLUIGC.toast({title: 'Atenção: ',message: 'CPF não encontrado! Favor checar digitação ou solicitar cadastro <a href="https://rhmedconsultores114678.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?processID=SCA%20-%20Solicita%C3%A7%C3%A3o%20Cadastro%20de%20Autonomo" target="_blank" style="color: blue;">clicando aqui</a>.',type: 'warning'});
					$("#inputNomePrestador").val("");
				}else $("#inputNomePrestador").val(nome);
				myLoading.hide();
			}, 1000);
		}
	});

	FLUIGC.switcher.init('#switchOutroTipoProfissional');
	FLUIGC.switcher.onChange('#switchOutroTipoProfissional', function(event, state){
		if(state == true){
			$('#inputOutroTipoProfissional').parent().show();
			window["zoomProfissional"].clear();
			window["zoomProfissional"].disable(true);
		}
		if(state == false){
			$('#inputOutroTipoProfissional').val('').parent().hide();
			window["zoomProfissional"].disable(false);
		}
	});
	FLUIGC.switcher.init('#switchOutroTipoServico');
	FLUIGC.switcher.onChange('#switchOutroTipoServico', function(event, state){
		if(state == true){
			$('#inputOutroTipoServico').parent().show();
			window["zoomServico"].clear();
			window["zoomServico"].disable(true);
		}
		if(state == false){
			$('#inputOutroTipoServico').val('').parent().hide();
			window["zoomServico"].disable(false);
		}
	});

	FLUIGC.switcher.init('#switchRecolheuImpPeriodo');
	FLUIGC.switcher.onChange('#switchRecolheuImpPeriodo', function(event, state){
		if(state == true){
			$(".inputValorRecolhido").show();
		}else{
			$(".inputValorRecolhido").hide();
		}
	});

	if(nrAtividade != 0 && nrAtividade != 4 && nrAtividade != 11){
		FLUIGC.switcher.isReadOnly('#switchOutroTipoProfissional', true);
		FLUIGC.switcher.isReadOnly('#switchOutroTipoServico', true);
		if($("#switchOutroTipoProfissional").is(':checked') == true) $('#_inputOutroTipoProfissional').parent().show();
		if($("#switchOutroTipoServico").is(':checked') == true) $('#_inputOutroTipoServico').parent().show();
		if($("#switchRecolheuImpPeriodo").is(':checked') == true) $('#_inputValorRecolhido').parent().show();
		if($("#switchOutroTipoProfissional").is(':checked') == true) $('#inputOutroTipoProfissional').parent().show();
		if($("#switchOutroTipoServico").is(':checked') == true) $('#inputOutroTipoServico').parent().show();
		if($("#switchRecolheuImpPeriodo").is(':checked') == true) $('#inputValorRecolhido').parent().show();
	}else{
		FLUIGC.switcher.isReadOnly('#switchOutroTipoProfissional', false);
		FLUIGC.switcher.isReadOnly('#switchOutroTipoServico', false);
		FLUIGC.switcher.isReadOnly('#switchRecolheuImpPeriodo', false);
	}

	if(nrAtividade == 102 || nrAtividade == 104){
		$('#painelAssinaturaRecibo').show();
	}else{
		$('#painelAssinaturaRecibo').hide();
	}

	// $('[name=radioTipoProfissionalOutro]').on("change", (event) => {
	// 	let outroTipoProfissional = event.target.value;
	// 	if(outroTipoProfissional == 'sim'){
	// 		$('#inputOutroTipoProfissional').parent().show();
	// 		window["zoomProfissional"].clear();
	// 		window["zoomProfissional"].disable(true);
	// 	}
	// 	if(outroTipoProfissional == 'nao'){
	// 		$('#inputOutroTipoProfissional').val('').parent().hide();
	// 		window["zoomProfissional"].disable(false);
	// 	}
	// });
	// $('[name=radioTipoServicoOutro]').on("change", (event) => {
	// 	let outroTipoServico = event.target.value;
	// 	if(outroTipoServico == 'sim'){
	// 		$('#inputOutroTipoServico').parent().show();
	// 		window["zoomServico"].clear();
	// 		window["zoomServico"].disable(true);
	// 	}
	// 	if(outroTipoServico == 'nao'){
	// 		$('#inputOutroTipoServico').val('').parent().hide();
	// 		window["zoomServico"].disable(false);
	// 	}
	// });

	$("#btnAddCliente").on("click", () => {
		if(nrAtividade == 0 || nrAtividade == 4 || nrAtividade == 11){
			let index = wdkAddChild("tabelaClientes");
			MaskEvent.init();
			FLUIGC.calendar('#tdDataInicio___'+index,{pickDate: true,pickTime: true,sideBySide: true});
			FLUIGC.calendar('#tdDataFim___'+index,{pickDate: true,pickTime: true,sideBySide: true});
		}
	});

	/* $(':radio[name="radiobtnNovoPrestador"]').on('change', (event) => {
		let novoPrestador = event.target.value;
		if(novoPrestador == "sim"){
			$("#spanNovoPrestador2").css("display","block");
			$("#hiddenNovoPrestador").val("sim");
		}
		if(novoPrestador == "nao"){
			$("#spanNovoPrestador2").css("display","none");
			$("#hiddenNovoPrestador").val("nao");
		}
	}); */
	
	$(':radio[name="radiobtnOutroVinculo"]').on('change', (event) => {
		let outroVinculo = event.target.value;
		if(outroVinculo == "sim"){
			$("#spanOutroVinculo2").css("display","block");
			$("#hiddenOutroVinculo").val("sim");
		}
		if(outroVinculo == "nao"){
			$("#spanOutroVinculo2").css("display","none");
			$("#hiddenOutroVinculo").val("nao");
		}
	});

	$("#inputNrCPF").on('change', (event) => {
		let nrCPF = event.target.value;
		var retiraPonto = nrCPF.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		$("#inputNrCPF").val(retiraEspaco);
	});
	$("#aprovacaoCoordenador").on('change', () => {
		determinaDestino();
	});
	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});
	$("#valorTotalDocumento").on('change', (event)=> {
		let valorTotal = event.target.value;
		$("#valorRequisicao").val(valorTotal);
		if(valor != "") determinaDestino();
	});
	$("#aprovacaoCoordenador").val("");
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('RPA - '+$("#numeroFluxo").val());
	}
	preencheAcompanhamento();
	numSolicitacao();
	determinaDestino();
	let myLoading = FLUIGC.loading(window);
	const fornecedor = (fornecedor) => {
		let tipoBusca = $("#selectTipoBusca").val();
		console.log("Tipo de Busca: "+tipoBusca);
		if(tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca a ser realizado!',type: 'warning'});
		else{
			let cnpjFornecedor = '';
			let codigoFornecedor = '';
			let pesq = '';
			if(tipoBusca == "cpf" || tipoBusca == "cnpj") cnpjFornecedor = fornecedor;
			if(tipoBusca == "codigo") codigoFornecedor = fornecedor.toUpperCase();
			if(tipoBusca == "nome") pesq = fornecedor.toUpperCase();
			myLoading.show();
			console.log(`CNPJ: ${cnpjFornecedor}\nCódigo: ${codigoFornecedor}\nPesq: ${pesq}`);
			const c1 = DatasetFactory.createConstraint("codforn", codigoFornecedor, "", ConstraintType.MUST);
			const c2 = DatasetFactory.createConstraint("cnpj", cnpjFornecedor, "", ConstraintType.MUST);
			const c3 = DatasetFactory.createConstraint("pesq", pesq, "", ConstraintType.MUST);
			DatasetFactory.getDataset("dsBuscaFornecedores_3", null, [c1,c2,c3], null, {
				success: function(result){
					console.log(result);
					if(result.values[0].Error != ""){
						console.log(result.values[0].Error);
						myLoading.hide(); 
						let erroRetorno = result.values[0].Error;
						if(erroRetorno.indexOf("INTERNAL SERVER ERROR") !== -1){
							FLUIGC.toast({title: 'Erro: ', message: "Problemas de Integração com Protheus, favor acionar a equipe de TI!", type: 'warning'});
						}else{
							let splitError = erroRetorno.split("ERROR : ");
						FLUIGC.toast({title: 'Erro: ', message: splitError[1], type: 'warning'});
						}
					}else{					
						FLUIGC.modal({
							title: 'Fornecedores',
							content: 
									'<table id="tableModalFornecedor" tablename="tableModalFornecedor" class="table table-datatable table-bordered table-hover table-responsive">'+
										'<thead>'+
											'<tr>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">AGENCIA</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">BANCO</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">CNPJ</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">CODIGO</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">CONTA</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">FORMA PGTO</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">LOJA</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">NOME</th>'+
												'<th class="fs-txt-center fs-no-margin fs-no-padding">TIPO CONTA</th>'+
											'</tr>'+
										'</thead>'+
										'<tbody>'+
										'</tbody>'+
									'</table>',
							id: 'modalFornecedores',
							size: 'large',
							actions: [{
								'label': 'Fechar',
								'autoClose': true
							}]
						}, (error, data) => {
							if(error){
								myLoading.hide(); 
								$('#modalFornecedores').modal('toggle');
								FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os dados do fornecedor!',type: 'warning'});
							}else{
								for(let i = 0; i < result.values.length; i++){
									let item = result.values[i];
									console.log(item);
									let agencia = item.Agencia;
									let banco = item.Banco;
									let cnpj = item.CNPJ;
									let codForn = item.CodForn;
									let conta = item.Conta;
									let formaPag = item.FormaPag;
									let loja = item.LojaForn;
									let nome = item.Nome;
									let tipoConta = item.TipoConta;
									let error = item.error;
									$('#tableModalFornecedor tbody').append(
										'<tr class="fs-txt-center">'+
											'<td class="fs-no-margin fs-no-padding">'+agencia+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+banco+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+cnpj+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+codForn+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+conta+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+formaPag+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+loja+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+nome+'</td>'+
											'<td class="fs-no-margin fs-no-padding">'+tipoConta+'</td>'+
										'</tr>'
									);
								}
								myLoading.hide(); 
								$("#tableModalFornecedor").on('click', 'tr', function(){
									const tableData = $(this).children("td").map(function(){
										return $(this).text();
									}).get(); // cria um array que mapeia os dados
									let agencia = tableData[0];
									let banco = tableData[1];
									let cnpj = tableData[2];
									let codForn = tableData[3];
									let conta = tableData[4];
									let formaPag = tableData[5];
									let loja = tableData[6];
									let nome = tableData[7];
									let tipoConta = tableData[8];
									if(codForn != undefined){
										$("#inputCodFornecedor").val(codForn);
										$("#inputFornecedor").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
										$("#cnpj").val(cnpj);
										$("#loja").val(loja);
										$("#bancoPag").val(banco);
										$("#agenciaPag").val(agencia);
										$("#contaPag").val(conta);
										$('#modalFornecedores').modal('toggle');
									}
								});
							}
						});
					}
				},
				error: function(err){
					myLoading.hide(); 
					$('#modalFornecedores').modal('toggle');
					console.log(err);
					FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os dados do fornecedor!',type: 'warning'});
				}
			});
		}
	};
	$("#inputFornecedor").on('keyup', (event) => {if(event.keyCode == 13 && $("#inputFornecedor").val() != "") fornecedor($("#inputFornecedor").val())});
	$("#spanBuscaFornecedor").on('click', () => {if($("#inputFornecedor").val() != "") fornecedor($("#inputFornecedor").val())});
	// Caso atividade não seja de Correção ou Inicial, botões de alteração de anexo são bloqueados.
	
	if(nrAtividade != 0 && nrAtividade != 4 && nrAtividade != 11){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
		FLUIGC.switcher.isReadOnly('#switchRecolheuImpPeriodo', true);
	}
	$($(window.top.document).find("#observationArea")).css("display","none");
	let botaoRemoverAnexo = $("data-attachments-remove-attach");
	botaoRemoverAnexo.off('click');
	$("#dataVencimentoNota").on('blur', () => {
		console.log("Entrou");
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimentoNota").val();

		if(dataVencimentoNota != ""){
			//let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			//if(comparacao == false){
				//FLUIGC.toast({title: 'Atenção: ',message: 'Data Sugerida para Pagamento não pode ser menor que a data atual!',type: 'warning'});
				//$("#dataVencimentoNota").focusout().val("");
			//}else{
				let dataAtual = $("#dataVencimentoNota").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimentoNota").val(newDate);
				$("#mesVencimentoNota").val(dateSplit[1]);
				$("#anoVencimentoNota").val(dateSplit[0]);
			//}
		}
	});

});
function compararDatas(data1, data2){
	console.log("Data1: "+data1+"\nData2: "+data2);
	var date1 = new Date(data1);
	var date2 = new Date(data2);

	if(date1 < date2) return true;
	if(date1 > date2) return false;
}
function carregaAprovadores(selectedItem){
	let centroCusto = selectedItem;
	let c1 = DatasetFactory.createConstraint("ccusto", centroCusto, centroCusto, ConstraintType.MUST);
	let constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsCadastroCentrodeCusto", null, constraints, null);
	$("#aprovadorGerente").val(dataset.values[0].gerente);
	$("#aprovadorSupervisor").val(dataset.values[0].supervisor);
	$("#aprovadorCoordenador").val(dataset.values[0].coordenador);
	$("#aprovadorDiretor").val(dataset.values[0].diretor);

	DatasetFactory.getDataset("dsValoresAtribuicao", null, null, null,{
		success: (result) => {
			$("#valorGerente").val(result.values[0].gerente);
			$("#valorSupervisor").val(result.values[0].supervisor);
			$("#valorCoordenador").val(result.values[0].ccusto);
			$("#valorDiretor").val(result.values[0].diretor);
			determinaDestino();
		},
		error: (error) => {
			console.log(error);
		}
	});

}
function numSolicitacao(){
	$("#idSolicitacao").val('RPA '+$("#numeroFluxo").val())
}
function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 0 || atividade == 4 || atividade == 11){
		if(currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor")
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val())){
			if(currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
				$("#aprovadorDestino").val("supervisor")
			}
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador");			
		}
	}
	if(atividade == 27){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
	if(atividade == 34){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
			$("#aprovadorDestino").val("diretor")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
}
function currencyToNumber(numero) {
	if(numero!=null && numero!=undefined && numero!=''){
		numero = numero.split(',');
		numero[0] = numero[0].split('.').join('');
		return parseFloat(numero.join('.'))
	}else{
		return 0
	}
}
function numberToCurrency(numero) {
    var numero = parseFloat(numero).toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
/*
function ocultaDivBoleto(tipo){
	if(tipo.value != "Boleto"){
		$("#divNumeroBoleto").addClass('hide');
		$("#divNumeroConta").removeClass('hide');
		
		
	}else{
		$("#divNumeroBoleto").removeClass('hide');
		$("#divNumeroConta").addClass('hide');

	}
}
*/
function setSelectedZoomItem(selectedItem) {
    if(selectedItem.inputId == 'zoomFilial'){
        $("#cnpjFilial").val(selectedItem.cnpjFilial);
        $("#empresaCod").val(selectedItem.Empresa);
	}
	if(selectedItem.inputId == 'zoomCentroCusto'){
		carregaAprovadores(selectedItem.ccusto);
	}
	if(selectedItem.inputId.match("tdCliente")){
		var index = selectedItem.inputId.split("___")[1];
		var cgc = selectedItem.CGC;
		$("#tdCGC___"+index).val(cgc);
	}	
}
function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');
}
function fnCustomDelete(oElement){
	let id = oElement.id.split("___")[0];
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 4 || atividade == 11){
		if(id == "spanRemoverCliente"){
			fnWdkRemoveChild(oElement);
			somaProdutos();
		}
	}
}
function somaProdutos(){
    var valorTot = 0;
    $("input[id^='tdValorCliente___']").each(function(index, value){
        valorTot = valorTot + currencyToNumber($(this).val());
    });
	$("#valorTotalDocumento").val(numberToCurrency(valorTot));
	$("#valorRequisicao").val(numberToCurrency(valorTot));
	determinaDestino();
}
function aplicaMask(){
	var inputs = $("[mask]");
	MaskEvent.initMask(inputs);
}
function currencyToNumber(numero) {
	if(numero!=null && numero!=undefined && numero!=''){
		numero = numero.split(',');
		numero[0] = numero[0].split('.').join('');
		return parseFloat(numero.join('.'))
	}else{
		return 0
	}
}
function numberToCurrency(numero) {
    var numero = parseFloat(numero).toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}