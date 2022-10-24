var MyWidgetSPM = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoSPM = $("#inputNumeroFluxoSPM");
        let inputValorTotalSPM = $("#inputValorTotalSPM");
        let selectStatusSPM = $("#selectStatusSPM");
        let inputNomeFilialSPM = $("#inputNomeFilialSPM");
        let inputNomeFornecedorSPM = $("#inputNomeFornecedorSPM");
        let inputCNPJFornecedorSPM = $("#inputCNPJFornecedorSPM");
        let inputNumeroDocumentoSPM = $("#inputNumeroDocumentoSPM");
        let inputDataEntradaSPM = $("#inputDataEntradaSPM");
        let inputMesEntradaSPM = $("#inputMesEntradaSPM");
        let inputAnoEntradaSPM = $("#inputAnoEntradaSPM");
        let inputDataVencimentoSPM = $("#inputDataVencimentoSPM");
        let inputMesVencimentoSPM = $("#inputMesVencimentoSPM");
        let inputAnoVencimentoSPM = $("#inputAnoVencimentoSPM");
        let selectTipoPagamentoSPM = $("#selectTipoPagamentoSPM");
        let inputNomeSolicitanteSPM = $("#inputNomeSolicitanteSPM");
        let inputMatriculaSolicitanteSPM = $("#inputMatriculaSolicitanteSPM");
        let selectAtividadeSPM = $("#selectAtividadeSPM");
        let selectFormaPagamentoSPM = $("#selectFormaPagamentoSPM");
        let inputContaSPM = $("#inputContaSPM");
        let inputCodigoBarrasSPM = $("#inputCodigoBarrasSPM");
        let inputCentroCustoSPM = $("#inputCentroCustoSPM");
        let inputNomeSupervisorSPM = $("#inputNomeSupervisorSPM");
        let inputMatriculaSupervisorSPM = $("#inputMatriculaSupervisorSPM");
        let inputNomeCoordenadorSPM = $("#inputNomeCoordenadorSPM");
        let inputMatriculaCoordenadorSPM = $("#inputMatriculaCoordenadorSPM");
        let inputNomeGerenteSPM = $("#inputNomeGerenteSPM");
        let inputMatriculaGerenteSPM = $("#inputMatriculaGerenteSPM");
        let inputNomeDiretorSPM = $("#inputNomeDiretorSPM");
        let inputMatriculaDiretorSPM = $("#inputMatriculaDiretorSPM");
        let btnConsultarSPM = $("#btnConsultarSPM");
        let btnExportarSPM = $("#btnExportarSPM");
        let tableSPM = $("#tableSPM");
        let dadosSPM = [];

        $('#inputValorTotalSPM').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const centroCustoSPA = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoSPM",{
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

        btnExportarSPM.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaSPM');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPM', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPM', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteSPM",{
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
            FLUIGC.filter("#inputNomeSupervisorSPM",{
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
            FLUIGC.filter("#inputNomeCoordenadorSPM",{
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
            FLUIGC.filter("#inputNomeGerenteSPM",{
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
            FLUIGC.filter("#inputNomeDiretorSPM",{
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
            inputNomeSolicitanteSPM.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteSPM.val(matricula);
                }
            });
            inputNomeSupervisorSPM.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorSPM.val(matricula);
                }
            });
            inputNomeCoordenadorSPM.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorSPM.val(matricula);
                }
            });
            inputNomeGerenteSPM.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteSPM.val(matricula);
                }
            });
            inputNomeDiretorSPM.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorSPM.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorSPM]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorSPM").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorSPM").show();
                $("#divCoordenadorSPM").show();
                $("#divGerenteSPM").show();
                $("#divDiretorSPM").show();
            }
            if(filtrar == false){
                $("#divSupervisorSPM").hide();
                $("#divCoordenadorSPM").hide();
                $("#divGerenteSPM").hide();
                $("#divDiretorSPM").hide();
            }
        });

        const convertDateTimeSPM = (data) => data != "" || data != null ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";

        const convertDateSPM = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsSPM = () => {
            const constraintsSPM = [];
            if(inputNumeroFluxoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoSPM.val(), inputNumeroFluxoSPM.val(), ConstraintType.MUST));
                return constraintsSPM;
            }
            if(inputValorTotalSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalSPM.val(), inputValorTotalSPM.val(), ConstraintType.MUST));
            }
            if(selectStatusSPM.val() != ""){
                if(selectStatusSPM.val() == "aberto"){
                    constraintsSPM.push(DatasetFactory.createConstraint("Status", "Em aprovação", "Em aprovação", ConstraintType.SHOULD));
                    constraintsSPM.push(DatasetFactory.createConstraint("Status", "Encaminhado para Célula Fiscal", "Encaminhado para Célula Fiscal", ConstraintType.SHOULD));
                    constraintsSPM.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                    constraintsSPM.push(DatasetFactory.createConstraint("Status", "SP Encaminhada Para Pagamento", "SP Encaminhada Para Pagamento", ConstraintType.SHOULD));
                }
                if(selectStatusSPM.val() == "cancelado"){
                    constraintsSPM.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.MUST));
                }
                if(selectStatusSPM.val() == "finalizado"){
                    constraintsSPM.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialSPM.val(), inputNomeFilialSPM.val(), ConstraintType.MUST, true));
            }
            if(inputNomeFornecedorSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorSPM.val(), inputNomeFornecedorSPM.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorSPM.val(), inputCNPJFornecedorSPM.val(), ConstraintType.MUST));
            }
            if(inputNumeroDocumentoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("inputNrNotaFiscal", inputNumeroDocumentoSPM.val(), inputNumeroDocumentoSPM.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("dataEntrada", convertDateSPM(inputDataEntradaSPM.val()), convertDateSPM(inputDataEntradaSPM.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaSPM.val(), inputMesEntradaSPM.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaSPM.val(), inputAnoEntradaSPM.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("dataVencimentoNota", inputDataVencimentoSPM.val(), inputDataVencimentoSPM.val(), ConstraintType.MUST));
            }
            if(inputMesVencimentoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("mesVencimentoNota", inputMesVencimentoSPM.val(), inputMesVencimentoSPM.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("anoVencimentoNota", inputAnoVencimentoSPM.val(), inputAnoVencimentoSPM.val(), ConstraintType.MUST));
            }
            if(selectTipoPagamentoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoSPM.val(), selectTipoPagamentoSPM.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteSPM.val(), inputMatriculaSolicitanteSPM.val(), ConstraintType.MUST));
            }
            if(selectAtividadeSPM.val() != ""){
                if(selectAtividadeSPM.val() == "supervisor") constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "27", "27", ConstraintType.MUST));
                if(selectAtividadeSPM.val() == "coordenador"){
                    constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "25", "25", ConstraintType.SHOULD));
                    constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "55", "55", ConstraintType.SHOULD));
                }
                if(selectAtividadeSPM.val() == "correcao") constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "11", "11", ConstraintType.MUST));
                if(selectAtividadeSPM.val() == "gerente") constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "34", "34", ConstraintType.MUST));
                if(selectAtividadeSPM.val() == "diretor") constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "41", "41", ConstraintType.MUST));
                if(selectAtividadeSPM.val() == "fiscal") constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeSPM.val() == "contasPagar") constraintsSPM.push(DatasetFactory.createConstraint("atividadeAtual", "18", "18", ConstraintType.MUST));
            }
            if(selectFormaPagamentoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("formaPagamento", selectFormaPagamentoSPM.val(), selectFormaPagamentoSPM.val(), ConstraintType.MUST));
            }
            if(inputContaSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("contaPag", inputContaSPM.val(), inputContaSPM.val(), ConstraintType.MUST));
            }
            if(inputCodigoBarrasSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("numBoleto", inputCodigoBarrasSPM.val(), inputCodigoBarrasSPM.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoSPM.val(), inputCentroCustoSPM.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorSPM.val(), inputMatriculaSupervisorSPM.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorSPM.val(), inputMatriculaCoordenadorSPM.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteSPM.val(), inputMatriculaGerenteSPM.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorSPM.val() != ""){
                constraintsSPM.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorSPM.val(), inputMatriculaDiretorSPM.val(), ConstraintType.MUST));
            }
            
            return constraintsSPM;
        }

        const createTableSPM = (dadosTableSPM) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableSPM);
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
                $('#tableSPM > tbody > tr').remove();
                let tr = "";
                for(let i = pagina * tamanhoPagina; i < dadosTableSPM.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="'+url+'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableSPM[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableSPM[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableSPM[i]["status"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["tipoSolicitacao"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["codigoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["cnpjFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["documento"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["dataVencimento"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["formaPagamento"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["codigoBarras"] +'</td>'+
                                '<td>'+ dadosTableSPM[i]["centroCusto"] +'</td>'+
                            "</tr>";
                }
                tableSPM.append(tr);
                $('#numeracaoSPM').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableSPM.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoSPM').prop('disabled', dadosTableSPM.length <= tamanhoPagina || pagina > dadosTableSPM.length / tamanhoPagina - 1);
                $('#anteriorSPM').prop('disabled', dadosTableSPM.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoSPM').click(()=>{
                if(pagina < dadosTableSPM.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorSPM').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVSPM = (dadosCSVSPM) => {
            let csvSPM = "\uFEFF";
        
            csvSPM += "Código Fluig;";
            csvSPM += "Status;";
            csvSPM += "Tipo Solicitação;";
            csvSPM += "Nome Filial;";
            csvSPM += "Código Fornecedor;";
            csvSPM += "Nome Fornecedor;";
            csvSPM += "CNPJ Fornecedor;";
            csvSPM += "Documento;";
            csvSPM += "Data Entrada;";
            csvSPM += "Data Vencimento;";
            csvSPM += "Valor;";
            csvSPM += "Condição;";
            csvSPM += "Requisitante;";
            csvSPM += "Localização;";
            csvSPM += "Forma Pagamento;";
            csvSPM += "Código Barras;";
            csvSPM += "Centro de Custo;";
        
            csvSPM += "\n";
        
            for(let int = 0; int < dadosCSVSPM.length; int++){
                csvSPM += dadosCSVSPM[int]["codigoFluig"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["status"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["tipoSolicitacao"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["nomeFilial"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["codigoFornecedor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["nomeFornecedor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["cnpjFornecedor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["documento"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataEntrada"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataVencimento"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["valor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["condicao"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["requisitante"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["localizacao"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["formaPagamento"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["codigoBarras"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["centroCusto"].toString() + ";";
                csvSPM += "\n";
            }
            console.log(csvSPM);
            let downloadLinkSPM = document.createElement("a");
            downloadLinkSPM.download = "SPM.csv";
            downloadLinkSPM.href = window.URL.createObjectURL(new Blob([csvSPM], {type: "text/csv"}));
            downloadLinkSPM.style.display = "none";
            document.body.appendChild(downloadLinkSPM);
            downloadLinkSPM.click();
        };

        const gerarCSVAvancadoSPM = (dadosCSVSPM) => {
            let csvSPM = "\uFEFF";
        
            csvSPM += "Código Fluig;";
            csvSPM += "Status;";
            csvSPM += "Tipo Solicitação;";
            csvSPM += "Nome Filial;";
            csvSPM += "Código Fornecedor;";
            csvSPM += "Nome Fornecedor;";
            csvSPM += "CNPJ Fornecedor;";
            csvSPM += "Documento;";
            csvSPM += "Data Entrada;";
            csvSPM += "Data Vencimento;";
            csvSPM += "Valor;";
            csvSPM += "Condição;";
            csvSPM += "Requisitante;";
            csvSPM += "Localização;";
            csvSPM += "Forma Pagamento;";
            csvSPM += "Banco;";
            csvSPM += "Agência;";
            csvSPM += "Conta;";
            csvSPM += "Código Barras;";
            csvSPM += "Centro de Custo;";
            csvSPM += "Supervisor;";
            csvSPM += "Coordenador;";
            csvSPM += "Gerente;";
            csvSPM += "Diretor;";
            csvSPM += "Data/Hora Disponibilidade Célula Fiscal;";
            csvSPM += "Data/Hora Ínicio Atividade;";
            csvSPM += "Data/Hora Fim Atividade;";
            csvSPM += "Usuário Célula Fiscal;";
            csvSPM += "Data/Hora Disponibilidade Contas Pagar;";
            csvSPM += "Data/Hora Ínicio Atividade;";
            csvSPM += "Data/Hora Fim Atividade;";
            csvSPM += "Usuário Contas Pagar;";
            csvSPM += "Data/Hora Disponibilidade Supervisor;";
            csvSPM += "Data/Hora Fim Supervisor;";
            csvSPM += "Usuário Supervisor;";
            csvSPM += "Data/Hora Disponibilidade Coordenador;";
            csvSPM += "Data/Hora Fim Coordenador;";
            csvSPM += "Usuário Coordenador;";
            csvSPM += "Data/Hora Disponibilidade Gerente;";
            csvSPM += "Data/Hora Fim Gerente;";
            csvSPM += "Usuário Gerente;";
            csvSPM += "Data/Hora Disponibilidade Diretor;";
            csvSPM += "Data/Hora Fim Diretor;";
            csvSPM += "Usuário Diretor;";
        
            csvSPM += "\n";
        
            for(let int = 0; int < dadosCSVSPM.length; int++){
                csvSPM += dadosCSVSPM[int]["codigoFluig"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["status"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["tipoSolicitacao"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["nomeFilial"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["codigoFornecedor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["nomeFornecedor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["cnpjFornecedor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["documento"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataEntrada"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataVencimento"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["valor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["condicao"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["requisitante"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["localizacao"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["formaPagamento"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["banco"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["agencia"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["conta"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["codigoBarras"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["centroCusto"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["supervisor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["coordenador"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["gerente"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["diretor"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataDisponibilidadeCF"] + ";";
                csvSPM += dadosCSVSPM[int]["dataAssumiuCF"] + ";";
                csvSPM += dadosCSVSPM[int]["dataFinalizouCF"] + ";";
                csvSPM += dadosCSVSPM[int]["usuarioCF"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataDisponibilidadeCP"] + ";";
                csvSPM += dadosCSVSPM[int]["dataAssumiuCP"] + ";";
                csvSPM += dadosCSVSPM[int]["dataFinalizouCP"] + ";";
                csvSPM += dadosCSVSPM[int]["usuarioCP"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataDisponibilidadeS"] + ";";
                csvSPM += dadosCSVSPM[int]["dataFinalizouS"] + ";";
                csvSPM += dadosCSVSPM[int]["usuarioS"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataDisponibilidadeC"] + ";";
                csvSPM += dadosCSVSPM[int]["dataFinalizouC"] + ";";
                csvSPM += dadosCSVSPM[int]["usuarioC"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataDisponibilidadeG"] + ";";
                csvSPM += dadosCSVSPM[int]["dataFinalizouG"] + ";";
                csvSPM += dadosCSVSPM[int]["usuarioG"].toString() + ";";
                csvSPM += dadosCSVSPM[int]["dataDisponibilidadeD"] + ";";
                csvSPM += dadosCSVSPM[int]["dataFinalizouD"] + ";";
                csvSPM += dadosCSVSPM[int]["usuarioD"].toString() + ";";
                csvSPM += "\n";
            }
            console.log(csvSPM);
            let downloadLinkSPM = document.createElement("a");
            downloadLinkSPM.download = "SPM.csv";
            downloadLinkSPM.href = window.URL.createObjectURL(new Blob([csvSPM], {type: "text/csv"}));
            downloadLinkSPM.style.display = "none";
            document.body.appendChild(downloadLinkSPM);
            downloadLinkSPM.click();
        };

        btnConsultarSPM.on('click', () => {
            let myLoadingSPM = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingSPM.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsSPM();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetSPM;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSPM = DatasetFactory.getDataset("dsSolicitacaoPagamentoCredenciados", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSPM = DatasetFactory.getDataset("ds_SolicitacaoMedicaoCredenciados", null, constraints, null); // Produção
                }
                console.log("datasetSPM");
                console.log(datasetSPM);
                if(datasetSPM.length > 0 || datasetSPM.values){
                    $("#tableSPM tbody").html("");
                    dadosSPM = [];
                    let usuarioComPermissao = true;
                    let solicitacoesSPM = datasetSPM.values;
                    for(let i = 0; i < solicitacoesSPM.length; i++){
                        const solicitacao = solicitacoesSPM[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingSPM.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"];
                        if(codigoFluig == null) codigoFluig = "";

                        let status = solicitacao["Status"];
                        if(status == null) status = "";
                        if(status == "Encaminhado para Célula Fiscal") status = "Aberto";
                        if(status == "SP Encaminhada Para Pagamento") status = "Aberto";
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "SP Reprovada") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "SP - Pagamento Programado") status = "Finalizado";

                        let tipoSolicitacao = solicitacao["idSolicitacao"].slice(0,3);
                        if(tipoSolicitacao == null) tipoSolicitacao = "";

                        let nomeFilial = solicitacao["zoomFilial"];
                        if(nomeFilial == null) nomeFilial = "";

                        let codigoFornecedor = solicitacao["inputCodFornecedor"];
                        if(codigoFornecedor == null) codigoFornecedor = "";

                        let nomeFornecedor = "";
                        if(solicitacao["inputFornecedor"].match("Nome")){
                            nomeFornecedor = solicitacao["inputFornecedor"].split(" | ")[1].replace("Nome: ","");
                        }else{
                            nomeFornecedor = solicitacao["inputFornecedor"];
                        }

                        let cnpjFornecedor = solicitacao["cnpj"];
                        if(cnpjFornecedor == null) cnpjFornecedor = "";

                        let documento = solicitacao["inputNrNotaFiscal"];
                        if(documento == null) documento = "";

                        let dataEntrada = solicitacao["dataEntrada"];
                        if(dataEntrada == null) dataEntrada = "";

                        let dataVencimento = convertDateSPM(solicitacao["dataVencimentoNota"]);
                        if(dataVencimento == null) dataVencimento = "";

                        let valor = solicitacao["valorTotalDocumento"];
                        if(valor == null) valor = "";

                        let condicao = solicitacao["tipoPagamento"];
                        if(condicao == null) condicao = "";

                        let requisitante = solicitacao["solicitanteNome"];
                        if(requisitante == null) requisitante = "";
    
                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "27") localizacao = "Supervisor";
                        if(atividadeAtual == "25") localizacao = "Coordenador";
                        if(atividadeAtual == "55") localizacao = "Coordenador";
                        if(atividadeAtual == "11") localizacao = "Correção";
                        if(atividadeAtual == "34") localizacao = "Gerente";
                        if(atividadeAtual == "41") localizacao = "Diretor";
                        if(atividadeAtual == "5") localizacao = "Célula Fiscal";
                        if(atividadeAtual == "18") localizacao = "Contas a Pagar";

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
                        if(dataDisponibilidadeCF != null && dataDisponibilidadeCF != "") dataDisponibilidadeCF = convertDateTimeSPM(dataDisponibilidadeCF);
                        
                        let dataAssumiuCF = solicitacao["dataAssumiuCF"];
                        if(dataAssumiuCF == null) dataAssumiuCF = "";
                        if(dataAssumiuCF != null && dataAssumiuCF != "") dataAssumiuCF = convertDateTimeSPM(dataAssumiuCF);
                        
                        let dataFinalizouCF = solicitacao["dataFinalizouCF"];
                        if(dataFinalizouCF == null) dataFinalizouCF = "";
                        if(dataFinalizouCF != null && dataFinalizouCF != "") dataFinalizouCF = convertDateTimeSPM(dataFinalizouCF);
                        
                        let usuarioCF = solicitacao["usuarioCF"];
                        if(usuarioCF == null) usuarioCF = ""
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeSPM(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeSPM(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeSPM(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeSPM(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeSPM(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeSPM(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeSPM(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeSPM(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeSPM(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeSPM(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        dadosSPM.push({
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
                        createTableSPM(dadosSPM);
                        myLoadingSPM.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesSPM.length} registros!`,type: 'success'});
                        btnExportarSPM.on('click', () => {
                            let switchExportacaoAvancadaSPM = $("#switchExportacaoAvancadaSPM");
                            console.log(switchExportacaoAvancadaSPM);
                            console.log(switchExportacaoAvancadaSPM.is(":checked"));
                            if(switchExportacaoAvancadaSPM.is(":checked")){
                                gerarCSVAvancadoSPM(dadosSPM);
                            }else{
                                gerarCSVSPM(dadosSPM);
                            }
                        });
                    }
                }else{
                    myLoadingSPM.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});