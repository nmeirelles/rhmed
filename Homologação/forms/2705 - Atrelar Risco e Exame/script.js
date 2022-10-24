$(document).ready( () => {
	let inputCurrentAtividade = $("#inputCurrentAtividade");

	let selectTipoProduto = $("#selectTipoProduto");
	let btnAdicionarRisco = $("#btnAdicionarRisco");
	let btnAnexarDocumento = $("#btnAnexarDocumento");
    let inputQuantidade = $("#inputQuantidade");
    let selectTipoDemanda = $("#selectTipoDemanda");
    let btnExcluirRisco = $('[name^=btnExcluirRisco]');

	let inputSetor = $("#inputSetor");
	let inputDescritivoAtividade = $("#inputDescritivoAtividade");
	let inputNumeroCBO = $("#inputNumeroCBO");
	let inputFuncao = $("#inputFuncao");

	let radioUtilizaProdutoQuimico = $("input[name=radioUtilizaProdutoQuimico]");
	let radioAtividadeEmCampo = $("input[name=radioAtividadeEmCampo]");
	let radioAtividadeAltura = $("input[name=radioAtividadeAltura]");
	let radioAtividadeEletricidade = $("input[name=radioAtividadeEletricidade]");
	let radioAtividadeConfinado = $("input[name=radioAtividadeConfinado]");
	let radioAtividadeAlimento = $("input[name=radioAtividadeAlimento]");
	let radioAtividadeArmada = $("input[name=radioAtividadeArmada]");
	let radioAtividadeVeiculo = $("input[name=radioAtividadeVeiculo]");
	let radioEPI = $("input[name=radioEPI]");
	let radioEPC = $("input[name=radioEPC]");

	let inputEmpresa = $("#inputEmpresa");
	let inputGrupoAprovacao = $("#inputGrupoAprovacao");
	let selectTipoServico = $("#selectTipoServico");

	selectTipoServico.on("change", (event) => {
		let servico = event.target.value;
		inputGrupoAprovacao.val('');
		if(inputEmpresa.val() == 'RHVIDA' && servico == 'seguranca') inputGrupoAprovacao.val('RHVIDA SEGURANCA'); // PROC_AtrelarRiscoExame_SegurancaRHVIDA - Grupo Segurança RHVIDA - Atrelar Risco e Exame
		if(inputEmpresa.val() == 'RHVIDA' && servico == 'saude') inputGrupoAprovacao.val('RHVIDA SAUDE'); // PROC_AtrelarRiscoExame_SaudeRHVIDA - Grupo Saúde RHVIDA - Atrelar Risco e Exame
		if(inputEmpresa.val() == 'RHMED' && servico == 'seguranca') inputGrupoAprovacao.val('RHMED SEGURANCA'); // Proc_AtrelarRiscoExame_SegurancaRHMED - Grupo Segurança RHMED - Atrelar Risco e Exame
		if(inputEmpresa.val() == 'RHMED' && servico == 'saude') inputGrupoAprovacao.val('RHMED SAUDE'); // Proc_AtrelarRiscoExame_SaudeRHMED - Grupo Saúde RHMED - Atrelar Risco e Exame
		
		console.log("Grupo Aprovação: "+inputGrupoAprovacao.val());

		$("#selectTipoProduto option[value='todos']").remove();
		$("#selectTipoProduto option[value='clienteEmpresa']").remove();
		$("#selectTipoProduto option[value='clienteCliente']").remove();
		$("#selectTipoProduto option[value='empresaCliente']").remove();
		if(inputEmpresa.val() == 'RHMED' && servico == 'seguranca'){
			selectTipoProduto.append($("<option></option>").attr("value", "empresaCliente").text("PGR RHMed/RHVida e PCMSO Cliente"));
			selectTipoProduto.val("empresaCliente");
			$('#tabelaRisco > tbody > tr:not(:first)').remove();
			btnAdicionarRisco.hide();
		}else{
			selectTipoProduto.append($("<option></option>").attr("value", "todos").text("Todos os Produtos"));
			selectTipoProduto.append($("<option></option>").attr("value", "clienteEmpresa").text("PGR Cliente e PCMSO RHMed/RHVida"));
			selectTipoProduto.append($("<option></option>").attr("value", "clienteCliente").text("PGR Cliente e PCMSO Cliente"));
			selectTipoProduto.append($("<option></option>").attr("value", "empresaCliente").text("PGR RHMed/RHVida e PCMSO Cliente"));
			btnAdicionarRisco.show();
		}
	
	
	});

	if(inputCurrentAtividade.val() != 0 && inputCurrentAtividade.val() != 4 && inputCurrentAtividade.val() != 21){

		if(selectTipoProduto.val() == "clienteEmpresa"){
			$("[name^=_inputTabelaRisco___]").parent().show();
			$("[name^=_inputTabelaTempo___]").parent().hide();
			$("[name^=_inputTabelaExame___]").parent().hide();
			$("[name^=_inputTabelaPeriodicidade___]").parent().hide();
			$("[name^=_inputTabelaTipoExame___]").parent().hide();
			$("[name^=_inputTabelaFuncao___]").parent().show();
		}
		if(selectTipoProduto.val() == "clienteCliente"){
			$("[name^=_inputTabelaRisco___]").parent().show();
			$("[name^=_inputTabelaTempo___]").parent().show();
			$("[name^=_inputTabelaExame___]").parent().show();
			$("[name^=_inputTabelaPeriodicidade___]").parent().show();
			$("[name^=_inputTabelaTipoExame___]").parent().show();
			$("[name^=_inputTabelaFuncao___]").parent().show();
		}

		setTimeout(() => {
			btnAnexarDocumento.off("click");
			btnAdicionarRisco.off("click");
			btnExcluirRisco.off("click");
			if(selectTipoDemanda.val() == "atualizacaoBancoDados"){
				$("#_zoomUnidadeCliente").parent().hide();
				$("#_inputUnidadeCliente").parent().show();
			}else{
				$("#_zoomUnidadeCliente").parent().show();
				$("#_inputUnidadeCliente").parent().hide();
			}
		}, 600);

		if(radioUtilizaProdutoQuimico.val() == "sim"){
			$("[name=_textareaTiposProdutoQuimico]").parent().show();
			$("[name=_textareaFreqProdutoQuimico]").parent().show();
			$("[name=_textareaQuandoProdutoQuimico]").parent().show();
			$("[name=_textareaOndeProdutoQuimico]").parent().show();
		}

		if(radioAtividadeEmCampo.val() == "sim"){
			$("input[name=_radioAtividadesOperacionais]").parent().parent().show();
			$("[name=_selectTipoCampo]").parent().show();
			$("[name=_textareaDescricaoCampo]").parent().show();
		}

		if(radioAtividadeAltura.val() == "sim") $("[name=_textareaAtividadeAltura]").parent().show();
		if(radioAtividadeEletricidade.val() == "sim") $("[name=_textareaAtividadEletricidade]").parent().show();
		if(radioAtividadeConfinado.val() == "sim") $("[name=_textareaAtividadeConfinado]").parent().show();
		if(radioAtividadeAlimento.val() == "sim") $("[name=_textareaAtividadeAlimento]").parent().show();
		if(radioAtividadeArmada.val() == "sim") $("[name=_textareaAtividadeArmada]").parent().show();
		if(radioAtividadeVeiculo.val() == "sim") $("[name=_selectTipoVeiculo]").parent().show();
		if(radioEPI.val() == "sim") $("textarea[name=_textareaEPI]").parent().show();
		if(radioEPC.val() == "sim") $("textarea[name=_textareaEPC]").parent().show();

		let _zoomPlataforma = $("#_zoomPlataforma").val();
		if(_zoomPlataforma == "SOC NET"){
			$("input[name=_zoomUnidadeCliente]").parent().hide();
			$("input[name=_inputUnidadeCliente]").parent().show();
		}else{
			$("input[name=_zoomUnidadeCliente]").parent().show();
			$("input[name=_inputUnidadeCliente]").parent().hide();
		}
		
	}else{
		if(selectTipoProduto.val() == "todos" || selectTipoProduto.val() == "empresaCliente") btnAdicionarRisco.hide();
		else btnAdicionarRisco.show();

		setTimeout(() => {
			if(selectTipoDemanda.val() == "atualizacaoBancoDados"){
				inputSetor.prop("readonly", true).val("");
				inputDescritivoAtividade.prop("readonly", true).val("");
				inputNumeroCBO.prop("readonly", true).val("");
				inputFuncao.prop("readonly", true).val("");
				$("#inputUnidadeCliente").val("Todas as Unidades").prop("readonly", true).parent().show();
				$("#zoomUnidadeCliente").parent().hide();
				$("#inputCodigoUnidadeCliente").val('');
			}else if(selectTipoDemanda.val() == "cadastroFilialFuncaoSetor"){
				$("#inputUnidadeCliente").prop("readonly", true).parent().show();
				$("#zoomUnidadeCliente").parent().hide();
			}else{
				$("#inputUnidadeCliente").prop("readonly", false).parent().hide();
				$("#zoomUnidadeCliente").parent().show();
				inputSetor.prop("readonly", false);
				inputDescritivoAtividade.prop("readonly", false);
				inputNumeroCBO.prop("readonly", false);
				inputFuncao.prop("readonly", false);
			}
		}, 600);

		if(selectTipoProduto.val() == "clienteEmpresa"){
			$("[name^=inputTabelaRisco___]").parent().show();
			$("[name^=inputTabelaTempo___]").parent().hide();
			$("[name^=inputTabelaExame___]").parent().hide();
			$("[name^=inputTabelaPeriodicidade___]").parent().hide();
			$("[name^=inputTabelaTipoExame___]").parent().hide();
			$("[name^=inputTabelaFuncao___]").parent().show();
		}
		if(selectTipoProduto.val() == "clienteCliente"){
			$("[name^=inputTabelaRisco___]").parent().show();
			$("[name^=inputTabelaTempo___]").parent().show();
			$("[name^=inputTabelaExame___]").parent().show();
			$("[name^=inputTabelaPeriodicidade___]").parent().show();
			$("[name^=inputTabelaTipoExame___]").parent().show();
			$("[name^=inputTabelaFuncao___]").parent().show();
		}
			
		let radioUtilizaProdutoQuimicoSim = $("#radioUtilizaProdutoQuimicoSim").is(":checked");
		if(radioUtilizaProdutoQuimicoSim){
			$("textarea[name=textareaTiposProdutoQuimico]").parent().show();
			$("textarea[name=textareaFreqProdutoQuimico]").parent().show();
			$("textarea[name=textareaQuandoProdutoQuimico]").parent().show();
			$("textarea[name=textareaOndeProdutoQuimico]").parent().show();
		}
		
		let radioAtividadeEmCampoSim = $("#radioAtividadeEmCampoSim").is(":checked");
		if(radioAtividadeEmCampoSim){
			$("input[name=radioAtividadesOperacionais]").parent().parent().show();
			$("select[name=selectTipoCampo]").parent().show();
			$("textarea[name=textareaDescricaoCampo]").parent().show();
		}
		
		let radioAtividadeAlturaSim = $("#radioAtividadeAlturaSim").is(":checked");
		if(radioAtividadeAlturaSim) $("[name=textareaAtividadeAltura]").parent().show();
		let radioAtividadeEletricidadeSim = $("#radioAtividadeEletricidadeSim").is(":checked");
		if(radioAtividadeEletricidadeSim) $("[name=textareaAtividadEletricidade]").parent().show();
		let radioAtividadeConfinadoSim = $("#radioAtividadeConfinadoSim").is(":checked");
		if(radioAtividadeConfinadoSim) $("[name=textareaAtividadeConfinado]").parent().show();
		let radioAtividadeAlimentoSim = $("#radioAtividadeAlimentoSim").is(":checked");
		if(radioAtividadeAlimentoSim) $("[name=textareaAtividadeAlimento]").parent().show();
		let radioAtividadeArmadaSim = $("#radioAtividadeArmadaSim").is(":checked");
		if(radioAtividadeArmadaSim) $("[name=textareaAtividadeArmada]").parent().show();
		let radioAtividadeVeiculoSim = $("#radioAtividadeVeiculoSim").is(":checked");
		if(radioAtividadeVeiculoSim) $("[name=selectTipoVeiculo]").parent().show();
		let radioEPISim = $("#radioEPISim").is(":checked");
		if(radioEPISim) $("textarea[name=textareaEPI]").parent().show();
		let radioEPCSim = $("#radioEPCSim").is(":checked");
		if(radioEPCSim) $("textarea[name=textareaEPC]").parent().show();

		let zoomPlataforma = $("#zoomPlataforma").val();
		if(zoomPlataforma == "SOC NET"){
			$("input[name=zoomUnidadeCliente]").parent().hide();
			$("input[name=inputUnidadeCliente]").parent().show();
		}else{
			$("input[name=zoomUnidadeCliente]").parent().show();
			$("input[name=inputUnidadeCliente]").parent().hide();
		}

	}

    selectTipoDemanda.on('change', (event) => {

		$("#inputCodigoPlataforma").val('');
		window["zoomPlataforma"].clear();
		$("#inputCodigoEmpresaCliente").val('');
		window["zoomEmpresaCliente"].clear();
		$("#inputCodigoRegional").val('');
		window["zoomRegionalCliente"].clear();
		$("#inputCodigoUnidadeCliente").val('');
		window["zoomUnidadeCliente"].clear();
		$("#inputUnidadeCliente").val('').prop("readonly", false);

        const tipoDemanda = event.target.value;
        if(tipoDemanda == "cadastroFuncaoSetor") inputQuantidade.prop("readonly", false);
        else inputQuantidade.prop("readonly", true).val("");
		
		if(tipoDemanda == "atualizacaoBancoDados"){
			inputSetor.prop("readonly", true).val("");
			inputDescritivoAtividade.prop("readonly", true).val("");
			inputNumeroCBO.prop("readonly", true).val("");
			inputFuncao.prop("readonly", true).val("");

			$("#inputUnidadeCliente").val("Todas as Unidades").prop("readonly", true).parent().show();
			$("#zoomUnidadeCliente").parent().hide();
			$("#inputCodigoUnidadeCliente").val('');
		}else if(tipoDemanda == "cadastroFilialFuncaoSetor"){
			$("#inputUnidadeCliente").val("").parent().show();
			$("#zoomUnidadeCliente").parent().hide();
			$("#inputCodigoUnidadeCliente").val('');
		}else{
			$("#inputUnidadeCliente").val("").prop("readonly", false).parent().hide();
			$("#zoomUnidadeCliente").parent().show();
			$("#inputCodigoUnidadeCliente").val('');

			inputSetor.prop("readonly", false);
			inputDescritivoAtividade.prop("readonly", false);
			inputNumeroCBO.prop("readonly", false);
			inputFuncao.prop("readonly", false);
		}
    });
    
	selectTipoProduto.on("change", (event) => {

		$('#tabelaRisco > tbody > tr:not(:first)').remove();	

		let produto = event.target.value;
		if(produto == "todos" || produto == "empresaCliente") btnAdicionarRisco.hide();
		else btnAdicionarRisco.show();

		if(produto == "clienteCliente"){
			$('[name=radioUtilizaProdutoQuimico]').parent().parent().hide();
			$("#radioUtilizaProdutoQuimicoNao").prop("checked", true);
			$("#radioUtilizaProdutoQuimicoSim").prop("checked", false);
			$('#textareaTiposProdutoQuimico').val('');
			$('#textareaFreqProdutoQuimico').val('');
			$('#textareaQuandoProdutoQuimico').val('');
			$('#textareaOndeProdutoQuimico').val('');
		}else{
			$('[name=radioUtilizaProdutoQuimico]').parent().parent().show();
		}

		$('#textareaTiposProdutoQuimico').parent().hide();
		$('#textareaFreqProdutoQuimico').parent().hide();
		$('#textareaQuandoProdutoQuimico').parent().hide();
		$('#textareaOndeProdutoQuimico').parent().hide();
	});

	btnAnexarDocumento.on("click", () => {
		JSInterface.showCamera();
		$(window.top.document).find('#attachmentsStatusTab').trigger('click');
	});

    btnAdicionarRisco.on('click', () => {
		if(selectTipoProduto.val() == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor selecionar o tipo de produto',type: 'warning'});
		else{
			let index = wdkAddChild("tabelaRisco");
			MaskEvent.init();
			if(selectTipoProduto.val() == "clienteEmpresa"){
				$("#inputTabelaRisco___"+index).parent().show();
				$("#inputTabelaTempo___"+index).parent().hide();
				$("#inputTabelaExame___"+index).parent().hide();
				$("#inputTabelaPeriodicidade___"+index).parent().hide();
				$("#inputTabelaTipoExame___"+index).parent().hide();
				$("#inputTabelaFuncao___"+index).parent().show();
			}
			if(selectTipoProduto.val() == "clienteCliente"){
				$("#inputTabelaRisco___"+index).parent().show();
				$("#inputTabelaTempo___"+index).parent().show();
				$("#inputTabelaExame___"+index).parent().show();
				$("#inputTabelaPeriodicidade___"+index).parent().show();
				$("#inputTabelaTipoExame___"+index).parent().show();
				$("#inputTabelaFuncao___"+index).parent().show();
			}
		}

    });

	$('[name=radioUtilizaProdutoQuimico]').on("change", (event) => {

		$('#textareaTiposProdutoQuimico').val('');
		$('#textareaFreqProdutoQuimico').val('');
		$('#textareaQuandoProdutoQuimico').val('');
		$('#textareaOndeProdutoQuimico').val('');

		let utilizaProdutoQuimico = event.target.value;

		if(utilizaProdutoQuimico == 'sim') {
			$('#textareaTiposProdutoQuimico').parent().show();
			$('#textareaFreqProdutoQuimico').parent().show();
			$('#textareaQuandoProdutoQuimico').parent().show();
			$('#textareaOndeProdutoQuimico').parent().show();
		}else{
			$('#textareaTiposProdutoQuimico').parent().hide();
			$('#textareaFreqProdutoQuimico').parent().hide();
			$('#textareaQuandoProdutoQuimico').parent().hide();
			$('#textareaOndeProdutoQuimico').parent().hide();
		}
	});

	$('[name=radioAtividadeEmCampo]').on("change", (event) => {

		$("#radioAtividadesOperacionaisNao").prop("checked", true);
		$('#selectTipoCampo').val('');
		$('#textareaDescricaoCampo').val('');

		let atividadeEmCampo = event.target.value;

		if(atividadeEmCampo == 'sim') {
			$('[name=radioAtividadesOperacionais]').parent().parent().show();
			$('#selectTipoCampo').parent().show();
			$('#textareaDescricaoCampo').parent().show();
		}else{
			$('[name=radioAtividadesOperacionais]').parent().parent().hide();
			$('#selectTipoCampo').parent().hide();
			$('#textareaDescricaoCampo').parent().hide();
		}
	});

	$('[name=radioAtividadeVeiculo]').on("change", (event) => {
		$('#selectTipoVeiculo').val('');

		let atividadeVeiculo = event.target.value;

		if(atividadeVeiculo == 'sim') {
			$('#selectTipoVeiculo').parent().show();
		}else{
			$('#selectTipoVeiculo').parent().hide();
		}
	});

	$('[name=radioEPI]').on("change", (event) => {
		$('#textareaEPI').val('');

		let epi = event.target.value;

		if(epi == 'sim') {
			$('#textareaEPI').parent().show();
		}else{
			$('#textareaEPI').parent().hide();
		}
	});

	$('[name=radioEPC]').on("change", (event) => {

		$('#textareaEPC').val('');

		let epc = event.target.value;

		if(epc == 'sim') {
			$('#textareaEPC').parent().show();
		}else{
			$('#textareaEPC').parent().hide();
		}
	});

	$('[name=radioAtividadeAltura]').on("change", (event) => {
		$('#textareaAtividadeAltura').val('');
		let el = event.target.value;
		if(el == 'sim') $('#textareaAtividadeAltura').parent().show();
		else $('#textareaAtividadeAltura').parent().hide();
	});
	$('[name=radioAtividadeEletricidade]').on("change", (event) => {
		$('#textareaAtividadEletricidade').val('');
		let el = event.target.value;
		if(el == 'sim') $('#textareaAtividadEletricidade').parent().show();
		else $('#textareaAtividadEletricidade').parent().hide();
	});
	$('[name=radioAtividadeConfinado]').on("change", (event) => {
		$('#textareaAtividadeConfinado').val('');
		let el = event.target.value;
		if(el == 'sim') $('#textareaAtividadeConfinado').parent().show();
		else $('#textareaAtividadeConfinado').parent().hide();
	});
	$('[name=radioAtividadeAlimento]').on("change", (event) => {
		$('#textareaAtividadeAlimento').val('');
		let el = event.target.value;
		if(el == 'sim') $('#textareaAtividadeAlimento').parent().show();
		else $('#textareaAtividadeAlimento').parent().hide();
	});
	$('[name=radioAtividadeArmada]').on("change", (event) => {
		$('#textareaAtividadeArmada').val('');
		let el = event.target.value;
		if(el == 'sim') $('#textareaAtividadeArmada').parent().show();
		else $('#textareaAtividadeArmada').parent().hide();
	});

	preencheAcompanhamento();
});

function setSelectedZoomItem(selectedItem){
	if(selectedItem.inputId == "zoomEmpresa") {
		let nome = selectedItem["NOME"];
		$("#inputEmpresa").val(nome);

		let servico = $("#selectTipoServico").val();

		if(nome == 'RHVIDA' && servico == 'seguranca') $("#inputGrupoAprovacao").val('RHVIDA SEGURANCA'); // PROC_AtrelarRiscoExame_SegurancaRHVIDA - Grupo Segurança RHVIDA - Atrelar Risco e Exame
		if(nome == 'RHVIDA' && servico == 'saude') $("#inputGrupoAprovacao").val('RHVIDA SAUDE'); // PROC_AtrelarRiscoExame_SaudeRHVIDA - Grupo Saúde RHVIDA - Atrelar Risco e Exame
		if(nome == 'RHMED' && servico == 'seguranca') $("#inputGrupoAprovacao").val('RHMED SEGURANCA'); // Proc_AtrelarRiscoExame_SegurancaRHMED - Grupo Segurança RHMED - Atrelar Risco e Exame
		if(nome == 'RHMED' && servico == 'saude') $("#inputGrupoAprovacao").val('RHMED SAUDE');

		console.log("Grupo Aprovação: "+$("#inputGrupoAprovacao").val());
	}
		
	if(selectedItem.inputId == "zoomPlataforma"){

		if($("#selectTipoDemanda").val() == ""){
			$("#inputCodigoPlataforma").val('');
			window["zoomPlataforma"].clear();
			FLUIGC.toast({title: 'Atenção: ',message: 'Favor selecionar o tipo de demanda',type: 'warning'});
		}else{
			$("#inputCodigoPlataforma").val(selectedItem["COD_PLATAFORMA"]);
			
			$("#inputCodigoEmpresaCliente").val('');
			window["zoomEmpresaCliente"].clear();

			$("#inputCodigoRegional").val('');
			window["zoomRegionalCliente"].clear();

			$("#inputCodigoUnidadeCliente").val('');
			window["zoomUnidadeCliente"].clear();
			$("#inputUnidadeCliente").val('').prop("readonly", false);

			reloadZoomFilterValues("zoomEmpresaCliente", "COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);

			if($("#selectTipoDemanda").val() == "atualizacaoBancoDados" && (selectedItem["PLATAFORMA"] == "SOC NET" || selectedItem["PLATAFORMA"] == "SOC")){
				$("#inputUnidadeCliente").val("Todas as Unidades").prop("readonly", true).parent().show();
				$("#zoomUnidadeCliente").parent().hide();
				window["zoomRegionalCliente"].disable(true);
			}else if($("#selectTipoDemanda").val() == "atualizacaoBancoDados"){
				$("#inputUnidadeCliente").val("Todas as Unidades").prop("readonly", true).parent().show();
				$("#zoomUnidadeCliente").parent().hide();
				window["zoomRegionalCliente"].disable(false);
			}else if($("#selectTipoDemanda").val() == "cadastroFilialFuncaoSetor"){
				$("#inputUnidadeCliente").val("").parent().show();
				$("#zoomUnidadeCliente").parent().hide();
				window["zoomRegionalCliente"].disable(false);
			}else if(selectedItem["PLATAFORMA"] == "SOC NET"){
				FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar código e nome da unidade',type: 'warning'});
				$("#inputUnidadeCliente").parent().show();
				$("#zoomUnidadeCliente").parent().hide();
				window["zoomRegionalCliente"].disable(true);
			}else if(selectedItem["PLATAFORMA"] == "SOC"){
				window["zoomRegionalCliente"].disable(true);
			}else{
				window["zoomRegionalCliente"].disable(false);
				$("#inputUnidadeCliente").parent().hide();
				$("#zoomUnidadeCliente").parent().show();
			}
		}
	}
	
	if(selectedItem.inputId == "zoomEmpresaCliente"){
		let zoomPlataforma = $("#zoomPlataforma").val();

		$("#inputCodigoEmpresaCliente").val(selectedItem["COD_EMPRESA"]);

		if(zoomPlataforma == "EVIDAMED"){
			$("#inputCodigoRegional").val('');
			window["zoomRegionalCliente"].clear();
			reloadZoomFilterValues("zoomRegionalCliente", "COD_EMPRESA," + selectedItem["COD_EMPRESA"]);
		}

		$("#inputCodigoUnidadeCliente").val('');
		window["zoomUnidadeCliente"].clear();
		if($("#selectTipoDemanda").val() != "atualizacaoBancoDados" && $("#selectTipoDemanda").val() != "cadastroFilialFuncaoSetor") $("#inputUnidadeCliente").val('');
		reloadZoomFilterValues("zoomUnidadeCliente", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);
	}
	
	if(selectedItem.inputId == "zoomRegionalCliente"){
		$("#inputCodigoRegional").val(selectedItem["COD_REGIONAL"]);

		$("#inputCodigoUnidadeCliente").val('');
		window["zoomUnidadeCliente"].clear();
		if($("#selectTipoDemanda").val() != "atualizacaoBancoDados" && $("#selectTipoDemanda").val() != "cadastroFilialFuncaoSetor") $("#inputUnidadeCliente").val('');

		reloadZoomFilterValues("zoomUnidadeCliente", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"] + ",COD_REGIONAL," + selectedItem["COD_REGIONAL"]);
	}
	
	if(selectedItem.inputId == "zoomUnidadeCliente"){
		$("#inputCodigoUnidadeCliente").val(selectedItem["COD_UNIDADE"]);
	}
}

function removedZoomItem(removedItem){
	if(removedItem.inputId == "zoomEmpresa"){
		$("#inputEmpresa").val("");
	}
}

function fnCustomDelete(element){
	let inputCurrentAtividade = $("#inputCurrentAtividade").val();
	if(inputCurrentAtividade == "0" || inputCurrentAtividade == "4" || inputCurrentAtividade == "21") fnWdkRemoveChild(element);
};