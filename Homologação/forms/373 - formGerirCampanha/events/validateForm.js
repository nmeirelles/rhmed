function validateForm(form){
	var plataforma = form.getValue("zoomPlataforma");
	var atividadeAtual = Number(getValue("WKNumState"));
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";
	var envASO = form.getValue("switchConfirmASO");
	var envLista = form.getValue("switchConfirmLista");
	var envResult = form.getValue("switchConfirmResult");
	var envMalote = form.getValue("switchConfirmMalote");
	var contrato = form.getValue("tipoContrato");
	var cliente = form.getValue("nomeEmpresa");

	var filial = "";
	if(plataforma == "SOC NET") filial = form.getValue("codNomeBuscaUnidade");
	else filial = form.getValue("nomeFilial");

	var mesRealizacao = form.getValue("mesRealizacao");
	var credVinc = form.getValue("switchCredVinc");
	var kitColab = form.getValue("switchKitColab");
	var prepAtend = form.getValue("switchPrepAtend");
	var realAtend = form.getValue("confAtendRealizado");
	var fatRealizado = form.getValue("switchConfirmFaturamento");
	var tabelaProcedimentos = form.getChildrenIndexes('tabelaProcedimentos');
		
	if((atividadeAtual == 0) && (contrato == "semContrato")) exibirMensagem(form, "Para prosseguir com a solicitação é necessário possuir Contrato In Company, ordem de Serviço ou Proposta Comercial.</b><br/>");
	if((atividadeAtual == 4) && (contrato == "semContrato")) exibirMensagem(form, "Para prosseguir com a solicitação é necessário possuir Contrato In Company, ordem de Serviço ou Proposta Comercial.</b><br/>");
	if(atividadeAtual == 73 && envASO == false) exibirMensagem(form, "Para prosseguir você precisa informar que recebeu ASOs.</b><br/>");
	if(atividadeAtual == 73 && envLista == false) exibirMensagem(form, "Para prosseguir você precisa informar que recebeu Lista de Presença.</b><br/>");
	if(atividadeAtual == 73 && envResult == false) exibirMensagem(form, "Para prosseguir você precisa informar que recebeu Resultado de exames complementares.</b><br/>");
	if(atividadeAtual == 78 && envMalote == false) exibirMensagem(form, "Para prosseguir você precisa informar que recebeu Malote.</b><br/>");
	if(atividadeAtual == 48 && credVinc == false) exibirMensagem(form, "Para prosseguir você precisa informar que Vinculou o Credenciado ao Cliente.</b><br/>");
	if(atividadeAtual == 50 && kitColab == false) exibirMensagem(form, "Para prosseguir você precisa informar que gerou o Kit do Colaborador.</b><br/>");
	if(atividadeAtual == 61 && fatRealizado == false) exibirMensagem(form, "Para prosseguir você precisa informar que realizou o Faturamento.</b><br/>");
	if(atividadeAtual == 69 && prepAtend == false) exibirMensagem(form, "Para prosseguir você precisa informar que monitorou a Preparação do Atendimento.</b><br/>");
	if(atividadeAtual == 71 && realAtend == "") exibirMensagem(form, "Para prosseguir você precisa informar que monitorou a Realização do Atendimento.</b><br/>");
	if(atividadeAtual == 15 && proximaAtividade == 31){
		if(campoVazio(form, "zoomRespAtend")) msgErro += "<li>Responsável Atendimento</li>";
	}
	if(atividadeAtual == 71 && realAtend == "simInt"){
		if(campoVazio(form, "descIntercorrencia")) msgErro += "<li>Descrever Intercorrência</li>";
	}

	var duplicidade = buscaDuplicidade(form,cliente,filial,contrato,mesRealizacao);
	if(duplicidade != "" && atividadeAtual == 0) msgErro += duplicidade;

	if(atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 27){
		if(mesRealizacao == "" || mesRealizacao == null) msgErro += "<li>Não foi informado <b>Mês da Realização</b>.</li>";
		if(contrato == "" || contrato == null) msgErro += "<li>Não foi informado <b>Tipo de Contrato</b>.</li>";
		if(cliente == "" || cliente == null) msgErro += "<li>Não foi informado <b>Empresa (Cliente)</b>.</li>";
		if(tabelaProcedimentos.length < 1){
			msgErro += "<li>Não foram informados <b>Procedimentos</b>.</li>";
		}else{
			for(var i = 0; i < tabelaProcedimentos.length; i++){
				var count = i == 0 ? 1 : i + 1;
				if(campoVazio(form, "zoomProcedimento___" + tabelaProcedimentos[i])) msgErro += "<li>Informe o  <b>Procedimento</b> na linha " + count +"</li>";
				if(campoVazio(form, "qtdSolicitada___" + tabelaProcedimentos[i])) msgErro += "<li>Informe a  <b>Quantidade Solicitada</b> na linha " + count +"</li>";
				if(campoVazio(form, "precoClienteContrato___" + tabelaProcedimentos[i])) msgErro += "<li>Informe o  <b>Preço Cliente Contrato</b> na linha " + count +"</li>";
				if((campoVazio(form, "dataAtendDomiciliar___" + tabelaProcedimentos[i])) && (contrato == "domiciliar")) msgErro += "<li>Informe a  <b>Data (Atendimento Domiciliar)</b> na linha " + count +"</li>";
			}
		}
	}

	// Validar a tabela Credenciados
	var tabelaCredenciado = form.getChildrenIndexes('tabelaCredenciado');
	var tabelaReagendamento = form.getChildrenIndexes('tabelaReagendamento');

	var necessitaContratacao = form.getValue("switchContrataCred");
	if(atividadeAtual == 31 && proximaAtividade == 33 && necessitaContratacao == false) msgErro += "<li><b>Necessário Contratar Credenciado: 'SIM'</b>.</li>";
	if(atividadeAtual == 31 && proximaAtividade == 39 && necessitaContratacao == false) msgErro += "<li><b>Necessário Contratar Credenciado: 'SIM'</b>.</li>";
	if((atividadeAtual == 31 && proximaAtividade == 35) || (atividadeAtual == 35 || atividadeAtual == 48 || atividadeAtual == 50 || atividadeAtual == 69 || atividadeAtual == 71)){
		if(tabelaCredenciado.length < 1){
			msgErro += "<li>Não foram informados <b>Dados de Agendamento</b>.</li>";
		}else{
			for(var i = 0; i < tabelaCredenciado.length; i++){ 
				var count = i == 0 ? 1 : i + 1;
				if(campoVazio(form, "procedSelecionado___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Procedimento</b> na linha " + count +"</li>";
				if(campoVazio(form, "tipoContratacao___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Tipo Contratação</b> na linha " + count +"</li>";
				if(campoVazio(form, "cpfCnpjPrestador___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>CPF / CNPJ Prestador</b> na linha " + count +"</li>";
				if(campoVazio(form, "nomePrestador___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Nome Prestador</b> na linha " + count +"</li>";
				if(campoVazio(form, "telCredenciado___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Telefone Credenciado</b> na linha " + count +"</li>";
				if(campoVazio(form, "emailCredenciado___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>E-mail Credenciado</b> na linha " + count +"</li>";
				if(campoVazio(form, "nomeProfissional___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Nome Profissional</b> na linha " + count +"</li>";
				if(campoVazio(form, "regProfissional___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Registro de Classe</b> na linha " + count +"</li>";
				if(campoVazio(form, "telProfissional___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Telefone Profissional</b> na linha " + count +"</li>";
				if(campoVazio(form, "emailProfissional___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>E-mail do Profissional</b> na linha " + count +"</li>";
				if(campoVazio(form, "dataAtendAgendada___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Data Agendada</b> na linha " + count +"</li>";
				if(campoVazio(form, "horaAtendEntrada___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Hora de Entrada</b> na linha " + count +"</li>";
				if(campoVazio(form, "inicioPausa___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Hora de Pausa(Início)</b> na linha " + count +"</li>";
				if(campoVazio(form, "fimPausa___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Hora de Pausa(Fim)</b> na linha " + count +"</li>";
				if(campoVazio(form, "horaAtendSaida___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Hora de Saída</b> na linha " + count +"</li>";
				if(campoVazio(form, "qtdPrevista___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Quantidade Prevista</b> na linha " + count +"</li>";
				if(campoVazio(form, "tipoNegociacao___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Tipo de Negociação</b> na linha " + count +"</li>";
				if(campoVazio(form, "valorAcordado___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Valor Acordado</b> na linha " + count +"</li>";
				if(campoVazio(form, "garantia___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Garantia</b> na linha " + count +"</li>";
				if(campoVazio(form, "deslocamento___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Deslocamento</b> na linha " + count +"</li>";
			}
		}
	}
	
	if(atividadeAtual == 54){
		if(tabelaCredenciado.length > 0){
			for(var i = 0; i < tabelaCredenciado.length; i++){
				var tmp = form.getValue("inputProcedimentoReagendado___" + tabelaCredenciado[i]);
				if(tmp != null && tmp != undefined && tmp != ""){
					var procedimentoReagendado = tmp.split("-")[0];
					if(procedimentoReagendado == "nao"){
						if(campoVazio(form, "qtdPrevista___" + tabelaCredenciado[i])) msgErro += "<li>Informe a <b>Quantidade Prevista</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "qtdMinima___" + tabelaCredenciado[i])) msgErro += "<li>Informe a <b>Quantidade Mínima</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "qtdTotalRealizada___" + tabelaCredenciado[i])) msgErro += "<li>Informe a <b>Quantidade Total Realizada</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "valorAusencia___" + tabelaCredenciado[i])) msgErro += "<li>Informe o <b>Valor das Ausências</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "taxa___" + tabelaCredenciado[i])) msgErro += "<li>Informe o <b>Valor da Taxa</b> na linha " + (i+1) +"</li>";
					}
				}
			}
		}
		if(tabelaReagendamento.length > 0){
			for(var i = 0; i < tabelaReagendamento.length; i++){
				var tmp = form.getValue("inputProcedimentoReagendadoR___" + tabelaReagendamento[i]);
				if(tmp != null && tmp != undefined && tmp != ""){
					var procedimentoReagendadoR = tmp.split("-")[0];
					if(procedimentoReagendadoR == "nao"){
						if(campoVazio(form, "qtdPrevistaR___" + tabelaReagendamento[i])) msgErro += "<li>Informe a <b>Quantidade Prevista</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "qtdMinimaR___" + tabelaReagendamento[i])) msgErro += "<li>Informe a <b>Quantidade Mínima</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "qtdTotalRealizadaR___" + tabelaReagendamento[i])) msgErro += "<li>Informe a <b>Quantidade Total Realizada</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "valorAusenciaR___" + tabelaReagendamento[i])) msgErro += "<li>Informe o <b>Valor das Ausências</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "taxaR___" + tabelaReagendamento[i])) msgErro += "<li>Informe o <b>Valor da Taxa</b> na linha " + (i+1) +"</li>";
					}
				}
			}
		}
	}
	
	if(atividadeAtual == 78){
		if(tabelaCredenciado.length > 0){
			for(var i = 0; i < tabelaCredenciado.length; i++){
				var tmp = form.getValue("inputProcedimentoReagendado___" + tabelaCredenciado[i]);
				if(tmp != null && tmp != undefined && tmp != ""){
					var procedimentoReagendado = tmp.split("-")[0];
					if(procedimentoReagendado == "nao"){
						if(campoVazio(form, "NfRpa___" + tabelaCredenciado[i])) msgErro += "<li>Informe o  <b>Nº NF / RPA</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "dataEnvioMalote___" + tabelaCredenciado[i])) msgErro += "<li>Informe a  <b>Data de Envio do Malote</b> na linha " + (i+1) +"</li>";
					}
				}
			}
		}
		if(tabelaReagendamento.length > 0){
			for(var i = 0; i < tabelaReagendamento.length; i++){
				var tmp = form.getValue("inputProcedimentoReagendadoR___" + tabelaReagendamento[i]);
				if(tmp != null && tmp != undefined && tmp != ""){
					var procedimentoReagendadoR = tmp.split("-")[0];
					if(procedimentoReagendadoR == "nao"){
						if(campoVazio(form, "NfRpaR___" + tabelaReagendamento[i])) msgErro += "<li>Informe o  <b>Nº NF / RPA</b> na linha " + (i+1) +"</li>";
						if(campoVazio(form, "dataEnvioMaloteR___" + tabelaReagendamento[i])) msgErro += "<li>Informe a  <b>Data de Envio do Malote</b> na linha " + (i+1) +"</li>";
					}
				}
			}
		}
	}
	
	if(msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
	} 
} 

function campoVazio(form, fieldname){
	if((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")) return true;
	else return false;
}

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	if(mobile){
		throw mensagem;
	}else{
		throw	"<div class='alert alert-warning' role='alert'>" +
					"<strong>Atenção:</strong> "+mensagem+
			  	"</div>"+
			  	"<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";		
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}

function buscaDuplicidade(form, cliente, filial, contrato, mesRealizacao){
	if((cliente != "" || cliente != null) && (filial != "" || filial != null) && (contrato != "" || contrato != null) && (mesRealizacao != "" || mesRealizacao != null)){
		var indexesProcedimento = form.getChildrenIndexes('tabelaProcedimentos');	
		var c1 = DatasetFactory.createConstraint("respCliente",cliente,cliente,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("tipoContrato",contrato,contrato,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("mesRealizacao",mesRealizacao,mesRealizacao,ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("filial",filial,filial,ConstraintType.MUST);
		var customConstraints = new Array(c1, c2, c3, c4);
		var arrayFormularioProcedimentos = [];
		var rowsProcedimento = indexesProcedimento.length;
		for(var i = 0; i < indexesProcedimento.length; i++){
			arrayFormularioProcedimentos.push({
				'procedimento' : form.getValue("zoomProcedimento___" + indexesProcedimento[i]),
				'quantidade' : form.getValue("qtdSolicitada___" + indexesProcedimento[i])
			});
		}
		var customDataset = DatasetFactory.getDataset("dsGetTabela", null, customConstraints, null);
		var arrayTabelaProcedimentos = [];		
		var msgErro = "";
		var numFormulario = "";
		for(var j = 0; j < customDataset.rowsCount; j++){
			numFormulario = customDataset.getValue(j, "NumFormulario");
			arrayTabelaProcedimentos.push({
				'procedimento' : customDataset.getValue(j, "Procedimento"),
				'quantidade' : customDataset.getValue(j, "Quantidade")
			});
			var rowsTabelaFor = arrayTabelaProcedimentos.length;
			if(rowsTabelaFor == rowsProcedimento){
				var compareInformacoes = compareArrays(arrayFormularioProcedimentos, arrayTabelaProcedimentos);
				if(compareInformacoes == true){						
					var c1_3 = DatasetFactory.createConstraint("cardDocumentId",numFormulario,numFormulario,ConstraintType.MUST);
					var customConstraintsId = new Array(c1_3);
					var datasetWorkflow = DatasetFactory.getDataset("workflowProcess", null, customConstraintsId, null);
					var nrFormulario = datasetWorkflow.getValue(0, "workflowProcessPK.processInstanceId");
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