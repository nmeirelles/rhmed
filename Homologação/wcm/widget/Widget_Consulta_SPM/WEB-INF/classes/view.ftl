<div id="WidgetConsultaSPM_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetSPM.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaSPM">
                <input type="hidden" class="form-control" id="paginaSPM" name="paginaSPM">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoSPM" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoSPM" id="inputNumeroFluxoSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusSPM" class="control-label">Status</label>
                        <select name="selectStatusSPM" id="selectStatusSPM" class="form-control clearSPM">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntradaSPM" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaSPM" id="inputDataEntradaSPM" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaSPM" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaSPM" id="inputMesEntradaSPM" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaSPM" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaSPM" id="inputAnoEntradaSPM" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFilialSPM" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialSPM" id="inputNomeFilialSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFornecedorSPM" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorSPM" id="inputNomeFornecedorSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCNPJFornecedorSPM" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorSPM" id="inputCNPJFornecedorSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataVencimentoSPM" class="control-label">Data Vencimento</label>
                        <input type="date" name="inputDataVencimentoSPM" id="inputDataVencimentoSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesVencimentoSPM" class="control-label">Mês Vencimento</label>
                        <input type="text" name="inputMesVencimentoSPM" id="inputMesVencimentoSPM" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoVencimentoSPM" class="control-label">Ano Vencimento</label>
                        <input type="text" name="inputAnoVencimentoSPM" id="inputAnoVencimentoSPM" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNumeroDocumentoSPM" class="control-label">Número Nota Fiscal</label>
                        <input type="text" name="inputNumeroDocumentoSPM" id="inputNumeroDocumentoSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectTipoPagamentoSPM" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoSPM" id="selectTipoPagamentoSPM" class="form-control clearSPM">
                            <option value=""></option>
                            <option value="normal">Normal</option>
                            <option value="emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeSolicitanteSPM" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteSPM" id="inputNomeSolicitanteSPM" class="form-control clearSPM">
                        <input type="hidden" name="inputMatriculaSolicitanteSPM" id="inputMatriculaSolicitanteSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectAtividadeSPM" class="control-label">Localização</label>
                        <select name="selectAtividadeSPM" id="selectAtividadeSPM" class="form-control clearSPM">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="fiscal">Célula Fiscal</option>
                            <option value="contasPagar">Contas a Pagar</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectFormaPagamentoSPM" class="control-label">Forma Pagamento</label>
                        <select name="selectFormaPagamentoSPM" id="selectFormaPagamentoSPM" class="form-control clearSPM">
                            <option value=""></option>
                            <option value="Credito em Conta">Crédito em Conta</option>
                            <option value="Boleto">Boleto</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputValorTotalSPM" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalSPM" id="inputValorTotalSPM" class="form-control clearRC" maxlength="14">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputContaSPM" class="control-label">Conta Bancária</label>
                        <input type="text" name="inputContaSPM" id="inputContaSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCodigoBarrasSPM" class="control-label">Código Barras</label>
                        <input type="text" name="inputCodigoBarrasSPM" id="inputCodigoBarrasSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCentroCustoSPM" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoSPM" id="inputCentroCustoSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorSPM" name="checkboxFiltrarAprovadorSPM">
                        <label for="checkboxFiltrarAprovadorSPM">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorSPM" name="divSupervisorSPM">
                        <label for="inputNomeSupervisorSPM" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorSPM" id="inputNomeSupervisorSPM" class="form-control clearSPM aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorSPM" id="inputMatriculaSupervisorSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorSPM" name="divCoordenadorSPM">
                        <label for="inputNomeCoordenadorSPM" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorSPM" id="inputNomeCoordenadorSPM" class="form-control clearSPM aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorSPM" id="inputMatriculaCoordenadorSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteSPM" name="divGerenteSPM">
                        <label for="inputNomeGerenteSPM" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteSPM" id="inputNomeGerenteSPM" class="form-control clearSPM aprovador">
                        <input type="hidden" name="inputMatriculaGerenteSPM" id="inputMatriculaGerenteSPM" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorSPM" name="divDiretorSPM">
                        <label for="inputNomeDiretorSPM" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorSPM" id="inputNomeDiretorSPM" class="form-control clearSPM aprovador">
                        <input type="hidden" name="inputMatriculaDiretorSPM" id="inputMatriculaDiretorSPM" class="form-control clearSPM">
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaSPM" 
                            id="switchExportacaoAvancadaSPM"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarSPM" name="btnConsultarSPM" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarSPM" name="btnExportarSPM" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableSPM" name="tableSPM" class="table table-striped table-bordered table-hover table-condensed">
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
                                    <th>Data Entrada</th>
                                    <th>Data Vencimento</th>
                                    <th>Valor</th>
                                    <th>Condição</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Forma Pagamento</th>
                                    <th>Código Barras</th>
                                    <th>Centro de Custo</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorSPM" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoSPM"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoSPM" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>