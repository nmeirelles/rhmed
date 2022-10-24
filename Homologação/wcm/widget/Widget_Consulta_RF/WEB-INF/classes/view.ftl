<div id="WidgetConsultaRF_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetRF.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaRF">
                <input type="hidden" class="form-control" id="paginaRF" name="paginaRF">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoRF" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoRF" id="inputNumeroFluxoRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusRF" class="control-label">Status</label>
                        <select name="selectStatusRF" id="selectStatusRF" class="form-control clearRF">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntradaRF" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaRF" id="inputDataEntradaRF" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaRF" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaRF" id="inputMesEntradaRF" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaRF" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaRF" id="inputAnoEntradaRF" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFilialRF" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialRF" id="inputNomeFilialRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFornecedorRF" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorRF" id="inputNomeFornecedorRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCNPJFornecedorRF" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorRF" id="inputCNPJFornecedorRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataVencimentoRF" class="control-label">Data Vencimento</label>
                        <input type="date" name="inputDataVencimentoRF" id="inputDataVencimentoRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesVencimentoRF" class="control-label">Mês Vencimento</label>
                        <input type="text" name="inputMesVencimentoRF" id="inputMesVencimentoRF" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoVencimentoRF" class="control-label">Ano Vencimento</label>
                        <input type="text" name="inputAnoVencimentoRF" id="inputAnoVencimentoRF" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNumeroDocumentoRF" class="control-label">Número Nota Fiscal</label>
                        <input type="text" name="inputNumeroDocumentoRF" id="inputNumeroDocumentoRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectTipoPagamentoRF" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoRF" id="selectTipoPagamentoRF" class="form-control clearRF">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="inputNomeSolicitanteRF" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteRF" id="inputNomeSolicitanteRF" class="form-control clearRF">
                        <input type="hidden" name="inputMatriculaSolicitanteRF" id="inputMatriculaSolicitanteRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectAtividadeRF" class="control-label">Localização</label>
                        <select name="selectAtividadeRF" id="selectAtividadeRF" class="form-control clearRF">
                            <option value=""></option>
                            <option value="correcao">Correção</option>
                            <option value="fiscal">Célula Fiscal</option>
                            <option value="contasPagar">Contas a Pagar</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectFormaPagamentoRF" class="control-label">Forma Pagamento</label>
                        <select name="selectFormaPagamentoRF" id="selectFormaPagamentoRF" class="form-control clearRF">
                            <option value=""></option>
                            <option value="Credito em Conta">Crédito em Conta</option>
                            <option value="Boleto">Boleto</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputPedidoCompraRF" class="control-label">Número Pedido</label>
                        <input type="text" name="inputPedidoCompraRF" id="inputPedidoCompraRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputContaRF" class="control-label">Conta Bancária</label>
                        <input type="text" name="inputContaRF" id="inputContaRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCodigoBarrasRF" class="control-label">Código Barras</label>
                        <input type="text" name="inputCodigoBarrasRF" id="inputCodigoBarrasRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCentroCustoRF" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoRF" id="inputCentroCustoRF" class="form-control clearRF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputValorTotalRF" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalRF" id="inputValorTotalRF" class="form-control clearRC" maxlength="14">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaRF" 
                            id="switchExportacaoAvancadaRF"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarRF" name="btnConsultarRF" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarRF" name="btnExportarRF" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableRF" name="tableRF" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Tipo Solicitação</th>
                                    <th>Filial</th>
                                    <th>Código Fornecedor</th>
                                    <th>Nome Fornecedor</th>
                                    <th>CNPJ Fornecedor</th>
                                    <th>Documento</th>
                                    <th>Pedido Compra</th>
                                    <th>Data Entrada</th>
                                    <th>Data Vencimento</th>
                                    <th>Valor</th>
                                    <th>Condição</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Forma Pagamento</th>
                                    <th>Código Barras</th>
                                    <th>Centro Custo</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorRF" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoRF"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoRF" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>