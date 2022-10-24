var MyWidgetRF = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoRF = $("#inputNumeroFluxoRF");
        let inputValorTotalRF = $("#inputValorTotalRF");
        let selectStatusRF = $("#selectStatusRF");
        let inputNomeFilialRF = $("#inputNomeFilialRF");
        let inputNomeFornecedorRF = $("#inputNomeFornecedorRF");
        let inputCNPJFornecedorRF = $("#inputCNPJFornecedorRF");
        let inputNumeroDocumentoRF = $("#inputNumeroDocumentoRF");
        let inputDataEntradaRF = $("#inputDataEntradaRF");
        let inputMesEntradaRF = $("#inputMesEntradaRF");
        let inputAnoEntradaRF = $("#inputAnoEntradaRF");
        let inputDataVencimentoRF = $("#inputDataVencimentoRF");
        let inputMesVencimentoRF = $("#inputMesVencimentoRF");
        let inputAnoVencimentoRF = $("#inputAnoVencimentoRF");
        let selectTipoPagamentoRF = $("#selectTipoPagamentoRF");
        let inputNomeSolicitanteRF = $("#inputNomeSolicitanteRF");
        let inputMatriculaSolicitanteRF = $("#inputMatriculaSolicitanteRF");
        let selectAtividadeRF = $("#selectAtividadeRF");
        let selectFormaPagamentoRF = $("#selectFormaPagamentoRF");
        let inputContaRF = $("#inputContaRF");
        let inputCodigoBarrasRF = $("#inputCodigoBarrasRF");
        let inputCentroCustoRF = $("#inputCentroCustoRF");
        let btnConsultarRF = $("#btnConsultarRF");
        let btnExportarRF = $("#btnExportarRF");
        let tableRF = $("#tableRF");
        let dadosRF = [];

        $('#inputValorTotalRF').maskMoney({
            thousands: '.',
            decimal: ','
        });

        const centroCustoSPA = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoRF",{
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

        btnExportarRF.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaRF');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRF', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRF', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteRF",{
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
            inputNomeSolicitanteRF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteRF.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorRF]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorRF").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divSupervisorRF").show();
                $("#divCoordenadorRF").show();
                $("#divGerenteRF").show();
                $("#divDiretorRF").show();
            }
            if(filtrar == false){
                $("#divSupervisorRF").hide();
                $("#divCoordenadorRF").hide();
                $("#divGerenteRF").hide();
                $("#divDiretorRF").hide();
            }
        });

        const convertDateTimeRF = (data) => data != "" || data != null ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";

        const convertDateRF = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsRF = () => {
            const constraintsRF = [];
            if(inputNumeroFluxoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoRF.val(), inputNumeroFluxoRF.val(), ConstraintType.MUST));
                return constraintsRF;
            }
            if(inputValorTotalRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("valorTotalDocumento", inputValorTotalRF.val(), inputValorTotalRF.val(), ConstraintType.MUST));
            }
            if(selectStatusRF.val() != ""){
                if(selectStatusRF.val() == "aberto"){
                    constraintsRF.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsRF.push(DatasetFactory.createConstraint("Status", "Encaminhado para Célula Fiscal", "Encaminhado para Célula Fiscal", ConstraintType.SHOULD));
                    constraintsRF.push(DatasetFactory.createConstraint("Status", "SP Reprovada", "SP Reprovada", ConstraintType.SHOULD));
                    constraintsRF.push(DatasetFactory.createConstraint("Status", "SP Encaminhada Para Pagamento", "SP Encaminhada Para Pagamento", ConstraintType.SHOULD));
                }
                if(selectStatusRF.val() == "cancelado"){
                    constraintsRF.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.MUST));
                }
                if(selectStatusRF.val() == "finalizado"){
                    constraintsRF.push(DatasetFactory.createConstraint("Status", "SP - Pagamento Programado", "SP - Pagamento Programado", ConstraintType.MUST));
                }
            }
            if(inputNomeFilialRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialRF.val(), inputNomeFilialRF.val(), ConstraintType.MUST, true));
            }
            if(inputNomeFornecedorRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("inputFornecedor", inputNomeFornecedorRF.val(), inputNomeFornecedorRF.val(), ConstraintType.MUST, true));
            }
            if(inputCNPJFornecedorRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("cnpj", inputCNPJFornecedorRF.val(), inputCNPJFornecedorRF.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoRF.val(), inputCentroCustoRF.val(), ConstraintType.MUST));
            }
            if(inputNumeroDocumentoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("inputNrNotaFiscal", inputNumeroDocumentoRF.val(), inputNumeroDocumentoRF.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("dataEntrada", convertDateRF(inputDataEntradaRF.val()), convertDateRF(inputDataEntradaRF.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaRF.val(), inputMesEntradaRF.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaRF.val(), inputAnoEntradaRF.val(), ConstraintType.MUST));
            }
            if(inputDataVencimentoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("dataVencimentoNota", inputDataVencimentoRF.val(), inputDataVencimentoRF.val(), ConstraintType.MUST));
            }
            if(inputMesVencimentoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("mesVencimento", inputMesVencimentoRF.val(), inputMesVencimentoRF.val(), ConstraintType.MUST));
            }
            if(inputAnoVencimentoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("anoVencimento", inputAnoVencimentoRF.val(), inputAnoVencimentoRF.val(), ConstraintType.MUST));
            }
            if(selectTipoPagamentoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("tipoPagamento", selectTipoPagamentoRF.val(), selectTipoPagamentoRF.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteRF.val(), inputMatriculaSolicitanteRF.val(), ConstraintType.MUST));
            }
            if(selectAtividadeRF.val() != ""){
                if(selectAtividadeRF.val() == "correcao") constraintsRF.push(DatasetFactory.createConstraint("atividadeAtual", "11", "11", ConstraintType.MUST));
                if(selectAtividadeRF.val() == "fiscal") constraintsRF.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeRF.val() == "contasPagar") constraintsRF.push(DatasetFactory.createConstraint("atividadeAtual", "18", "18", ConstraintType.MUST));
            }
            if(selectFormaPagamentoRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("formaPagamento", selectFormaPagamentoRF.val(), selectFormaPagamentoRF.val(), ConstraintType.MUST));
            }
            if(inputContaRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("contaPag", inputContaRF.val(), inputContaRF.val(), ConstraintType.MUST));
            }
            if(inputCodigoBarrasRF.val() != ""){
                constraintsRF.push(DatasetFactory.createConstraint("numBoleto", inputCodigoBarrasRF.val(), inputCodigoBarrasRF.val(), ConstraintType.MUST));
            }
            
            return constraintsRF;
        }

        const createTableRF = (dadosTableRF) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableRF);
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
                $('#tableRF > tbody > tr').remove();
                let tr = "";
                for(let i = pagina * tamanhoPagina; i < dadosTableRF.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="'+url+'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableRF[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableRF[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableRF[i]["status"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["tipoSolicitacao"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["codigoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["nomeFornecedor"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["cnpjFornecedor"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["documento"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["pedidoCompra"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["dataVencimento"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["valor"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["condicao"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["formaPagamento"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["codigoBarras"] +'</td>'+
                                '<td>'+ dadosTableRF[i]["centroCusto"] +'</td>'+
                            "</tr>";
                }
                tableRF.append(tr);
                $('#numeracaoRF').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableRF.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoRF').prop('disabled', dadosTableRF.length <= tamanhoPagina || pagina > dadosTableRF.length / tamanhoPagina - 1);
                $('#anteriorRF').prop('disabled', dadosTableRF.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoRF').click(()=>{
                if(pagina < dadosTableRF.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorRF').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVRF = (dadosCSVRF) => {
            let csvRF = "\uFEFF";
        
            csvRF += "Código Fluig;";
            csvRF += "Status;";
            csvRF += "Tipo Solicitação;";
            csvRF += "Nome Filial;";
            csvRF += "Código Fornecedor;";
            csvRF += "Nome Fornecedor;";
            csvRF += "CNPJ Fornecedor;";
            csvRF += "Documento;";
            csvRF += "Pedido Compra;";
            csvRF += "Data Entrada;";
            csvRF += "Data Vencimento;";
            csvRF += "Valor;";
            csvRF += "Condição;";
            csvRF += "Requisitante;";
            csvRF += "Localização;";
            csvRF += "Forma Pagamento;";
            csvRF += "Código Barras;";
            csvRF += "Centro de Custo;";
        
            csvRF += "\n";
        
            for(let int = 0; int < dadosCSVRF.length; int++){
                csvRF += dadosCSVRF[int]["codigoFluig"].toString() + ";";
                csvRF += dadosCSVRF[int]["status"].toString() + ";";
                csvRF += dadosCSVRF[int]["tipoSolicitacao"].toString() + ";";
                csvRF += dadosCSVRF[int]["nomeFilial"].toString() + ";";
                csvRF += dadosCSVRF[int]["codigoFornecedor"].toString() + ";";
                csvRF += dadosCSVRF[int]["nomeFornecedor"].toString() + ";";
                csvRF += dadosCSVRF[int]["cnpjFornecedor"].toString() + ";";
                csvRF += dadosCSVRF[int]["documento"].toString() + ";";
                csvRF += dadosCSVRF[int]["pedidoCompra"].toString() + ";";
                csvRF += dadosCSVRF[int]["dataEntrada"].toString() + ";";
                csvRF += dadosCSVRF[int]["dataVencimento"].toString() + ";";
                csvRF += dadosCSVRF[int]["valor"].toString() + ";";
                csvRF += dadosCSVRF[int]["condicao"].toString() + ";";
                csvRF += dadosCSVRF[int]["requisitante"].toString() + ";";
                csvRF += dadosCSVRF[int]["localizacao"].toString() + ";";
                csvRF += dadosCSVRF[int]["formaPagamento"].toString() + ";";
                csvRF += dadosCSVRF[int]["codigoBarras"].toString() + ";";
                csvRF += dadosCSVRF[int]["centroCusto"].toString() + ";";
                csvRF += "\n";
            }
            console.log(csvRF);
            let downloadLinkRF = document.createElement("a");
            downloadLinkRF.download = "RF.csv";
            downloadLinkRF.href = window.URL.createObjectURL(new Blob([csvRF], {type: "text/csv"}));
            downloadLinkRF.style.display = "none";
            document.body.appendChild(downloadLinkRF);
            downloadLinkRF.click();
        };

        const gerarCSVAvancadoRF = (dadosCSVRF) => {
            let csvRF = "\uFEFF";
        
            csvRF += "Código Fluig;";
            csvRF += "Status;";
            csvRF += "Tipo Solicitação;";
            csvRF += "Nome Filial;";
            csvRF += "Código Fornecedor;";
            csvRF += "Nome Fornecedor;";
            csvRF += "CNPJ Fornecedor;";
            csvRF += "Documento;";
            csvRF += "Pedido Compra;";
            csvRF += "Data Entrada;";
            csvRF += "Data Vencimento;";
            csvRF += "Valor;";
            csvRF += "Condição;";
            csvRF += "Requisitante;";
            csvRF += "Localização;";
            csvRF += "Forma Pagamento;";
            csvRF += "Banco;";
            csvRF += "Agência;";
            csvRF += "Conta;";
            csvRF += "Código Barras;";
            csvRF += "Centro de Custo;";
            csvRF += "Data/Hora Disponibilidade Célula Fiscal;";
            csvRF += "Data/Hora Ínicio Atividade;";
            csvRF += "Data/Hora Fim Atividade;";
            csvRF += "Usuário Célula Fiscal;";
            csvRF += "Data/Hora Disponibilidade Contas Pagar;";
            csvRF += "Data/Hora Ínicio Atividade;";
            csvRF += "Data/Hora Fim Atividade;";
            csvRF += "Usuário Contas Pagar;";
            csvRF += "\n";
        
            for(let int = 0; int < dadosCSVRF.length; int++){
                csvRF += dadosCSVRF[int]["codigoFluig"].toString() + ";";
                csvRF += dadosCSVRF[int]["status"].toString() + ";";
                csvRF += dadosCSVRF[int]["tipoSolicitacao"].toString() + ";";
                csvRF += dadosCSVRF[int]["nomeFilial"].toString() + ";";
                csvRF += dadosCSVRF[int]["codigoFornecedor"].toString() + ";";
                csvRF += dadosCSVRF[int]["nomeFornecedor"].toString() + ";";
                csvRF += dadosCSVRF[int]["cnpjFornecedor"].toString() + ";";
                csvRF += dadosCSVRF[int]["documento"].toString() + ";";
                csvRF += dadosCSVRF[int]["pedidoCompra"].toString() + ";";
                csvRF += dadosCSVRF[int]["dataEntrada"].toString() + ";";
                csvRF += dadosCSVRF[int]["dataVencimento"].toString() + ";";
                csvRF += dadosCSVRF[int]["valor"].toString() + ";";
                csvRF += dadosCSVRF[int]["condicao"].toString() + ";";
                csvRF += dadosCSVRF[int]["requisitante"].toString() + ";";
                csvRF += dadosCSVRF[int]["localizacao"].toString() + ";";
                csvRF += dadosCSVRF[int]["formaPagamento"].toString() + ";";
                csvRF += dadosCSVRF[int]["banco"].toString() + ";";
                csvRF += dadosCSVRF[int]["agencia"].toString() + ";";
                csvRF += dadosCSVRF[int]["conta"].toString() + ";";
                csvRF += dadosCSVRF[int]["codigoBarras"].toString() + ";";
                csvRF += dadosCSVRF[int]["centroCusto"].toString() + ";";
                csvRF += dadosCSVRF[int]["dataDisponibilidadeCF"] + ";";
                csvRF += dadosCSVRF[int]["dataAssumiuCF"] + ";";
                csvRF += dadosCSVRF[int]["dataFinalizouCF"] + ";";
                csvRF += dadosCSVRF[int]["usuarioCF"].toString() + ";";
                csvRF += dadosCSVRF[int]["dataDisponibilidadeCP"] + ";";
                csvRF += dadosCSVRF[int]["dataAssumiuCP"] + ";";
                csvRF += dadosCSVRF[int]["dataFinalizouCP"] + ";";
                csvRF += dadosCSVRF[int]["usuarioCP"].toString() + ";";
                csvRF += "\n";
            }
            console.log(csvRF);
            let downloadLinkRF = document.createElement("a");
            downloadLinkRF.download = "RF.csv";
            downloadLinkRF.href = window.URL.createObjectURL(new Blob([csvRF], {type: "text/csv"}));
            downloadLinkRF.style.display = "none";
            document.body.appendChild(downloadLinkRF);
            downloadLinkRF.click();
        };

        btnConsultarRF.on('click', () => {
            let myLoadingRF = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingRF.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsRF();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetRF;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetRF = DatasetFactory.getDataset("dsEnvioNotaFiscal", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetRF = DatasetFactory.getDataset("DSformEnvioNotaFiscal", null, constraints, null); // Produção
                }
                console.log("datasetRF");
                console.log(datasetRF);
                if(datasetRF.length > 0 || datasetRF.values){
                    $("#tableRF tbody").html("");
                    dadosRF = [];
                    let usuarioComPermissao = true;
                    let solicitacoesRF = datasetRF.values;
                    for(let i = 0; i < solicitacoesRF.length; i++){
                        const solicitacao = solicitacoesRF[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingRF.hide();
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

                        let pedidoCompra = solicitacao["inputNrPedido"];
                        if(pedidoCompra == null) pedidoCompra = "";

                        let dataEntrada = solicitacao["dataEntrada"];
                        if(dataEntrada == null) dataEntrada = "";

                        let dataVencimento = convertDateRF(solicitacao["dataVencimentoNota"]);
                        if(dataVencimento == null) dataVencimento = "";

                        let valor = solicitacao["valorTotalDocumento"];
                        if(valor == null) valor = "";

                        let condicao = solicitacao["tipoPagamento"];
                        if(condicao == null) condicao = "";

                        let requisitante = solicitacao["solicitanteNome"];
                        if(requisitante == null) requisitante = "";
    
                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "11") localizacao = "Correção";
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
                        
                        let dataDisponibilidadeCF = solicitacao["dataDisponibilidadeCF"];
                        if(dataDisponibilidadeCF == null) dataDisponibilidadeCF = "";
                        if(dataDisponibilidadeCF != null && dataDisponibilidadeCF != "") dataDisponibilidadeCF = convertDateTimeRF(dataDisponibilidadeCF);
                        
                        let dataAssumiuCF = solicitacao["dataAssumiuCF"];
                        if(dataAssumiuCF == null) dataAssumiuCF = "";
                        if(dataAssumiuCF != null && dataAssumiuCF != "") dataAssumiuCF = convertDateTimeRF(dataAssumiuCF);
                        
                        let dataFinalizouCF = solicitacao["dataFinalizouCF"];
                        if(dataFinalizouCF == null) dataFinalizouCF = "";
                        if(dataFinalizouCF != null && dataFinalizouCF != "") dataFinalizouCF = convertDateTimeRF(dataFinalizouCF);
                        
                        let usuarioCF = solicitacao["usuarioCF"];
                        if(usuarioCF == null) usuarioCF = ""
                        
                        let dataDisponibilidadeCP = solicitacao["dataDisponibilidadeCP"];
                        if(dataDisponibilidadeCP == null) dataDisponibilidadeCP = "";
                        if(dataDisponibilidadeCP != null && dataDisponibilidadeCP != "") dataDisponibilidadeCP = convertDateTimeRF(dataDisponibilidadeCP);

                        let dataAssumiuCP = solicitacao["dataAssumiuCP"];
                        if(dataAssumiuCP == null) dataAssumiuCP = "";
                        if(dataAssumiuCP != null && dataAssumiuCP != "") dataAssumiuCP = convertDateTimeRF(dataAssumiuCP);

                        let dataFinalizouCP = solicitacao["dataFinalizouCP"];
                        if(dataFinalizouCP == null) dataFinalizouCP = "";
                        if(dataFinalizouCP != null && dataFinalizouCP != "") dataFinalizouCP = convertDate2(dataFinalizouCP);

                        let usuarioCP = solicitacao["usuarioCP"];
                        if(usuarioCP == null) usuarioCP = "";

                        dadosRF.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "tipoSolicitacao" : tipoSolicitacao,
                            "nomeFilial" : nomeFilial,
                            "codigoFornecedor" : codigoFornecedor,
                            "nomeFornecedor" : nomeFornecedor,
                            "cnpjFornecedor" : cnpjFornecedor,
                            "documento" : documento,
                            "pedidoCompra" : pedidoCompra,
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
                            "dataDisponibilidadeCF" : dataDisponibilidadeCF,
                            "dataAssumiuCF" : dataAssumiuCF,
                            "dataFinalizouCF" : dataFinalizouCF,
                            "usuarioCF" : usuarioCF,
                            "dataDisponibilidadeCP" : dataDisponibilidadeCP,
                            "dataAssumiuCP" : dataAssumiuCP,
                            "dataFinalizouCP" : dataFinalizouCP,
                            "usuarioCP" : usuarioCP
                        });
                    }
                    if(usuarioComPermissao == true){
                        createTableRF(dadosRF);
                        myLoadingRF.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesRF.length} registros!`,type: 'success'});
                        btnExportarRF.on('click', () => {
                            let switchExportacaoAvancadaRF = $("#switchExportacaoAvancadaRF");
                            console.log(switchExportacaoAvancadaRF);
                            console.log(switchExportacaoAvancadaRF.is(":checked"));
                            if(switchExportacaoAvancadaRF.is(":checked")){
                                gerarCSVAvancadoRF(dadosRF);
                            }else{
                                gerarCSVRF(dadosRF);
                            }
                        });
                    }
                }else{
                    myLoadingRF.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});