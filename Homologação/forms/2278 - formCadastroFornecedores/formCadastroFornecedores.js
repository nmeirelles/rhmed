
$(document).ready(function() {
	
	FLUIGC.switcher.init('#switchMEI');
	FLUIGC.switcher.init('#switchRecebeFilial');
	let switchMEI = $("#switchMEI").is(":checked");
	let switchRecebeFilial = $("#switchRecebeFilial").is(":checked");
	
	if(switchMEI == true) $("#inputCPFMEI").parent().show();
	else $("#inputCPFMEI").parent().hide();
	if(switchRecebeFilial == true) $("#inputCNPJFilial").parent().show();
	else $("#inputCNPJFilial").parent().hide();

	FLUIGC.switcher.onChange("#switchMEI", function(event, state){
		if(state == true){
			$("#inputCPFMEI").parent().show();
			$("#divAnexoPagamento").show();
			$(".botaoAnexarDownload").show();
			$("#meiRecebeComoPF").val("1");
		}else{
			$("#meiRecebeComoPF").val("2");
			$("#divAnexoPagamento").hide();
			$("#inputCPFMEI").val("").parent().hide();
			$(".botaoAnexarDownload").hide();
		}
		switchRecebeFilial = $("#switchRecebeFilial").is(":checked");
		if(state == true && switchRecebeFilial == true){
			FLUIGC.switcher.toggleState('#switchRecebeFilial');
			$("#inputCNPJFilial").val("").parent().hide();
		}
	});

	FLUIGC.switcher.onChange("#switchRecebeFilial", function(event, state){
		if(state == true){
			$("#inputCNPJFilial").parent().show();
			$("#divAnexoPagamento").show();
			$(".botaoAnexarDownload").show();
			$("#recebePelaMatriz").val("1");
		}else{
			$("#recebePelaMatriz").val("2");
			$("#inputCNPJFilial").val("").parent().hide();
			$("#divAnexoPagamento").hide();
			$(".botaoAnexarDownload").hide();
		}
		switchMEI = $("#switchMEI").is(":checked");
		if(state == true && switchMEI == true) {
			FLUIGC.switcher.toggleState('#switchMEI');
			$("#inputCPFMEI").val("").parent().hide();
		}
	});

	$("#planilhaModelo").on('click', () => {
		let meiRecebeComoPF = $("#meiRecebeComoPF").val();
		let recebePelaMatriz = $("#recebePelaMatriz").val();
		let urlDoc = "";
		if(meiRecebeComoPF == "1") urlDoc = '/api/public/ecm/document/downloadURL/130137';
		if(recebePelaMatriz == "1") urlDoc = '/api/public/ecm/document/downloadURL/130138';
		var request_data = {
			url: urlDoc,
			method: 'GET',
			data: {}
		}
		$.ajax({
			contentType : "application/json",
			url: request_data.url,
			type: request_data.method,
			data: request_data.data,
		}).done(function(data) {
			console.log(data);
			window.open(data.content , '_blank');
		})
	});

	$("#inputCNPJFilial").on('change', (e) => {
		let cnpj = e.target.value;
		if(cnpj != ""){
			let cnpjSemPontuacao = cnpj.replace(/[^\d]+/g,''); 
			if(cnpjSemPontuacao.length == 14){
				let inicialCNPJ = cnpjSemPontuacao.slice(0,8);
				let inicialCNPJFornecedor = $("#inputCNPJ").val().slice(0,8);
				if(inicialCNPJ != inicialCNPJFornecedor){
					FLUIGC.toast({title: 'Aviso: ',message: 'Somente permitido CNPJ de Matriz ou Filial. Favor checar!',type: 'warning'});
					$("#inputCNPJFilial").val("");
				}
			}
		}
	});

	if($("#inputCodPais").val() == "" || $("#inputCodPais").val() == null){
		$("#inputCodPais").val("105");
	}
	$("#inputCNPJ").on('change', (event) => {
		let numeroBoleto = event.target.value;
		console.log("Número Boleto: "+numeroBoleto);
		var retiraPonto = numeroBoleto.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		console.log("Número Boleto: "+retiraEspaco);
		$("#inputCNPJ").val(retiraEspaco);
	});
	$("#aprovacaoCoordenador").on('change', () => {
		determinaDestino();
	});
	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});
	$("#formaPagamento").on('change', (event) => {
		let valueFormaPagamento = event.target.value;
		if(valueFormaPagamento == "Boleto"){
			$("#divNumeroBoleto").css("display", "block");
			$("#divNumeroConta").css("display", "none");
		}else if(valueFormaPagamento == "Credito em Conta"){
			$("#divNumeroBoleto").css("display", "none");
			$("#divNumeroConta").css("display", "block");
		}else if(valueFormaPagamento == ""){
			$("#divNumeroBoleto").css("display", "none");
			$("#divNumeroConta").css("display", "none");
		}
	});
	$("#valorTotalDocumento").on('change', (event)=> {
		let valorTotal = event.target.value;
		$("#valorRequisicao").val(valorTotal);
	});
	$("#aprovacaoCoordenador").val("");
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('SCF - '+$("#numeroFluxo").val());
	}
	preencheAcompanhamento();
	numSolicitacao();
	determinaDestino();

	const fornecedorConsultado = (data) => {
		let erro = "";
		console.log(data.erro != null && data.erro != "");
		if(data.erro != null && data.erro != "") erro = data.erro;
		console.log("Erro: " + erro);
		console.log(erro == "");
		console.log(erro == "Registro nao encontrado na Tabela:SA2 da Empresa/Filial 010101.");
		if(erro == ""){
			const SA2 = data.SA2;
			console.log(SA2.length);
			if(SA2.length > 0){
				let fornecedor = SA2[0];
				console.log(fornecedor);
				let A2_AGENCIA = fornecedor.A2_AGENCIA;
				let A2_BAIRRO = fornecedor.A2_BAIRRO;
				let A2_BANCO = fornecedor.A2_BANCO;
				let A2_CALCIRF = fornecedor.A2_CALCIRF;
				let A2_CEP = fornecedor.A2_CEP;
				let A2_CGC = fornecedor.A2_CGC;
				let A2_COD = fornecedor.A2_COD;
				let A2_CODPAIS = fornecedor.A2_CODPAIS;
				let A2_COD_MUN = fornecedor.A2_COD_MUN;
				let A2_COMPLEM = fornecedor.A2_COMPLEM;
				let A2_COND = fornecedor.A2_COND;
				let A2_CONTA = fornecedor.A2_CONTA;
				let A2_CONTATO = fornecedor.A2_CONTATO;
				let A2_DDD = fornecedor.A2_DDD;
				let A2_DVCTA = fornecedor.A2_DVCTA;
				let A2_EMAIL = fornecedor.A2_EMAIL;
				let A2_END = fornecedor.A2_END;
				let A2_EST = fornecedor.A2_EST;
				let A2_FORMPAG = fornecedor.A2_FORMPAG;
				let A2_INSCR = fornecedor.A2_INSCR;
				let A2_INSCRM = fornecedor.A2_INSCRM;
				let A2_LOJA = fornecedor.A2_LOJA;
				let A2_MUN = fornecedor.A2_MUN;
				let A2_NATUREZ = fornecedor.A2_NATUREZ;
				let A2_NOME = fornecedor.A2_NOME;
				let A2_NREDUZ = fornecedor.A2_NREDUZ;
				let A2_NR_END = fornecedor.A2_NR_END;
				let A2_NUMCON = fornecedor.A2_NUMCON;
				let A2_PAIS = fornecedor.A2_PAIS;
				let A2_RECCOFI = fornecedor.A2_RECCOFI;
				let A2_RECINSS = fornecedor.A2_RECINSS;
				let A2_RECISS = fornecedor.A2_RECISS;
				let A2_RECPIS = fornecedor.A2_RECPIS;
				let A2_SIMPNAC = fornecedor.A2_SIMPNAC;
				let A2_TEL = fornecedor.A2_TEL;
				let A2_TIPCTA = fornecedor.A2_TIPCTA;
				let A2_TIPO = fornecedor.A2_TIPO;
				let A2_XBCOMAT = fornecedor.A2_XBCOMAT;
				let A2_XCNPJMA = fornecedor.A2_XCNPJMA;
				let A2_XCPFMEI = fornecedor.A2_XCPFMEI;
				let A2_XDESCC = fornecedor.A2_XDESCC;
				let A2_XFORMEI = fornecedor.A2_XFORMEI;
				let A2_XPAGDES = fornecedor.A2_XPAGDES;
				let A2_XPAGENV = fornecedor.A2_XPAGENV;
				let A2_XTPFORN = fornecedor.A2_XTPFORN;
				let A2_RECCSLL = fornecedor.A2_RECCSLL;
				
				FLUIGC.message.confirm({
					message: 'Esse fornecedor já está cadastrado, deseja alterar as informações para esse fornecedor?',
					title: 'Fornecedor já cadastrado',
					labelYes: 'Alterar',
					labelNo: 'Cancelar'
				}, function(result, el, ev) {
					if(result == true){
						$("#inputCNPJ").prop('readonly', true);
						$("#inputRazaoSocial").val('');
						$("#inputFantasia").val('');
						$("#inputBanco").val('');
						$("#inputAgencia").val('');
						$("#inputConta").val('');
						$("#inputConta").val('');
						$("#inputCEP").val('');
						$("#inputLogradouro").val('');
						$("#inputNumero").val('');
						$("#inputComplemento").val('');
						$("#inputBairro").val('');
						$("#inputMunicipio").val('');
						$("#inputEstado").val('');
						$("#inputNomeContato").val('');
						$("#inputTelefoneContato").val('');
						$("#inputEmailContato").val('');
						$("#inputNomeContato").val('');
						$("#inputTelefoneContato").val('');
						$("#inputEmailContato").val('');
						$("#inputCodNatFinanc").val('');
						$("#selectRecISS").val('');
						$("#selectRecPIS").val('');
						$("#selectRecCOFINS").val('');
						$("#selectRecCSLL").val('');
						$("#selectSimplesNacional").val('');
						$("#selectCalcINSS").val('');
						$("#selectCalcIRRF").val('');
						var divH2 = $("#divDadosCadastrais").find("h2");
						divH2.text("Alteração de Cadastro");
						$("#divDadosCadastrais").css('display','block');

						$("#inputCNPJ").val(A2_CGC);
						$("#inputRazaoSocial").val(A2_NOME);
						$("#inputFantasia").val(A2_NREDUZ);
						$("#inputBanco").val(A2_BANCO);
						$("#inputAgencia").val(A2_AGENCIA);
						$("#inputConta").val(A2_NUMCON);
						$("#inputDigitoConta").val(A2_DVCTA);
						$("#inputCEP").val(A2_CEP);
						$("#inputLogradouro").val(A2_END);
						$("#inputNumero").val(A2_NR_END);
						$("#inputComplemento").val(A2_COMPLEM);
						$("#inputBairro").val(A2_BAIRRO);
						$("#inputMunicipio").val(A2_MUN);
						$("#inputEstado").val(A2_EST);
						$("#inputNomeContato").val(A2_CONTATO);
						$("#inputTelefoneContato").val(A2_TEL);
						$("#inputEmailContato").val(A2_EMAIL);
						$("#selectTipoFornec").val(A2_TIPO);
						$("#inputCodMunicipal").val(A2_COD_MUN);
						if(A2_PAIS == "") $("#inputCodPais").val("105");
						else $("#inputCodPais").val(A2_PAIS);
						$("#inputCodPaisBacen").val(A2_CODPAIS);
						$("#inputContaContabil").val(setZoomData("zoomContaContabil", A2_CONTA));
						$("#inputCodNatFinanc").val(setZoomData("zoomNatFinanc", A2_NATUREZ));
						$("#selectRecISS").val(A2_RECISS);
						$("#selectRecPIS").val(A2_RECPIS);
						$("#selectRecCOFINS").val(A2_RECCOFI);
						$("#selectRecCSLL").val(A2_RECCSLL);
						$("#selectSimplesNacional").val(A2_SIMPNAC);
						$("#selectCalcINSS").val(A2_RECINSS);
						$("#selectCalcIRRF").val(A2_CALCIRF);
						$("#selectformaPagamento").val(A2_FORMPAG);
						$("#selectTipoFornecedor").val(A2_XTPFORN);

						console.log(A2_XFORMEI);
						console.log(A2_XBCOMAT);

						if(A2_XFORMEI == "1"){
							FLUIGC.switcher.setTrue('#switchMEI');
							$("#inputCPFMEI").parent().show();
							$("#divAnexoPagamento").show();
							$("#meiRecebeComoPF").val("1");
						}else{
							$("#meiRecebeComoPF").val("2");
						}
						
						if(A2_XBCOMAT == "1"){
							FLUIGC.switcher.setTrue('#switchRecebeFilial');
							$("#inputCNPJFilial").parent().show();
							$("#divAnexoPagamento").show();
							$("#recebePelaMatriz").val("1");
						}else{
							$("#recebePelaMatriz").val("2");
						}

						$("#inputCPFMEI").val(A2_XCPFMEI);
						$("#inputCNPJFilial").val(A2_XCNPJMA);
						

						setTimeout(function() { 
							validaMunicipio();
						}, 1000);
					}
				});
			}
			result = true;
		}else if(erro == "Registro nao encontrado na Tabela:SA2 da Empresa/Filial 010101."){
			FLUIGC.message.confirm({
				message: 'Cadastro não encontrado na base de dados, deseja incluir um novo cadastro?',
				title: 'Novo Fornecedor',
				labelYes: 'Incluir',
				labelNo: 'Cancelar'
			}, function(result, el, ev) {
				if(result == true){
					$("#inputCNPJ").prop('readonly', true);
					var divH2 = $("#divDadosCadastrais").find("h2");
					divH2.text("Novo Cadastro");
					$("#divDadosCadastrais").css('display','block');
					$("#inputRazaoSocial").val('');
					$("#inputFantasia").val('');
					$("#inputBanco").val('');
					$("#inputAgencia").val('');
					$("#inputConta").val('');
					$("#inputConta").val('');
					$("#inputCEP").val('');
					$("#inputLogradouro").val('');
					$("#inputNumero").val('');
					$("#inputComplemento").val('');
					$("#inputBairro").val('');
					$("#inputMunicipio").val('');
					$("#inputEstado").val('');
					$("#inputNomeContato").val('');
					$("#inputTelefoneContato").val('');
					$("#inputEmailContato").val('');
					$("#inputCodPaisBacen").val('');
					$("#inputCodMunicipal").val('');
					$("#selectTipoFornec").val('');
					$("#inputNomeContato").val('');
					$("#inputTelefoneContato").val('');
					$("#inputEmailContato").val('');
					$("#inputCodNatFinanc").val('');
					$("#selectRecISS").val('');
					$("#selectRecPIS").val('');
					$("#selectRecCOFINS").val('');
					$("#selectRecCSLL").val('');
					$("#selectSimplesNacional").val('');
					$("#selectCalcINSS").val('');
					$("#selectCalcIRRF").val('');
				}			
			});
			result = true;
		}else{
			console.log("error");
			result = false;
		}
	};

	const consultaFornecedor = (cgc) => {
		let result = false;
		$.ajax({
			async: false,
			crossDomain: true,
			url: "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_CGC$"+cgc+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_NREDUZ|A2_TIPO|A2_CGC|A2_CEP|A2_PAIS|A2_CODPAIS|A2_END|A2_EST|A2_COD_MUN|A2_BAIRRO|A2_CONTA|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_COND|A2_CONTATO|A2_INSCR|A2_INSCRM|A2_EMAIL|A2_DDD|A2_TEL|A2_NATUREZ|A2_XPAGENV|A2_XPAGDES|A2_XDESCC|A2_RECISS|A2_RECINSS|A2_RECPIS|A2_RECCOFI|A2_RECCSLL|A2_CALCIRF|A2_SIMPNAC|A2_MUN|A2_COMPLEM|A2_NR_END|A2_XBCOMAT|A2_XCNPJMA|A2_XFORMEI|A2_XCPFMEI|A2_XTPFORN",
			method: "GET",
			timeout: 3000,
			headers: {
			  Accept: "application/json",
			  //"Accept-Charset": "utf-8",
			  Authorization: "Basic YWRtaW46cmhtZWQyMDIxMDE="
			}
		}).success(function(data){
			console.log("success");
			console.log(data);
			fornecedorConsultado(data);
			result = true;
		}).error(function(data){
			console.log("error");
			console.log(data);
			let status = data.status;
			if(status == 200){
				let responseText = data.responseText;
				console.log(responseText);
				let jsonParse = JSON.parse(responseText);
				console.log(jsonParse);
				fornecedorConsultado(jsonParse);
				result = true;
			}else{
				result = false;
			}
		}).fail(function(data){
			console.log("fail");
			console.log(data);
			result = false;
		});
		return result;
	}
	//Busca de Fornecedores
	const buscaFornecedores = (cgc) => {
		let myLoading = FLUIGC.loading(window);
		myLoading.show();
		// const settings = {
		// 	"async": false,
		// 	"crossDomain": true,
		// 	"url": "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_CGC$"+cgc+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_NREDUZ|A2_TIPO|A2_CGC|A2_CEP|A2_PAIS|A2_CODPAIS|A2_END|A2_EST|A2_COD_MUN|A2_BAIRRO|A2_CONTA|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_COND|A2_CONTATO|A2_INSCR|A2_INSCRM|A2_EMAIL|A2_DDD|A2_TEL|A2_NATUREZ|A2_XPAGENV|A2_XPAGDES|A2_XDESCC|A2_RECISS|A2_RECINSS|A2_RECPIS|A2_RECCOFI|A2_RECCSLL|A2_CALCIRF|A2_SIMPNAC|A2_MUN|A2_COMPLEM|A2_NR_END|A2_XBCOMAT|A2_XCNPJMA|A2_XFORMEI|A2_XCPFMEI|A2_XTPFORN",
		// 	"method": "GET",
		// 	"timeout": "3000",
		// 	"headers": {
		// 	  "Accept": "application/json",
		// 	  //"Accept-Charset": "utf-8",
		// 	  "Authorization": "Basic YWRtaW46cmhtZWQyMDIxMDE="
		// 	}
		// };
		let tmp = 6;
		let consultaOk = false;
		for (let index = 0; index < tmp; index++) {
			console.log("index: "+index);
			let fornecedor = consultaFornecedor(cgc);
			console.log("fornecedor: "+fornecedor);
			if(fornecedor == true){
				consultaOk = true;
				break;
			}
		}
		myLoading.hide();
		if(consultaOk == false) FLUIGC.toast({title: 'Atenção: ',message: 'Erro ao consultar fornecedor!',type: 'warning'});
	}
	
	$("#consultaFornecedores").on('click', (event) => {
		let myLoading = FLUIGC.loading(window);
		myLoading.show();
		setTimeout(function() { 
			myLoading.hide();
			let valorPesquisado = $("#inputCNPJ").val();
			let retiraPonto = valorPesquisado.replace(/\.-\//g,"");
			let retiraLetra = retiraPonto.replace(/\D/g,"");
			let retiraEspaco = retiraLetra.replace(/\s/g,"");
			if(retiraEspaco.length == 14 || retiraEspaco.length == 11){
				if(retiraEspaco.length == 11){
					if(validaCPF(retiraEspaco) == true){
						buscaFornecedores(retiraEspaco);
					}else{
						FLUIGC.toast({title: 'Atenção: ',message: 'Número do CPF é inválido!',type: 'warning'});
					}
				}
				if(retiraEspaco.length == 14){
					if(validaCNPJ(retiraEspaco) == true){
						buscaFornecedores(retiraEspaco);
					}else{
						FLUIGC.toast({title: 'Atenção: ',message: 'Número do CNPJ é inválido!',type: 'warning'});
					}
				}				
			}else{
				FLUIGC.toast({title: 'Atenção: ',message: 'Número digitado não é válido!',type: 'warning'});
			}
		}, 1000);		
	});

	let nrAtividade = $("#atividadeAtual").val();
	if(nrAtividade != 0 && nrAtividade != 4 && nrAtividade != 11){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);
		FLUIGC.switcher.isReadOnly('#switchMEI', true);
		FLUIGC.switcher.isReadOnly('#switchRecebeFilial', true);
	}
	if(nrAtividade == 5 || nrAtividade == 107){
		$("#aprovacaoCoordenador option[value='Cancelado']").remove();
		validacaoTipoFornecedor();
	}
	$($(window.top.document).find("#observationArea")).css("display","none");
	$("#valorTotalDocumento").on('change', (event) => {
		let valor = event.target.value;
		if(valor != "") determinaDestino();
	});
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
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento da Nota não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimentoNota").focusout().val("");
			}
		}else{
			let dataAtual = $("#dataVencimentoNota").val();
			let dateSplit = dataAtual.split('-');
			let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
			$("#hiddenDataVencimentoNota").val(newDate);
		}
	});

	//Valida CEP
	function limpa_formulario_cep() {
		// Limpa valores do formulário de cep.
		//Endereco
		$("#inputLogradouro").val('');
		$("#inputBairro").val('');
		$("#inputMunicipio").val('');
		$("#inputEstado").val('');
	
		//Inscrições Municipais e Códigos
		$("#inputCodMunicipal").val('');
		$("#inputCodPais").val('');
		$("#inputCodPaisBacen").val('');
	}
	
	$("#btnBuscaCEP").click(function(){
		var cep = $("#inputCEP").val().replace(/\D/g,'');
		if(cep != ''){
			var validaCep = /^[0-9]{8}$/;
			if(validaCep.test(cep)){
				//Endereco
				$("#inputLogradouro").val();
				$("#inputBairro").val();
				$("#inputMunicipio").val();
				$("#inputEstado").val();

				//Inscrições Municipais e Códigos
				$("#inputCodMunicipal").val();
				$("#inputCodPais").val();
				$("#inputCodPaisBacen").val();

				//Consulta o Webservice viacep.com.br
				$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if(!("erro" in dados)){
						var ibge = dados.ibge;
						var codMunic = ibge.substring(2);
						var codEstado = ibge.substring(0,2);
						var codPais = '105';
						var codPaicBacen = '01058';
						//Atualiza os campos com os valores da consuta
						//Endereco
						$("#inputLogradouro").val(dados.logradouro);
						$("#inputBairro").val(dados.bairro);
						$("#inputMunicipio").val(dados.localidade);
						$("#inputEstado").val(dados.uf);

						//Inscrições Municipais e Códigos
						$("#inputCodMunicipal").val(codMunic);
						$("#inputCodPais").val(codPais);
						$("#inputCodPaisBacen").val(codPaicBacen);
						
						validaMunicipio();
					} else {
						//CEP pesquisado não foi encontrado
						limpa_formulario_cep();
						FLUIGC.toast({title: 'Atenção: ',message: 'CEP não encontrado!',type: 'warning'});
						
						//remover readonly dos campos Bairro e Estado | substitui campo Municipio (input) por campo (zoom).
						$("#inputEstado").attr("readonly", false);
						$("#inputMunicipio").parent('div').css('display','none');
						$("#zoomMunicipio").parent('div').css('display','block');
						window["zoomMunicipio"].disable(true);
						//Status CEP
						$("#statusCEP").val('1');
					}
				});
			} // end if.
			else{
				//CEP é inválido
				limpa_formulario_cep();
				FLUIGC.toast({title: 'Atenção: ',message: 'Formato de CEP é inválido!',type: 'warning'});
			}
		}// end if.
		else{
			//cep sem valor, limpa formulário.
			limpa_formulario_cep();
		}
	});

	//Busca Municipio
	$("#inputEstado").on('change', () => {
		let pufmunic = $(this).find(":selected").val();
		console.log("pufmunic: "+pufmunic);
		console.log(pufmunic != "");
		if(pufmunic != ""){
			window["zoomMunicipio"].disable(false);
			setTimeout(() => {
				console.log("setTimeout");
				reloadZoomFilterValues("zoomMunicipio", "uFMUNIC," + pufmunic);
			}, 1000);
		}
	});

	//Forma de Pagamento -> Alimenta Select pelo dataset
	const c1_2 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
	const c2_2 = DatasetFactory.createConstraint("inputCodPagamento", "", "", ConstraintType.MUST_NOT);
	const c3_2 = DatasetFactory.createConstraint("inputDescPagamento", "", "", ConstraintType.MUST_NOT);
	const sortingFields = new Array("inputCodPagamento");
	const datasetFormaPag = DatasetFactory.getDataset("ds_FormaPagamento", null, [c1_2, c2_2, c3_2], sortingFields);
	if(datasetFormaPag != null && datasetFormaPag.values.length > 0){
		let formaPagamento = $("#selectformaPagamento").val();
		for(let i = 0; i < datasetFormaPag.values.length; i++){
			let codPagamento = datasetFormaPag.values[i].inputCodPagamento;
			let descPagamento = datasetFormaPag.values[i].inputDescPagamento;
			$('#selectformaPagamento').append('<option value="' + codPagamento + '">' + descPagamento + '</option>');
		}
		if(formaPagamento != "") $("#selectformaPagamento").val(formaPagamento);
	}
	$('#selectformaPagamento').on("change", (event) => {
		let formaPagamento = event.target[event.target.selectedIndex].text;
		if(formaPagamento == ""){
			$('#inputCodPagamento').val("");
		}else{
			let arrayFormaPag = datasetFormaPag.values;
			let codigoPagamento = arrayFormaPag.find(Item => formaPagamento == Item.inputDescPagamento);
			$('#inputCodPagamento').val(codigoPagamento.inputCodPagamento);
		}
	});
});

