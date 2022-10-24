$(document).ready(function() {

	$("#numBoleto").on('change', (event) => {
		let numeroBoleto = event.target.value;
		console.log("Número Boleto: "+numeroBoleto);
		var retiraPonto = numeroBoleto.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		console.log("Número Boleto: "+retiraEspaco);
		$("#numBoleto").val(retiraEspaco);
	});

	$("#aprovacaoCoordenador").val("");

	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});

	//carregaAprovadores()
	preencheAcompanhamento()
	determinaDestino()
	
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('SPA - '+$("#numeroFluxo").val())
	}
	
	$("#aprovacaoCoordenador").on('change', () => {
		determinaDestino();
	});

	$("#valorTotalDocumento").on('change', () => {
		let valorRequisicao = $("#valorTotalDocumento").val();
		$("#valorRequisicao").val(valorRequisicao);
	
	})

	//Busca de Fornecedores
	const buscaFornecedores = (valorPesquisado, tipoBusca) => {
		let myLoading = FLUIGC.loading(window);
		let cnpjFornecedor = '';
		let codigoFornecedor = '';
		let pesq = '';
		if(tipoBusca == "cpf" || tipoBusca == "cnpj") cnpjFornecedor = valorPesquisado;
		if(tipoBusca == "codigo") codigoFornecedor = valorPesquisado.toUpperCase();
		if(tipoBusca == "nome") pesq = valorPesquisado.toUpperCase();
		myLoading.show();
		console.log(`Tipo de Busca: ${tipoBusca}\nCNPJ: ${cnpjFornecedor}\nCódigo: ${codigoFornecedor}\nPesq: ${pesq}`);
		const c1 = DatasetFactory.createConstraint("codforn", codigoFornecedor, "", ConstraintType.MUST);
		const c2 = DatasetFactory.createConstraint("cnpj", cnpjFornecedor, "", ConstraintType.MUST);
		const c3 = DatasetFactory.createConstraint("pesq", pesq, "", ConstraintType.MUST);
		DatasetFactory.getDataset("dsBuscaFornecedores_3", null, [c1,c2,c3], null, {
			success: function(result){
			console.log(result);
				if(result.values[0].Error != ""){
					console.log("if error");
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
											'<th class="fs-txt-center fs-no-margin fs-no-padding">TIPO FORNECEDOR</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
									'</tbody>'+
								'</table>',
						id: 'modalFornecedores',
						size: 'large'
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
								let tipoFornecedor = item.TPFORN;
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
										'<td class="fs-no-margin fs-no-padding">'+tipoFornecedor+'</td>'+
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
								let tipoFornecedor = tableData[9];
								if(codForn != undefined){
									$("#inputCodFornecedor").val(codForn);
									$("#inputFornecedor").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
									$("#nomeFornecedor").val(nome);
									$("#codFornecedor").val(codForn);
									$("#cnpj").val(cnpj);
									$("#loja").val(loja);
									$("#bancoPag").val(banco);
									$("#agenciaPag").val(agencia);
									$("#contaPag").val(conta);
									$("#tipoFornecedor").val(tipoFornecedor.trim());
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
				console.log("error function");
				console.log(err);
				FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os dados do fornecedor!',type: 'warning'});
			}
		});
	}
	$("#inputFornecedor").on('keyup', (event) => {
		if(event.keyCode == 13){
			const valorPesquisado = event.target.value;
			const tipoBusca = $("#selectTipoBusca").val();
			if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
			else buscaFornecedores(valorPesquisado, tipoBusca);
		}
	});
	//Adicionado Botão "Busca" de fornecedores --> 05/07/2021 --> Inicio
	$("#consultaFornecedor").on('click', () => {
		const valorPesquisado = $("#inputFornecedor").val();
		const tipoBusca = $("#selectTipoBusca").val();
		if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
		else buscaFornecedores(valorPesquisado, tipoBusca);		
	});
	//Adicionado Botão "Busca" de fornecedores --> 05/07/2021 --> Fim

	let nrAtividade = $("#atividadeAtual").val();
	if(nrAtividade != 0 && nrAtividade != 2 && nrAtividade != 26){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
	}

	$($(window.top.document).find("#observationArea")).css("display","none");

	$("#dataVencimento").on('blur', () => {
		console.log("Entrou");
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimento").val();

		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data Sugerida de Pagamento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimento").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimento").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#mesVencimento").val(dateSplit[1]);
				$("#anoVencimento").val(dateSplit[0]);
			}
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
	if($("#atividadeAtual").val() == 5){
		$("#idSolicitacao").val('SPA '+$("#numeroFluxo").val())
	}
}

function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 0 || atividade == 2 || atividade == 26){
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
	}if(atividade == 3){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
				$("#aprovadorDestino").val("coordenador")
			}else{
				$("#aprovadorDestino").val("celulaFiscal")
			}
	}if(atividade == 9){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
			$("#aprovadorDestino").val("diretor")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
}

function ocultaDivBoleto(tipo){
	console.log("$$$$$$$$$$ Tipo: "+tipo);
	console.log(tipo.value);
	if(tipo.value == "Boleto"){
		$("#divNumeroBoleto").show();
		$("#divNumeroConta").hide();
	}
	if(tipo.value == "Credito em Conta"){
		$("#divNumeroBoleto").hide();
		$("#divNumeroConta").show();
	}
	if(tipo.value == ""){
		$("#divNumeroBoleto").hide();
		$("#divNumeroConta").hide();
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

function setSelectedZoomItem(selectedItem) {
    if(selectedItem.inputId == 'zoomFilial'){
        $("#cnpjFilial").val(selectedItem.cnpjFilial);
		$("#empresaCod").val(selectedItem.Empresa);
		$("#codFilial").val(selectedItem.codFilial);
	}
	if(selectedItem.inputId == 'zoomCentroCusto'){
		var ccusto = selectedItem.ccusto;
		var id = ccusto.split(" - ")[0].replace(/\./g,"");
		$("#idCentroCusto").val(id);
		carregaAprovadores(selectedItem.ccusto);
		console.log("Carregou");
	}
}

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');  
}
