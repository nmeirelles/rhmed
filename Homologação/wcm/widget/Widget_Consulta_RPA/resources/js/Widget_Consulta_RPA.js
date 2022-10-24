var MyWidgetRPA = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoRPA = $("#inputNumeroFluxoRPA");
        let inputValorTotalRPA = $("#inputValorTotalRPA");
        let selectStatusRPA = $("#selectStatusRPA");
        let inputNomeFilialRPA = $("#inputNomeFilialRPA");
        let inputNomeFornecedorRPA = $("#inputNomeFornecedorRPA");
        let inputCNPJFornecedorRPA = $("#inputCNPJFornecedorRPA");
        let inputDataEntradaRPA = $("#inputDataEntradaRPA");
        let inputMesEntradaRPA = $("#inputMesEntradaRPA");
        let inputAnoEntradaRPA = $("#inputAnoEntradaRPA");
        let inputDataVencimentoRPA = $("#inputDataVencimentoRPA");
        let inputMesVencimentoRPA = $("#inputMesVencimentoRPA");
        let inputAnoVencimentoRPA = $("#inputAnoVencimentoRPA");
        let selectTipoPagamentoRPA = $("#selectTipoPagamentoRPA");
        let inputNomeSolicitanteRPA = $("#inputNomeSolicitanteRPA");
        let inputMatriculaSolicitanteRPA = $("#inputMatriculaSolicitanteRPA");
        let selectAtividadeRPA = $("#selectAtividadeRPA");
        let inputCentroCustoRPA = $("#inputCentroCustoRPA");
        let inputFuncaoRPA = $("#inputFuncaoRPA");
        let inputClienteRPA = $("#inputClienteRPA");
        let inputLocalPrestacaoRPA = $("#inputLocalPrestacaoRPA");
        let btnConsultarRPA = $("#btnConsultarRPA");
        let btnExportarRPA = $("#btnExportarRPA");
        let tableRPA = $("#tableRPA");
        let dadosRPA = [];

        $('#inputValorTotalRPA').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const centroCustoRPA = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoRPA",{
            source: centroCustoRPA(),
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

        btnExportarRPA.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaRPA');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRPA', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRPA', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteRPA",{
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
            inputNomeSolicitanteRPA.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteRPA.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorRPA]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorRPA").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorRPA").show();
                $("#divCoordenadorRPA").show();
                $("#divGerenteRPA").show();
                $("#divDiretorRPA").show();
            }
            if(filtrar == false){
                $("#divSupervisorRPA").hide();
                $("#divCoordenadorRPA").hide();
                $("#divGerenteRPA").hide();
                $("#divDiretorRPA").hide();
            }
        });

        const convertDateTimeRPA = (data) => {
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

        const convertDateRPA = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";
        
        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsRPA = () => {
            const constraintsRPA = [];
            if(inputNumeroFluxoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoRPA.val(), inputNumeroFluxoRPA.val(), ConstraintType.MUST));
                return constraintsRPA;
            }
            if(inputValorTotalRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalRPA.val(), inputValorTotalRPA.val(), ConstraintType.MUST));
            }
            if(selectStatusRPA.val() != ""){
                if(selectStatusRPA.val() == "aberto"){
                    constraintsRPA.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsRPA.push(DatasetFactory.createConstraint("Status", "Encaminhado para Recursos Humanos", "Encaminhado para Recursos Humanos", ConstraintType.SHOULD));
                    constraintsRPA.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                }
                if(selectStatusRPA.val() == "cancelado"){
                    constraintsRPA.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.MUST));
                }
                if(selectStatusRPA.val() == "finalizado"){
                    constraintsRPA.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialRPA.val(), inputNomeFilialRPA.val(), ConstraintType.MUST, true));
            }
            if(inputNomeFornecedorRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("inputNomePrestador", inputNomeFornecedorRPA.val(), inputNomeFornecedorRPA.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("inputNrCPF", inputCNPJFornecedorRPA.val(), inputCNPJFornecedorRPA.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("dataVencimentoNota", inputDataVencimentoRPA.val(), inputDataVencimentoRPA.val(), ConstraintType.MUST));
            }
            if(inputMesVencimentoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("mesVencimentoNota", inputMesVencimentoRPA.val(), inputMesVencimentoRPA.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("anoVencimentoNota", inputAnoVencimentoRPA.val(), inputAnoVencimentoRPA.val(), ConstraintType.MUST));
            }
            if(selectTipoPagamentoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoRPA.val(), selectTipoPagamentoRPA.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteRPA.val(), inputMatriculaSolicitanteRPA.val(), ConstraintType.MUST));
            }
            if(selectAtividadeRPA.val() != ""){
                if(selectAtividadeRPA.val() == "supervisor") constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "27", "27", ConstraintType.MUST));
                if(selectAtividadeRPA.val() == "coordenador"){
                    constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "55", "55", ConstraintType.SHOULD));
                    constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "25", "25", ConstraintType.SHOULD));
                }
                if(selectAtividadeRPA.val() == "correcao") constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "11", "11", ConstraintType.MUST));
                if(selectAtividadeRPA.val() == "gerente") constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "34", "34", ConstraintType.MUST));
                if(selectAtividadeRPA.val() == "diretor") constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "41", "41", ConstraintType.MUST));
                if(selectAtividadeRPA.val() == "rh") constraintsRPA.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
            }
            if(inputCentroCustoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoRPA.val(), inputCentroCustoRPA.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("dataEntrada", convertDateRPA(inputDataEntradaRPA.val()), convertDateRPA(inputDataEntradaRPA.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaRPA.val(), inputMesEntradaRPA.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaRPA.val(), inputAnoEntradaRPA.val(), ConstraintType.MUST));
            }
            if(inputFuncaoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("inputFuncao", inputFuncaoRPA.val(), inputFuncaoRPA.val(), ConstraintType.MUST, true));
            }
            if(inputClienteRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("inputCliente", inputClienteRPA.val(), inputClienteRPA.val(), ConstraintType.MUST, true));
            }
            if(inputLocalPrestacaoRPA.val() != ""){
                constraintsRPA.push(DatasetFactory.createConstraint("inputLocal", inputLocalPrestacaoRPA.val(), inputLocalPrestacaoRPA.val(), ConstraintType.MUST, true));
            }
            return constraintsRPA;
        }

        const createTableRPA = (dadosTableRPA) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableRPA);
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
                $('#tableRPA > tbody > tr').remove();
                let tr = "";
                for(let i = pagina * tamanhoPagina; i < dadosTableRPA.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="'+url+'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableRPA[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableRPA[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableRPA[i]["status"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["nomePrestador"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["cpfPrestador"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["dataPagamento"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["funcao"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["cliente"] +'</td>'+
                                '<td>'+ dadosTableRPA[i]["local"] +'</td>'+
                            "</tr>";
                }
                tableRPA.append(tr);
                $('#numeracaoRPA').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableRPA.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoRPA').prop('disabled', dadosTableRPA.length <= tamanhoPagina || pagina > dadosTableRPA.length / tamanhoPagina - 1);
                $('#anteriorRPA').prop('disabled', dadosTableRPA.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoRPA').click(()=>{
                if(pagina < dadosTableRPA.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorRPA').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVRPA = (dadosCSVRPA) => {
            let csvRPA = "\uFEFF";
        
            csvRPA += "Código Fluig;";
            csvRPA += "Status;";
            csvRPA += "Filial;";
            csvRPA += "Nome Prestador;";
            csvRPA += "CPF Prestador;";
            csvRPA += "Data Entrada;";
            csvRPA += "Data Pagamento;";
            csvRPA += "Valor;";
            csvRPA += "Condição;";
            csvRPA += "Requisitante;";
            csvRPA += "Localização;";
            csvRPA += "Centro de Custo;";
            csvRPA += "Função;";
            csvRPA += "Cliente;";
            csvRPA += "Local;";
        
            csvRPA += "\n";
        
            for(let int = 0; int < dadosCSVRPA.length; int++){
                csvRPA += dadosCSVRPA[int]["codigoFluig"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["status"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["nomeFilial"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["nomePrestador"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["cpfPrestador"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataEntrada"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataPagamento"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["valor"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["condicao"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["requisitante"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["localizacao"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["centroCusto"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["funcao"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["cliente"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["local"].toString() + ";";
                csvRPA += "\n";
            }
            console.log(csvRPA);
            let downloadLinkRPA = document.createElement("a");
            downloadLinkRPA.download = "RPA.csv";
            downloadLinkRPA.href = window.URL.createObjectURL(new Blob([csvRPA], {type: "text/csv"}));
            downloadLinkRPA.style.display = "none";
            document.body.appendChild(downloadLinkRPA);
            downloadLinkRPA.click();
        };

        const gerarCSVAvancadoRPA = (dadosCSVRPA) => {
            let csvRPA = "\uFEFF";
        
            csvRPA += "Código Fluig;";
            csvRPA += "Status;";
            csvRPA += "Filial;";
            csvRPA += "Nome Prestador;";
            csvRPA += "CPF Prestador;";
            csvRPA += "Data Entrada;";
            csvRPA += "Data Pagamento;";
            csvRPA += "Valor;";
            csvRPA += "Condição;";
            csvRPA += "Requisitante;";
            csvRPA += "Localização;";
            csvRPA += "Centro de Custo;";
            csvRPA += "Função;";
            csvRPA += "Cliente;";
            csvRPA += "Local;";
            csvRPA += "Data/Hora Disponibilidade Recursos Humanos;";
            csvRPA += "Data/Hora Ínicio Atividade;";
            csvRPA += "Data/Hora Fim Atividade;";
            csvRPA += "Usuário Recursos Humanos;";
            csvRPA += "Data/Hora Disponibilidade Supervisor;";
            csvRPA += "Data/Hora Fim Supervisor;";
            csvRPA += "Usuário Supervisor;";
            csvRPA += "Data/Hora Disponibilidade Coordenador;";
            csvRPA += "Data/Hora Fim Coordenador;";
            csvRPA += "Usuário Coordenador;";
            csvRPA += "Data/Hora Disponibilidade Gerente;";
            csvRPA += "Data/Hora Fim Gerente;";
            csvRPA += "Usuário Gerente;";
            csvRPA += "Data/Hora Disponibilidade Diretor;";
            csvRPA += "Data/Hora Fim Diretor;";
            csvRPA += "Usuário Diretor;";
            csvRPA += "\n";
        
            for(let int = 0; int < dadosCSVRPA.length; int++){
                csvRPA += dadosCSVRPA[int]["codigoFluig"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["status"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["nomeFilial"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["nomePrestador"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["cpfPrestador"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataEntrada"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataPagamento"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["valor"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["condicao"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["requisitante"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["localizacao"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["centroCusto"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["funcao"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["cliente"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["local"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataDisponibilidadeRH"] + ";";
                csvRPA += dadosCSVRPA[int]["dataAssumiuRH"] + ";";
                csvRPA += dadosCSVRPA[int]["dataFinalizouRH"] + ";";
                csvRPA += dadosCSVRPA[int]["usuarioRH"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataDisponibilidadeS"] + ";";
                csvRPA += dadosCSVRPA[int]["dataFinalizouS"] + ";";
                csvRPA += dadosCSVRPA[int]["usuarioS"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataDisponibilidadeC"] + ";";
                csvRPA += dadosCSVRPA[int]["dataFinalizouC"] + ";";
                csvRPA += dadosCSVRPA[int]["usuarioC"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataDisponibilidadeG"] + ";";
                csvRPA += dadosCSVRPA[int]["dataFinalizouG"] + ";";
                csvRPA += dadosCSVRPA[int]["usuarioG"].toString() + ";";
                csvRPA += dadosCSVRPA[int]["dataDisponibilidadeD"] + ";";
                csvRPA += dadosCSVRPA[int]["dataFinalizouD"] + ";";
                csvRPA += dadosCSVRPA[int]["usuarioD"].toString() + ";";
                csvRPA += "\n";
            }
            console.log(csvRPA);
            let downloadLinkRPA = document.createElement("a");
            downloadLinkRPA.download = "RPA.csv";
            downloadLinkRPA.href = window.URL.createObjectURL(new Blob([csvRPA], {type: "text/csv"}));
            downloadLinkRPA.style.display = "none";
            document.body.appendChild(downloadLinkRPA);
            downloadLinkRPA.click();
        };

        btnConsultarRPA.on('click', () => {
            let myLoadingRPA = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingRPA.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsRPA();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetRPA;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetRPA = DatasetFactory.getDataset("dsPagamentoRPA", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetRPA = DatasetFactory.getDataset("ds_SolicitacaoPagamentoRPA", null, constraints, null); // Produção
                }
                console.log("datasetRPA");
                console.log(datasetRPA);
                if(datasetRPA.length > 0 || datasetRPA.values){
                    $("#tableRPA tbody").html("");
                    dadosRPA = [];
                    let usuarioComPermissao = true;
                    let solicitacoesRPA = datasetRPA.values;
                    for(let i = 0; i < solicitacoesRPA.length; i++){
                        const solicitacao = solicitacoesRPA[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingRPA.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"] == null ? "" : solicitacao["numeroFluxo"];
                        let status = solicitacao["Status"] == null ? "" : solicitacao["Status"];
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "Encaminhado para Recursos Humanos") status = "Aberto";
                        if(status == "SP Reprovada") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "SP - Pagamento Programado") status = "Finalizado";

                        let nomeFilial = solicitacao["zoomFilial"] == null ? "" : solicitacao["zoomFilial"];
                        let nomePrestador = solicitacao["inputNomePrestador"] == null ? "" : solicitacao["inputNomePrestador"];
                        let cpfPrestador = solicitacao["inputNrCPF"] == null ? "" : solicitacao["inputNrCPF"];
                        let dataEntrada = solicitacao["dataEntrada"] == null ? "" : solicitacao["dataEntrada"];
                        let dataPagamento = solicitacao["dataVencimentoNota"] == null ? "" : convertDateRPA(solicitacao["dataVencimentoNota"]);
                        let valor = solicitacao["valorTotalDocumento"] == null ? "" : solicitacao["valorTotalDocumento"];
                        let condicao = solicitacao["tipoPagamento"] == null ? "" : solicitacao["tipoPagamento"];
                        let requisitante = solicitacao["solicitanteNome"] == null ? "" : solicitacao["solicitanteNome"];
                        let localizacao = solicitacao["atividadeAtual"] == null ? "" : solicitacao["atividadeAtual"];
                        if(localizacao == "27") localizacao = "Supervisor";
                        if(localizacao == "55") localizacao = "Coordenador";
                        if(localizacao == "25") localizacao = "Coordenador";
                        if(localizacao == "11") localizacao = "Correção";
                        if(localizacao == "34") localizacao = "Gerente";
                        if(localizacao == "41") localizacao = "Diretor";
                        if(localizacao == "5") localizacao = "Recursos Humanos";
                        if(localizacao == "0") localizacao = "Início";
                        if(localizacao == "14") localizacao = "Fim";

                        let centroCusto = solicitacao["zoomCentroCusto"] == null ? "" : solicitacao["zoomCentroCusto"];
                        let funcao = solicitacao["inputFuncao"] == null ? "" : solicitacao["inputFuncao"];
                        let cliente = solicitacao["inputCliente"] == null ? "" : solicitacao["inputCliente"];
                        let local = solicitacao["inputLocal"] == null ? "" : solicitacao["inputLocal"];
                        
                        let dataDisponibilidadeRH = solicitacao["dataDisponibilidadeRH"] == null || solicitacao["dataDisponibilidadeRH"] == "" ? "" : convertDateTimeRPA(solicitacao["dataDisponibilidadeRH"]);
                        let dataAssumiuRH = solicitacao["dataAssumiuRH"] == null || solicitacao["dataAssumiuRH"] == "" ? "" : convertDateTimeRPA(solicitacao["dataAssumiuRH"]);
                        let dataFinalizouRH = solicitacao["dataFinalizouRH"] == null || solicitacao["dataFinalizouRH"] == "" ? "" : convertDateTimeRPA(solicitacao["dataFinalizouRH"]);
                        let usuarioRH = solicitacao["usuarioRH"] == null ? "" : solicitacao["usuarioRH"];

                        let dataDisponibilidadeS = solicitacao["dataDisponibilidadeS"] == null || solicitacao["dataDisponibilidadeS"] == "" ? "" : convertDateTimeRPA(solicitacao["dataDisponibilidadeS"]); 
                        let dataFinalizouS = solicitacao["dataFinalizouS"] == null || solicitacao["dataFinalizouS"] == "" ? "" : convertDateTimeRPA(solicitacao["dataFinalizouS"]);
                        let usuarioS = solicitacao["usuarioS"] == null || solicitacao["usuarioS"] == "" ? "" : solicitacao["usuarioS"];

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"] == null || solicitacao["dataDisponibilidadeC"] == "" ? "" : convertDateTimeRPA(solicitacao["dataDisponibilidadeC"]);
                        let dataFinalizouC = solicitacao["dataFinalizouC"] == null || solicitacao["dataFinalizouC"] == "" ? "" : convertDateTimeRPA(solicitacao["dataFinalizouC"]);
                        let usuarioC = solicitacao["usuarioC"] == null || solicitacao["usuarioC"] == "" ? "" : solicitacao["usuarioC"];

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"] == null || solicitacao["dataDisponibilidadeG"] == "" ? "" : convertDateTimeRPA(solicitacao["dataDisponibilidadeG"]);
                        let dataFinalizouG = solicitacao["dataFinalizouG"] == null || solicitacao["dataFinalizouG"] == "" ? "" : convertDateTimeRPA(solicitacao["dataFinalizouG"]);
                        let usuarioG = solicitacao["usuarioG"] == null || solicitacao["usuarioG"] == "" ? "" : solicitacao["usuarioG"];

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"] == null || solicitacao["dataDisponibilidadeD"] == "" ? "" : convertDateTimeRPA(solicitacao["dataDisponibilidadeD"]);
                        let dataFinalizouD = solicitacao["dataFinalizouD"] == null || solicitacao["dataFinalizouD"] == "" ? "" : convertDateTimeRPA(solicitacao["dataFinalizouD"]);
                        let usuarioD = solicitacao["usuarioD"] == null || solicitacao["usuarioD"] == "" ? "" : solicitacao["usuarioD"];

                        dadosRPA.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "nomeFilial" : nomeFilial,
                            "nomePrestador" : nomePrestador,
                            "cpfPrestador" : cpfPrestador,
                            "dataEntrada" : dataEntrada,
                            "dataPagamento" : dataPagamento,
                            "valor" : valor,
                            "condicao" : condicao,
                            "requisitante" : requisitante,
                            "localizacao" : localizacao,
                            "centroCusto" : centroCusto,
                            "funcao" : funcao,
                            "cliente" : cliente,
                            "local" : local,
                            "dataDisponibilidadeRH" : dataDisponibilidadeRH,
                            "dataAssumiuRH" : dataAssumiuRH,
                            "dataFinalizouRH" : dataFinalizouRH,
                            "usuarioRH" : usuarioRH,
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
                        createTableRPA(dadosRPA);
                        myLoadingRPA.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesRPA.length} registros!`,type: 'success'});
                        btnExportarRPA.on('click', () => {
                            let switchExportacaoAvancadaRPA = $("#switchExportacaoAvancadaRPA");
                            console.log(switchExportacaoAvancadaRPA);
                            console.log(switchExportacaoAvancadaRPA.is(":checked"));
                            if(switchExportacaoAvancadaRPA.is(":checked")){
                                gerarCSVAvancadoRPA(dadosRPA);
                            }else{
                                gerarCSVRPA(dadosRPA);
                            }
                        });
                    }
                }else{
                    myLoadingRPA.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});