function validaMunicipio(){
	console.log("RUN validaMunicipio()");
	
	var uf = $('#inputEstado').val();
	var municipio = $('#inputCodMunicipal').val();
	
	console.log(uf + " - " + municipio);
	
	//Validação Inscrição municipal
	$.ajax({
		async: false,
		crossDomain: true,
		url: "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=CC2&FILTRO=CC2_EST$"+ uf/*dados.uf*/ +"@CC2_CODMUN$"+ municipio /*codMunic*/,
		method: "GET",
		headers: {
		  Accept: "application/json",
		  //"Accept-Charset": "utf-8",
		  Authorization: "Basic YWRtaW46cmhtZWQyMDIxMDE="
		}
	}).success(function(data){
		console.log("success");
		console.log(data);
		if(data.hasOwnProperty('erro')){
			$("#hiddenValidaCodMunicipio").val("0");
			FLUIGC.toast({title: 'Atenção: ',message: 'Cadastro do município não encontrado, favor solicitar o cadastro no Protheus! Código Municipal: <strong>'+ municipio/*codMunic*/ +'</strong>, UF: <strong>'+ uf/*dados.uf*/ +'</strong>',type: 'danger'});
			
		}else if(data.hasOwnProperty('CC2')){
			$("#hiddenValidaCodMunicipio").val("1");
		}
	}).error(function(data){
		console.log("error");
		console.log(data);
		$("#hiddenValidaCodMunicipio").val("0");
		FLUIGC.toast({title: 'Atenção: ',message: 'Falha na integração com o sistema Protheus, favor acionar o departamento de TI!',type: 'warning'});
	}).fail(function(data){
		console.log("fail");
		console.log(data);
		$("#hiddenValidaCodMunicipio").val("0");
		FLUIGC.toast({title: 'Atenção: ',message: 'Falha na integração com o sistema Protheus, favor acionar o departamento de TI!',type: 'warning'});
	});

	//Adiciona readonly dos campos Bairro e Estado | substitui campo Municipio (zoom) por campo (input).
	$("#inputEstado").attr("readonly", true);
	$("#inputMunicipio").parent('div').css('display','block');
	$("#zoomMunicipio").parent('div').css('display','none');

	//Status CEP
	$("#statusCEP").val('0');
}

