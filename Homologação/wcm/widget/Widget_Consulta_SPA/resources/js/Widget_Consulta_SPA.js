var MyWidgetSPA = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoSPA = $("#inputNumeroFluxoSPA");
        let inputValorTotalSPA = $("#inputValorTotalSPA");
        let selectStatusSPA = $("#selectStatusSPA");
        let inputNomeFilialSPA = $("#inputNomeFilialSPA");
        let inputNomeFornecedorSPA = $("#inputNomeFornecedorSPA");
        let inputCNPJFornecedorSPA = $("#inputCNPJFornecedorSPA");
        let selectNaturezaSPA = $("#selectNaturezaSPA");
        let inputDataEntradaSPA = $("#inputDataEntradaSPA");
        let inputMesEntradaSPA = $("#inputMesEntradaSPA");
        let inputAnoEntradaSPA = $("#inputAnoEntradaSPA");
        let inputDataVencimentoSPA = $("#inputDataVencimentoSPA");
        let inputMesVencimentoSPA = $("#inputMesVencimentoSPA");
        let inputAnoVencimentoSPA = $("#inputAnoVencimentoSPA");
        let selectTipoPagamentoSPA = $("#selectTipoPagamentoSPA");
        let inputNomeSolicitanteSPA = $("#inputNomeSolicitanteSPA");
        let inputMatriculaSolicitanteSPA = $("#inputMatriculaSolicitanteSPA");
        let selectAtividadeSPA = $("#selectAtividadeSPA");
        let selectFormaPagamentoSPA = $("#selectFormaPagamentoSPA");
        let inputCentroCustoSPA = $("#inputCentroCustoSPA");
        let inputNomeSupervisorSPA = $("#inputNomeSupervisorSPA");
        let inputMatriculaSupervisorSPA = $("#inputMatriculaSupervisorSPA");
        let inputNomeCoordenadorSPA = $("#inputNomeCoordenadorSPA");
        let inputMatriculaCoordenadorSPA = $("#inputMatriculaCoordenadorSPA");
        let inputNomeGerenteSPA = $("#inputNomeGerenteSPA");
        let inputMatriculaGerenteSPA = $("#inputMatriculaGerenteSPA");
        let inputNomeDiretorSPA = $("#inputNomeDiretorSPA");
        let inputMatriculaDiretorSPA = $("#inputMatriculaDiretorSPA");
        let btnConsultarSPA = $("#btnConsultarSPA");
        let btnExportarSPA = $("#btnExportarSPA");
        let tableSPA = $("#tableSPA");
        let dadosSPA = [];

        $('#inputValorTotalSPA').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const centroCustoSPA = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoSPA",{
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

        btnExportarSPA.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaSPA');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPA', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSPA', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteSPA",{
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
            FLUIGC.filter("#inputNomeSupervisorSPA",{
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
            FLUIGC.filter("#inputNomeCoordenadorSPA",{
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
            FLUIGC.filter("#inputNomeGerenteSPA",{
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
            FLUIGC.filter("#inputNomeDiretorSPA",{
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
            inputNomeSolicitanteSPA.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteSPA.val(matricula);
                }
            });
            inputNomeSupervisorSPA.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorSPA.val(matricula);
                }
            });
            inputNomeCoordenadorSPA.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorSPA.val(matricula);
                }
            });
            inputNomeGerenteSPA.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteSPA.val(matricula);
                }
            });
            inputNomeDiretorSPA.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorSPA.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorSPA]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorSPA").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorSPA").show();
                $("#divCoordenadorSPA").show();
                $("#divGerenteSPA").show();
                $("#divDiretorSPA").show();
            }
            if(filtrar == false){
                $("#divSupervisorSPA").hide();
                $("#divCoordenadorSPA").hide();
                $("#divGerenteSPA").hide();
                $("#divDiretorSPA").hide();
            }
        });

        const convertDateTimeSPA = (data) => {
            if(data != "" && data != null){
                try {
                    console.log(data);
                    var dataTratada = data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0];
                    console.log(dataTratada);
                    
                    var horaTratada = data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].replace(".0","");
                    console.log(horaTratada);
    
                    return dataTratada + " " + horaTratada;
                } catch (error) {
                    return convertDate2(data);
                }
            }else{
                return data;
            }
        }

        const convertDateSPA = (data) => data != "" && data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsSPA = () => {
            const constraintsSPA = [];
            if(inputNumeroFluxoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoSPA.val(), inputNumeroFluxoSPA.val(), ConstraintType.MUST));
                return constraintsSPA;
            }
            if(inputValorTotalSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalSPA.val(), inputValorTotalSPA.val(), ConstraintType.MUST));
            }
            if(selectStatusSPA.val() != ""){
                if(selectStatusSPA.val() == "aberto"){
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "Encaminhado para Célula Fiscal", "Encaminhado para Célula Fiscal", ConstraintType.SHOULD));
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "Em análise TI", "Em análise TI", ConstraintType.SHOULD));
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "SP Encaminhada Para Pagamento", "SP Encaminhada Para Pagamento", ConstraintType.SHOULD));
                }
                if(selectStatusSPA.val() == "cancelado"){
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "Cncelado", "Cncelado", ConstraintType.SHOULD));
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.SHOULD));
                }
                if(selectStatusSPA.val() == "finalizado"){
                    constraintsSPA.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialSPA.val(), inputNomeFilialSPA.val(), ConstraintType.MUST, true));
            }
            if(selectTipoPagamentoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoSPA.val(), selectTipoPagamentoSPA.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("dataEntrada", convertDateSPA(inputDataEntradaSPA.val()), convertDateSPA(inputDataEntradaSPA.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaSPA.val(), inputMesEntradaSPA.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaSPA.val(), inputAnoEntradaSPA.val(), ConstraintType.MUST));
            }
            if(selectNaturezaSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("colabForn", selectNaturezaSPA.val(), selectNaturezaSPA.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("dataVencimento", convertDateSPA(inputDataVencimentoSPA.val()), convertDateSPA(inputDataVencimentoSPA.val()), ConstraintType.MUST));
            }
            if(inputMesVencimentoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("mesVencimento", inputMesVencimentoSPA.val(), inputMesVencimentoSPA.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("anoVencimento", inputAnoVencimentoSPA.val(), inputAnoVencimentoSPA.val(), ConstraintType.MUST));
            }
            if(selectAtividadeSPA.val() != ""){
                if(selectAtividadeSPA.val() == "supervisor") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "3", "3", ConstraintType.MUST));
                if(selectAtividadeSPA.val() == "coordenador"){
                    constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "7", "7", ConstraintType.SHOULD));
                    constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.SHOULD));
                }
                if(selectAtividadeSPA.val() == "correcao") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "26", "26", ConstraintType.MUST));
                if(selectAtividadeSPA.val() == "gerente") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.MUST));
                if(selectAtividadeSPA.val() == "diretor") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "10", "10", ConstraintType.MUST));
                if(selectAtividadeSPA.val() == "fiscal") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "12", "12", ConstraintType.MUST));
                if(selectAtividadeSPA.val() == "contasPagar") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "28", "28", ConstraintType.MUST));
                if(selectAtividadeSPA.val() == "ti") constraintsSPA.push(DatasetFactory.createConstraint("atividadeAtual", "14", "14", ConstraintType.MUST));
            }
            if(inputNomeFornecedorSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorSPA.val(), inputNomeFornecedorSPA.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorSPA.val(), inputCNPJFornecedorSPA.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteSPA.val(), inputMatriculaSolicitanteSPA.val(), ConstraintType.MUST));
            }
            if(selectFormaPagamentoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("formaPagamento", selectFormaPagamentoSPA.val(), selectFormaPagamentoSPA.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoSPA.val(), inputCentroCustoSPA.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorSPA.val(), inputMatriculaSupervisorSPA.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorSPA.val(), inputMatriculaCoordenadorSPA.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteSPA.val(), inputMatriculaGerenteSPA.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorSPA.val() != ""){
                constraintsSPA.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorSPA.val(), inputMatriculaDiretorSPA.val(), ConstraintType.MUST));
            }
            
            return constraintsSPA;
        }

        const createTableSPA = (dadosTableSPA) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableSPA);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableSPA > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableSPA.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableSPA[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableSPA[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableSPA[i]["status"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["tipoSolicitacao"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["codigoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["cnpjFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["natureza"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["dataVencimento"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["formaPagamento"] +'</td>'+
                                '<td>'+ dadosTableSPA[i]["centroCusto"] +'</td>'+
                            "</tr>";
                }
                tableSPA.append(tr);
                $('#numeracaoSPA').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableSPA.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoSPA').prop('disabled', dadosTableSPA.length <= tamanhoPagina || pagina > dadosTableSPA.length / tamanhoPagina - 1);
                $('#anteriorSPA').prop('disabled', dadosTableSPA.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoSPA').click(()=>{
                if(pagina < dadosTableSPA.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorSPA').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVSPA = (dadosCSVSPA) => {
            let csvSPA = "\uFEFF";
        
            csvSPA += "Código Fluig;";
            csvSPA += "Status;";
            csvSPA += "Tipo Solicitação;";
            csvSPA += "Filial;";
            csvSPA += "Código Fornecedor;";
            csvSPA += "Nome Fornecedor;";
            csvSPA += "CNPJ Fornecedor;";
            csvSPA += "Natureza;";
            csvSPA += "Data Entrada;";
            csvSPA += "Data Vencimento;";
            csvSPA += "Valor;";
            csvSPA += "Condição Pagamento;";
            csvSPA += "Requisitante;";
            csvSPA += "Localização;";
            csvSPA += "Forma Pagamento;";
            csvSPA += "Centro Custo;";
        
            csvSPA += "\n";
        
            for(let int = 0; int < dadosCSVSPA.length; int++){
                csvSPA += dadosCSVSPA[int]["codigoFluig"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["status"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["tipoSolicitacao"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["nomeFilial"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["codigoFornecedor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["nomeFornecedor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["cnpjFornecedor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["natureza"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataEntrada"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataVencimento"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["valor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["condicao"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["requisitante"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["localizacao"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["formaPagamento"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["centroCusto"].toString() + ";";
                csvSPA += "\n";
            }
            console.log(csvSPA);
            let downloadLinkSPA = document.createElement("a");
            downloadLinkSPA.download = "SPA.csv";
            downloadLinkSPA.href = window.URL.createObjectURL(new Blob([csvSPA], {type: "text/csv"}));
            downloadLinkSPA.style.display = "none";
            document.body.appendChild(downloadLinkSPA);
            downloadLinkSPA.click();
        };

        const gerarCSVAvancadoSPA = (dadosCSVSPA) => {
            let csvSPA = "\uFEFF";
        
            csvSPA += "Código Fluig;";
            csvSPA += "Status;";
            csvSPA += "Tipo Solicitação;";
            csvSPA += "Nome Filial;";
            csvSPA += "Código Fornecedor;";
            csvSPA += "Nome Fornecedor;";
            csvSPA += "CNPJ Fornecedor;";
            csvSPA += "Natureza;";
            csvSPA += "Data Entrada;";
            csvSPA += "Data Vencimento;";
            csvSPA += "Valor;";
            csvSPA += "Condição;";
            csvSPA += "Requisitante;";
            csvSPA += "Localização;";
            csvSPA += "Forma Pagamento;";
            csvSPA += "Centro de Custo;";
            csvSPA += "Supervisor;";
            csvSPA += "Coordenador;";
            csvSPA += "Gerente;";
            csvSPA += "Diretor;";
            csvSPA += "Data/Hora Disponibilidade Célula Fiscal;";
            csvSPA += "Data/Hora Ínicio Atividade;";
            csvSPA += "Data/Hora Fim Atividade;";
            csvSPA += "Usuário Célula Fiscal;";
            csvSPA += "Data/Hora Disponibilidade Contas Pagar;";
            csvSPA += "Data/Hora Ínicio Atividade;";
            csvSPA += "Data/Hora Fim Atividade;";
            csvSPA += "Usuário Contas Pagar;";
            csvSPA += "Data/Hora Disponibilidade Supervisor;";
            csvSPA += "Data/Hora Fim Supervisor;";
            csvSPA += "Usuário Supervisor;";
            csvSPA += "Data/Hora Disponibilidade Coordenador;";
            csvSPA += "Data/Hora Fim Coordenador;";
            csvSPA += "Usuário Coordenador;";
            csvSPA += "Data/Hora Disponibilidade Gerente;";
            csvSPA += "Data/Hora Fim Gerente;";
            csvSPA += "Usuário Gerente;";
            csvSPA += "Data/Hora Disponibilidade Diretor;";
            csvSPA += "Data/Hora Fim Diretor;";
            csvSPA += "Usuário Diretor;";
        
            csvSPA += "\n";
        
            for(let int = 0; int < dadosCSVSPA.length; int++){
                csvSPA += dadosCSVSPA[int]["codigoFluig"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["status"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["tipoSolicitacao"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["nomeFilial"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["codigoFornecedor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["nomeFornecedor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["cnpjFornecedor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["natureza"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataEntrada"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataVencimento"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["valor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["condicao"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["requisitante"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["localizacao"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["formaPagamento"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["centroCusto"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["supervisor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["coordenador"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["gerente"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["diretor"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataDisponibilidadeCF"] + ";";
                csvSPA += dadosCSVSPA[int]["dataAssumiuCF"] + ";";
                csvSPA += dadosCSVSPA[int]["dataFinalizouCF"] + ";";
                csvSPA += dadosCSVSPA[int]["usuarioCF"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataDisponibilidadeCP"] + ";";
                csvSPA += dadosCSVSPA[int]["dataAssumiuCP"] + ";";
                csvSPA += dadosCSVSPA[int]["dataFinalizouCP"] + ";";
                csvSPA += dadosCSVSPA[int]["usuarioCP"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataDisponibilidadeS"] + ";";
                csvSPA += dadosCSVSPA[int]["dataFinalizouS"] + ";";
                csvSPA += dadosCSVSPA[int]["usuarioS"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataDisponibilidadeC"] + ";";
                csvSPA += dadosCSVSPA[int]["dataFinalizouC"] + ";";
                csvSPA += dadosCSVSPA[int]["usuarioC"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataDisponibilidadeG"] + ";";
                csvSPA += dadosCSVSPA[int]["dataFinalizouG"] + ";";
                csvSPA += dadosCSVSPA[int]["usuarioG"].toString() + ";";
                csvSPA += dadosCSVSPA[int]["dataDisponibilidadeD"] + ";";
                csvSPA += dadosCSVSPA[int]["dataFinalizouD"] + ";";
                csvSPA += dadosCSVSPA[int]["usuarioD"].toString() + ";";
                csvSPA += "\n";
            }
            console.log(csvSPA);
            let downloadLinkSPA = document.createElement("a");
            downloadLinkSPA.download = "SPA.csv";
            downloadLinkSPA.href = window.URL.createObjectURL(new Blob([csvSPA], {type: "text/csv"}));
            downloadLinkSPA.style.display = "none";
            document.body.appendChild(downloadLinkSPA);
            downloadLinkSPA.click();
        };

        btnConsultarSPA.on('click', () => {
            let myLoadingSPA = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingSPA.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsSPA();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetSPA;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSPA = DatasetFactory.getDataset("dsSolicitacaoPagamentoFornecedores", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSPA = DatasetFactory.getDataset("ds_SolicitacaoPagamentoFornecedores", null, constraints, null); // Produção
                }
                console.log("datasetSPA");
                console.log(datasetSPA);
                if(datasetSPA.length > 0 || datasetSPA.values){
                    $("#tableSPA tbody").html("");
                    dadosSPA = [];
                    let usuarioComPermissao = true;
                    let solicitacoesSPA = datasetSPA.values;
                    for(let i = 0; i < solicitacoesSPA.length; i++){
                        const solicitacao = solicitacoesSPA[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingSPA.hide();
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
                            nomeFornecedor = "";
                        }

                        let cnpjFornecedor = solicitacao["cnpj"];
                        if(cnpjFornecedor == null) cnpjFornecedor = "";
                        
                        let natureza = solicitacao["colabForn"];
                        if(natureza == null) natureza = "";

                        let dataEntrada = solicitacao["dataEntrada"];
                        if(dataEntrada == null) dataEntrada = "";

                        let dataVencimento = solicitacao["dataVencimento"];
                        if(dataVencimento == null) dataVencimento = "";
                        if(dataVencimento != null && dataVencimento != "") dataVencimento = convertDateSPA(dataVencimento);
                        
                        let valor = solicitacao["valorTotalDocumento"];
                        if(valor == null) valor = "";

                        let condicao = solicitacao["tipoPagamento"];
                        if(condicao == null) condicao = "";
                        
                        let requisitante = solicitacao["solicitanteNome"];
                        if(requisitante == null) requisitante = "";

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
                        if(dataDisponibilidadeCF != null && dataDisponibilidadeCF != "") dataDisponibilidadeCF = convertDateTimeSPA(dataDisponibilidadeCF);
                        
                        let dataAssumiuCF = solicitacao["dataAssumiuCF"];
                        if(dataAssumiuCF == null) dataAssumiuCF = "";
                        if(dataAssumiuCF != null && dataAssumiuCF != "") dataAssumiuCF = convertDateTimeSPA(dataAssumiuCF);
                        
                        let dataFinalizouCF = solicitacao["dataFinalizouCF"];
                        if(dataFinalizouCF == null) dataFinalizouCF = "";
                        if(dataFinalizouCF != null && dataFinalizouCF != "") dataFinalizouCF = convertDateTimeSPA(dataFinalizouCF);
                        
                        let usuarioCF = solicitacao["usuarioCF"];
                        if(usuarioCF == null) usuarioCF = ""
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeSPA(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeSPA(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeSPA(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeSPA(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeSPA(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeSPA(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeSPA(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeSPA(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeSPA(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeSPA(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        dadosSPA.push({
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
                        createTableSPA(dadosSPA);
                        myLoadingSPA.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesSPA.length} registros!`,type: 'success'});
                        btnExportarSPA.on('click', () => {
                            let switchExportacaoAvancadaSPA = $("#switchExportacaoAvancadaSPA");
                            console.log(switchExportacaoAvancadaSPA);
                            console.log(switchExportacaoAvancadaSPA.is(":checked"));
                            if(switchExportacaoAvancadaSPA.is(":checked")){
                                gerarCSVAvancadoSPA(dadosSPA);
                            }else{
                                gerarCSVSPA(dadosSPA);
                            }
                        });
                    }
                }else{
                    myLoadingSPA.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});