var MyWidgetSPS = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoSPS = $("#inputNumeroFluxoSPS");
        let inputValorTotalSPS = $("#inputValorTotalSPS");
        let selectStatusSPS = $("#selectStatusSPS");
        let inputNomeFilialSPS = $("#inputNomeFilialSPS");
        let inputNomeFornecedorSPS = $("#inputNomeFornecedorSPS");
        let inputCNPJFornecedorSPS = $("#inputCNPJFornecedorSPS");
        let inputNumeroDocumentoSPS = $("#inputNumeroDocumentoSPS");
        let inputDataEntradaSPS = $("#inputDataEntradaSPS");
        let inputMesEntradaSPS = $("#inputMesEntradaSPS");
        let inputAnoEntradaSPS = $("#inputAnoEntradaSPS");
        let inputDataVencimentoSPS = $("#inputDataVencimentoSPS");
        let inputMesVencimentoSPS = $("#inputMesVencimentoSPS");
        let inputAnoVencimentoSPS = $("#inputAnoVencimentoSPS");
        let selectTipoPagamentoSPS = $("#selectTipoPagamentoSPS");
        let inputNomeSolicitanteSPS = $("#inputNomeSolicitanteSPS");
        let inputMatriculaSolicitanteSPS = $("#inputMatriculaSolicitanteSPS");
        let selectAtividadeSPS = $("#selectAtividadeSPS");
        let selectFormaPagamentoSPS = $("#selectFormaPagamentoSPS");
        let inputContaSPS = $("#inputContaSPS");
        let inputCodigoBarrasSPS = $("#inputCodigoBarrasSPS");
        let inputCentroCustoSPS = $("#inputCentroCustoSPS");
        let inputNomeSupervisorSPS = $("#inputNomeSupervisorSPS");
        let inputMatriculaSupervisorSPS = $("#inputMatriculaSupervisorSPS");
        let inputNomeCoordenadorSPS = $("#inputNomeCoordenadorSPS");
        let inputMatriculaCoordenadorSPS = $("#inputMatriculaCoordenadorSPS");
        let inputNomeGerenteSPS = $("#inputNomeGerenteSPS");
        let inputMatriculaGerenteSPS = $("#inputMatriculaGerenteSPS");
        let inputNomeDiretorSPS = $("#inputNomeDiretorSPS");
        let inputMatriculaDiretorSPS = $("#inputMatriculaDiretorSPS");
        let btnConsultarSPS = $("#btnConsultarSPS");
        let btnExportarSPS = $("#btnExportarSPS");
        let tableSPS = $("#tableSPS");
        let dadosSPS = [];

        let inputNaturezaSPS = $("#inputNaturezaSPS");

        $('#inputValorTotalSPS').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const naturezaSPS = () => {
			const datasetNatureza = DatasetFactory.getDataset("dsNaturezaConcessionarias");
            const result = datasetNatureza.values;
            return result;
        }
        FLUIGC.filter("#inputNaturezaSPS",{
            source: naturezaSPS(),
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

        const centroCustoSPA = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoSPS",{
            source: centroCustoSPA(),
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

        btnExportarSPS.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaSPS');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPS', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            console.log("login: "+login);
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            console.log("matricula: "+matricula);
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPS', false);
                }
            }

            FLUIGC.filter("#inputNomeSolicitanteSPS",{
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
            FLUIGC.filter("#inputNomeSupervisorSPS",{
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
            FLUIGC.filter("#inputNomeCoordenadorSPS",{
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
            FLUIGC.filter("#inputNomeGerenteSPS",{
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
            FLUIGC.filter("#inputNomeDiretorSPS",{
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
            inputNomeSolicitanteSPS.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteSPS.val(matricula);
                }
            });
            inputNomeSupervisorSPS.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorSPS.val(matricula);
                }
            });
            inputNomeCoordenadorSPS.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorSPS.val(matricula);
                }
            });
            inputNomeGerenteSPS.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteSPS.val(matricula);
                }
            });
            inputNomeDiretorSPS.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorSPS.val(matricula);
                }
            });
        }, 3000);
        

        $('input[type=checkbox][name=checkboxFiltrarAprovadorSPS]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorSPS").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorSPS").show();
                $("#divCoordenadorSPS").show();
                $("#divGerenteSPS").show();
                $("#divDiretorSPS").show();
            }
            if(filtrar == false){
                $("#divSupervisorSPS").hide();
                $("#divCoordenadorSPS").hide();
                $("#divGerenteSPS").hide();
                $("#divDiretorSPS").hide();
            }
        });

        const convertDateTimeSPS = (data) => data != "" || data != null ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";

        const convertDateSPS = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsSPS = () => {
            const constraintsSPS = [];
            if(inputNumeroFluxoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoSPS.val(), inputNumeroFluxoSPS.val(), ConstraintType.MUST));
                return constraintsSPS;
            }
            if(inputNaturezaSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("colabForn", inputNaturezaSPS.val(), inputNaturezaSPS.val(), ConstraintType.MUST));
            }
            if(inputValorTotalSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalSPS.val(), inputValorTotalSPS.val(), ConstraintType.MUST));
            }
            if(selectStatusSPS.val() != ""){
                if(selectStatusSPS.val() == "aberto"){
                    constraintsSPS.push(DatasetFactory.createConstraint("Status", "Em aprovação", "Em aprovação", ConstraintType.SHOULD));
                    constraintsSPS.push(DatasetFactory.createConstraint("Status", "Encaminhado para Célula Fiscal", "Encaminhado para Célula Fiscal", ConstraintType.SHOULD));
                    constraintsSPS.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                    constraintsSPS.push(DatasetFactory.createConstraint("Status", "SP Encaminhada Para Pagamento", "SP Encaminhada Para Pagamento", ConstraintType.SHOULD));
                }
                if(selectStatusSPS.val() == "cancelado"){
                    constraintsSPS.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.MUST));
                }
                if(selectStatusSPS.val() == "finalizado"){
                    constraintsSPS.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialSPS.val(), inputNomeFilialSPS.val(), ConstraintType.MUST, true));
            }
            if(inputNomeFornecedorSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorSPS.val(), inputNomeFornecedorSPS.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorSPS.val(), inputCNPJFornecedorSPS.val(), ConstraintType.MUST));
            }
            if(inputNumeroDocumentoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("inputNrNotaFiscal", inputNumeroDocumentoSPS.val(), inputNumeroDocumentoSPS.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("dataEntrada", convertDateSPS(inputDataEntradaSPS.val()), convertDateSPS(inputDataEntradaSPS.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaSPS.val(), inputMesEntradaSPS.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaSPS.val(), inputAnoEntradaSPS.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("dataVencimentoNota", inputDataVencimentoSPS.val(), inputDataVencimentoSPS.val(), ConstraintType.MUST));
            }
            if(inputMesVencimentoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("mesVencimento", inputMesVencimentoSPS.val(), inputMesVencimentoSPS.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("anoVencimento", inputAnoVencimentoSPS.val(), inputAnoVencimentoSPS.val(), ConstraintType.MUST));
            }
            if(selectTipoPagamentoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("tipoRequisicao", selectTipoPagamentoSPS.val(), selectTipoPagamentoSPS.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteSPS.val(), inputMatriculaSolicitanteSPS.val(), ConstraintType.MUST));
            }
            if(selectAtividadeSPS.val() != ""){
                if(selectAtividadeSPS.val() == "supervisor") constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "75", "75", ConstraintType.MUST));
                if(selectAtividadeSPS.val() == "coordenador"){
                    constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "78", "78", ConstraintType.SHOULD));
                    constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.SHOULD));
                }
                if(selectAtividadeSPS.val() == "correcao") constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "26", "26", ConstraintType.MUST));
                if(selectAtividadeSPS.val() == "gerente") constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.MUST));
                if(selectAtividadeSPS.val() == "diretor") constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "10", "10", ConstraintType.MUST));
                if(selectAtividadeSPS.val() == "fiscal"){
                    constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "12", "12", ConstraintType.SHOULD));
                    constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "91", "91", ConstraintType.SHOULD));
                }
                if(selectAtividadeSPS.val() == "ti") constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "17", "17", ConstraintType.MUST));
                if(selectAtividadeSPS.val() == "contasPagar") constraintsSPS.push(DatasetFactory.createConstraint("atividadeAtual", "28", "28", ConstraintType.MUST));
            }
            if(selectFormaPagamentoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("formaPagamento", selectFormaPagamentoSPS.val(), selectFormaPagamentoSPS.val(), ConstraintType.MUST));
            }
            if(inputContaSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("contaPag", inputContaSPS.val(), inputContaSPS.val(), ConstraintType.MUST));
            }
            if(inputCodigoBarrasSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("numBoleto", inputCodigoBarrasSPS.val(), inputCodigoBarrasSPS.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoSPS.val(), inputCentroCustoSPS.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorSPS.val(), inputMatriculaSupervisorSPS.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorSPS.val(), inputMatriculaCoordenadorSPS.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteSPS.val(), inputMatriculaGerenteSPS.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorSPS.val() != ""){
                constraintsSPS.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorSPS.val(), inputMatriculaDiretorSPS.val(), ConstraintType.MUST));
            }
            
            return constraintsSPS;
        }

        const createTableSPS = (dadosTableSPS) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableSPS);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableSPS > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableSPS.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableSPS[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableSPS[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableSPS[i]["status"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["tipoSolicitacao"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["codigoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["cnpjFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["documento"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["dataVencimento"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["formaPagamento"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["codigoBarras"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableSPS[i]["natureza"] +'</td>'+
                            "</tr>";
                }
                tableSPS.append(tr);
                $('#numeracaoSPS').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableSPS.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoSPS').prop('disabled', dadosTableSPS.length <= tamanhoPagina || pagina > dadosTableSPS.length / tamanhoPagina - 1);
                $('#anteriorSPS').prop('disabled', dadosTableSPS.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoSPS').click(()=>{
                if(pagina < dadosTableSPS.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorSPS').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVSPS = (dadosCSVSPS) => {
            let csvSPS = "\uFEFF";
        
            csvSPS += "Código Fluig;";
            csvSPS += "Status;";
            csvSPS += "Tipo Solicitação;";
            csvSPS += "Nome Filial;";
            csvSPS += "Código Fornecedor;";
            csvSPS += "Nome Fornecedor;";
            csvSPS += "CNPJ Fornecedor;";
            csvSPS += "Documento;";
            csvSPS += "Data Entrada;";
            csvSPS += "Data Vencimento;";
            csvSPS += "Valor;";
            csvSPS += "Condição;";
            csvSPS += "Requisitante;";
            csvSPS += "Localização;";
            csvSPS += "Forma Pagamento;";
            csvSPS += "Código Barras;";
            csvSPS += "Centro de Custo;";
            csvSPS += "Natureza;";
        
            csvSPS += "\n";
        
            for(let int = 0; int < dadosCSVSPS.length; int++){
                csvSPS += dadosCSVSPS[int]["codigoFluig"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["status"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["tipoSolicitacao"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["nomeFilial"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["codigoFornecedor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["nomeFornecedor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["cnpjFornecedor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["documento"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataEntrada"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataVencimento"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["valor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["condicao"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["requisitante"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["localizacao"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["formaPagamento"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["codigoBarras"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["centroCusto"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["natureza"].toString() + ";";
                csvSPS += "\n";
            }
            console.log(csvSPS);
            let downloadLinkSPS = document.createElement("a");
            downloadLinkSPS.download = "SPS.csv";
            downloadLinkSPS.href = window.URL.createObjectURL(new Blob([csvSPS], {type: "text/csv"}));
            downloadLinkSPS.style.display = "none";
            document.body.appendChild(downloadLinkSPS);
            downloadLinkSPS.click();
        };

        const gerarCSVAvancadoSPS = (dadosCSVSPS) => {
            let csvSPS = "\uFEFF";
        
            csvSPS += "Código Fluig;";
            csvSPS += "Status;";
            csvSPS += "Tipo Solicitação;";
            csvSPS += "Nome Filial;";
            csvSPS += "Código Fornecedor;";
            csvSPS += "Nome Fornecedor;";
            csvSPS += "CNPJ Fornecedor;";
            csvSPS += "Documento;";
            csvSPS += "Data Entrada;";
            csvSPS += "Data Vencimento;";
            csvSPS += "Valor;";
            csvSPS += "Condição;";
            csvSPS += "Requisitante;";
            csvSPS += "Localização;";
            csvSPS += "Forma Pagamento;";
            csvSPS += "Banco;";
            csvSPS += "Agência;";
            csvSPS += "Conta;";
            csvSPS += "Código Barras;";
            csvSPS += "Centro de Custo;";
            csvSPS += "Natureza;";
            csvSPS += "Supervisor;";
            csvSPS += "Coordenador;";
            csvSPS += "Gerente;";
            csvSPS += "Diretor;";
            csvSPS += "Data/Hora Disponibilidade Célula Fiscal Pré-Integração;";
            csvSPS += "Data/Hora Ínicio Atividade Pré-Integração;";
            csvSPS += "Data/Hora Fim Atividade Pré-Integração;";
            csvSPS += "Usuário Célula Fiscal Pré-Integração;";
            csvSPS += "Data/Hora Disponibilidade Célula Fiscal Pós-Integração;";
            csvSPS += "Data/Hora Ínicio Atividade Pós-Integração;";
            csvSPS += "Data/Hora Fim Atividade Pós-Integração;";
            csvSPS += "Usuário Célula Fiscal Pós-Integração;";
            csvSPS += "Data/Hora Disponibilidade Contas Pagar;";
            csvSPS += "Data/Hora Ínicio Atividade;";
            csvSPS += "Data/Hora Fim Atividade;";
            csvSPS += "Usuário Contas Pagar;";
            csvSPS += "Data/Hora Disponibilidade Supervisor;";
            csvSPS += "Data/Hora Fim Supervisor;";
            csvSPS += "Usuário Supervisor;";
            csvSPS += "Data/Hora Disponibilidade Coordenador;";
            csvSPS += "Data/Hora Fim Coordenador;";
            csvSPS += "Usuário Coordenador;";
            csvSPS += "Data/Hora Disponibilidade Gerente;";
            csvSPS += "Data/Hora Fim Gerente;";
            csvSPS += "Usuário Gerente;";
            csvSPS += "Data/Hora Disponibilidade Diretor;";
            csvSPS += "Data/Hora Fim Diretor;";
            csvSPS += "Usuário Diretor;";
        
            csvSPS += "\n";
        
            for(let int = 0; int < dadosCSVSPS.length; int++){
                csvSPS += dadosCSVSPS[int]["codigoFluig"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["status"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["tipoSolicitacao"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["nomeFilial"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["codigoFornecedor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["nomeFornecedor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["cnpjFornecedor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["documento"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataEntrada"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataVencimento"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["valor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["condicao"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["requisitante"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["localizacao"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["formaPagamento"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["banco"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["agencia"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["conta"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["codigoBarras"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["centroCusto"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["natureza"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["supervisor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["coordenador"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["gerente"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["diretor"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeCF"] + ";";
                csvSPS += dadosCSVSPS[int]["dataAssumiuCF"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouCF"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioCF"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeCFA"] + ";";
                csvSPS += dadosCSVSPS[int]["dataAssumiuCFA"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouCFA"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioCFA"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeCP"] + ";";
                csvSPS += dadosCSVSPS[int]["dataAssumiuCP"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouCP"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioCP"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeS"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouS"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioS"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeC"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouC"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioC"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeG"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouG"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioG"].toString() + ";";
                csvSPS += dadosCSVSPS[int]["dataDisponibilidadeD"] + ";";
                csvSPS += dadosCSVSPS[int]["dataFinalizouD"] + ";";
                csvSPS += dadosCSVSPS[int]["usuarioD"].toString() + ";";
                csvSPS += "\n";
            }
            console.log(csvSPS);
            let downloadLinkSPS = document.createElement("a");
            downloadLinkSPS.download = "SPS.csv";
            downloadLinkSPS.href = window.URL.createObjectURL(new Blob([csvSPS], {type: "text/csv"}));
            downloadLinkSPS.style.display = "none";
            document.body.appendChild(downloadLinkSPS);
            downloadLinkSPS.click();
        };

        btnConsultarSPS.on('click', () => {
            let myLoadingSPS = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingSPS.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsSPS();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetSPS;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSPS = DatasetFactory.getDataset("dsPagamentoconcessionarias", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSPS = DatasetFactory.getDataset("ds_PagamentoConcessionarias", null, constraints, null); // Produção
                }
                console.log("datasetSPS");
                console.log(datasetSPS);
                if(datasetSPS.length > 0 || datasetSPS.values){
                    $("#tableSPS tbody").html("");
                    dadosSPS = [];
                    let usuarioComPermissao = true;
                    let solicitacoesSPS = datasetSPS.values;
                    for(let i = 0; i < solicitacoesSPS.length; i++){
                        const solicitacao = solicitacoesSPS[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingSPS.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"];
                        if(codigoFluig == null) codigoFluig = "";

                        let natureza = solicitacao["colabForn"];
                        if(natureza == null) natureza = "";

                        let status = solicitacao["Status"];
                        if(status == null) status = "";
                        if(status == "Encaminhado para Célula Fiscal") status = "Aberto";
                        if(status == "SP Encaminhada Para Pagamento") status = "Aberto";
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "SP Reprovada") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "SP - Pagamento Programado") status = "Finalizado";

                        let tipoSolicitacao = "";
                        if(solicitacao["idSolicitacao"] == "" || solicitacao["idSolicitacao"] == null) tipoSolicitacao = "SPS";
                        else tipoSolicitacao = solicitacao["idSolicitacao"].slice(0,3);

                        let nomeFilial = solicitacao["zoomFilial"];
                        if(nomeFilial == null) nomeFilial = "";

                        let codigoFornecedor = solicitacao["inputCodFornecedor"];
                        if(codigoFornecedor == null) codigoFornecedor = "";

                        let nomeFornecedor = "";
                        if(solicitacao["inputFornecedor"] == "" || solicitacao["inputFornecedor"] == null) nomeFornecedor = "";
                        else if(solicitacao["inputFornecedor"].match("Nome")) nomeFornecedor = solicitacao["inputFornecedor"].split(" | ")[1].replace("Nome: ","");
                        else nomeFornecedor = solicitacao["inputFornecedor"];

                        let cnpjFornecedor = solicitacao["cnpj"];
                        if(cnpjFornecedor == null) cnpjFornecedor = "";

                        let documento = solicitacao["numeroNota"];
                        if(documento == null) documento = "";

                        let dataEntrada = solicitacao["dataEntrada"];
                        if(dataEntrada == null) dataEntrada = "";

                        let dataVencimento = "";
                        if(solicitacao["dataVencimentoNota"] == "" || solicitacao["dataVencimentoNota"] == null) dataVencimento = "";
                        else dataVencimento = convertDateSPS(solicitacao["dataVencimentoNota"]);

                        let valor = solicitacao["valorTotalDocumento"];
                        if(valor == null) valor = "";

                        let condicao = solicitacao["tipoRequisicao"];
                        if(condicao == null) condicao = "";

                        let requisitante = solicitacao["solicitanteNome"];
                        if(requisitante == null) requisitante = "";
    
                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "75") localizacao = "Supervisor";
                        if(atividadeAtual == "78") localizacao = "Coordenador";
                        if(atividadeAtual == "5") localizacao = "Coordenador";
                        if(atividadeAtual == "26") localizacao = "Correção";
                        if(atividadeAtual == "9") localizacao = "Gerente";
                        if(atividadeAtual == "10") localizacao = "Diretor";
                        if(atividadeAtual == "12") localizacao = "Célula Fiscal";
                        if(atividadeAtual == "91") localizacao = "Célula Fiscal";
                        if(atividadeAtual == "17") localizacao = "TI";
                        if(atividadeAtual == "28") localizacao = "Contas a Pagar";

                        let formaPagamento = solicitacao["formaPagamento"];
                        if(formaPagamento == null) formaPagamento = "";

                        let banco = solicitacao["bancoPag"];
                        if(banco == null) banco = "";

                        let agencia = solicitacao["agenciaPag"];
                        if(agencia == null) agencia = "";

                        let conta = solicitacao["contaPag"];
                        if(conta == null) conta = "";

                        let codigoBarras = solicitacao["numBoleto"];
                        if(codigoBarras == null) codigoBarras = "";

                        let centroCusto = solicitacao["zoomCentroCusto"];
                        if(centroCusto == null) centroCusto = "";

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
                        if(dataDisponibilidadeCF != null && dataDisponibilidadeCF != "") dataDisponibilidadeCF = convertDateTimeSPS(dataDisponibilidadeCF);
                        
                        let dataAssumiuCF = solicitacao["dataAssumiuCF"];
                        if(dataAssumiuCF == null) dataAssumiuCF = "";
                        if(dataAssumiuCF != null && dataAssumiuCF != "") dataAssumiuCF = convertDateTimeSPS(dataAssumiuCF);
                        
                        let dataFinalizouCF = solicitacao["dataFinalizouCF"];
                        if(dataFinalizouCF == null) dataFinalizouCF = "";
                        if(dataFinalizouCF != null && dataFinalizouCF != "") dataFinalizouCF = convertDateTimeSPS(dataFinalizouCF);
                        
                        let usuarioCF = solicitacao["usuarioCF"];
                        if(usuarioCF == null) usuarioCF = "";

                        let dataDisponibilidadeCFA = solicitacao["dataDisponibilidadeCFA"];
                        if(dataDisponibilidadeCFA == null) dataDisponibilidadeCFA = "";
                        if(dataDisponibilidadeCFA != null && dataDisponibilidadeCFA != "") dataDisponibilidadeCFA = convertDateTimeSPS(dataDisponibilidadeCFA);
                        
                        let dataAssumiuCFA = solicitacao["dataAssumiuCFA"];
                        if(dataAssumiuCFA == null) dataAssumiuCFA = "";
                        if(dataAssumiuCFA != null && dataAssumiuCFA != "") dataAssumiuCFA = convertDateTimeSPS(dataAssumiuCFA);
                        
                        let dataFinalizouCFA = solicitacao["dataFinalizouCFA"];
                        if(dataFinalizouCFA == null) dataFinalizouCFA = "";
                        if(dataFinalizouCFA != null && dataFinalizouCFA != "") dataFinalizouCFA = convertDateTimeSPS(dataFinalizouCFA);
                        
                        let usuarioCFA = solicitacao["usuarioCFA"];
                        if(usuarioCFA == null) usuarioCFA = "";
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeSPS(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeSPS(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeSPS(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeSPS(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeSPS(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeSPS(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeSPS(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeSPS(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeSPS(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeSPS(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        dadosSPS.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "tipoSolicitacao" : tipoSolicitacao,
                            "nomeFilial" : nomeFilial,
                            "codigoFornecedor" : codigoFornecedor,
                            "nomeFornecedor" : nomeFornecedor,
                            "cnpjFornecedor" : cnpjFornecedor,
                            "documento" : documento,
                            "dataEntrada" : dataEntrada,
                            "dataVencimento" : dataVencimento,
                            "valor" : valor,
                            "condicao" : condicao,
                            "requisitante" : requisitante,
                            "localizacao" : localizacao,
                            "formaPagamento" : formaPagamento,
                            "banco" : banco,
                            "agencia" : agencia,
                            "conta" : conta,
                            "codigoBarras" : codigoBarras,
                            "centroCusto" : centroCusto,
                            "natureza" : natureza,
                            "supervisor" : supervisor,
                            "coordenador" : coordenador,
                            "gerente" : gerente,
                            "diretor" : diretor,
                            "dataDisponibilidadeCF" : dataDisponibilidadeCF,
                            "dataAssumiuCF" : dataAssumiuCF,
                            "dataFinalizouCF" : dataFinalizouCF,
                            "usuarioCF" : usuarioCF,
                            "dataDisponibilidadeCFA" : dataDisponibilidadeCFA,
                            "dataAssumiuCFA" : dataAssumiuCFA,
                            "dataFinalizouCFA" : dataFinalizouCFA,
                            "usuarioCFA" : usuarioCFA,
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
                        createTableSPS(dadosSPS);
                        myLoadingSPS.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesSPS.length} registros!`,type: 'success'});
                        btnExportarSPS.on('click', () => {
                            let switchExportacaoAvancadaSPS = $("#switchExportacaoAvancadaSPS");
                            console.log(switchExportacaoAvancadaSPS);
                            console.log(switchExportacaoAvancadaSPS.is(":checked"));
                            if(switchExportacaoAvancadaSPS.is(":checked")){
                                gerarCSVAvancadoSPS(dadosSPS);
                            }else{
                                gerarCSVSPS(dadosSPS);
                            }
                        });
                    }
                }else{
                    myLoadingSPS.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});