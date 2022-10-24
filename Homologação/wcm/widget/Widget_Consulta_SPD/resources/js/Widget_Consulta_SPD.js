var MyWidgetSPD = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoSPD = $("#inputNumeroFluxoSPD");
        let inputValorTotalSPD = $("#inputValorTotalSPD");
        let selectStatusSPD = $("#selectStatusSPD");
        let inputNomeFilialSPD = $("#inputNomeFilialSPD");
        let inputNomeFornecedorSPD = $("#inputNomeFornecedorSPD");
        let inputCNPJFornecedorSPD = $("#inputCNPJFornecedorSPD");
        let selectNaturezaSPD = $("#selectNaturezaSPD");
        let inputDataEntradaSPD = $("#inputDataEntradaSPD");
        let inputMesEntradaSPD = $("#inputMesEntradaSPD");
        let inputAnoEntradaSPD = $("#inputAnoEntradaSPD");
        let inputDataVencimentoSPD = $("#inputDataVencimentoSPD");
        let inputMesVencimentoSPD = $("#inputMesVencimentoSPD");
        let inputAnoVencimentoSPD = $("#inputAnoVencimentoSPD");
        let selectTipoPagamentoSPD = $("#selectTipoPagamentoSPD");
        let inputNomeSolicitanteSPD = $("#inputNomeSolicitanteSPD");
        let inputMatriculaSolicitanteSPD = $("#inputMatriculaSolicitanteSPD");
        let selectAtividadeSPD = $("#selectAtividadeSPD");
        let selectFormaPagamentoSPD = $("#selectFormaPagamentoSPD");
        let inputCentroCustoSPD = $("#inputCentroCustoSPD");
        let inputNomeSupervisorSPD = $("#inputNomeSupervisorSPD");
        let inputMatriculaSupervisorSPD = $("#inputMatriculaSupervisorSPD");
        let inputNomeCoordenadorSPD = $("#inputNomeCoordenadorSPD");
        let inputMatriculaCoordenadorSPD = $("#inputMatriculaCoordenadorSPD");
        let inputNomeGerenteSPD = $("#inputNomeGerenteSPD");
        let inputMatriculaGerenteSPD = $("#inputMatriculaGerenteSPD");
        let inputNomeDiretorSPD = $("#inputNomeDiretorSPD");
        let inputMatriculaDiretorSPD = $("#inputMatriculaDiretorSPD");
        let btnConsultarSPD = $("#btnConsultarSPD");
        let btnExportarSPD = $("#btnExportarSPD");
        let tableSPD = $("#tableSPD");
        let dadosSPD = [];

        $('#inputValorTotalSPD').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const buscarNatureza = () => {
            const c1 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
            const c2 = DatasetFactory.createConstraint("contaDebito", "", "", ConstraintType.MUST_NOT);
            const c3 = DatasetFactory.createConstraint("contaCredito", "", "", ConstraintType.MUST_NOT);
            const dataset = DatasetFactory.getDataset("dsNaturezaDiversos", null, [c1,c2,c3], ["natPagas"]);
            console.log(dataset);
            if(dataset != null && dataset.values.length > 0){
                $("#selectNaturezaSPD").empty();
                $("#selectNaturezaSPD").append('<option value=""></option>');
                for(let i = 0; i < dataset.values.length; i++){
                    let natPagas = dataset.values[i].natPagas;
                    $('#selectNaturezaSPD').append('<option value="' + natPagas + '">' + natPagas + '</option>');
                }
            }
        }
        buscarNatureza();

        const centroCustoSPD = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoSPD",{
            source: centroCustoSPD(),
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

        btnExportarSPD.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaSPD');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPD', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPD', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteSPD",{
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
            FLUIGC.filter("#inputNomeSupervisorSPD",{
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
            FLUIGC.filter("#inputNomeCoordenadorSPD",{
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
            FLUIGC.filter("#inputNomeGerenteSPD",{
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
            FLUIGC.filter("#inputNomeDiretorSPD",{
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
            inputNomeSolicitanteSPD.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteSPD.val(matricula);
                }
            });
            inputNomeSupervisorSPD.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorSPD.val(matricula);
                }
            });
            inputNomeCoordenadorSPD.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorSPD.val(matricula);
                }
            });
            inputNomeGerenteSPD.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteSPD.val(matricula);
                }
            });
            inputNomeDiretorSPD.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorSPD.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorSPD]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorSPD").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorSPD").show();
                $("#divCoordenadorSPD").show();
                $("#divGerenteSPD").show();
                $("#divDiretorSPD").show();
            }
            if(filtrar == false){
                $("#divSupervisorSPD").hide();
                $("#divCoordenadorSPD").hide();
                $("#divGerenteSPD").hide();
                $("#divDiretorSPD").hide();
            }
        });

        const convertDateTimeSPD = (data) => data != "" || data != null ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";

        const convertDateSPD = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsSPD = () => {
            const constraintsSPD = [];
            if(inputNumeroFluxoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoSPD.val(), inputNumeroFluxoSPD.val(), ConstraintType.MUST));
                return constraintsSPD;
            }
            if(inputValorTotalSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalSPD.val(), inputValorTotalSPD.val(), ConstraintType.MUST));
            }
            if(selectStatusSPD.val() != ""){
                if(selectStatusSPD.val() == "aberto"){
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "Em Analise pela Célula Fiscal", "Em Analise pela Célula Fiscal", ConstraintType.SHOULD));
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "SP Encaminhada Para Pagamento", "SP Encaminhada Para Pagamento", ConstraintType.SHOULD));
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "Em análise TI", "Em análise TI", ConstraintType.SHOULD));
                }
                if(selectStatusSPD.val() == "cancelado"){
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.SHOULD));
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "Cancelada", "Cancelada", ConstraintType.SHOULD));
                }
                if(selectStatusSPD.val() == "finalizado"){
                    constraintsSPD.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialSPD.val(), inputNomeFilialSPD.val(), ConstraintType.MUST, true));
            }
            if(selectTipoPagamentoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoSPD.val(), selectTipoPagamentoSPD.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("dataEntrada", convertDateSPD(inputDataEntradaSPD.val()), convertDateSPD(inputDataEntradaSPD.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaSPD.val(), inputMesEntradaSPD.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaSPD.val(), inputAnoEntradaSPD.val(), ConstraintType.MUST));
            }
            if(selectNaturezaSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("colabForn", selectNaturezaSPD.val(), selectNaturezaSPD.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("dataVencimentoDiversos", convertDateSPD(inputDataVencimentoSPD.val()), convertDateSPD(inputDataVencimentoSPD.val()), ConstraintType.MUST));
            }
            if(inputMesVencimentoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("mesVencimentoDiversos", inputMesVencimentoSPD.val(), inputMesVencimentoSPD.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("anoVencimentoDiversos", inputAnoVencimentoSPD.val(), inputAnoVencimentoSPD.val(), ConstraintType.MUST));
            }
            if(selectAtividadeSPD.val() != ""){
                if(selectAtividadeSPD.val() == "supervisor") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeSPD.val() == "coordenador"){
                    constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "17", "17", ConstraintType.SHOULD));
                    constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.SHOULD));
                }
                if(selectAtividadeSPD.val() == "correcao") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "86", "86", ConstraintType.MUST));
                if(selectAtividadeSPD.val() == "gerente") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "21", "21", ConstraintType.MUST));
                if(selectAtividadeSPD.val() == "diretor") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "23", "23", ConstraintType.MUST));
                if(selectAtividadeSPD.val() == "fiscal") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "35", "35", ConstraintType.MUST));
                if(selectAtividadeSPD.val() == "contasPagar") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "97", "97", ConstraintType.MUST));
                if(selectAtividadeSPD.val() == "ti") constraintsSPD.push(DatasetFactory.createConstraint("atividadeAtual", "44", "44", ConstraintType.MUST));
            }
            if(inputNomeFornecedorSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorSPD.val(), inputNomeFornecedorSPD.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorSPD.val(), inputCNPJFornecedorSPD.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteSPD.val(), inputMatriculaSolicitanteSPD.val(), ConstraintType.MUST));
            }
            if(selectFormaPagamentoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("formaPagamento", selectFormaPagamentoSPD.val(), selectFormaPagamentoSPD.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoSPD.val(), inputCentroCustoSPD.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorSPD.val(), inputMatriculaSupervisorSPD.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorSPD.val(), inputMatriculaCoordenadorSPD.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteSPD.val(), inputMatriculaGerenteSPD.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorSPD.val() != ""){
                constraintsSPD.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorSPD.val(), inputMatriculaDiretorSPD.val(), ConstraintType.MUST));
            }
            
            return constraintsSPD;
        }

        const createTableSPD = (dadosTableSPD) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableSPD);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableSPD > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableSPD.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableSPD[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableSPD[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableSPD[i]["status"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["tipoSolicitacao"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["codigoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["cnpjFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["natureza"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["dataVencimento"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["formaPagamento"] +'</td>'+
                                '<td>'+ dadosTableSPD[i]["centroCusto"] +'</td>'+
                            "</tr>";
                }
                tableSPD.append(tr);
                $('#numeracaoSPD').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableSPD.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoSPD').prop('disabled', dadosTableSPD.length <= tamanhoPagina || pagina > dadosTableSPD.length / tamanhoPagina - 1);
                $('#anteriorSPD').prop('disabled', dadosTableSPD.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoSPD').click(()=>{
                if(pagina < dadosTableSPD.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorSPD').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVSPD = (dadosCSVSPD) => {
            let csvSPD = "\uFEFF";
        
            csvSPD += "Código Fluig;";
            csvSPD += "Status;";
            csvSPD += "Tipo Solicitação;";
            csvSPD += "Filial;";
            csvSPD += "Código Fornecedor;";
            csvSPD += "Nome Fornecedor;";
            csvSPD += "CNPJ Fornecedor;";
            csvSPD += "Natureza;";
            csvSPD += "Data Entrada;";
            csvSPD += "Data Vencimento;";
            csvSPD += "Valor;";
            csvSPD += "Condição Pagamento;";
            csvSPD += "Requisitante;";
            csvSPD += "Localização;";
            csvSPD += "Forma Pagamento;";
            csvSPD += "Centro Custo;";
        
            csvSPD += "\n";
        
            for(let int = 0; int < dadosCSVSPD.length; int++){
                csvSPD += dadosCSVSPD[int]["codigoFluig"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["status"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["tipoSolicitacao"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["nomeFilial"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["codigoFornecedor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["nomeFornecedor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["cnpjFornecedor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["natureza"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataEntrada"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataVencimento"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["valor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["condicao"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["requisitante"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["localizacao"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["formaPagamento"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["centroCusto"].toString() + ";";
                csvSPD += "\n";
            }
            console.log(csvSPD);
            let downloadLinkSPD = document.createElement("a");
            downloadLinkSPD.download = "SPD.csv";
            downloadLinkSPD.href = window.URL.createObjectURL(new Blob([csvSPD], {type: "text/csv"}));
            downloadLinkSPD.style.display = "none";
            document.body.appendChild(downloadLinkSPD);
            downloadLinkSPD.click();
        };

        const gerarCSVAvancadoSPD = (dadosCSVSPD) => {
            let csvSPD = "\uFEFF";
        
            csvSPD += "Código Fluig;";
            csvSPD += "Status;";
            csvSPD += "Tipo Solicitação;";
            csvSPD += "Nome Filial;";
            csvSPD += "Código Fornecedor;";
            csvSPD += "Nome Fornecedor;";
            csvSPD += "CNPJ Fornecedor;";
            csvSPD += "Natureza;";
            csvSPD += "Data Entrada;";
            csvSPD += "Data Vencimento;";
            csvSPD += "Valor;";
            csvSPD += "Condição;";
            csvSPD += "Requisitante;";
            csvSPD += "Localização;";
            csvSPD += "Forma Pagamento;";
            csvSPD += "Centro de Custo;";
            csvSPD += "Supervisor;";
            csvSPD += "Coordenador;";
            csvSPD += "Gerente;";
            csvSPD += "Diretor;";
            csvSPD += "Data/Hora Disponibilidade Célula Fiscal;";
            csvSPD += "Data/Hora Ínicio Atividade;";
            csvSPD += "Data/Hora Fim Atividade;";
            csvSPD += "Usuário Célula Fiscal;";
            csvSPD += "Data/Hora Disponibilidade Contas Pagar;";
            csvSPD += "Data/Hora Ínicio Atividade;";
            csvSPD += "Data/Hora Fim Atividade;";
            csvSPD += "Usuário Contas Pagar;";
            csvSPD += "Data/Hora Disponibilidade Supervisor;";
            csvSPD += "Data/Hora Fim Supervisor;";
            csvSPD += "Usuário Supervisor;";
            csvSPD += "Data/Hora Disponibilidade Coordenador;";
            csvSPD += "Data/Hora Fim Coordenador;";
            csvSPD += "Usuário Coordenador;";
            csvSPD += "Data/Hora Disponibilidade Gerente;";
            csvSPD += "Data/Hora Fim Gerente;";
            csvSPD += "Usuário Gerente;";
            csvSPD += "Data/Hora Disponibilidade Diretor;";
            csvSPD += "Data/Hora Fim Diretor;";
            csvSPD += "Usuário Diretor;";
        
            csvSPD += "\n";
        
            for(let int = 0; int < dadosCSVSPD.length; int++){
                csvSPD += dadosCSVSPD[int]["codigoFluig"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["status"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["tipoSolicitacao"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["nomeFilial"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["codigoFornecedor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["nomeFornecedor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["cnpjFornecedor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["natureza"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataEntrada"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataVencimento"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["valor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["condicao"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["requisitante"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["localizacao"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["formaPagamento"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["centroCusto"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["supervisor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["coordenador"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["gerente"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["diretor"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataDisponibilidadeCF"] + ";";
                csvSPD += dadosCSVSPD[int]["dataAssumiuCF"] + ";";
                csvSPD += dadosCSVSPD[int]["dataFinalizouCF"] + ";";
                csvSPD += dadosCSVSPD[int]["usuarioCF"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataDisponibilidadeCP"] + ";";
                csvSPD += dadosCSVSPD[int]["dataAssumiuCP"] + ";";
                csvSPD += dadosCSVSPD[int]["dataFinalizouCP"] + ";";
                csvSPD += dadosCSVSPD[int]["usuarioCP"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataDisponibilidadeS"] + ";";
                csvSPD += dadosCSVSPD[int]["dataFinalizouS"] + ";";
                csvSPD += dadosCSVSPD[int]["usuarioS"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataDisponibilidadeC"] + ";";
                csvSPD += dadosCSVSPD[int]["dataFinalizouC"] + ";";
                csvSPD += dadosCSVSPD[int]["usuarioC"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataDisponibilidadeG"] + ";";
                csvSPD += dadosCSVSPD[int]["dataFinalizouG"] + ";";
                csvSPD += dadosCSVSPD[int]["usuarioG"].toString() + ";";
                csvSPD += dadosCSVSPD[int]["dataDisponibilidadeD"] + ";";
                csvSPD += dadosCSVSPD[int]["dataFinalizouD"] + ";";
                csvSPD += dadosCSVSPD[int]["usuarioD"].toString() + ";";
                csvSPD += "\n";
            }
            console.log(csvSPD);
            let downloadLinkSPD = document.createElement("a");
            downloadLinkSPD.download = "SPD.csv";
            downloadLinkSPD.href = window.URL.createObjectURL(new Blob([csvSPD], {type: "text/csv"}));
            downloadLinkSPD.style.display = "none";
            document.body.appendChild(downloadLinkSPD);
            downloadLinkSPD.click();
        };

        btnConsultarSPD.on('click', () => {
            let myLoadingSPD = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingSPD.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsSPD();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetSPD;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSPD = DatasetFactory.getDataset("dsSolicitaçãodepagamentoDiversos", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSPD = DatasetFactory.getDataset("dsPagamentosDiversos", null, constraints, null); // Produção
                }
                console.log("datasetSPD");
                console.log(datasetSPD);
                if(datasetSPD.length > 0 || datasetSPD.values){
                    $("#tableSPD tbody").html("");
                    dadosSPD = [];
                    let usuarioComPermissao = true;
                    let solicitacoesSPD = datasetSPD.values;
                    for(let i = 0; i < solicitacoesSPD.length; i++){
                        const solicitacao = solicitacoesSPD[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingSPD.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"];
                        if(codigoFluig == null) codigoFluig = "";
                        
                        let status = solicitacao["Status"];
                        if(status == null) status = "";
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "Em Analise pela Célula Fiscal") status = "Aberto";
                        if(status == "SP Reprovada") status = "Aberto";
                        if(status == "SP Encaminhada Para Pagamento") status = "Aberto";
                        if(status == "Em análise TI") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "Cancelada") status = "Cancelado";
                        if(status == "SP - Pagamento Programado") status = "Finalizado";

                        let tipoSolicitacao = solicitacao["idSolicitacao"].slice(0,3);
                        if(tipoSolicitacao == null) tipoSolicitacao = "";

                        let nomeFilial = solicitacao["zoomFilial"];
                        if(nomeFilial == null) nomeFilial = "";

                        let codigoFornecedor = solicitacao["inputCodFornecedor"];
                        if(codigoFornecedor == null) codigoFornecedor = "";

                        let nomeFornecedor = "";
                        if(solicitacao["inputFornecedor"] != null && solicitacao["inputFornecedor"].match("Nome")){
                            nomeFornecedor = solicitacao["inputFornecedor"].split(" | ")[1].replace("Nome: ","");
                        }else{
                            nomeFornecedor = solicitacao["inputFornecedor"];
                        }

                        let cnpjFornecedor = solicitacao["cnpj"];
                        if(cnpjFornecedor == null) cnpjFornecedor = "";
                        
                        let natureza = solicitacao["colabForn"];
                        if(natureza == null) natureza = "";

                        let dataEntrada = solicitacao["dataEntrada"];
                        if(dataEntrada == null) dataEntrada = "";

                        let dataVencimento = solicitacao["dataVencimentoDiversos"];
                        if(dataVencimento == null) dataVencimento = "";
                        
                        let valor = solicitacao["valorTotalDocumento"];
                        if(valor == null) valor = "";

                        let condicao = solicitacao["tipoPagamento"];
                        if(condicao == null) condicao = "";
                        
                        let requisitante = solicitacao["solicitanteNome"];
                        if(requisitante == null) requisitante = "";

                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "5") localizacao = "Supervisor";
                        if(atividadeAtual == "17") localizacao = "Coordenador";
                        if(atividadeAtual == "9") localizacao = "Coordenador";
                        if(atividadeAtual == "86") localizacao = "Correção";
                        if(atividadeAtual == "21") localizacao = "Gerente";
                        if(atividadeAtual == "23") localizacao = "Diretor";
                        if(atividadeAtual == "35") localizacao = "Célula Fiscal";
                        if(atividadeAtual == "97") localizacao = "Contas a Pagar";
                        if(atividadeAtual == "44") localizacao = "T.I.";

                        let formaPagamento = solicitacao["formaPagamento"];
                        if(formaPagamento == null) formaPagamento = "";

                        let centroCusto = solicitacao["zoomCentroCusto"];
                        if(valor == null) centroCusto = "";

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
                        if(dataDisponibilidadeCF != null && dataDisponibilidadeCF != "") dataDisponibilidadeCF = convertDateTimeSPD(dataDisponibilidadeCF);
                        
                        let dataAssumiuCF = solicitacao["dataAssumiuCF"];
                        if(dataAssumiuCF == null) dataAssumiuCF = "";
                        if(dataAssumiuCF != null && dataAssumiuCF != "") dataAssumiuCF = convertDateTimeSPD(dataAssumiuCF);
                        
                        let dataFinalizouCF = solicitacao["dataFinalizouCF"];
                        if(dataFinalizouCF == null) dataFinalizouCF = "";
                        if(dataFinalizouCF != null && dataFinalizouCF != "") dataFinalizouCF = convertDateTimeSPD(dataFinalizouCF);
                        
                        let usuarioCF = solicitacao["usuarioCF"];
                        if(usuarioCF == null) usuarioCF = ""
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeSPD(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeSPD(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeSPD(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeSPD(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeSPD(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeSPD(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeSPD(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeSPD(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeSPD(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeSPD(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        dadosSPD.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "tipoSolicitacao" : tipoSolicitacao,
                            "nomeFilial" : nomeFilial,
                            "codigoFornecedor" : codigoFornecedor,
                            "nomeFornecedor" : nomeFornecedor,
                            "cnpjFornecedor" : cnpjFornecedor,
                            "natureza" : natureza,
                            "dataEntrada" : dataEntrada,
                            "dataVencimento" : dataVencimento,
                            "valor" : valor,
                            "condicao" : condicao,
                            "requisitante" : requisitante,
                            "localizacao" : localizacao,
                            "formaPagamento" : formaPagamento,
                            "centroCusto" : centroCusto,
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
                        createTableSPD(dadosSPD);
                        myLoadingSPD.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesSPD.length} registros!`,type: 'success'});
                        btnExportarSPD.on('click', () => {
                            let switchExportacaoAvancadaSPD = $("#switchExportacaoAvancadaSPD");
                            console.log(switchExportacaoAvancadaSPD);
                            console.log(switchExportacaoAvancadaSPD.is(":checked"));
                            if(switchExportacaoAvancadaSPD.is(":checked")){
                                gerarCSVAvancadoSPD(dadosSPD);
                            }else{
                                gerarCSVSPD(dadosSPD);
                            }
                        });
                    }
                }else{
                    myLoadingSPD.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});