function validacaoTipoFornecedor(){
	let cgc = $("input[name*='inputCNPJ']").val();
	let tipoFornecedor = $("#selectTipoFornec").val();

	console.log(cgc);
	console.log(cgc.length);
	console.log(tipoFornecedor);

	$("#selectTipoFornec option[value='J']").remove();
	$("#selectTipoFornec option[value='F']").remove();
	$("#selectTipoFornec option[value='X']").remove();

	if(cgc.length == 11){
		$('#selectTipoFornec').append($("<option></option>").attr("value", "F").text("F - Pessoa Física")); 
	}else{
		$('#selectTipoFornec').append($("<option></option>").attr("value", "J").text("J - Pessoa Jurídica")); 
		$('#selectTipoFornec').append($("<option></option>").attr("value", "X").text("X - Importação")); 
	}

	$("#selectTipoFornec").val(tipoFornecedor);
}

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
	$("#idSolicitacao").val('SCF - '+$("#numeroFluxo").val())
}

function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 4 || atividade == 0){
		if(currencyToNumber($("#valorTotalDocumento").val()) < currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor");
		}else{
			$("#aprovadorDestino").val("coordenador");
		}
	}
	if(atividade == 11){
		if(currencyToNumber($("#valorTotalDocumento").val()) < currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor");
		}else{
			$("#aprovadorDestino").val("coordenador");
		}
	}
	if(atividade == 27){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador");
		}else{
			$("#aprovadorDestino").val("celulaFiscal");
		}
	}
	if(atividade == 34){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
			$("#aprovadorDestino").val("diretor");
		}else{
			$("#aprovadorDestino").val("celulaFiscal");
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

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');
}

