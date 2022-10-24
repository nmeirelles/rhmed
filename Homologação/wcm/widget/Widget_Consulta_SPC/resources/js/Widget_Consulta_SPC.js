var MyWidgetSPC = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoSPC = $("#inputNumeroFluxoSPC");
        let inputValorTotalSPC = $("#inputValorTotalSPC");
        let selectStatusSPC = $("#selectStatusSPC");
        let inputNomeFilialSPC = $("#inputNomeFilialSPC");
        let inputNomeFornecedorSPC = $("#inputNomeFornecedorSPC");
        let inputCNPJFornecedorSPC = $("#inputCNPJFornecedorSPC");
        let selectNaturezaSPC = $("#selectNaturezaSPC");
        let inputDataEntradaSPC = $("#inputDataEntradaSPC");
        let inputMesEntradaSPC = $("#inputMesEntradaSPC");
        let inputAnoEntradaSPC = $("#inputAnoEntradaSPC");
        let inputDataVencimentoSPC = $("#inputDataVencimentoSPC");
        let inputMesVencimentoSPC = $("#inputMesVencimentoSPC");
        let inputAnoVencimentoSPC = $("#inputAnoVencimentoSPC");
        let selectTipoPagamentoSPC = $("#selectTipoPagamentoSPC");
        let inputNomeSolicitanteSPC = $("#inputNomeSolicitanteSPC");
        let inputMatriculaSolicitanteSPC = $("#inputMatriculaSolicitanteSPC");
        let selectAtividadeSPC = $("#selectAtividadeSPC");
        let inputCentroCustoSPC = $("#inputCentroCustoSPC");

        let inputNaturezaSPC = $("#inputNaturezaSPC");
        let selectCondicaoSPC = $("#selectCondicaoSPC");

        let inputNomeSupervisorSPC = $("#inputNomeSupervisorSPC");
        let inputMatriculaSupervisorSPC = $("#inputMatriculaSupervisorSPC");
        let inputNomeCoordenadorSPC = $("#inputNomeCoordenadorSPC");
        let inputMatriculaCoordenadorSPC = $("#inputMatriculaCoordenadorSPC");
        let inputNomeGerenteSPC = $("#inputNomeGerenteSPC");
        let inputMatriculaGerenteSPC = $("#inputMatriculaGerenteSPC");
        let inputNomeDiretorSPC = $("#inputNomeDiretorSPC");
        let inputMatriculaDiretorSPC = $("#inputMatriculaDiretorSPC");
        let btnConsultarSPC = $("#btnConsultarSPC");
        let btnExportarSPC = $("#btnExportarSPC");
        let tableSPC = $("#tableSPC");
        let dadosSPC = [];
        let datasetNatureza = [];

        $('#inputValorTotalSPC').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const naturezaSPC = () => {
			const datasetNatureza = DatasetFactory.getDataset("dsNaturezaPrestacaoContas");
            const result = datasetNatureza.values;
            return result;
        }
        FLUIGC.filter("#inputNaturezaSPC",{
            source: naturezaSPC(),
            displayKey: 'natPagas',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Natureza', 'size':'col-sm-12', 'dataorder':'natPagas', 'standard':true}
                ],
                renderContent: ['natPagas']
            }
        });

        const centroCustoSPC = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }
        FLUIGC.filter("#inputCentroCustoSPC",{
            source: centroCustoSPC(),
            displayKey: 'ccusto',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Centro de Custo', 'size':'col-sm-12', 'dataorder':'ccusto', 'standard':true}
                ],
                renderContent: ['ccusto']
            }
        });

        btnExportarSPC.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaSPC');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPC', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPC', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteSPC",{
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
            FLUIGC.filter("#inputNomeSupervisorSPC",{
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
            FLUIGC.filter("#inputNomeCoordenadorSPC",{
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
            FLUIGC.filter("#inputNomeGerenteSPC",{
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
            FLUIGC.filter("#inputNomeDiretorSPC",{
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
            inputNomeSolicitanteSPC.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteSPC.val(matricula);
                }
            });
            inputNomeSupervisorSPC.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorSPC.val(matricula);
                }
            });
            inputNomeCoordenadorSPC.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorSPC.val(matricula);
                }
            });
            inputNomeGerenteSPC.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteSPC.val(matricula);
                }
            });
            inputNomeDiretorSPC.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorSPC.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorSPC]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorSPC").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorSPC").show();
                $("#divCoordenadorSPC").show();
                $("#divGerenteSPC").show();
                $("#divDiretorSPC").show();
            }
            if(filtrar == false){
                $("#divSupervisorSPC").hide();
                $("#divCoordenadorSPC").hide();
                $("#divGerenteSPC").hide();
                $("#divDiretorSPC").hide();
            }
        });

        const convertDateTimeSPC = (data) => data != "" || data != null ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";

        const convertDateSPC = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsSPC = () => {
            const constraintsSPC = [];
            if(inputNumeroFluxoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoSPC.val(), inputNumeroFluxoSPC.val(), ConstraintType.MUST));
                return constraintsSPC;
            }
            if(inputValorTotalSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalSPC.val(), inputValorTotalSPC.val(), ConstraintType.MUST));
            }
            if(selectStatusSPC.val() != ""){
                if(selectStatusSPC.val() == "aberto"){
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "SPC Reprovada", "SPC Reprovada", ConstraintType.SHOULD));
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "Encaminhado para Célula Fiscal", "Encaminhado para Célula Fiscal", ConstraintType.SHOULD));
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "Em análise TI", "Em análise TI", ConstraintType.SHOULD));
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "SPC Encaminhada Para Pagamento", "SPC Encaminhada Para Pagamento", ConstraintType.SHOULD));
                }
                if(selectStatusSPC.val() == "cancelado"){
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "Cancelada", "Cancelada", ConstraintType.SHOULD));
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.SHOULD));
                }
                if(selectStatusSPC.val() == "finalizado"){
                    constraintsSPC.push(DatasetFactory.createConstraint("Status", "SPC - Pagamento Programado", "SPC - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialSPC.val(), inputNomeFilialSPC.val(), ConstraintType.MUST, true));
            }
            if(selectTipoPagamentoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoSPC.val(), selectTipoPagamentoSPC.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("dataEntrada", convertDateSPC(inputDataEntradaSPC.val()), convertDateSPC(inputDataEntradaSPC.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaSPC.val(), inputMesEntradaSPC.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaSPC.val(), inputAnoEntradaSPC.val(), ConstraintType.MUST));
            }
            if(selectNaturezaSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("colabForn", selectNaturezaSPC.val(), selectNaturezaSPC.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("dataVencimento", inputDataVencimentoSPC.val(), inputDataVencimentoSPC.val(), ConstraintType.MUST));
            }
            if(inputMesVencimentoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("mesVencimento", inputMesVencimentoSPC.val(), inputMesVencimentoSPC.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("anoVencimento", inputAnoVencimentoSPC.val(), inputAnoVencimentoSPC.val(), ConstraintType.MUST));
            }
            if(selectAtividadeSPC.val() != ""){
                if(selectAtividadeSPC.val() == "supervisor") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "3", "3", ConstraintType.MUST));
                if(selectAtividadeSPC.val() == "coordenador"){
                    constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "7", "7", ConstraintType.SHOULD));
                    constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.SHOULD));
                }
                if(selectAtividadeSPC.val() == "correcao") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "26", "26", ConstraintType.MUST));
                if(selectAtividadeSPC.val() == "gerente") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.MUST));
                if(selectAtividadeSPC.val() == "diretor") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "10", "10", ConstraintType.MUST));
                if(selectAtividadeSPC.val() == "fiscal") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "12", "12", ConstraintType.MUST));
                if(selectAtividadeSPC.val() == "contaSPCgar") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "28", "28", ConstraintType.MUST));
                if(selectAtividadeSPC.val() == "ti") constraintsSPC.push(DatasetFactory.createConstraint("atividadeAtual", "14", "14", ConstraintType.MUST));
            }
            if(inputNomeFornecedorSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorSPC.val(), inputNomeFornecedorSPC.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorSPC.val(), inputCNPJFornecedorSPC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteSPC.val(), inputMatriculaSolicitanteSPC.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoSPC.val(), inputCentroCustoSPC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorSPC.val(), inputMatriculaSupervisorSPC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorSPC.val(), inputMatriculaCoordenadorSPC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteSPC.val(), inputMatriculaGerenteSPC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorSPC.val(), inputMatriculaDiretorSPC.val(), ConstraintType.MUST));
            }
            if(selectCondicaoSPC.val() != ""){
                constraintsSPC.push(DatasetFactory.createConstraint("existeAdiantamento", selectCondicaoSPC.val(), selectCondicaoSPC.val(), ConstraintType.MUST));
            }
            if(inputNaturezaSPC.val() != ""){
                console.log(inputNaturezaSPC.val());
                const c1 = DatasetFactory.createConstraint("tablename", "tabelaItens", "tabelaItens", ConstraintType.MUST);
                const c2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
                let datasetSPC;
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSPC = DatasetFactory.getDataset("dsSolicitacaoPagamentoPrestacaodeContas", null, [c1,c2], null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSPC = DatasetFactory.getDataset("dsSolicitacaoPagamentoPrestacaodeContas", null, [c1,c2], null); // Produção
                }
                if(datasetSPC.length > 0 || datasetSPC.values){
                    console.log("datasetSPC");
                    console.log(datasetSPC);
                    let solicitacoesSPC = datasetSPC.values;
                    let documentIds = [];
                    for(let i = 0; i < solicitacoesSPC.length; i++){
                        let solicitacao = solicitacoesSPC[i];
                        let zoomItens = solicitacao.zoomItens;
                        let inputNaturezaSPCtmp = inputNaturezaSPC.val();
                        let validacao = inputNaturezaSPCtmp.match(zoomItens);
                        if(validacao != null) {
                            documentIds.push(solicitacao["metadata#id"]);
                            datasetNatureza.push({
                                "inputNaturezaSPCtmp" : inputNaturezaSPCtmp,
                                "id": solicitacao["metadata#id"]
                            });
                        }
                    }
                    console.log(documentIds);
                    if(documentIds.length > 0){
                        for(let i = 0; i < documentIds.length; i++){
                            let documentId = documentIds[i];
                            constraintsSPC.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.SHOULD));
                        }
                    }
                }
            }
            
            return constraintsSPC;
        }

        const createTableSPC = (dadosTableSPC) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableSPC);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableSPC > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableSPC.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableSPC[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableSPC[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableSPC[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["status"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["colaboradorFundoFixo"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["tipo"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["codigoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["cnpjFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["dataPagamento"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableSPC[i]["natureza"] +'</td>'+
                            "</tr>";
                }
                tableSPC.append(tr);
                $('#numeracaoSPC').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableSPC.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoSPC').prop('disabled', dadosTableSPC.length <= tamanhoPagina || pagina > dadosTableSPC.length / tamanhoPagina - 1);
                $('#anteriorSPC').prop('disabled', dadosTableSPC.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoSPC').click(()=>{
                if(pagina < dadosTableSPC.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorSPC').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVSPC = (dadosCSVSPC) => {
            let csvSPC = "\uFEFF";        
            csvSPC += "Código Fluig;";
            csvSPC += "Requisitante;";
            csvSPC += "Status;";
            csvSPC += "Colaborador ou Fundo Fixo;";
            csvSPC += "Centro Custo;";
            csvSPC += "Tipo;";
            csvSPC += "Filial;";
            csvSPC += "Código Fornecedor;";
            csvSPC += "Nome Fornecedor;";
            csvSPC += "CNPJ Fornecedor;";
            csvSPC += "Condição;";
            csvSPC += "Data Entrada;";
            csvSPC += "Data Sugerida Pagamento;";
            csvSPC += "Valor;";
            csvSPC += "Localização;";
            csvSPC += "Natureza;";
            csvSPC += "\n";
        
            for(let int = 0; int < dadosCSVSPC.length; int++){
                csvSPC += dadosCSVSPC[int]["codigoFluig"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["requisitante"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["status"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["colaboradorFundoFixo"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["centroCusto"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["tipo"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["nomeFilial"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["codigoFornecedor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["nomeFornecedor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["cnpjFornecedor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["condicao"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataEntrada"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataPagamento"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["valor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["localizacao"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["natureza"].toString() + ";";
                csvSPC += "\n";
            }
            console.log(csvSPC);
            let downloadLinkSPC = document.createElement("a");
            downloadLinkSPC.download = "SPC.csv";
            downloadLinkSPC.href = window.URL.createObjectURL(new Blob([csvSPC], {type: "text/csv"}));
            downloadLinkSPC.style.display = "none";
            document.body.appendChild(downloadLinkSPC);
            downloadLinkSPC.click();
        };

        const gerarCSVAvancadoSPC = (dadosCSVSPC) => {
            let csvSPC = "\uFEFF";
        
            csvSPC += "Código Fluig;";
            csvSPC += "Requisitante;";
            csvSPC += "Status;";
            csvSPC += "Colaborador ou Fundo Fixo;";
            csvSPC += "Centro Custo;";
            csvSPC += "Tipo;";
            csvSPC += "Filial;";
            csvSPC += "Código Fornecedor;";
            csvSPC += "Nome Fornecedor;";
            csvSPC += "CNPJ Fornecedor;";
            csvSPC += "Condição;";
            csvSPC += "Data Entrada;";
            csvSPC += "Data Sugerida Pagamento;";
            csvSPC += "Valor;";
            csvSPC += "Localização;";
            csvSPC += "Natureza;";
            csvSPC += "Supervisor;";
            csvSPC += "Coordenador;";
            csvSPC += "Gerente;";
            csvSPC += "Diretor;";
            csvSPC += "Data/Hora Disponibilidade Célula Fiscal;";
            csvSPC += "Data/Hora Ínicio Atividade;";
            csvSPC += "Data/Hora Fim Atividade;";
            csvSPC += "Usuário Célula Fiscal;";
            csvSPC += "Data/Hora Disponibilidade Contas Pagar;";
            csvSPC += "Data/Hora Ínicio Atividade;";
            csvSPC += "Data/Hora Fim Atividade;";
            csvSPC += "Usuário Contas Pagar;";
            csvSPC += "Data/Hora Disponibilidade Supervisor;";
            csvSPC += "Data/Hora Fim Supervisor;";
            csvSPC += "Usuário Supervisor;";
            csvSPC += "Data/Hora Disponibilidade Coordenador;";
            csvSPC += "Data/Hora Fim Coordenador;";
            csvSPC += "Usuário Coordenador;";
            csvSPC += "Data/Hora Disponibilidade Gerente;";
            csvSPC += "Data/Hora Fim Gerente;";
            csvSPC += "Usuário Gerente;";
            csvSPC += "Data/Hora Disponibilidade Diretor;";
            csvSPC += "Data/Hora Fim Diretor;";
            csvSPC += "Usuário Diretor;";
        
            csvSPC += "\n";
        
            for(let int = 0; int < dadosCSVSPC.length; int++){
                csvSPC += dadosCSVSPC[int]["codigoFluig"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["requisitante"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["status"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["colaboradorFundoFixo"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["centroCusto"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["tipo"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["nomeFilial"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["codigoFornecedor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["nomeFornecedor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["cnpjFornecedor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["condicao"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataEntrada"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataPagamento"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["valor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["localizacao"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["natureza"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["supervisor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["coordenador"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["gerente"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["diretor"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataDisponibilidadeCF"] + ";";
                csvSPC += dadosCSVSPC[int]["dataAssumiuCF"] + ";";
                csvSPC += dadosCSVSPC[int]["dataFinalizouCF"] + ";";
                csvSPC += dadosCSVSPC[int]["usuarioCF"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataDisponibilidadeCP"] + ";";
                csvSPC += dadosCSVSPC[int]["dataAssumiuCP"] + ";";
                csvSPC += dadosCSVSPC[int]["dataFinalizouCP"] + ";";
                csvSPC += dadosCSVSPC[int]["usuarioCP"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataDisponibilidadeS"] + ";";
                csvSPC += dadosCSVSPC[int]["dataFinalizouS"] + ";";
                csvSPC += dadosCSVSPC[int]["usuarioS"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataDisponibilidadeC"] + ";";
                csvSPC += dadosCSVSPC[int]["dataFinalizouC"] + ";";
                csvSPC += dadosCSVSPC[int]["usuarioC"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataDisponibilidadeG"] + ";";
                csvSPC += dadosCSVSPC[int]["dataFinalizouG"] + ";";
                csvSPC += dadosCSVSPC[int]["usuarioG"].toString() + ";";
                csvSPC += dadosCSVSPC[int]["dataDisponibilidadeD"] + ";";
                csvSPC += dadosCSVSPC[int]["dataFinalizouD"] + ";";
                csvSPC += dadosCSVSPC[int]["usuarioD"].toString() + ";";
                csvSPC += "\n";
            }
            console.log(csvSPC);
            let downloadLinkSPC = document.createElement("a");
            downloadLinkSPC.download = "SPC.csv";
            downloadLinkSPC.href = window.URL.createObjectURL(new Blob([csvSPC], {type: "text/csv"}));
            downloadLinkSPC.style.display = "none";
            document.body.appendChild(downloadLinkSPC);
            downloadLinkSPC.click();
        };

        btnConsultarSPC.on('click', () => {
            let myLoadingSPC = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingSPC.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsSPC();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetSPC;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSPC = DatasetFactory.getDataset("dsSolicitacaoPagamentoPrestacaodeContas", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSPC = DatasetFactory.getDataset("dsSolicitacaoPagamentoPrestacaodeContas", null, constraints, null); // Produção
                }
                console.log("datasetSPC");
                console.log(datasetSPC);
                if(datasetSPC.length > 0 || datasetSPC.values){
                    $("#tableSPC tbody").html("");
                    dadosSPC = [];
                    let usuarioComPermissao = true;
                    let solicitacoesSPC = datasetSPC.values;
                    for(let i = 0; i < solicitacoesSPC.length; i++){
                        const solicitacao = solicitacoesSPC[i];
                        
                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingSPC.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"];
                        if(codigoFluig == null) codigoFluig = "";

                        let requisitante = solicitacao["solicitanteNome"];
                        if(requisitante == null) requisitante = "";
                        
                        let status = solicitacao["Status"];
                        if(status == null) status = "";
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "SPC Reprovada") status = "Aberto";
                        if(status == "Encaminhado para Célula Fiscal") status = "Aberto";
                        if(status == "Em análise TI") status = "Aberto";
                        if(status == "SPC Encaminhada Para Pagamento") status = "Aberto";
                        if(status == "Cancelada") status = "Cancelado";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "SPC - Pagamento Programado") status = "Finalizado";

                        let colaboradorFundoFixo = solicitacao["colabForn"];
                        if(colaboradorFundoFixo == null) colaboradorFundoFixo = "";
                        if(colaboradorFundoFixo == "reembolsoDespesasColaboradores") colaboradorFundoFixo = "Reembolso de Despesas - Colaboradores";
                        if(colaboradorFundoFixo == "reembolsoDespesasFornecedores") colaboradorFundoFixo = "Reembolso de Despesas - Fornecedores";
                        if(colaboradorFundoFixo == "prestacaoContasFundoFixo") colaboradorFundoFixo = "Prestação de Contas - Fundo Fixo";

                        let centroCusto = solicitacao["zoomCentroCusto"];
                        if(centroCusto == null) centroCusto = "";

                        let tipo = solicitacao["tipoPagamento"];
                        if(tipo == null) tipo = "";

                        let nomeFilial = solicitacao["zoomFilial"];
                        if(nomeFilial == null) nomeFilial = "";

                        let codigoFornecedor = solicitacao["inputCodFornecedor"];
                        if(codigoFornecedor == null) codigoFornecedor = "";

                        let nomeFornecedor = "";
                        if(solicitacao["inputFornecedor"] != null && solicitacao["inputFornecedor"].match("Nome")){
                            nomeFornecedor = solicitacao["inputFornecedor"].split(" | ")[1].replace("Nome: ","");
                        }else{
                            nomeFornecedor = "";
                        }

                        let cnpjFornecedor = solicitacao["cnpj"];
                        if(cnpjFornecedor == null) cnpjFornecedor = "";
                        
                        let condicao = solicitacao["existeAdiantamento"];
                        if(condicao == null) condicao = "";
                        if(condicao == "semAdiantamento") condicao = "Prestação de Conta Sem Adiantamento";
                        if(condicao == "comAdiantamento") condicao = "Prestação de Conta Com Adiantamento";

                        let dataEntrada = solicitacao["dataEntrada"];
                        if(dataEntrada == null) dataEntrada = "";

                        let dataPagamento = solicitacao["dataVencimento"];
                        if(dataPagamento == null) dataPagamento = "";
                        if(dataPagamento != null && dataPagamento != "") dataPagamento = convertDateSPC(dataPagamento);

                        let valor = solicitacao["valorTotalDocumento"];
                        if(valor == null) valor = "";

                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "3") localizacao = "Supervisor";
                        if(atividadeAtual == "7") localizacao = "Coordenador";
                        if(atividadeAtual == "5") localizacao = "Coordenador";
                        if(atividadeAtual == "26") localizacao = "Correção";
                        if(atividadeAtual == "9") localizacao = "Gerente";
                        if(atividadeAtual == "10") localizacao = "Diretor";
                        if(atividadeAtual == "12") localizacao = "Célula Fiscal";
                        if(atividadeAtual == "28") localizacao = "Contas a Pagar";
                        if(atividadeAtual == "14") localizacao = "T.I.";

                        let natureza = "";
                        if(datasetNatureza.length > 0){
                            for(let i = 0; i < datasetNatureza.length; i++){
                                const solicitacaoNatureza = datasetNatureza[i];
                                const inputNaturezaSPCtmp = solicitacaoNatureza["inputNaturezaSPCtmp"];
                                const id = solicitacaoNatureza["id"];
                                const id2 = solicitacao["metadata#id"];
                                if(id == id2){
                                    natureza = inputNaturezaSPCtmp;
                                }
                            }
                        }else{
                            const document = solicitacao["metadata#id"];
                            const version = solicitacao["metadata#version"];
                            const c1 = DatasetFactory.createConstraint("tablename", "tabelaItens", "tabelaItens", ConstraintType.MUST);
                            const c2 = DatasetFactory.createConstraint("metadata#id", document, document, ConstraintType.MUST);
                            const c3 = DatasetFactory.createConstraint("metadata#version", version, version, ConstraintType.MUST);
                            const c4 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
                            let datasetNatureza;
                            const url_atual = window.location.href.toString();
                            if(url_atual.match("rhmedconsultores114678")){
                                datasetNatureza = DatasetFactory.getDataset("dsSolicitacaoPagamentoPrestacaodeContas", null, [c1,c2,c3,c4], null); // Homologação
                            }
                            if(url_atual.match("rhmedconsultores114677")){
                                datasetNatureza = DatasetFactory.getDataset("dsSolicitacaoPagamentoPrestacaodeContas", null, [c1,c2,c3,c4], null); // Produção
                            }
                            natureza = datasetNatureza.values.length > 0 ? datasetNatureza.values[0]["zoomItens"] : "";
                        }

                        let supervisor = solicitacao["aprovadorSupervisor"];
                        if(supervisor != null && supervisor != "") supervisor = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == supervisor)['colleagueName'];
                        if(supervisor == null) supervisor = "";

                        let coordenador = solicitacao["aprovadorCoordenador"];
                        if(coordenador != null && coordenador != "") coordenador = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == coordenador)['colleagueName'];
                        if(coordenador == null) coordenador = "";

                        let gerente = solicitacao["aprovadorGerente"];
                        if(gerente != null && gerente != "") gerente = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == gerente)['colleagueName'];
                        if(gerente == null) gerente = "";

                        let diretor = solicitacao["aprovadorDiretor"];
                        if(diretor != null && diretor != "") diretor = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == diretor)['colleagueName'];
                        if(diretor == null) diretor = "";
                        
                        let dataDisponibilidadeCF = solicitacao["dataDisponibilidadeCF"];
                        if(dataDisponibilidadeCF == null) dataDisponibilidadeCF = "";
                        if(dataDisponibilidadeCF != null && dataDisponibilidadeCF != "") dataDisponibilidadeCF = convertDateTimeSPC(dataDisponibilidadeCF);
                        
                        let dataAssumiuCF = solicitacao["dataAssumiuCF"];
                        if(dataAssumiuCF == null) dataAssumiuCF = "";
                        if(dataAssumiuCF != null && dataAssumiuCF != "") dataAssumiuCF = convertDateTimeSPC(dataAssumiuCF);
                        
                        let dataFinalizouCF = solicitacao["dataFinalizouCF"];
                        if(dataFinalizouCF == null) dataFinalizouCF = "";
                        if(dataFinalizouCF != null && dataFinalizouCF != "") dataFinalizouCF = convertDateTimeSPC(dataFinalizouCF);
                        
                        let usuarioCF = solicitacao["usuarioCF"];
                        if(usuarioCF == null) usuarioCF = ""
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeSPC(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeSPC(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeSPC(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeSPC(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeSPC(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeSPC(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeSPC(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeSPC(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeSPC(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeSPC(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        dadosSPC.push({
                            "codigoFluig" : codigoFluig,
                            "requisitante" : requisitante,
                            "status" : status,
                            "colaboradorFundoFixo" : colaboradorFundoFixo,
                            "centroCusto" : centroCusto,
                            "tipo" : tipo,
                            "nomeFilial" : nomeFilial,
                            "codigoFornecedor" : codigoFornecedor,
                            "nomeFornecedor" : nomeFornecedor,
                            "cnpjFornecedor" : cnpjFornecedor,
                            "condicao" : condicao,
                            "dataEntrada" : dataEntrada,
                            "dataPagamento" : dataPagamento,
                            "valor" : valor,
                            "localizacao" : localizacao,
                            "natureza" : natureza,
                            "supervisor" : supervisor,
                            "coordenador" : coordenador,
                            "gerente" : gerente,
                            "diretor" : diretor,
                            "dataDisponibilidadeCF" : dataDisponibilidadeCF,
                            "dataAssumiuCF" : dataAssumiuCF,
                            "dataFinalizouCF" : dataFinalizouCF,
                            "usuarioCF" : usuarioCF,
                            "dataDisponibilidadeCP" : dataDisponibilidadeCP,
                            "dataAssumiuCP" : dataAssumiuCP,
                            "dataFinalizouCP" : dataFinalizouCP,
                            "usuarioCP" : usuarioCP,
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
                        createTableSPC(dadosSPC);
                        myLoadingSPC.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesSPC.length} registros!`,type: 'success'});
                        btnExportarSPC.on('click', () => {
                            let switchExportacaoAvancadaSPC = $("#switchExportacaoAvancadaSPC");
                            console.log(switchExportacaoAvancadaSPC);
                            console.log(switchExportacaoAvancadaSPC.is(":checked"));
                            if(switchExportacaoAvancadaSPC.is(":checked")){
                                gerarCSVAvancadoSPC(dadosSPC);
                            }else{
                                gerarCSVSPC(dadosSPC);
                            }
                        });
                    }
                }else{
                    myLoadingSPC.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });

        //$("#divConsultaSPC").html("");
    }
});