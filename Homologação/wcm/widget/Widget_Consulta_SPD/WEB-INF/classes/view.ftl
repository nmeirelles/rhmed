<div id="WidgetConsultaSPD_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetSPD.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaSPD">
                <input type="hidden" class="form-control" id="paginaSPD" name="paginaSPD">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoSPD" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoSPD" id="inputNumeroFluxoSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusSPD" class="control-label">Status</label>
                        <select name="selectStatusSPD" id="selectStatusSPD" class="form-control clearSPD">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFilialSPD" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialSPD" id="inputNomeFilialSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectTipoPagamentoSPD" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoSPD" id="selectTipoPagamentoSPD" class="form-control clearSPD">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataEntradaSPD" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaSPD" id="inputDataEntradaSPD" class="form-control">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesEntradaSPD" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaSPD" id="inputMesEntradaSPD" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoEntradaSPD" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaSPD" id="inputAnoEntradaSPD" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectNaturezaSPD" class="control-label">Natureza</label>
                        <select name="selectNaturezaSPD" id="selectNaturezaSPD" class="form-control clearSPD"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataVencimentoSPD" class="control-label">Data Vencimento</label>
                        <input type="date" name="inputDataVencimentoSPD" id="inputDataVencimentoSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesVencimentoSPD" class="control-label">Mês Vencimento</label>
                        <input type="text" name="inputMesVencimentoSPD" id="inputMesVencimentoSPD" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoVencimentoSPD" class="control-label">Ano Vencimento</label>
                        <input type="text" name="inputAnoVencimentoSPD" id="inputAnoVencimentoSPD" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeSPD" class="control-label">Localização</label>
                        <select name="selectAtividadeSPD" id="selectAtividadeSPD" class="form-control clearSPD">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="fiscal">Célula Fiscal</option>
                            <option value="contasPagar">Contas a Pagar</option>
                            <option value="ti">T.I.</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFornecedorSPD" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorSPD" id="inputNomeFornecedorSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCNPJFornecedorSPD" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorSPD" id="inputCNPJFornecedorSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteSPD" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteSPD" id="inputNomeSolicitanteSPD" class="form-control clearSPD">
                        <input type="hidden" name="inputMatriculaSolicitanteSPD" id="inputMatriculaSolicitanteSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectFormaPagamentoSPD" class="control-label">Forma Pagamento</label>
                        <select name="selectFormaPagamentoSPD" id="selectFormaPagamentoSPD" class="form-control clearSPD">
                            <option value=""></option>
                            <option value="semCodigo">Sem Código de Barras</option>
                            <option value="comCodigo">Com Código de Barras</option>
                            <option value="darf">DARF</option>
                            <option value="darm">DARM</option>
                            <option value="gps">GPS</option>
                            <option value="grf">GRF</option>
                            <option value="damsp">DAMSP</option>
                            <option value="darfWeb">DARF DCTFWEB</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoSPD" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoSPD" id="inputCentroCustoSPD" class="form-control clearRC aprovador">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputValorTotalSPD" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalSPD" id="inputValorTotalSPD" class="form-control clearRC" maxlength="14">
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorSPD" name="checkboxFiltrarAprovadorSPD">
                        <label for="checkboxFiltrarAprovadorSPD">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorSPD" name="divSupervisorSPD">
                        <label for="inputNomeSupervisorSPD" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorSPD" id="inputNomeSupervisorSPD" class="form-control clearSPD aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorSPD" id="inputMatriculaSupervisorSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorSPD" name="divCoordenadorSPD">
                        <label for="inputNomeCoordenadorSPD" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorSPD" id="inputNomeCoordenadorSPD" class="form-control clearSPD aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorSPD" id="inputMatriculaCoordenadorSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteSPD" name="divGerenteSPD">
                        <label for="inputNomeGerenteSPD" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteSPD" id="inputNomeGerenteSPD" class="form-control clearSPD aprovador">
                        <input type="hidden" name="inputMatriculaGerenteSPD" id="inputMatriculaGerenteSPD" class="form-control clearSPD">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorSPD" name="divDiretorSPD">
                        <label for="inputNomeDiretorSPD" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorSPD" id="inputNomeDiretorSPD" class="form-control clearSPD aprovador">
                        <input type="hidden" name="inputMatriculaDiretorSPD" id="inputMatriculaDiretorSPD" class="form-control clearSPD">
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaSPD" 
                            id="switchExportacaoAvancadaSPD"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarSPD" name="btnConsultarSPD" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarSPD" name="btnExportarSPD" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableSPD" name="tableSPD" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Tipo Solicitação</th>
                                    <th>Filial</th>
                                    <th>Código Fornecedor</th>
                                    <th>Nome Fornecedor</th>
                                    <th>CNPJ Fornecedor</th>
                                    <th>Natureza</th>
                                    <th>Data Entrada</th>
                                    <th>Data Vencimento</th>
                                    <th>Valor</th>
                                    <th>Condição Pagamento</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Forma Pagamento</th>
                                    <th>Centro de Custo</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorSPD" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoSPD"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoSPD" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>