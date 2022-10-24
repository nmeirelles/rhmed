var MyWidgetRC = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoRC = $("#inputNumeroFluxoRC");
        let inputValorTotalRC = $("#inputValorTotalRC");
        let selectStatusRC = $("#selectStatusRC");
        let inputDataEntradaRC = $("#inputDataEntradaRC");
        let inputMesEntradaRC = $("#inputMesEntradaRC");
        let inputAnoEntradaRC = $("#inputAnoEntradaRC");
        let selectAtividadeRC = $("#selectAtividadeRC");
        let selectTipoRequisicaoRC = $("#selectTipoRequisicaoRC");
        let selectTipoPagamentoRC = $("#selectTipoPagamentoRC");
        let inputNomeFilialRC = $("#inputNomeFilialRC");
        let inputCentroCustoRC = $("#inputCentroCustoRC");
        let inputDataEntregaRC = $("#inputDataEntregaRC");
        let inputMesEntregaRC = $("#inputMesEntregaRC");
        let inputAnoEntregaRC = $("#inputAnoEntregaRC");

        let inputNomeSolicitanteRC = $("#inputNomeSolicitanteRC");
        let inputMatriculaSolicitanteRC = $("#inputMatriculaSolicitanteRC");
        let inputFornecedorRC = $("#inputFornecedorRC");

        let inputNomeSupervisorRC = $("#inputNomeSupervisorRC");
        let inputMatriculaSupervisorRC = $("#inputMatriculaSupervisorRC");
        let inputNomeCoordenadorRC = $("#inputNomeCoordenadorRC");
        let inputMatriculaCoordenadorRC = $("#inputMatriculaCoordenadorRC");
        let inputNomeGerenteRC = $("#inputNomeGerenteRC");
        let inputMatriculaGerenteRC = $("#inputMatriculaGerenteRC");
        let inputNomeDiretorRC = $("#inputNomeDiretorRC");
        let inputMatriculaDiretorRC = $("#inputMatriculaDiretorRC");
        let btnConsultarRC = $("#btnConsultarRC");
        let btnExportarRC = $("#btnExportarRC");
        let tableRC = $("#tableRC");
        let dadosRC = [];

        let datasetFornecedores = [];

        $('#inputValorTotalRC').maskMoney({
            thousands: '.',
            decimal: ','
        });

        btnExportarRC.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaRC');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRC', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRC', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteRC",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: false,
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
            FLUIGC.filter("#inputNomeSupervisorRC",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: false,
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
            FLUIGC.filter("#inputNomeCoordenadorRC",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: false,
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
            FLUIGC.filter("#inputNomeGerenteRC",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: false,
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
            FLUIGC.filter("#inputNomeDiretorRC",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
                multiSelect: false,
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
            inputNomeSolicitanteRC.on("change", (event) => {
                const solicitante = event.target.value;
                let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                inputMatriculaSolicitanteRC.val(matricula);
            });
            inputNomeSupervisorRC.on("change", (event) => {
                const solicitante = event.target.value;
                let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                inputMatriculaSupervisorRC.val(matricula);
            });
            inputNomeCoordenadorRC.on("change", (event) => {
                const solicitante = event.target.value;
                let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                inputMatriculaCoordenadorRC.val(matricula);
            });
            inputNomeGerenteRC.on("change", (event) => {
                const solicitante = event.target.value;
                let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                inputMatriculaGerenteRC.val(matricula);
            });
            inputNomeDiretorRC.on("change", (event) => {
                const solicitante = event.target.value;
                let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                inputMatriculaDiretorRC.val(matricula);
            });
        }, 3000);
        
        const centroCusto = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoRC",{
            source: centroCusto(),
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

        $('input[type=checkbox][name=checkboxFiltrarAprovadorRC]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorRC").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorRC").show();
                $("#divCoordenadorRC").show();
                $("#divGerenteRC").show();
                $("#divDiretorRC").show();
            }
            if(filtrar == false){
                $("#divSupervisorRC").hide();
                $("#divCoordenadorRC").hide();
                $("#divGerenteRC").hide();
                $("#divDiretorRC").hide();
            }
        });

        //const convertDateTimeRC = (data) => data != "" || data != null ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";

        const convertDateTimeRC = (data) => {
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

        const convertDateRC = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsRC = () => {
            const constraintsRC = [];
            if(inputNumeroFluxoRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoRC.val(), inputNumeroFluxoRC.val(), ConstraintType.MUST));
                return constraintsRC;
            }
            if(inputValorTotalRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalRC.val(), inputValorTotalRC.val(), ConstraintType.MUST));
            }
            if(selectStatusRC.val() != ""){
                if(selectStatusRC.val() == "aberto"){
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "Em Analise por Suprimentos", "Em Analise por Suprimentos", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "Em Cotação por Suprimentos", "Em Cotação por Suprimentos", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "Em análise TI", "Em análise TI", ConstraintType.SHOULD));
                }
                if(selectStatusRC.val() == "cancelado"){
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("Status", "Cancelada", "Cancelada", ConstraintType.SHOULD));
                }
                if(selectStatusRC.val() == "finalizado"){
                   constraintsRC.push(DatasetFactory.createConstraint("Status", "Processo de Compra Encerrado", "Processo de Compra Encerrado", ConstraintType.MUST));
                }
            }
            if(inputDataEntradaRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("dataEntrada", convertDateRC(inputDataEntradaRC.val()), convertDateRC(inputDataEntradaRC.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaRC.val(), inputMesEntradaRC.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaRC.val(), inputAnoEntradaRC.val(), ConstraintType.MUST));
            }
            if(selectAtividadeRC.val() != ""){
                if(selectAtividadeRC.val() == "supervisor") constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeRC.val() == "coordenador"){
                    constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "17", "17", ConstraintType.SHOULD));
                }
                if(selectAtividadeRC.val() == "correcao") constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "86", "86", ConstraintType.MUST));
                if(selectAtividadeRC.val() == "gerente") constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "21", "21", ConstraintType.MUST));
                if(selectAtividadeRC.val() == "diretor") constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "23", "23", ConstraintType.MUST));
                if(selectAtividadeRC.val() == "suprimentos"){
                    constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "35", "35", ConstraintType.SHOULD));
                    constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "97", "97", ConstraintType.SHOULD));
                }
                if(selectAtividadeRC.val() == "ti") constraintsRC.push(DatasetFactory.createConstraint("atividadeAtual", "44", "44", ConstraintType.MUST));
            }
            if(selectTipoRequisicaoRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("tipoRequisicao", selectTipoRequisicaoRC.val(), selectTipoRequisicaoRC.val(), ConstraintType.MUST));
            }
            if(selectTipoPagamentoRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoRC.val(), selectTipoPagamentoRC.val(), ConstraintType.MUST));
            }
            if(inputNomeFilialRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialRC.val(), inputNomeFilialRC.val(), ConstraintType.MUST, true));
            }
            if(inputCentroCustoRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoRC.val(), inputCentroCustoRC.val(), ConstraintType.MUST));
            }
            if(inputDataEntregaRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("dataEmissaoNota", inputDataEntregaRC.val(), inputDataEntregaRC.val(), ConstraintType.MUST));
            }
            if(inputMesEntregaRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("mesEmissaoNota", inputMesEntregaRC.val(), inputMesEntregaRC.val(), ConstraintType.MUST));
            }
            if(inputAnoEntregaRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("anoEmissaoNota", inputAnoEntregaRC.val(), inputAnoEntregaRC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteRC.val(), inputMatriculaSolicitanteRC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSupervisorRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("aprovadorSupervisor", inputMatriculaSupervisorRC.val(), inputMatriculaSupervisorRC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaCoordenadorRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("aprovadorCoordenador", inputMatriculaCoordenadorRC.val(), inputMatriculaCoordenadorRC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteRC.val(), inputMatriculaGerenteRC.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorRC.val() != ""){
                constraintsRC.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorRC.val(), inputMatriculaDiretorRC.val(), ConstraintType.MUST));
            }
            if(inputFornecedorRC.val() != ""){
                const c1 = DatasetFactory.createConstraint("tablename", "tabelaFornecedores", "tabelaFornecedores", ConstraintType.MUST);
                const c2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
                let datasetRC;
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    datasetRC = DatasetFactory.getDataset("dsRequisicaodeCompras", null, [c1,c2], null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetRC = DatasetFactory.getDataset("DSformRequisicaodeCompras", null, [c1,c2], null); // Produção
                }
                if(datasetRC.length > 0 || datasetRC.values){
                    console.log("datasetRC");
                    console.log(datasetRC);
                    let solicitacoesRC = datasetRC.values;
                    let documentIds = [];
                    for(let i = 0; i < solicitacoesRC.length; i++){
                        let solicitacao = solicitacoesRC[i];
                        let inputFornecedor = solicitacao.inputFornecedor;
                        let inputFornecedorRCtmp = inputFornecedorRC.val();
                        let validacao = inputFornecedor.match(inputFornecedorRCtmp);
                        if(validacao != null) {
                            documentIds.push(solicitacao["metadata#id"]);
                            datasetFornecedores.push({
                                "inputFornecedor" : inputFornecedor,
                                "id" : solicitacao["metadata#id"]
                            });
                        }
                    }
                    console.log(documentIds);
                    if(documentIds.length > 0){
                        for(let i = 0; i < documentIds.length; i++){
                            let documentId = documentIds[i];
                            constraintsRC.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.SHOULD));
                        }
                    }
                }
            }
            return constraintsRC;
        }

        const createTableRC = (dadosTableRC) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableRC);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableRC > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableRC.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableRC[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableRC[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableRC[i]["status"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["tipoSolicitacao"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["fornecedor"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["dataEntrega"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["tipoPagamento"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["tipoRequisicao"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableRC[i]["numeroProtheus"] +'</td>'+
                            "</tr>";
                }
                tableRC.append(tr);
                $('#numeracaoRC').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableRC.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoRC').prop('disabled', dadosTableRC.length <= tamanhoPagina || pagina > dadosTableRC.length / tamanhoPagina - 1);
                $('#anteriorRC').prop('disabled', dadosTableRC.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoRC').click(()=>{
                if(pagina < dadosTableRC.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorRC').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVRC = (dadosCSVRC) => {
            let csvRC = "\uFEFF";
        
            csvRC += "Código Fluig;";
            csvRC += "Status;";
            csvRC += "Tipo Solicitação;";
            csvRC += "Filial;";
            csvRC += "Fornecedor;";
            csvRC += "Data Entrada;";
            csvRC += "Data Sugerida Entrega;";
            csvRC += "Valor Total;";
            csvRC += "Condição Pagamento;";
            csvRC += "Requisitante;";
            csvRC += "Localização;";
            csvRC += "Tipo Requisição;";
            csvRC += "Centro Custo;";
            csvRC += "Número Protheus;";
        
            csvRC += "\n";
        
            for(let int = 0; int < dadosCSVRC.length; int++){
                csvRC += dadosCSVRC[int]["codigoFluig"].toString() + ";";
                csvRC += dadosCSVRC[int]["status"].toString() + ";";
                csvRC += dadosCSVRC[int]["tipoSolicitacao"].toString() + ";";
                csvRC += dadosCSVRC[int]["nomeFilial"].toString() + ";";
                csvRC += dadosCSVRC[int]["fornecedor"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataEntrada"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataEntrega"].toString() + ";";
                csvRC += dadosCSVRC[int]["valor"].toString() + ";";
                csvRC += dadosCSVRC[int]["tipoPagamento"].toString() + ";";
                csvRC += dadosCSVRC[int]["requisitante"].toString() + ";";
                csvRC += dadosCSVRC[int]["localizacao"].toString() + ";";
                csvRC += dadosCSVRC[int]["tipoRequisicao"].toString() + ";";
                csvRC += dadosCSVRC[int]["centroCusto"].toString() + ";";
                csvRC += dadosCSVRC[int]["numeroProtheus"].toString() + ";";
                csvRC += "\n";
            }
            let downloadLinkRC = document.createElement("a");
            downloadLinkRC.download = "RC.csv";
            downloadLinkRC.href = window.URL.createObjectURL(new Blob([csvRC], {type: "text/csv"}));
            downloadLinkRC.style.display = "none";
            document.body.appendChild(downloadLinkRC);
            downloadLinkRC.click();
        };

        const gerarCSVAvancadoRC = (dadosCSVRC) => {
            let csvRC = "\uFEFF";
        
            csvRC += "Código Fluig;";
            csvRC += "Status;";
            csvRC += "Tipo Solicitação;";
            csvRC += "Filial;";
            csvRC += "Fornecedor;";
            csvRC += "Data Entrada;";
            csvRC += "Data Sugerida Entrega;";
            csvRC += "Valor Total;";
            csvRC += "Condição Pagamento;";
            csvRC += "Requisitante;";
            csvRC += "Localização;";
            csvRC += "Tipo Requisição;";
            csvRC += "Centro Custo;";
            csvRC += "Número Protheus;";
            csvRC += "Supervisor;";
            csvRC += "Coordenador;";
            csvRC += "Gerente;";
            csvRC += "Diretor;";
            csvRC += "Data/Hora Disponibilidade Suprimentos Pré-Integração;";
            csvRC += "Data/Hora Ínicio Atividade Pré-Integração;";
            csvRC += "Data/Hora Fim Atividade Pré-Integração;";
            csvRC += "Usuário Suprimentos Pré-Integração;";
            csvRC += "Data/Hora Disponibilidade Suprimentos Pós-Integração;";
            csvRC += "Data/Hora Ínicio Atividade Pós-Integração;";
            csvRC += "Data/Hora Fim Atividade Pós-Integração;";
            csvRC += "Usuário Suprimentos Pós-Integração;";
            csvRC += "Data/Hora Disponibilidade Supervisor;";
            csvRC += "Data/Hora Fim Supervisor;";
            csvRC += "Usuário Supervisor;";
            csvRC += "Data/Hora Disponibilidade Coordenador;";
            csvRC += "Data/Hora Fim Coordenador;";
            csvRC += "Usuário Coordenador;";
            csvRC += "Data/Hora Disponibilidade Gerente;";
            csvRC += "Data/Hora Fim Gerente;";
            csvRC += "Usuário Gerente;";
            csvRC += "Data/Hora Disponibilidade Diretor;";
            csvRC += "Data/Hora Fim Diretor;";
            csvRC += "Usuário Diretor;";
        
            csvRC += "\n";
        
            for(let int = 0; int < dadosCSVRC.length; int++){
                csvRC += dadosCSVRC[int]["codigoFluig"].toString() + ";";
                csvRC += dadosCSVRC[int]["status"].toString() + ";";
                csvRC += dadosCSVRC[int]["tipoSolicitacao"].toString() + ";";
                csvRC += dadosCSVRC[int]["nomeFilial"].toString() + ";";
                csvRC += dadosCSVRC[int]["fornecedor"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataEntrada"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataEntrega"].toString() + ";";
                csvRC += dadosCSVRC[int]["valor"].toString() + ";";
                csvRC += dadosCSVRC[int]["tipoPagamento"].toString() + ";";
                csvRC += dadosCSVRC[int]["requisitante"].toString() + ";";
                csvRC += dadosCSVRC[int]["localizacao"].toString() + ";";
                csvRC += dadosCSVRC[int]["tipoRequisicao"].toString() + ";";
                csvRC += dadosCSVRC[int]["centroCusto"].toString() + ";";
                csvRC += dadosCSVRC[int]["numeroProtheus"].toString() + ";";
                csvRC += dadosCSVRC[int]["supervisor"].toString() + ";";
                csvRC += dadosCSVRC[int]["coordenador"].toString() + ";";
                csvRC += dadosCSVRC[int]["gerente"].toString() + ";";
                csvRC += dadosCSVRC[int]["diretor"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataDisponibilidadeS1"] + ";";
                csvRC += dadosCSVRC[int]["dataAssumiuS1"] + ";";
                csvRC += dadosCSVRC[int]["dataFinalizouS1"] + ";";
                csvRC += dadosCSVRC[int]["usuarioS1"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataDisponibilidadeS2"] + ";";
                csvRC += dadosCSVRC[int]["dataAssumiuS2"] + ";";
                csvRC += dadosCSVRC[int]["dataFinalizouS2"] + ";";
                csvRC += dadosCSVRC[int]["usuarioS2"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataDisponibilidadeS"] + ";";
                csvRC += dadosCSVRC[int]["dataFinalizouS"] + ";";
                csvRC += dadosCSVRC[int]["usuarioS"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataDisponibilidadeC"] + ";";
                csvRC += dadosCSVRC[int]["dataFinalizouC"] + ";";
                csvRC += dadosCSVRC[int]["usuarioC"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataDisponibilidadeG"] + ";";
                csvRC += dadosCSVRC[int]["dataFinalizouG"] + ";";
                csvRC += dadosCSVRC[int]["usuarioG"].toString() + ";";
                csvRC += dadosCSVRC[int]["dataDisponibilidadeD"] + ";";
                csvRC += dadosCSVRC[int]["dataFinalizouD"] + ";";
                csvRC += dadosCSVRC[int]["usuarioD"].toString() + ";";
                csvRC += "\n";
            }
            let downloadLinkRC = document.createElement("a");
            downloadLinkRC.download = "RC.csv";
            downloadLinkRC.href = window.URL.createObjectURL(new Blob([csvRC], {type: "text/csv"}));
            downloadLinkRC.style.display = "none";
            document.body.appendChild(downloadLinkRC);
            downloadLinkRC.click();
        };

        btnConsultarRC.on('click', () => {
            let myLoadingRC = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingRC.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                const constraints = criarConstraintsRC();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetRC;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetRC = DatasetFactory.getDataset("dsRequisicaodeCompras", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetRC = DatasetFactory.getDataset("DSformRequisicaodeCompras", null, constraints, null); // Produção
                }
                console.log("datasetRC");
                console.log(datasetRC);
                if(datasetRC.length > 0 || datasetRC.values){
                    $("#tableRC tbody").html("");
                    dadosRC = [];
                    let usuarioComPermissao = true;
                    let solicitacoesRC = datasetRC.values;
                    for(let i = 0; i < solicitacoesRC.length; i++){
                        const solicitacao = solicitacoesRC[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingRC.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"] != null ? solicitacao["numeroFluxo"] : "";

                        let status = solicitacao["Status"] != null ? solicitacao["Status"] : "";

                        let tipoSolicitacao = solicitacao["idSolicitacao"];
                        if(tipoSolicitacao == null || tipoSolicitacao == "") tipoSolicitacao = "RC";
                        else tipoSolicitacao = tipoSolicitacao.slice(0,3);

                        let nomeFilial = solicitacao["zoomFilial"] != null ? solicitacao["zoomFilial"] : "";

                        let fornecedor = "";
                        if(datasetFornecedores.length > 0){
                            for(let i = 0; i < datasetFornecedores.length; i++){
                                const solicitacaoFornecedor = datasetFornecedores[i];
                                const inputFornecedor = solicitacaoFornecedor["inputFornecedor"];
                                const id = solicitacaoFornecedor["id"];
                                const id2 = solicitacao["metadata#id"];
                                if(id == id2){
                                    fornecedor = inputFornecedor;
                                }
                            }
                        }else{
                            const document = solicitacao["metadata#id"];
                            const version = solicitacao["metadata#version"];
                            const c1 = DatasetFactory.createConstraint("tablename", "tabelaFornecedores", "tabelaFornecedores", ConstraintType.MUST);
                            const c2 = DatasetFactory.createConstraint("metadata#id", document, document, ConstraintType.MUST);
                            const c3 = DatasetFactory.createConstraint("metadata#version", version, version, ConstraintType.MUST);
                            const c4 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
                            let datasetFornecedor;
                            const url_atual = window.location.href.toString();
                            if(url_atual.match("rhmedconsultores114678")){
                                datasetFornecedor = DatasetFactory.getDataset("dsRequisicaodeCompras", null, [c1,c2,c3,c4], null); // Homologação
                            }
                            if(url_atual.match("rhmedconsultores114677")){
                                datasetFornecedor = DatasetFactory.getDataset("DSformRequisicaodeCompras", null, [c1,c2,c3,c4], null); // Produção
                            }
                            fornecedor = datasetFornecedor.values.length > 0 ? datasetFornecedor.values[0]["inputFornecedor"] : "";
                        }

                        let dataEntrada = solicitacao["dataEntrada"] != null ? solicitacao["dataEntrada"] : "";
                        
                        let dataEntrega = solicitacao["dataEmissaoNota"] != null ? convertDateRC(solicitacao["dataEmissaoNota"]) : "";

                        let valor = solicitacao["valorTotalDocumento"] != null ? solicitacao["valorTotalDocumento"] : "";

                        let tipoPagamento = solicitacao["tipoPagamento"] != null ? solicitacao["tipoPagamento"] : "";

                        let requisitante = solicitacao["solicitanteNome"] != null ? solicitacao["solicitanteNome"] : "";
                        
                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "5") localizacao = "Supervisor";
                        if(atividadeAtual == "17") localizacao = "Coordenador";
                        if(atividadeAtual == "9") localizacao = "Coordenador";
                        if(atividadeAtual == "86") localizacao = "Correção";
                        if(atividadeAtual == "21") localizacao = "Gerente";
                        if(atividadeAtual == "23") localizacao = "Diretor";
                        if(atividadeAtual == "35") localizacao = "Suprimentos";
                        if(atividadeAtual == "97") localizacao = "Suprimentos";
                        if(atividadeAtual == "44") localizacao = "TI";
                        
                        let tipoRequisicao = solicitacao["tipoRequisicao"] != null ? solicitacao["tipoRequisicao"] : "";

                        let centroCusto = solicitacao["zoomCentroCusto"] != null ? solicitacao["zoomCentroCusto"] : "";

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
                        
                        let dataDisponibilidadeS1 = solicitacao["dataDisponibilidadeS1"];
                        if(dataDisponibilidadeS1 == null) dataDisponibilidadeS1 = "";
                        if(dataDisponibilidadeS1 != null && dataDisponibilidadeS1 != "") dataDisponibilidadeS1 = convertDateTimeRC(dataDisponibilidadeS1);
                        
                        let dataAssumiuS1 = solicitacao["dataAssumiuS1"];
                        if(dataAssumiuS1 == null) dataAssumiuS1 = "";
                        if(dataAssumiuS1 != null && dataAssumiuS1 != "") dataAssumiuS1 = convertDateTimeRC(dataAssumiuS1);
                        
                        let dataFinalizouS1 = solicitacao["dataFinalizouS1"];
                        if(dataFinalizouS1 == null) dataFinalizouS1 = "";
                        if(dataFinalizouS1 != null && dataFinalizouS1 != "") dataFinalizouS1 = convertDateTimeRC(dataFinalizouS1);
                        
                        let usuarioS1 = solicitacao["usuarioS1"];
                        if(usuarioS1 == null) usuarioS1 = "";
                        
                        let dataDisponibilidadeS2 = solicitacao["dataDisponibilidadeS2"];
                        if(dataDisponibilidadeS2 == null) dataDisponibilidadeS2 = "";
                        if(dataDisponibilidadeS2 != null && dataDisponibilidadeS2 != "") dataDisponibilidadeS2 = convertDateTimeRC(dataDisponibilidadeS2);

                        let dataAssumiuS2 = solicitacao["dataAssumiuS2"];
                        if(dataAssumiuS2 == null) dataAssumiuS2 = "";
                        if(dataAssumiuS2 != null && dataAssumiuS2 != "") dataAssumiuS2 = convertDateTimeRC(dataAssumiuS2);

                        let dataFinalizouS2 = solicitacao["dataFinalizouS2"];
                        if(dataFinalizouS2 == null) dataFinalizouS2 = "";
                        if(dataFinalizouS2 != null && dataFinalizouS2 != "") dataFinalizouS2 = convertDate2(dataFinalizouS2);

                        let usuarioS2 = solicitacao["usuarioS2"];
                        if(usuarioS2 == null) usuarioS2 = "";

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"];
                        if(dataDisponibilidadeS == null) dataDisponibilidadeS = "";
                        if(dataDisponibilidadeS != null && dataDisponibilidadeS != "") dataDisponibilidadeS = convertDateTimeRC(dataDisponibilidadeS);

                        let dataFinalizouS = solicitacao["dataFinalizouS"];
                        if(dataFinalizouS == null) dataFinalizouS = "";
                        if(dataFinalizouS != null && dataFinalizouS != "") dataFinalizouS = convertDateTimeRC(dataFinalizouS);

                        let usuarioS = solicitacao["usuarioS"];
                        if(usuarioS == null) usuarioS = "";

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeRC(dataDisponibilidadeC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeRC(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"];
                        if(usuarioC == null) usuarioC = "";

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"];
                        if(dataDisponibilidadeG == null) dataDisponibilidadeG = "";
                        if(dataDisponibilidadeG != null && dataDisponibilidadeG != "") dataDisponibilidadeG = convertDateTimeRC(dataDisponibilidadeG);

                        let dataFinalizouG = solicitacao["dataFinalizouG"];
                        if(dataFinalizouG == null) dataFinalizouG = "";
                        if(dataFinalizouG != null && dataFinalizouG != "") dataFinalizouG = convertDateTimeRC(dataFinalizouG);

                        let usuarioG = solicitacao["usuarioG"];
                        if(usuarioG == null) usuarioG = "";

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"];
                        if(dataDisponibilidadeD == null) dataDisponibilidadeD = "";
                        if(dataDisponibilidadeD != null && dataDisponibilidadeD != "") dataDisponibilidadeD = convertDateTimeRC(dataDisponibilidadeD);

                        let dataFinalizouD = solicitacao["dataFinalizouD"];
                        if(dataFinalizouD == null) dataFinalizouD = "";
                        if(dataFinalizouD != null && dataFinalizouD != "") dataFinalizouD = convertDateTimeRC(dataFinalizouD);

                        let usuarioD = solicitacao["usuarioD"];
                        if(usuarioD == null) usuarioD = "";

                        let numeroProtheus = solicitacao["nProtheus"] == null ? "" : solicitacao["nProtheus"];

                        dadosRC.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "tipoSolicitacao" : tipoSolicitacao,
                            "nomeFilial" : nomeFilial,
                            "fornecedor" : fornecedor,
                            "dataEntrada" : dataEntrada,
                            "dataEntrega" : dataEntrega,
                            "valor" : valor,
                            "tipoPagamento" : tipoPagamento,
                            "requisitante" : requisitante,
                            "localizacao" : localizacao,
                            "tipoRequisicao" : tipoRequisicao,
                            "centroCusto" : centroCusto,
                            "numeroProtheus" : numeroProtheus,
                            "supervisor" : supervisor,
                            "coordenador" : coordenador,
                            "gerente" : gerente,
                            "diretor" : diretor,
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
                        createTableRC(dadosRC);
                        myLoadingRC.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesRC.length} registros!`,type: 'success'});
                        btnExportarRC.on('click', () => {
                            let switchExportacaoAvancadaRC = $("#switchExportacaoAvancadaRC");
                            console.log(switchExportacaoAvancadaRC);
                            console.log(switchExportacaoAvancadaRC.is(":checked"));
                            if(switchExportacaoAvancadaRC.is(":checked")){
                                gerarCSVAvancadoRC(dadosRC);
                            }else{
                                gerarCSVRC(dadosRC);
                            }
                        });
                    }
                }else{
                    myLoadingRC.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});