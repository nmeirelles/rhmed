var MyWidgetAFP = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoAFP = $("#inputNumeroFluxoAFP");
        let inputValorTotalAFP = $("#inputValorTotalAFP");
        let selectStatusAFP = $("#selectStatusAFP");
        let inputNomeFilialAFP = $("#inputNomeFilialAFP");
        let selectNaturezaAFP = $("#selectNaturezaAFP");
        let inputDataEntradaAFP = $("#inputDataEntradaAFP");
        let inputMesEntradaAFP = $("#inputMesEntradaAFP");
        let inputAnoEntradaAFP = $("#inputAnoEntradaAFP");
        let inputDataVencimentoAFP = $("#inputDataVencimentoAFP");
        let inputMesVencimentoAFP = $("#inputMesVencimentoAFP");
        let inputAnoVencimentoAFP = $("#inputAnoVencimentoAFP");
        let selectTipoPagamentoAFP = $("#selectTipoPagamentoAFP");
        let inputNomeSolicitanteAFP = $("#inputNomeSolicitanteAFP");
        let inputMatriculaSolicitanteAFP = $("#inputMatriculaSolicitanteAFP");
        let selectAtividadeAFP = $("#selectAtividadeAFP");
        let inputCentroCustoAFP = $("#inputCentroCustoAFP");
        let inputNomeSupervisorAFP = $("#inputNomeSupervisorAFP");
        let inputMatriculaSupervisorAFP = $("#inputMatriculaSupervisorAFP");
        let inputNomeCoordenadorAFP = $("#inputNomeCoordenadorAFP");
        let inputMatriculaCoordenadorAFP = $("#inputMatriculaCoordenadorAFP");
        let inputNomeGerenteAFP = $("#inputNomeGerenteAFP");
        let inputMatriculaGerenteAFP = $("#inputMatriculaGerenteAFP");
        let inputNomeDiretorAFP = $("#inputNomeDiretorAFP");
        let inputMatriculaDiretorAFP = $("#inputMatriculaDiretorAFP");
        let btnConsultarAFP = $("#btnConsultarAFP");
        let btnExportarAFP = $("#btnExportarAFP");
        let tableAFP = $("#tableAFP");
        let dadosAFP = [];

        $('#inputValorTotalAFP').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const centroCustoAFP = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoAFP",{
            source: centroCustoAFP(),
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

        btnExportarAFP.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaAFP');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaAFP', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaAFP', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteAFP",{
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
            FLUIGC.filter("#inputNomeSupervisorAFP",{
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
            FLUIGC.filter("#inputNomeCoordenadorAFP",{
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
            FLUIGC.filter("#inputNomeGerenteAFP",{
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
            FLUIGC.filter("#inputNomeDiretorAFP",{
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
            inputNomeSolicitanteAFP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteAFP.val(matricula);
                }
            });
            inputNomeSupervisorAFP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSupervisorAFP.val(matricula);
                }
            });
            inputNomeCoordenadorAFP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaCoordenadorAFP.val(matricula);
                }
            });
            inputNomeGerenteAFP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteAFP.val(matricula);
                }
            });
            inputNomeDiretorAFP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorAFP.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorAFP]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorAFP").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorAFP").show();
                $("#divCoordenadorAFP").show();
                $("#divGerenteAFP").show();
                $("#divDiretorAFP").show();
            }
            if(filtrar == false){
                $("#divSupervisorAFP").hide();
                $("#divCoordenadorAFP").hide();
                $("#divGerenteAFP").hide();
                $("#divDiretorAFP").hide();
            }
        });

        const convertDateTimeAFP = (data) => {
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

        const convertDateAFP = (data) => data != "" && data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsAFP = () => {                        
            const constraintsAFP = [];
            if(inputNumeroFluxoAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoAFP.val(), inputNumeroFluxoAFP.val(), ConstraintType.MUST));
                return constraintsAFP;
            }
            if(inputValorTotalAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalAFP.val(), inputValorTotalAFP.val(), ConstraintType.MUST));
            }
            if(selectStatusAFP.val() != ""){
                if(selectStatusAFP.val() == "aberto"){
                    constraintsAFP.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsAFP.push(DatasetFactory.createConstraint("Status", "Em análise pelo RH", "Em análise pelo RH", ConstraintType.SHOULD));
                }
                if(selectStatusAFP.val() == "cancelado"){
                    constraintsAFP.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.MUST));
                }
                if(selectStatusAFP.val() == "finalizado"){
                    //constraintsAFP.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialAFP.val(), inputNomeFilialAFP.val(), ConstraintType.MUST, true));
            }
            if(selectTipoPagamentoAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoAFP.val(), selectTipoPagamentoAFP.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("dataEntrada", convertDateAFP(inputDataEntradaAFP.val()), convertDateAFP(inputDataEntradaAFP.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaAFP.val(), inputMesEntradaAFP.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaAFP.val(), inputAnoEntradaAFP.val(), ConstraintType.MUST));
            }
            if(selectNaturezaAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("especiePagamento", selectNaturezaAFP.val(), selectNaturezaAFP.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("dataPagamento", inputDataVencimentoAFP.val(), inputDataVencimentoAFP.val(), ConstraintType.MUST));
            }
            if(inputMesVencimentoAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("mesVencimento", inputMesVencimentoAFP.val(), inputMesVencimentoAFP.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("anoVencimento", inputAnoVencimentoAFP.val(), inputAnoVencimentoAFP.val(), ConstraintType.MUST));
            }
            if(selectAtividadeAFP.val() != ""){
                if(selectAtividadeAFP.val() == "supervisor") constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "27", "27", ConstraintType.MUST));
                if(selectAtividadeAFP.val() == "coordenador"){
                    constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "55", "55", ConstraintType.SHOULD));
                    constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "25", "25", ConstraintType.SHOULD));
                }
                if(selectAtividadeAFP.val() == "correcao") constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "11", "11", ConstraintType.MUST));
                if(selectAtividadeAFP.val() == "gerente") constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "34", "34", ConstraintType.MUST));
                if(selectAtividadeAFP.val() == "diretor") constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "41", "41", ConstraintType.MUST));
                if(selectAtividadeAFP.val() == "rh") constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeAFP.val() == "contasPagar") constraintsAFP.push(DatasetFactory.createConstraint("atividadeAtual", "102", "102", ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteAFP.val(), inputMatriculaSolicitanteAFP.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoAFP.val(), inputCentroCustoAFP.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorAFP.val(), inputMatriculaSupervisorAFP.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorAFP.val(), inputMatriculaCoordenadorAFP.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteAFP.val(), inputMatriculaGerenteAFP.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorAFP.val() != ""){
                constraintsAFP.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorAFP.val(), inputMatriculaDiretorAFP.val(), ConstraintType.MUST));
            }
            return constraintsAFP;
        }

        const createTableAFP = (dadosTableAFP) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableAFP);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableAFP > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }

                for(let i = pagina * tamanhoPagina; i < dadosTableAFP.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableAFP[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableAFP[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableAFP[i]["status"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["filial"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["especiePagamento"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["dataPagamento"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableAFP[i]["valor"] +'</td>'+
                            "</tr>";
                }
                tableAFP.append(tr);
                $('#numeracaoAFP').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableAFP.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoAFP').prop('disabled', dadosTableAFP.length <= tamanhoPagina || pagina > dadosTableAFP.length / tamanhoPagina - 1);
                $('#anteriorAFP').prop('disabled', dadosTableAFP.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoAFP').click(()=>{
                if(pagina < dadosTableAFP.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorAFP').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVAFP = (dadosCSVAFP) => {
            let csvAFP = "\uFEFF";
        
            csvAFP += "Código Fluig;";
            csvAFP += "Status;";
            csvAFP += "Filial;";
            csvAFP += "Condição;";
            csvAFP += "Data Entrada;";
            csvAFP += "Espécie Pagamento;";
            csvAFP += "Data Pagamento;";
            csvAFP += "Localização;";
            csvAFP += "Requisitante;";
            csvAFP += "Centro Custo;";
            csvAFP += "Valor;";
        
            csvAFP += "\n";
        
            for(let int = 0; int < dadosCSVAFP.length; int++){
                csvAFP += dadosCSVAFP[int]["codigoFluig"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["status"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["filial"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["condicao"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataEntrada"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["especiePagamento"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataPagamento"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["localizacao"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["requisitante"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["centroCusto"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["valor"].toString() + ";";
                csvAFP += "\n";
            }
            console.log(csvAFP);
            let downloadLinkAFP = document.createElement("a");
            downloadLinkAFP.download = "AFP.csv";
            downloadLinkAFP.href = window.URL.createObjectURL(new Blob([csvAFP], {type: "text/csv"}));
            downloadLinkAFP.style.display = "none";
            document.body.appendChild(downloadLinkAFP);
            downloadLinkAFP.click();
        };

        const gerarCSVAvancadoAFP = (dadosCSVAFP) => {
            let csvAFP = "\uFEFF";
        
            csvAFP += "Código Fluig;";
            csvAFP += "Status;";
            csvAFP += "Filial;";
            csvAFP += "Condição;";
            csvAFP += "Data Entrada;";
            csvAFP += "Espécie Pagamento;";
            csvAFP += "Data Pagamento;";
            csvAFP += "Localização;";
            csvAFP += "Requisitante;";
            csvAFP += "Centro Custo;";
            csvAFP += "Valor;";
            csvAFP += "Supervisor;";
            csvAFP += "Coordenador;";
            csvAFP += "Gerente;";
            csvAFP += "Diretor;";
            csvAFP += "Data/Hora Disponibilidade Recursos Humanos;";
            csvAFP += "Data/Hora Ínicio Atividade;";
            csvAFP += "Data/Hora Fim Atividade;";
            csvAFP += "Usuário Recursos Humanos;";
            csvAFP += "Data/Hora Disponibilidade Contas Pagar;";
            csvAFP += "Data/Hora Ínicio Atividade;";
            csvAFP += "Data/Hora Fim Atividade;";
            csvAFP += "Usuário Contas Pagar;";
            csvAFP += "Data/Hora Disponibilidade Supervisor;";
            csvAFP += "Data/Hora Fim Supervisor;";
            csvAFP += "Usuário Supervisor;";
            csvAFP += "Data/Hora Disponibilidade Coordenador;";
            csvAFP += "Data/Hora Fim Coordenador;";
            csvAFP += "Usuário Coordenador;";
            csvAFP += "Data/Hora Disponibilidade Gerente;";
            csvAFP += "Data/Hora Fim Gerente;";
            csvAFP += "Usuário Gerente;";
            csvAFP += "Data/Hora Disponibilidade Diretor;";
            csvAFP += "Data/Hora Fim Diretor;";
            csvAFP += "Usuário Diretor;";
        
            csvAFP += "\n";
        
            for(let int = 0; int < dadosCSVAFP.length; int++){
                csvAFP += dadosCSVAFP[int]["codigoFluig"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["status"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["filial"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["condicao"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataEntrada"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["especiePagamento"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataPagamento"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["localizacao"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["requisitante"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["centroCusto"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["valor"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["supervisor"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["coordenador"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["gerente"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["diretor"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataDisponibilidadeRH"] + ";";
                csvAFP += dadosCSVAFP[int]["dataAssumiuRH"] + ";";
                csvAFP += dadosCSVAFP[int]["dataFinalizouRH"] + ";";
                csvAFP += dadosCSVAFP[int]["usuarioRH"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataDisponibilidadeCP"] + ";";
                csvAFP += dadosCSVAFP[int]["dataAssumiuCP"] + ";";
                csvAFP += dadosCSVAFP[int]["dataFinalizouCP"] + ";";
                csvAFP += dadosCSVAFP[int]["usuarioCP"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataDisponibilidadeS"] + ";";
                csvAFP += dadosCSVAFP[int]["dataFinalizouS"] + ";";
                csvAFP += dadosCSVAFP[int]["usuarioS"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataDisponibilidadeC"] + ";";
                csvAFP += dadosCSVAFP[int]["dataFinalizouC"] + ";";
                csvAFP += dadosCSVAFP[int]["usuarioC"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataDisponibilidadeG"] + ";";
                csvAFP += dadosCSVAFP[int]["dataFinalizouG"] + ";";
                csvAFP += dadosCSVAFP[int]["usuarioG"].toString() + ";";
                csvAFP += dadosCSVAFP[int]["dataDisponibilidadeD"] + ";";
                csvAFP += dadosCSVAFP[int]["dataFinalizouD"] + ";";
                csvAFP += dadosCSVAFP[int]["usuarioD"].toString() + ";";
                csvAFP += "\n";
            }
            console.log(csvAFP);
            let downloadLinkAFP = document.createElement("a");
            downloadLinkAFP.download = "AFP.csv";
            downloadLinkAFP.href = window.URL.createObjectURL(new Blob([csvAFP], {type: "text/csv"}));
            downloadLinkAFP.style.display = "none";
            document.body.appendChild(downloadLinkAFP);
            downloadLinkAFP.click();
        };

        btnConsultarAFP.on('click', () => {
            let myLoadingAFP = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingAFP.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsAFP();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetAFP;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetAFP = DatasetFactory.getDataset("dsAprovacoesRH", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetAFP = DatasetFactory.getDataset("dsAprovacoesRH", null, constraints, null); // Produção
                }
                console.log("datasetAFP");
                console.log(datasetAFP);
                if(datasetAFP.length > 0 || datasetAFP.values){
                    $("#tableAFP tbody").html("");
                    dadosAFP = [];
                    let usuarioComPermissao = true;
                    let solicitacoesAFP = datasetAFP.values;
                    for(let i = 0; i < solicitacoesAFP.length; i++){
                        const solicitacao = solicitacoesAFP[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingAFP.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"] == null || solicitacao["numeroFluxo"] == "" ? "" : solicitacao["numeroFluxo"];
                        let status = solicitacao["Status"];
                        if(status == null) status = "";
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "Em análise pelo RH") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        let filial = solicitacao["zoomFilial"] == null || solicitacao["zoomFilial"] == "" ? "" : solicitacao["zoomFilial"];
                        let condicao = solicitacao["tipoPagamento"] == null || solicitacao["tipoPagamento"] == "" ? "" : solicitacao["tipoPagamento"];
                        let dataEntrada = solicitacao["dataEntrada"] == null || solicitacao["dataEntrada"] == "" ? "" : solicitacao["dataEntrada"];
                        let especiePagamento = solicitacao["especiePagamento"] == null || solicitacao["especiePagamento"] == "" ? "" : solicitacao["especiePagamento"];
                        if(especiePagamento == "folhaPagamento") especiePagamento = "Folha de Pagamento";
                        if(especiePagamento == "folhaPagamento13") especiePagamento = "Folha de Pagamento - 13º Salário";
                        if(especiePagamento == "adiantamento") especiePagamento = "Adiantamento Quinzenal";
                        if(especiePagamento == "ferias") especiePagamento = "Férias";
                        if(especiePagamento == "recisao") especiePagamento = "Rescisão";
                        let dataPagamento = solicitacao["dataPagamento"] == null || solicitacao["dataPagamento"] == "" ? "" : convertDateAFP(solicitacao["dataPagamento"]);
                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "27") localizacao = "Supervisor";
                        if(atividadeAtual == "55") localizacao = "Coordenador";
                        if(atividadeAtual == "25") localizacao = "Coordenador";
                        if(atividadeAtual == "11") localizacao = "Correção";
                        if(atividadeAtual == "34") localizacao = "Gerente";
                        if(atividadeAtual == "41") localizacao = "Diretor";
                        if(atividadeAtual == "5") localizacao = "Recursos Humanos";
                        if(atividadeAtual == "102") localizacao = "Contas a Pagar";
                        let requisitante = solicitacao["solicitanteNome"] == null || solicitacao["solicitanteNome"] == "" ? "" : solicitacao["solicitanteNome"];
                        let centroCusto = solicitacao["zoomCentroCusto"] == null || solicitacao["zoomCentroCusto"] == "" ? "" : solicitacao["zoomCentroCusto"];
                        let valor = solicitacao["valorTotalDocumento"] == null || solicitacao["valorTotalDocumento"] == "" ? "" : solicitacao["valorTotalDocumento"];
                        

                        let supervisor = solicitacao["aprovadorSupervisor"];
                        if(supervisor != null && supervisor != "") supervisor = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == supervisor)['colleagueName'];
                        else supervisor = "";

                        let coordenador = solicitacao["aprovadorCoordenador"];
                        if(coordenador != null && coordenador != "") coordenador = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == coordenador)['colleagueName'];
                        else coordenador = "";

                        let gerente = solicitacao["aprovadorGerente"];
                        if(gerente != null && gerente != "") gerente = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == gerente)['colleagueName'];
                        else gerente = "";

                        let diretor = solicitacao["aprovadorDiretor"];
                        if(diretor != null && diretor != "") diretor = colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == diretor)['colleagueName'];
                        else diretor = "";
                        
                        let dataDisponibilidadeRH = solicitacao["dataDisponibilidadeRH"] == null || solicitacao["dataDisponibilidadeRH"] == "" ? "" : convertDateTimeAFP(solicitacao["dataDisponibilidadeRH"]);
                        let dataAssumiuRH = solicitacao["dataAssumiuRH"] == null || solicitacao["dataAssumiuRH"] == "" ? "" : convertDateTimeAFP(solicitacao["dataAssumiuRH"]);
                        let dataFinalizouRH = solicitacao["dataFinalizouRH"] == null || solicitacao["dataFinalizouRH"] == "" ? "" : convertDateTimeAFP(solicitacao["dataFinalizouRH"]);
                        let usuarioRH = solicitacao["usuarioRH"] == null || solicitacao["usuarioRH"] == "" ? "" : convertDateTimeAFP(solicitacao["usuarioRH"]);
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeAFP(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeAFP(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeAFP(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeAFP(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeAFP(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeAFP(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeAFP(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeAFP(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeAFP(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeAFP(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        dadosAFP.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "filial" : filial,
                            "condicao" : condicao,
                            "dataEntrada" : dataEntrada,
                            "especiePagamento" : especiePagamento,
                            "dataPagamento" : dataPagamento,
                            "localizacao" : localizacao,
                            "requisitante" : requisitante,
                            "centroCusto" : centroCusto,
                            "valor" : valor,
                            "supervisor" : supervisor,
                            "coordenador" : coordenador,
                            "gerente" : gerente,
                            "diretor" : diretor,
                            "dataDisponibilidadeRH" : dataDisponibilidadeRH,
                            "dataAssumiuRH" : dataAssumiuRH,
                            "dataFinalizouRH" : dataFinalizouRH,
                            "usuarioRH" : usuarioRH,
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
                        createTableAFP(dadosAFP);
                        myLoadingAFP.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesAFP.length} registros!`,type: 'success'});
                        btnExportarAFP.on('click', () => {
                            let switchExportacaoAvancadaAFP = $("#switchExportacaoAvancadaAFP");
                            console.log(switchExportacaoAvancadaAFP);
                            console.log(switchExportacaoAvancadaAFP.is(":checked"));
                            if(switchExportacaoAvancadaAFP.is(":checked")){
                                gerarCSVAvancadoAFP(dadosAFP);
                            }else{
                                gerarCSVAFP(dadosAFP);
                            }
                        });
                    }
                }else{
                    myLoadingAFP.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });


        // $("#exportacaoAvancada").html("");
        // $("#btnExportarAFP").hide();
        //$("#botoes").html("");
        //$("#tabela").html("");
    }
});