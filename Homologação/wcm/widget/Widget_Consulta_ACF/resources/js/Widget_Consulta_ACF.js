var MyWidgetACF = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoACF = $("#inputNumeroFluxoACF");
        let inputValorTotalACF = $("#inputValorTotalACF");
        let selectQualidadeAtendimentoACF = $("#selectQualidadeAtendimentoACF");
        let selectReajusteACF = $("#selectReajusteACF");
        let inputImpactoAnualReajusteACF = $("#inputImpactoAnualReajusteACF");
        let inputPercentualImpactoAnualACF = $("#inputPercentualImpactoAnualACF");
        let selectStatusACF = $("#selectStatusACF");
        let inputNomeFilialACF = $("#inputNomeFilialACF");
        let inputNomeFornecedorACF = $("#inputNomeFornecedorACF");
        let inputCNPJFornecedorACF = $("#inputCNPJFornecedorACF");
        let inputCidadeACF = $("#inputCidadeACF");
        let selectEstadoACF = $("#selectEstadoACF");
        let inputDataEntradaACF = $("#inputDataEntradaACF");
        let inputMesEntradaACF = $("#inputMesEntradaACF");
        let inputAnoEntradaACF = $("#inputAnoEntradaACF");
        let inputDataInicialAcordoACF = $("#inputDataInicialAcordoACF");
        let inputDataFinalAcordoACF = $("#inputDataFinalAcordoACF");
        let selectTipoRequisicaoACF = $("#selectTipoRequisicaoACF");
        let selectTipoPagamentoACF = $("#selectTipoPagamentoACF");
        let inputNomeSolicitanteACF = $("#inputNomeSolicitanteACF");
        let inputMatriculaSolicitanteACF = $("#inputMatriculaSolicitanteACF");
        let selectAtividadeACF = $("#selectAtividadeACF");
        let inputCentroCustoACF = $("#inputCentroCustoACF");
        let inputNomeSupervisorACF = $("#inputNomeSupervisorACF");
        let inputMatriculaSupervisorACF = $("#inputMatriculaSupervisorACF");
        let inputNomeCoordenadorACF = $("#inputNomeCoordenadorACF");
        let inputMatriculaCoordenadorACF = $("#inputMatriculaCoordenadorACF");
        let inputNomeGerenteACF = $("#inputNomeGerenteACF");
        let inputMatriculaGerenteACF = $("#inputMatriculaGerenteACF");
        let inputNomeDiretorACF = $("#inputNomeDiretorACF");
        let inputMatriculaDiretorACF = $("#inputMatriculaDiretorACF");
        let btnConsultarACF = $("#btnConsultarACF");
        let btnExportarACF = $("#btnExportarACF");
        let tableACF = $("#tableACF");
        let dadosACF = [];

        $('#inputImpactoAnualReajusteACF').maskMoney({
            thousands: '.',
            decimal: ','
        });
        $('#inputValorTotalACF').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const filialACF = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroFiliaisACF');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputNomeFilialACF",{
            source: filialACF(),
            displayKey: 'Filial',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Filial', 'size':'col-sm-12', 'dataorder':'Filial', 'standard':true}
                ],
                renderContent: ['Filial']
            }
        });

        const centroCustoACF = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoACF",{
            source: centroCustoACF(),
            displayKey: 'ccusto',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Centro Custo', 'size':'col-sm-12', 'dataorder':'ccusto', 'standard':true}
                ],
                renderContent: ['ccusto']
            }
        });

        btnExportarACF.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaACF');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaACF', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaACF', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteACF",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: true,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {'title':'Nome', 'size':'col-sm-6', 'dataorder':'colleagueName', 'standard':true},
                        {'title':'Matrícula', 'size':'col-sm-6', 'dataorder':'login'}
                    ],
                    renderContent: ['colleagueName','login']
                }
            });
            FLUIGC.filter("#inputNomeSupervisorACF",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: true,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {'title':'Nome', 'size':'col-sm-6', 'dataorder':'colleagueName', 'standard':true},
                        {'title':'Matrícula', 'size':'col-sm-6', 'dataorder':'login'}
                    ],
                    renderContent: ['colleagueName','login']
                }
            });
            FLUIGC.filter("#inputNomeCoordenadorACF",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: true,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {'title':'Nome', 'size':'col-sm-6', 'dataorder':'colleagueName', 'standard':true},
                        {'title':'Matrícula', 'size':'col-sm-6', 'dataorder':'login'}
                    ],
                    renderContent: ['colleagueName','login']
                }
            });
            FLUIGC.filter("#inputNomeGerenteACF",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: true,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {'title':'Nome', 'size':'col-sm-6', 'dataorder':'colleagueName', 'standard':true},
                        {'title':'Matrícula', 'size':'col-sm-6', 'dataorder':'login'}
                    ],
                    renderContent: ['colleagueName','login']
                }
            });
            FLUIGC.filter("#inputNomeDiretorACF",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: true,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {'title':'Nome', 'size':'col-sm-6', 'dataorder':'colleagueName', 'standard':true},
                        {'title':'Matrícula', 'size':'col-sm-6', 'dataorder':'login'}
                    ],
                    renderContent: ['colleagueName','login']
                }
            });
            inputNomeSolicitanteACF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteACF.val(matricula);
                }
            });
            inputNomeSupervisorACF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorACF.val(matricula);
                }
            });
            inputNomeCoordenadorACF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorACF.val(matricula);
                }
            });
            inputNomeGerenteACF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteACF.val(matricula);
                }
            });
            inputNomeDiretorACF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorACF.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorACF]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorACF").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorACF").show();
                $("#divCoordenadorACF").show();
                $("#divGerenteACF").show();
                $("#divDiretorACF").show();
            }
            if(filtrar == false){
                $("#divSupervisorACF").hide();
                $("#divCoordenadorACF").hide();
                $("#divGerenteACF").hide();
                $("#divDiretorACF").hide();
            }
        });

        const convertDateTimeACF = (data) => {
            if(data != "" && data != null){
                try {
                    var dataTratada = data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0];
                    var horaTratada = data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].replace(".0","");
                    return dataTratada + " " + horaTratada;
                } catch (error) {
                    return convertDate2(data);
                }
            }else{
                return data;
            }
        }

        const convertDateACF = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";
        
        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsACF = () => {
            const constraintsACF = [];
            if(inputNumeroFluxoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoACF.val(), inputNumeroFluxoACF.val(), ConstraintType.MUST));
                return constraintsACF;
            }
            if(inputValorTotalACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalACF.val(), inputValorTotalACF.val(), ConstraintType.MUST));
            }
            if(selectStatusACF.val() != ""){
                if(selectStatusACF.val() == "aberto"){
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Encaminhado para Suprimentos", "Encaminhado para Suprimentos", ConstraintType.SHOULD));
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Solicitação Reprovada", "Solicitação Reprovada", ConstraintType.SHOULD));
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Encaminhado para Diretoria Financeira", "Encaminhado para Diretoria Financeira", ConstraintType.SHOULD));
                }
                if(selectStatusACF.val() == "cancelado"){
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.SHOULD));
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Cancelada", "Cancelada", ConstraintType.SHOULD));
                }
                if(selectStatusACF.val() == "finalizado"){
                    constraintsACF.push(DatasetFactory.createConstraint("Status", "Solicitação Finalizada", "Solicitação Finalizada", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialACF.val(), inputNomeFilialACF.val(), ConstraintType.MUST));
            }
            if(inputNomeFornecedorACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorACF.val(), inputNomeFornecedorACF.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorACF.val(), inputCNPJFornecedorACF.val(), ConstraintType.MUST));
            }
            if(inputCidadeACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputCidade", inputCidadeACF.val(), inputCidadeACF.val(), ConstraintType.MUST, true));
            }
            if(selectEstadoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputUF", selectEstadoACF.val(), selectEstadoACF.val(), ConstraintType.MUST));
            }
            if(inputDataInicialAcordoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputDataInicialAcordo", inputDataInicialAcordoACF.val(), inputDataInicialAcordoACF.val(), ConstraintType.MUST));
            }
            if(inputDataFinalAcordoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputDataFinalAcordo", inputDataFinalAcordoACF.val(), inputDataFinalAcordoACF.val(), ConstraintType.MUST));
            }
            if(selectTipoPagamentoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoACF.val(), selectTipoPagamentoACF.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteACF.val(), inputMatriculaSolicitanteACF.val(), ConstraintType.MUST));
            }
            if(selectAtividadeACF.val() != ""){
                if(selectAtividadeACF.val() == "supervisor") constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeACF.val() == "coordenador"){
                    constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "17", "17", ConstraintType.SHOULD));
                    constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.SHOULD));
                }
                if(selectAtividadeACF.val() == "correcao") constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "86", "86", ConstraintType.MUST));
                if(selectAtividadeACF.val() == "gerente") constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "21", "21", ConstraintType.MUST));
                if(selectAtividadeACF.val() == "diretor") constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "23", "23", ConstraintType.MUST));
                if(selectAtividadeACF.val() == "suprimentos") {
                    constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "35", "35", ConstraintType.SHOULD));
                    constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "110", "110", ConstraintType.SHOULD));
                }
                if(selectAtividadeACF.val() == "diretoriaFinanceira") constraintsACF.push(DatasetFactory.createConstraint("atividadeAtual", "119", "119", ConstraintType.MUST));
            }
            if(inputCentroCustoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoACF.val(), inputCentroCustoACF.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("dataEntrada", convertDateACF(inputDataEntradaACF.val()), convertDateACF(inputDataEntradaACF.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaACF.val(), inputMesEntradaACF.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaACF.val(), inputAnoEntradaACF.val(), ConstraintType.MUST));
            }
            if(selectQualidadeAtendimentoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("selectQuestionario3", selectQualidadeAtendimentoACF.val(), selectQualidadeAtendimentoACF.val(), ConstraintType.MUST));
            }
            if(selectReajusteACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("selectReajuste", selectReajusteACF.val(), selectReajusteACF.val(), ConstraintType.MUST));
            }
            if(inputImpactoAnualReajusteACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputImpactoAnualReajuste", inputImpactoAnualReajusteACF.val(), inputImpactoAnualReajusteACF.val(), ConstraintType.MUST));
            }
            if(inputPercentualImpactoAnualACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("inputPorcentagemImpactoAnual", inputPercentualImpactoAnualACF.val(), inputPercentualImpactoAnualACF.val(), ConstraintType.MUST, true));
            }
            if(selectTipoRequisicaoACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("tipoRequisicao", selectTipoRequisicaoACF.val(), selectTipoRequisicaoACF.val(), ConstraintType.MUST, true));
            }
            if(inputMatriculaSupervisorACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorACF.val(), inputMatriculaSupervisorACF.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorACF.val(), inputMatriculaCoordenadorACF.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteACF.val(), inputMatriculaGerenteACF.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorACF.val() != ""){
                constraintsACF.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorACF.val(), inputMatriculaDiretorACF.val(), ConstraintType.MUST));
            }
            return constraintsACF;
        }

        const createTableACF = (dadosTableACF) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableACF);
            const url_atual = window.location.href.toString();
            console.log("url_atual: "+url_atual);
            let url = "";
            if(url_atual.match("rhmedconsultores114678")){
                url = "https://rhmedconsultores114678.fluig.cloudtotvs.com.br"; // Homologação
            }
            if(url_atual.match("rhmedconsultores114677")){
                url = "https://rhmedconsultores114677.fluig.cloudtotvs.com.br"; // Produção
            }
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableACF > tbody > tr').remove();
                let tr = "";
                for(let i = pagina * tamanhoPagina; i < dadosTableACF.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="'+url+'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableACF[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableACF[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableACF[i]["status"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["filial"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["cpfCNPJFornecedor"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["cidadeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["ufFornecedor"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["dataInicialAcordo"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["dataFinalAcordo"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["spendTotal"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["tipoRequisicao"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["tipoPagamento"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["qualidadeAtendimento"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["reajusteConcedido"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["impactoAnualValor"] +'</td>'+
                                '<td>'+ dadosTableACF[i]["impactoAnualPercentual"] +'</td>'+
                            "</tr>";
                }
                tableACF.append(tr);
                $('#numeracaoACF').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableACF.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoACF').prop('disabled', dadosTableACF.length <= tamanhoPagina || pagina > dadosTableACF.length / tamanhoPagina - 1);
                $('#anteriorACF').prop('disabled', dadosTableACF.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoACF').click(()=>{
                if(pagina < dadosTableACF.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorACF').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVACF = (dadosCSVACF) => {
            let csvACF = "\uFEFF";
        
            csvACF += "Código Fluig;";
            csvACF += "Status;";
            csvACF += "Filial;";
            csvACF += "Nome Fornecedor;";
            csvACF += "CPF/CNPJ Fornecedor;";
            csvACF += "Cidade Fornecedor;";
            csvACF += "UF Fornecedor;";
            csvACF += "Data Entrada;";
            csvACF += "Data Inicial Acordo;";
            csvACF += "Data Final Acordo;";
            csvACF += "Spend Total Contrato;";
            csvACF += "Tipo Requisição;";
            csvACF += "Tipo Pagamento;";
            csvACF += "Requisitante;";
            csvACF += "Localização;";
            csvACF += "Centro de Custo;";
            csvACF += "Qualidade Atendimento;";
            csvACF += "Reajuste Concedido;";
            csvACF += "Impacto Anual $;";
            csvACF += "Impacto Anual %;";
        
            csvACF += "\n";
        
            for(let int = 0; int < dadosCSVACF.length; int++){
                csvACF += dadosCSVACF[int]["codigoFluig"].toString() + ";";
                csvACF += dadosCSVACF[int]["status"].toString() + ";";
                csvACF += dadosCSVACF[int]["filial"].toString() + ";";
                csvACF += dadosCSVACF[int]["nomeFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["cpfCNPJFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["cidadeFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["ufFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataEntrada"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataInicialAcordo"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataFinalAcordo"].toString() + ";";
                csvACF += dadosCSVACF[int]["spendTotal"].toString() + ";";
                csvACF += dadosCSVACF[int]["tipoRequisicao"].toString() + ";";
                csvACF += dadosCSVACF[int]["tipoPagamento"].toString() + ";";
                csvACF += dadosCSVACF[int]["requisitante"].toString() + ";";
                csvACF += dadosCSVACF[int]["localizacao"].toString() + ";";
                csvACF += dadosCSVACF[int]["centroCusto"].toString() + ";";
                csvACF += dadosCSVACF[int]["qualidadeAtendimento"].toString() + ";";
                csvACF += dadosCSVACF[int]["reajusteConcedido"].toString() + ";";
                csvACF += dadosCSVACF[int]["impactoAnualValor"].toString() + ";";
                csvACF += dadosCSVACF[int]["impactoAnualPercentual"].toString() + ";";
                csvACF += "\n";
            }
            console.log(csvACF);
            let downloadLinkACF = document.createElement("a");
            downloadLinkACF.download = "ACF.csv";
            downloadLinkACF.href = window.URL.createObjectURL(new Blob([csvACF], {type: "text/csv"}));
            downloadLinkACF.style.display = "none";
            document.body.appendChild(downloadLinkACF);
            downloadLinkACF.click();
        };

        const gerarCSVAvancadoACF = (dadosCSVACF) => {
            let csvACF = "\uFEFF";
        
            csvACF += "Código Fluig;";
            csvACF += "Status;";
            csvACF += "Filial;";
            csvACF += "Nome Fornecedor;";
            csvACF += "CPF/CNPJ Fornecedor;";
            csvACF += "Cidade Fornecedor;";
            csvACF += "UF Fornecedor;";
            csvACF += "Data Entrada;";
            csvACF += "Data Inicial Acordo;";
            csvACF += "Data Final Acordo;";
            csvACF += "Spend Total Contrato;";
            csvACF += "Tipo Requisição;";
            csvACF += "Tipo Pagamento;";
            csvACF += "Requisitante;";
            csvACF += "Localização;";
            csvACF += "Centro de Custo;";
            csvACF += "Qualidade Atendimento;";
            csvACF += "Reajuste Concedido;";
            csvACF += "Impacto Anual $;";
            csvACF += "Impacto Anual %;";
            csvACF += "Data/Hora Disponibilidade Suprimentos Pré;";
            csvACF += "Data/Hora Ínicio Atividade;";
            csvACF += "Data/Hora Fim Atividade;";
            csvACF += "Usuário Suprimentos Pré;";
            csvACF += "Data/Hora Disponibilidade Suprimentos Pós;";
            csvACF += "Data/Hora Ínicio Atividade;";
            csvACF += "Data/Hora Fim Atividade;";
            csvACF += "Usuário Suprimentos Pós;";
            csvACF += "Data/Hora Disponibilidade Supervisor;";
            csvACF += "Data/Hora Fim Supervisor;";
            csvACF += "Usuário Supervisor;";
            csvACF += "Data/Hora Disponibilidade Coordenador;";
            csvACF += "Data/Hora Fim Coordenador;";
            csvACF += "Usuário Coordenador;";
            csvACF += "Data/Hora Disponibilidade Gerente;";
            csvACF += "Data/Hora Fim Gerente;";
            csvACF += "Usuário Gerente;";
            csvACF += "Data/Hora Disponibilidade Diretor;";
            csvACF += "Data/Hora Fim Diretor;";
            csvACF += "Usuário Diretor;";
            csvACF += "\n";
        
            for(let int = 0; int < dadosCSVACF.length; int++){
                csvACF += dadosCSVACF[int]["codigoFluig"].toString() + ";";
                csvACF += dadosCSVACF[int]["status"].toString() + ";";
                csvACF += dadosCSVACF[int]["filial"].toString() + ";";
                csvACF += dadosCSVACF[int]["nomeFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["cpfCNPJFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["cidadeFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["ufFornecedor"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataEntrada"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataInicialAcordo"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataFinalAcordo"].toString() + ";";
                csvACF += dadosCSVACF[int]["spendTotal"].toString() + ";";
                csvACF += dadosCSVACF[int]["tipoRequisicao"].toString() + ";";
                csvACF += dadosCSVACF[int]["tipoPagamento"].toString() + ";";
                csvACF += dadosCSVACF[int]["requisitante"].toString() + ";";
                csvACF += dadosCSVACF[int]["localizacao"].toString() + ";";
                csvACF += dadosCSVACF[int]["centroCusto"].toString() + ";";
                csvACF += dadosCSVACF[int]["qualidadeAtendimento"].toString() + ";";
                csvACF += dadosCSVACF[int]["reajusteConcedido"].toString() + ";";
                csvACF += dadosCSVACF[int]["impactoAnualValor"].toString() + ";";
                csvACF += dadosCSVACF[int]["impactoAnualPercentual"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataDisponibilidadeS1"] + ";";
                csvACF += dadosCSVACF[int]["dataAssumiuS1"] + ";";
                csvACF += dadosCSVACF[int]["dataFinalizouS1"] + ";";
                csvACF += dadosCSVACF[int]["usuarioS1"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataDisponibilidadeS2"] + ";";
                csvACF += dadosCSVACF[int]["dataAssumiuS2"] + ";";
                csvACF += dadosCSVACF[int]["dataFinalizouS2"] + ";";
                csvACF += dadosCSVACF[int]["usuarioS2"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataDisponibilidadeS"] + ";";
                csvACF += dadosCSVACF[int]["dataFinalizouS"] + ";";
                csvACF += dadosCSVACF[int]["usuarioS"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataDisponibilidadeC"] + ";";
                csvACF += dadosCSVACF[int]["dataFinalizouC"] + ";";
                csvACF += dadosCSVACF[int]["usuarioC"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataDisponibilidadeG"] + ";";
                csvACF += dadosCSVACF[int]["dataFinalizouG"] + ";";
                csvACF += dadosCSVACF[int]["usuarioG"].toString() + ";";
                csvACF += dadosCSVACF[int]["dataDisponibilidadeD"] + ";";
                csvACF += dadosCSVACF[int]["dataFinalizouD"] + ";";
                csvACF += dadosCSVACF[int]["usuarioD"].toString() + ";";
                csvACF += "\n";
            }
            console.log(csvACF);
            let downloadLinkACF = document.createElement("a");
            downloadLinkACF.download = "ACF.csv";
            downloadLinkACF.href = window.URL.createObjectURL(new Blob([csvACF], {type: "text/csv"}));
            downloadLinkACF.style.display = "none";
            document.body.appendChild(downloadLinkACF);
            downloadLinkACF.click();
        };

        btnConsultarACF.on('click', () => {
            let myLoadingACF = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingACF.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsACF();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetACF;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetACF = DatasetFactory.getDataset("ds_GestaoContratos", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetACF = DatasetFactory.getDataset("ds_GestaoContratos", null, constraints, null); // Produção
                }
                console.log("datasetACF");
                console.log(datasetACF);
                if(datasetACF.length > 0 || datasetACF.values){
                    $("#tableACF tbody").html("");
                    dadosACF = [];
                    let usuarioComPermissao = true;
                    let solicitacoesACF = datasetACF.values;
                    for(let i = 0; i < solicitacoesACF.length; i++){
                        const solicitacao = solicitacoesACF[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingACF.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"] == null ? "" : solicitacao["numeroFluxo"];
                        let status = solicitacao["Status"] == null ? "" : solicitacao["Status"];
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "Encaminhado para Suprimentos") status = "Aberto";
                        if(status == "Solicitação Reprovada") status = "Aberto";
                        if(status == "Encaminhado para Diretoria Financeira") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "Cancelada") status = "Cancelado";
                        if(status == "Solicitação Finalizada") status = "Finalizado";

                        let filial = solicitacao["zoomFilial"] == null ? "" : solicitacao["zoomFilial"];
                        let nomeFornecedor = "";
                        if(solicitacao["inputFornecedor"] != null && solicitacao["inputFornecedor"].match("Nome")) nomeFornecedor = solicitacao["inputFornecedor"].split(" | ")[1].replace("Nome: ","");
                        else nomeFornecedor = "";

                        let cpfCNPJFornecedor = solicitacao["cnpj"] == null ? "" : solicitacao["cnpj"];
                        let cidadeFornecedor = solicitacao["inputCidade"] == null || solicitacao["inputCidade"] == undefined || solicitacao["inputCidade"] == "undefined" ? "" : solicitacao["inputCidade"];
                        let ufFornecedor = solicitacao["inputUF"] == null || solicitacao["inputUF"] == undefined || solicitacao["inputUF"] == "undefined" ? "" : solicitacao["inputUF"];
                        let dataEntrada = solicitacao["dataEntrada"] == null ? "" : solicitacao["dataEntrada"];

                        console.log("solicitacao['inputDataInicialAcordo']: "+solicitacao["inputDataInicialAcordo"]);
                        console.log("solicitacao['inputDataFinalAcordo']: "+solicitacao["inputDataFinalAcordo"]);

                        let dataInicialAcordo = solicitacao["inputDataInicialAcordo"] == null || solicitacao["inputDataInicialAcordo"] == undefined || solicitacao["inputDataInicialAcordo"] == "" ? "" : convertDateACF(solicitacao["inputDataInicialAcordo"]);
                        let dataFinalAcordo = solicitacao["inputDataFinalAcordo"] == null || solicitacao["inputDataFinalAcordo"] == undefined || solicitacao["inputDataFinalAcordo"] == "" ? "" : convertDateACF(solicitacao["inputDataFinalAcordo"]);
                        let spendTotal = solicitacao["valorTotalDocumento"] == null ? "" : solicitacao["valorTotalDocumento"];
                        let tipoRequisicao = solicitacao["tipoRequisicao"] == null ? "" : solicitacao["tipoRequisicao"];
                        let tipoPagamento = solicitacao["tipoPagamento"] == null ? "" : solicitacao["tipoPagamento"];
                        let requisitante = solicitacao["solicitanteNome"] == null ? "" : solicitacao["solicitanteNome"];
                        let localizacao = solicitacao["atividadeAtual"] == null ? "" : solicitacao["atividadeAtual"];
                        if(localizacao == "5") localizacao = "Supervisor";
                        if(localizacao == "17") localizacao = "Coordenador";
                        if(localizacao == "9") localizacao = "Coordenador";
                        if(localizacao == "86") localizacao = "Correção";
                        if(localizacao == "21") localizacao = "Gerente";
                        if(localizacao == "23") localizacao = "Diretor";
                        if(localizacao == "35") localizacao = "Suprimentos";
                        if(localizacao == "110") localizacao = "Suprimentos";
                        if(localizacao == "119") localizacao = "Diretoria Financeira";
                        if(localizacao == "0") localizacao = "Início";
                        if(localizacao == "4") localizacao = "Início";
                        if(localizacao == "47") localizacao = "Fim";
                        let centroCusto = solicitacao["zoomCentroCusto"] == null ? "" : solicitacao["zoomCentroCusto"];
                        let qualidadeAtendimento = solicitacao["selectQuestionario3"] == null ? "" : solicitacao["selectQuestionario3"];
                        let reajusteConcedido = solicitacao["selectReajuste"] == null ? "" : solicitacao["selectReajuste"];
                        let impactoAnualValor = solicitacao["inputImpactoAnualReajuste"] == null ? "" : solicitacao["inputImpactoAnualReajuste"];
                        let impactoAnualPercentual = solicitacao["inputPorcentagemImpactoAnual"] == null ? "" : solicitacao["inputPorcentagemImpactoAnual"];

                        let dataDisponibilidadeS1 = solicitacao["dataDisponibilidadeS1"] == null || solicitacao["dataDisponibilidadeS1"] == "" ? "" : convertDateTimeACF(solicitacao["dataDisponibilidadeS1"]);
                        let dataAssumiuS1 = solicitacao["dataAssumiuS1"] == null || solicitacao["dataAssumiuS1"] == "" ? "" : convertDateTimeACF(solicitacao["dataAssumiuS1"]);
                        let dataFinalizouS1 = solicitacao["dataFinalizouS1"] == null || solicitacao["dataFinalizouS1"] == "" ? "" : convertDateTimeACF(solicitacao["dataFinalizouS1"]);
                        let usuarioS1 = solicitacao["usuarioS1"] == null ? "" : solicitacao["usuarioS1"];

                        let dataDisponibilidadeS2 = solicitacao["dataDisponibilidadeS2"] == null || solicitacao["dataDisponibilidadeS2"] == "" ? "" : convertDateTimeACF(solicitacao["dataDisponibilidadeS2"]);
                        let dataAssumiuS2 = solicitacao["dataAssumiuS2"] == null || solicitacao["dataAssumiuS2"] == "" ? "" : convertDateTimeACF(solicitacao["dataAssumiuS2"]);
                        let dataFinalizouS2 = solicitacao["dataFinalizouS2"] == null || solicitacao["dataFinalizouS2"] == "" ? "" : convertDateTimeACF(solicitacao["dataFinalizouS2"]);
                        let usuarioS2 = solicitacao["usuarioS2"] == null ? "" : solicitacao["usuarioS2"];

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"] == null || solicitacao["dataDisponibilidadeS"] == "" ? "" : convertDateTimeACF(solicitacao["dataDisponibilidadeS"]); 
                        let dataFinalizouS = solicitacao["dataFinalizouS"] == null || solicitacao["dataFinalizouS"] == "" ? "" : convertDateTimeACF(solicitacao["dataFinalizouS"]);
                        let usuarioS = solicitacao["usuarioS"] == null || solicitacao["usuarioS"] == "" ? "" : solicitacao["usuarioS"];

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"] == null || solicitacao["dataDisponibilidadeC"] == "" ? "" : convertDateTimeACF(solicitacao["dataDisponibilidadeC"]);
                        let dataFinalizouC = solicitacao["dataFinalizouC"] == null || solicitacao["dataFinalizouC"] == "" ? "" : convertDateTimeACF(solicitacao["dataFinalizouC"]);
                        let usuarioC = solicitacao["usuarioC"] == null || solicitacao["usuarioC"] == "" ? "" : solicitacao["usuarioC"];

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"] == null || solicitacao["dataDisponibilidadeG"] == "" ? "" : convertDateTimeACF(solicitacao["dataDisponibilidadeG"]);
                        let dataFinalizouG = solicitacao["dataFinalizouG"] == null || solicitacao["dataFinalizouG"] == "" ? "" : convertDateTimeACF(solicitacao["dataFinalizouG"]);
                        let usuarioG = solicitacao["usuarioG"] == null || solicitacao["usuarioG"] == "" ? "" : solicitacao["usuarioG"];

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"] == null || solicitacao["dataDisponibilidadeD"] == "" ? "" : convertDateTimeACF(solicitacao["dataDisponibilidadeD"]);
                        let dataFinalizouD = solicitacao["dataFinalizouD"] == null || solicitacao["dataFinalizouD"] == "" ? "" : convertDateTimeACF(solicitacao["dataFinalizouD"]);
                        let usuarioD = solicitacao["usuarioD"] == null || solicitacao["usuarioD"] == "" ? "" : solicitacao["usuarioD"];

                        dadosACF.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "filial" : filial,
                            "nomeFornecedor" : nomeFornecedor,
                            "cpfCNPJFornecedor" : cpfCNPJFornecedor,
                            "cidadeFornecedor" : cidadeFornecedor,
                            "ufFornecedor" : ufFornecedor,
                            "dataEntrada" : dataEntrada,
                            "dataInicialAcordo" : dataInicialAcordo,
                            "dataFinalAcordo" : dataFinalAcordo,
                            "spendTotal" : spendTotal,
                            "tipoRequisicao" : tipoRequisicao,
                            "tipoPagamento" : tipoPagamento,
                            "requisitante" : requisitante,
                            "localizacao" : localizacao,
                            "centroCusto" : centroCusto,
                            "qualidadeAtendimento" : qualidadeAtendimento,
                            "reajusteConcedido" : reajusteConcedido,
                            "impactoAnualValor" : impactoAnualValor,
                            "impactoAnualPercentual" : impactoAnualPercentual,
                            "dataDisponibilidadeS1" : dataDisponibilidadeS1,
                            "dataAssumiuS1" : dataAssumiuS1,
                            "dataFinalizouS1" : dataFinalizouS1,
                            "usuarioS1" : usuarioS1,
                            "dataDisponibilidadeS2" : dataDisponibilidadeS2,
                            "dataAssumiuS2" : dataAssumiuS2,
                            "dataFinalizouS2" : dataFinalizouS2,
                            "usuarioS2" : usuarioS2,
                            "dataDisponibilidadeS" : dataDisponibilidadeS,
                            "dataFinalizouS" : dataFinalizouS,
                            "usuarioS" : usuarioS,
                            "dataDisponibilidadeC" : dataDisponibilidadeC,
                            "dataFinalizouC" : dataFinalizouC,
                            "usuarioC" : usuarioC,
                            "dataDisponibilidadeG" : dataDisponibilidadeG,
                            "dataFinalizouG" : dataFinalizouG,
                            "usuarioG" : usuarioG,
                            "dataDisponibilidadeD" : dataDisponibilidadeD,
                            "dataFinalizouD" : dataFinalizouD,
                            "usuarioD" : usuarioD
                        });
                    }
                    if(usuarioComPermissao == true){
                        createTableACF(dadosACF);
                        myLoadingACF.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesACF.length} registros!`,type: 'success'});
                        btnExportarACF.on('click', () => {
                            let switchExportacaoAvancadaACF = $("#switchExportacaoAvancadaACF");
                            console.log(switchExportacaoAvancadaACF);
                            console.log(switchExportacaoAvancadaACF.is(":checked"));
                            if(switchExportacaoAvancadaACF.is(":checked")){
                                gerarCSVAvancadoACF(dadosACF);
                            }else{
                                gerarCSVACF(dadosACF);
                            }
                        });
                    }
                }else{
                    myLoadingACF.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});