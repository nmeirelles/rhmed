var beforeSendValidate = function(numState, nextState) {
	var ANALISAR_REQUISICAO = 15;
	var CORRIGIR_SOLICITACAO = 27;
	var VERIFICAR_DISPONIBILIDADE = 31;
	var APROVACAO_AGENDA = 37;
	var MONITORAR_ATENDIMENTO = 69;
	var ENVIAR_LISTA_PRESENCA = 115;
	var ENVIAR_MALOTE = 78;
	var FATURAMENTO_AUSENCIAS = 61;

	var jsonGlobal = {
		dados : [],
		procedimentos: [],
		credenciado: []
	};
	let historicoSolicitacao = $("#historicoSolicitacao");
    var plataforma = $("#zoomPlataforma").val();
	var atividadeAtual = numState;
	var proximaAtividade = nextState;
	var msgErro = "";
	var envASO = $("#hiddenSwitchASO").val();
	var envLista = $("#hiddenSwitchListaPresenca").val();
	var envResult = $("#hiddenSwitchResultExam").val();
	//var envMalote = $("#switchConfirmMalote").val();
	var contrato = $("#tipoContrato").val();
	var cliente = $("#nomeEmpresa").val();

    var filial = "";
	if(plataforma == "SOC NET") filial = $("#codNomeBuscaUnidade").val();
	else filial = $("#nomeFilial").val();

    var mesRealizacao = $("#mesRealizacao").val();
	var credVinc = $("#hiddenSwitchCredVinc").val();
	var kitColab = $("#hiddenSwitchKitColab").val();
	//var prepAtend = $("#switchPrepAtend").val();
	var realAtend = $("#confAtendRealizado").val();
	var fatRealizado = $("#switchConfirmFaturamento").val();
	let tabelaProcedimentos = $("input[name^=codProcedimento___]");
	let tabelaCredenciados = $("input[name^=procedSelecionadoNew___]");

	//Campos de Painéis de Aprovações
	let aprovacaoAnaliseRequisicao= $("#aprovacaoAnaliseRequisicao").val();
	let aprovacaoDisponibilidade= $("#aprovacaoDisponibilidade").val();
	let aprovacaoAgenda= $("#aprovacaoAgenda").val();
	let aprovacaoMonitAtendimento= $("#aprovacaoMonitAtendimento").val();
	let aprovacaoListaPresenca= $("#aprovacaoListaPresenca").val();

	let campoObsAdicional = $("#destino").val();

	if(atividadeAtual == ANALISAR_REQUISICAO){
		if(aprovacaoAnaliseRequisicao == ""){
			msgErro += "<li>Favor selecionar um valor no campo <strong>Aprovação Análise da Requisição</strong>.</li>";
		}else if(aprovacaoAnaliseRequisicao == "Nao" && campoObsAdicional == ""){
			msgErro += "<li>Caso sua decisão seja Reprovado, preencher <strong>Observação Adicional</strong>.</li>";
		}
	}
	if(atividadeAtual == VERIFICAR_DISPONIBILIDADE){
		if(aprovacaoDisponibilidade == ""){
			msgErro += "<li>Favor selecionar um valor no campo <strong>Aprovação de Disponibilidade</strong>.</li>";
		}else if(aprovacaoDisponibilidade == "Nao" && campoObsAdicional == ""){
			msgErro += "<li>Caso sua decisão seja Reprovado, preencher <strong>Observação Adicional</strong>.</li>";
		}
	}
	if(atividadeAtual == APROVACAO_AGENDA){
		if(aprovacaoAgenda == ""){
			msgErro += "<li>Favor selecionar um valor no campo <strong>Aprovação de Agenda</strong>.</li>";
		}else if(aprovacaoAgenda == "Nao" && campoObsAdicional == ""){
			msgErro += "<li>Caso sua decisão seja Reprovado, preencher <strong>Observação Adicional</strong>.</li>";
		}
	}
	if(atividadeAtual == MONITORAR_ATENDIMENTO){
		if(aprovacaoMonitAtendimento == ""){
			msgErro += "<li>Favor selecionar um valor no campo <strong>Aprovação de Monitoramento</strong>.</li>";
		}else if(aprovacaoMonitAtendimento == "Nao" && campoObsAdicional == ""){
			msgErro += "<li>Caso sua decisão seja Reprovado, preencher <strong>Observação Adicional</strong>.</li>";
		}
	}
	if(atividadeAtual == ENVIAR_LISTA_PRESENCA){
		if(aprovacaoListaPresenca == ""){
			msgErro += "<li>Favor selecionar um valor no campo <strong>Aprovação de Lista de Presença</strong>.</li>";
		}else if(aprovacaoListaPresenca == "Nao" && campoObsAdicional == ""){
			msgErro += "<li>Caso sua decisão seja Reprovado, preencher <strong>Observação Adicional</strong>.</li>";
		}
	}


    if((atividadeAtual == 0) && (contrato == "semContrato")) exibirMensagem("Para prosseguir com a solicitação é necessário possuir Contrato In Company, ordem de Serviço ou Proposta Comercial.</b><br/>");
	if((atividadeAtual == 4) && (contrato == "semContrato")) exibirMensagem("Para prosseguir com a solicitação é necessário possuir Contrato In Company, ordem de Serviço ou Proposta Comercial.</b><br/>");
	if(atividadeAtual == 115 && envASO == "false") msgErro += "<li>Para prosseguir você precisa informar que recebeu <strong>ASOs</strong>.</li>";
	if(atividadeAtual == 115 && envLista == "false") msgErro += "<li>Para prosseguir você precisa informar que recebeu <strong>Lista de Presença</strong>.</li>";
	if(atividadeAtual == 115 && envResult == "false") msgErro += "<li>Para prosseguir você precisa informar que recebeu <strong>Resultado de exames complementares</strong>.</li>";
	//if(atividadeAtual == 78 && envMalote == false) exibirMensagem("Para prosseguir você precisa informar que recebeu Malote.</b><br/>");
	if(atividadeAtual == 69 && credVinc == "false") msgErro += "<li>Para prosseguir você precisa informar que <strong>Vinculou o Credenciado ao Cliente</strong>.</li>";
	if(atividadeAtual == 69 && kitColab == "false") msgErro += "<li>Para prosseguir você precisa informar que gerou o <strong>Kit do Colaborador</strong>.</li>";
	if(atividadeAtual == 61 && fatRealizado == false) exibirMensagem("Para prosseguir você precisa informar que realizou o Faturamento.</b><br/>");
	//if(atividadeAtual == 69 && prepAtend == false) exibirMensagem("Para prosseguir você precisa informar que monitorou a Preparação do Atendimento.</b><br/>");
	if(atividadeAtual == 71 && realAtend == "") exibirMensagem("Para prosseguir você precisa informar que monitorou a Realização do Atendimento.</b><br/>");
	if(atividadeAtual == 15 && proximaAtividade == 31){
		if(campoVazio("zoomRespAtend")) msgErro += "<li>Responsável Atendimento</li>";
	}
	if(atividadeAtual == 71 && realAtend == "simInt"){
		if(campoVazio("descIntercorrencia")) msgErro += "<li>Descrever Intercorrência</li>";
	}

    var duplicidade = buscaDuplicidade(cliente,filial,contrato,mesRealizacao);
	if(duplicidade != "" && atividadeAtual == 0) msgErro += duplicidade;

	if(atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 27){
		jsonGlobal.procedimentos = [];
		if(mesRealizacao == "" || mesRealizacao == null) msgErro += "<li>Não foi informado <strong>Mês da Realização</strong>.</li>";
		if(contrato == "" || contrato == null) msgErro += "<li>Não foi informado <b>Tipo de Contrato</b>.</li>";
		if(cliente == "" || cliente == null) msgErro += "<li>Não foi informado <b>Empresa (Cliente)</b>.</li>";
		if(tabelaProcedimentos.length == 0){
			msgErro += "<li>Não foram informados <b>Procedimentos</b>.</li>";
		}else{
			let mesRealizacao = $("#mesRealizacao").val();
			mesRealizacao.split("-");
			mesRealizacao = mesRealizacao[1]+"/"+mesRealizacao[0];
			for(var i = 0; i < tabelaProcedimentos.length; i++){
				var linha = tabelaProcedimentos[i].id;
				linha = linha.split('___');
				linha = linha[1];
				var count = i == 0 ? 1 : i + 1;
				if(campoVazio("zoomProcedimento___" + linha)) msgErro += "<li>Informe o  <b>Procedimento</b> na linha " + linha +"</li>";
				if(campoVazio("qtdSolicitada___" + linha)) msgErro += "<li>Informe a  <b>Quantidade Solicitada</b> na linha " + linha +"</li>";
				if(campoVazio("precoClienteContrato___" + linha)) msgErro += "<li>Informe o  <b>Preço Cliente Contrato</b> na linha " + linha +"</li>";
				if((campoVazio("dataAtendDomiciliar___" + linha)) && (contrato == "domiciliar")) msgErro += "<li>Informe a  <b>Data (Atendimento Domiciliar)</b> na linha " + linha +"</li>";
				
				//Atualiza dados JSON
				let codProcedimento = $("[name^=codProcedimento___"+linha+"]").val();
				let descProcedimento = $("[name^=descProcedimento___"+linha+"]").val();
				let quantidade = $("[name^=qtdSolicitada___"+linha+"]").val();
				let preco = $("[name^=precoClienteContrato___"+linha+"]").val();
				let data = $("[name^=dataAtendDomiciliar___"+linha+"]").val();
				let objectsProcedimento = {
					MesRealizacao : mesRealizacao,
					Codigo : codProcedimento,
					Procedimento : descProcedimento,
					Quantidade : quantidade,
					Preco : preco,
					Data : data
				}
				jsonGlobal.procedimentos.push(objectsProcedimento);
				
			}
			
		}

		
	}

    // Validar a tabela Credenciados
	//var tabelaCredenciado = form.getChildrenIndexes('tabelaCredenciado');
	var tabelaCredenciado = $("input[name^=procedSelecionadoNew___]");

	var necessitaContratacao = $("#switchContrataCred").val();
	if(atividadeAtual == 31 && proximaAtividade == 33 && necessitaContratacao == false) msgErro += "<li><b>Necessário Contratar Credenciado: 'SIM'</b>.</li>";
	if(atividadeAtual == 31 && proximaAtividade == 39 && necessitaContratacao == false) msgErro += "<li><b>Necessário Contratar Credenciado: 'SIM'</b>.</li>";
	if((atividadeAtual == 31 && proximaAtividade == 37) || (atividadeAtual == 37 || atividadeAtual == 69)){
		if(tabelaCredenciado.length < 1){
			msgErro += "<li>Não foram informados <b>Dados de Agendamento</b>.</li>";
		}else{
			for(var i = 0; i < tabelaCredenciado.length; i++){ 
				var count = i == 0 ? 1 : i + 1;
				
				if(campoVazio("procedSelecionadoNew___" + count)) msgErro += "<li>Informe o  <b>Procedimento</b> na linha " + count +"</li>";
				if(campoVazio("tipoContratacaoNew___" + count)) msgErro += "<li>Informe o  <b>Tipo Contratação</b> na linha " + count +"</li>";
				if(campoVazio("cpfCnpjPrestadorNew___" + count)) msgErro += "<li>Informe o  <b>CPF / CNPJ Prestador</b> na linha " + count +"</li>";
				if(campoVazio("nomePrestadorNew___" + count)) msgErro += "<li>Informe o  <b>Nome Prestador</b> na linha " + count +"</li>";
				if(campoVazio("telCredenciado___" + count)) msgErro += "<li>Informe o  <b>Telefone Credenciado</b> na linha " + count +"</li>";
				if(campoVazio("emailCredenciado___" + count)) msgErro += "<li>Informe o  <b>E-mail Credenciado</b> na linha " + count +"</li>";
				if(campoVazio("nomeProfissional___" + count)) msgErro += "<li>Informe o  <b>Nome Profissional</b> na linha " + count +"</li>";
				if(campoVazio("regProfissional___" + count)) msgErro += "<li>Informe o  <b>Registro de Classe</b> na linha " + count +"</li>";
				if(campoVazio("telProfissional___" + count)) msgErro += "<li>Informe o  <b>Telefone Profissional</b> na linha " + count +"</li>";
				if(campoVazio("emailProfissional___" + count)) msgErro += "<li>Informe o  <b>E-mail do Profissional</b> na linha " + count +"</li>";
				if(campoVazio("dataAtendAgendada___" + count)) msgErro += "<li>Informe a  <b>Data Agendada</b> na linha " + count +"</li>";
				if(campoVazio("horaAtendEntrada___" + count)) msgErro += "<li>Informe a  <b>Hora de Entrada</b> na linha " + count +"</li>";
				if(campoVazio("inicioPausa___" + count)) msgErro += "<li>Informe a  <b>Hora de Pausa(Início)</b> na linha " + count +"</li>";
				if(campoVazio("fimPausa___" + count)) msgErro += "<li>Informe a  <b>Hora de Pausa(Fim)</b> na linha " + count +"</li>";
				if(campoVazio("horaAtendSaida___" + count)) msgErro += "<li>Informe a  <b>Hora de Saída</b> na linha " + count +"</li>";
				if(campoVazio("qtdPrevista___" + count)) msgErro += "<li>Informe a  <b>Quantidade Prevista</b> na linha " + count +"</li>";
				if(campoVazio("tipoNegociacao___" + count)) msgErro += "<li>Informe o  <b>Tipo de Negociação</b> na linha " + count +"</li>";
				if(campoVazio("valorAcordado___" + count)) msgErro += "<li>Informe o  <b>Valor Acordado</b> na linha " + count +"</li>";
				if(campoVazio("garantia___" + count)) msgErro += "<li>Informe a  <b>Garantia</b> na linha " + count +"</li>";
				if(campoVazio("deslocamento___" + count)) msgErro += "<li>Informe o  <b>Deslocamento</b> na linha " + count +"</li>";
			}
		}
	}

    if(atividadeAtual == 115){
		if(tabelaCredenciado.length > 0){
			for(var i = 0; i < tabelaCredenciado.length; i++){
				var count = i == 0 ? 1 : i + 1;
				if(campoVazio("qtdPrevista___" + count)) msgErro += "<li>Informe a <b>Quantidade Prevista</b> na linha " + count +"</li>";
				if(campoVazio("qtdMinima___" + count)) msgErro += "<li>Informe a <b>Quantidade Mínima</b> na linha " + count +"</li>";
				if(campoVazio("qtdTotalRealizada___" + count)) msgErro += "<li>Informe a <b>Quantidade Total Realizada</b> na linha " + count +"</li>";
				if(campoVazio("valorAusencia___" + count)) msgErro += "<li>Informe o <b>Valor das Ausências</b> na linha " + count +"</li>";
				if(campoVazio("taxa___" + count)) msgErro += "<li>Informe o <b>Valor da Taxa</b> na linha " + count +"</li>";
			}
		}
		let anexos = parent.ECM.attachmentTable.getData();
			if(anexos.length == 0){
				msgErro += "<li>Favor anexar a <b>Lista de Presença</b>.</li>";
			}
	}

    if(atividadeAtual == 78){
		if(tabelaCredenciado.length > 0){
			for(var i = 0; i < tabelaCredenciado.length; i++){
				var count = i == 0 ? 1 : i + 1;				
				if(campoVazio("NfRpaNew___" + count)) msgErro += "<li>Informe o  <b>Nº NF / RPA</b> na linha " + count +"</li>";
				if(campoVazio("dataEnvioMaloteNew___" + count)) msgErro += "<li>Informe a  <b>Data de Envio do Malote</b> na linha " + count +"</li>";
			}
		}
	}

    if(msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem("Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
	}else{		
			jsonGlobal.dados = [];
			let objectsDados = {
				EmpresaContratada : $("#codNomeEmpresa").val(),
				Convocacao : $("#convocacao").val(),
				TipoContrato : $("#tipoContrato").val(),
				Plataforma : $("#codPlataforma").val(),
				CodEmpresaCliente : $("#codBuscaEmpresa").val(),
				EmpresaCliente : $("#codNomeBuscaEmpresa").val(),
				CodRegional : $("#codBuscaRegional").val(),
				DescRegional : $("#codNomeBuscaRegional").val(),
				CodUnidade : $("#codBuscaUnidade").val(),
				DesUnidade : $("#codNomeBuscaUnidade").val(),
				Cep : $("#cep").val(),
				Logradouro : $("#logradouro").val(),
				Numero : $("#numEndereco").val(),
				Bairro : $("#bairro").val(),
				Cidade : $("#nomeCidade").val(),
				UF : $("#nomeUF").val(),
				ResponsavelCliente : $("#respCliente").val(),
				TelefoneCliente : $("#telRespImplementacao").val(),
				EmailCliente : $("#emailCliente").val(),
				Estacionamento : $("#possuiEstacionamento").val(),
				ValorEstacionamento : $("#valorEstacionamento").val(),
				FuncionamentoDe : $("#horaFuncionamentoDe").val(),
				FuncionamentoAte : $("#horaFuncionamentoAte").val(),
				ModeloContratacao : $("#modeloExame").val(),
				ValorContratacao : $("#valorExame").val(),
				PossuiNoShow : $("#possuiNoShow").val(),
				QtdNoShow : $("#qtdNoShow").val(),
				PossuiTaxa: $("#possuiTaxa").val(),
				QtdTotalAusencias: $("#qtdTotalAusencias").val(),
				MotivoCancelamento: $("#motivoCancelamento").val(),
				Solicitante: $("#loginSolicitante").val(),
				AtividadeAtual: $("#atividadeAtual").val(),
				Situacao: $("#situacao").val(),
				NumeroSolicitacao: $("#numeroFluxo").val(),
				MesRealizacao: $("#mesRealizacao").val(),
				ModeloContratacao: $("#modeloExame").val(),
				UnidadeFilial: $("#nomeFilial").val(),
				VidasAtivas: $("#vidasAtivas").val(),
				ResponsavelAtendimento: $("#zoomRespAtend").val(),
				DataInicioProcesso: $("#dataInicioProcesso").val(),
				DataFinalProcesso: $("#dataFinalProcesso").val()
			}
			jsonGlobal.dados.push(objectsDados);
			

			jsonGlobal.procedimentos = [];
			for(var j = 1; j <= tabelaProcedimentos.length; j++){				
				let objectsProcedimentos = {
					codProcedimento : $("#codProcedimento___"+j).val(),
					descProcedimento : $("#descProcedimento___"+j).val(),
					qtdSolicitada : $("#qtdSolicitada___"+j).val(),
					precoClienteContrato : $("#precoClienteContrato___"+j).val(),
					dataAtendDomiciliar : $("#dataAtendDomiciliar___"+j).val()
				}
				jsonGlobal.procedimentos.push(objectsProcedimentos);
			}				
    	

		
			jsonGlobal.credenciado = [];
			for(var i = 1; i <= tabelaCredenciados.length; i++){
				let objectCredenciado = {
					ProcedimentoSelecionado : $("#procedSelecionadoNew___"+i).val(),
					NfRpa: $("#NfRpaNew___"+i).val(),
					DataEnvioMalote: $("#dataEnvioMaloteNew___"+i).val(),
					tipoContratacao: $("#tipoContratacaoNew___"+i).val(),
					cpfCnpjPrestador: $("#cpfCnpjPrestadorNew___"+i).val(),
					nomePrestador: $("#nomePrestadorNew___"+i).val(),
					telCredenciado: $("#telCredenciado___"+i).val(),
					emailCredenciado: $("#emailCredenciado___"+i).val(),
					nomeProfissional: $("#nomeProfissional___"+i).val(),
					regProfissional: $("#regProfissional___"+i).val(),
					telProfissional: $("#telProfissional___"+i).val(),
					emailProfissional: $("#emailProfissional___"+i).val(),
					dataAtendAgendada: $("#dataAtendAgendada___"+i).val(),
					inicioPausa: $("#inicioPausa___"+i).val(),
					fimPausa: $("#fimPausa___"+i).val(),
					horaAtendEntrada: $("#horaAtendEntrada___"+i).val(),
					horaAtendSaida: $("#horaAtendSaida___"+i).val(),
					perAlocado: $("#perAlocado___"+i).val(),
					perPausa: $("#perPausa___"+i).val(),
					obsAtendimento: $("#obsAtendimento___"+i).val(),
					tipoNegociacao: $("#tipoNegociacao___"+i).val(),
					valorAcordado: $("#valorAcordado___"+i).val(),
					garantia: $("#garantia___"+i).val(),
					deslocamento: $("#deslocamento___"+i).val(),
					qtdPrevista: $("#qtdPrevista___"+i).val(),
					qtdMinima: $("#qtdMinima___"+i).val(),
					qtdTotalRealizada: $("#qtdTotalRealizada___"+i).val(),
					qtdAusencia: $("#qtdAusencia___"+i).val(),
					valorAusencia: $("#valorAusencia___"+i).val(),
					taxa: $("#taxa___"+i).val(),
					valorTotalAusencia: $("#valorTotalAusencia___"+i).val(),
					valorTotalProcedimento: $("#valorTotalProcedimento___"+i).val()
				}
				jsonGlobal.credenciado.push(objectCredenciado);
			}
		historicoSolicitacao.val(JSON.stringify(jsonGlobal));
	}
}

function exibirMensagem(mensagem){	
	throw	"<div class='alert alert-warning' role='alert'>" +
					"<strong>Atenção:</strong> "+mensagem+
				"<br>"+
			  	"</div>"+
			  	"<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";		
	
}

function campoVazio(fieldname){
	if(($("#"+fieldname).val() == null) || ($("#"+fieldname).val() == undefined) || ($("#"+fieldname).val() == "")) return true;
	else return false;
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}

function buscaDuplicidade(cliente, filial, contrato, mesRealizacao){
	if((cliente != "" || cliente != null) && (filial != "" || filial != null) && (contrato != "" || contrato != null) && (mesRealizacao != "" || mesRealizacao != null)){
		//var indexesProcedimento = form.getChildrenIndexes('tabelaProcedimentos');
        var indexesProcedimento = $("input[name^=zoomProcedimento___]").length;
		var c1 = DatasetFactory.createConstraint("respCliente",cliente,cliente,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("tipoContrato",contrato,contrato,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("mesRealizacao",mesRealizacao,mesRealizacao,ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("filial",filial,filial,ConstraintType.MUST);
		var customConstraints = new Array(c1, c2, c3, c4);
		var arrayFormularioProcedimentos = [];
		var rowsProcedimento = indexesProcedimento.length;
		for(var i = 0; i < indexesProcedimento.length; i++){
			arrayFormularioProcedimentos.push({
				//'procedimento' : form.getValue("zoomProcedimento___" + indexesProcedimento[i]),
                'procedimento' : $("#zoomProcedimento___" + indexesProcedimento[i]).val(),
				//'quantidade' : form.getValue("qtdSolicitada___" + indexesProcedimento[i])
                'quantidade' : $("#qtdSolicitada___" + indexesProcedimento[i]).val()
			});
		}
		var customDataset = DatasetFactory.getDataset("dsGetTabela", null, customConstraints, null);
		var arrayTabelaProcedimentos = [];		
		var msgErro = "";
		var numFormulario = "";
		//for(var j = 0; j < customDataset.rowsCount; j++){
        for(var j = 0; j < customDataset.length; j++){
			//numFormulario = customDataset.getValue(j, "NumFormulario");
            numFormulario = customDataset.values[j].NumFormulario;
			arrayTabelaProcedimentos.push({
				//'procedimento' : customDataset.getValue(j, "Procedimento"),
                'procedimento' : customDataset.values[j].Procedimento,
				//'quantidade' : customDataset.getValue(j, "Quantidade")
                'quantidade' : customDataset.values[j].Quantidade
			});
			var rowsTabelaFor = arrayTabelaProcedimentos.length;
			if(rowsTabelaFor == rowsProcedimento){
				var compareInformacoes = compareArrays(arrayFormularioProcedimentos, arrayTabelaProcedimentos);
				if(compareInformacoes == true){						
					var c1_3 = DatasetFactory.createConstraint("cardDocumentId",numFormulario,numFormulario,ConstraintType.MUST);
					var customConstraintsId = new Array(c1_3);
					var datasetWorkflow = DatasetFactory.getDataset("workflowProcess", null, customConstraintsId, null);
					var nrFormulario = datasetWorkflow.values[0]["workflowProcessPK.processInstanceId"];
					msgErro += "<li>Já existe uma solicitação em aberto com essas informações: <a href='https://rhmedconsultores114678.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+nrFormulario+"' target='_blank'>"+nrFormulario+"</a></li>";
					arrayTabelaProcedimentos= [];
				}else{
					arrayTabelaProcedimentos= [];
				}

			}
		}
		return msgErro;
	}		
}

function compareArrays(arr1, arr2){
    if(JSONUtil.toJSON(arr1) == JSONUtil.toJSON(arr2)) return true;
	else return false;
}

function historicoSolicitacao(){
	var itens = new Array();
    var inputHistorico = $("#historicoSolicitacao");

    var nrSolicitacao;
	
}