function copiaCampo(containerid) {
	$(containerid).select();
	document.execCommand('copy');
}

function setSelectedZoomItem(selectedItem){
    if(selectedItem.inputId == 'zoomNatFinanc'){
        $("#inputCodNatFinanc").val(selectedItem.cODNATUR).trim();
	}
	if(selectedItem.inputId == 'zoomContaContabil'){
        $("#inputContaContabil").val(selectedItem.cODCONTA).trim();
	}
	if(selectedItem.inputId == 'zoomMunicipio'){
		console.log("Municipio");
		console.log(selectedItem.cODMUNIC);
		$("#inputCodMunicipal").val(selectedItem.cODMUNIC);
		$("#inputCodPais").val('105');
		$("#inputCodPaisBacen").val('01058');
	}
	if(selectedItem.inputId == 'zoomFilial'){
        $("#cnpjFilial").val(selectedItem.cnpjFilial);
        $("#empresaCod").val(selectedItem.Empresa);
	}
	if(selectedItem.inputId == 'zoomCentroCusto'){
		carregaAprovadores(selectedItem.ccusto);
	}
	if(selectedItem.inputId == 'zoomFormaPag'){
		$("#inputFormaPag").val(selectedItem.cODFORMA);
	}
}

function validaCPF(nrCPF){
	var exp = /\.|\-/g;
    
    var cpf = nrCPF.replace(exp,'').toString();
    
    if(cpf.length == 11 ){
		var v = [];
		//Calcula o primeiro dígito de verificação.
		v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
		v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
		v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
		v[0] = v[0] % 11;
		v[0] = v[0] % 10;
		//Calcula o segundo dígito de verificação.
		v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
		v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
		v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
		v[1] = v[1] % 11;
		v[1] = v[1] % 10;
		//Retorna Verdadeiro se os dígitos de verificação são os esperados.				
		if ((v[0] != cpf[9]) || (v[1] != cpf[10])){
			return false;
		}else if (cpf[0] == cpf[1] && cpf[1] == cpf[2] && cpf[2] == cpf[3] && cpf[3] == cpf[4] && cpf[4] == cpf[5] && cpf[5] == cpf[6] && cpf[6] == cpf[7] && cpf[7] == cpf[8] && cpf[8] == cpf[9] && cpf[9] == cpf[10]){
			return false;
		}else{
			return true
		}
    }else{
		return true
	}
}

function validaCNPJ(nrCNPJ){
	cnpj = nrCNPJ.replace(/[^\d]+/g,''); 
    if(cnpj == '') return false;     
    if (cnpj.length != 14) return false; 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

function setZoomData(instance, value){
    window[instance].setValue(value);
}