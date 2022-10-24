<div id="WidgetConsultaSPS_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetSPS.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaSPS">
                <input type="hidden" class="form-control" id="paginaSPS" name="paginaSPS">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoSPS" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoSPS" id="inputNumeroFluxoSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusSPS" class="control-label">Status</label>
                        <select name="selectStatusSPS" id="selectStatusSPS" class="form-control clearSPS">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntradaSPS" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaSPS" id="inputDataEntradaSPS" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaSPS" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaSPS" id="inputMesEntradaSPS" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaSPS" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaSPS" id="inputAnoEntradaSPS" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFilialSPS" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialSPS" id="inputNomeFilialSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFornecedorSPS" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorSPS" id="inputNomeFornecedorSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCNPJFornecedorSPS" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorSPS" id="inputCNPJFornecedorSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataVencimentoSPS" class="control-label">Data Vencimento</label>
                        <input type="date" name="inputDataVencimentoSPS" id="inputDataVencimentoSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesVencimentoSPS" class="control-label">Mês Vencimento</label>
                        <input type="text" name="inputMesVencimentoSPS" id="inputMesVencimentoSPS" class="form-control clearSPS" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoVencimentoSPS" class="control-label">Ano Vencimento</label>
                        <input type="text" name="inputAnoVencimentoSPS" id="inputAnoVencimentoSPS" class="form-control clearSPS" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNumeroDocumentoSPS" class="control-label">Número Nota Fiscal</label>
                        <input type="text" name="inputNumeroDocumentoSPS" id="inputNumeroDocumentoSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectTipoPagamentoSPS" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoSPS" id="selectTipoPagamentoSPS" class="form-control clearSPS">
                            <option value=""></option>
                            <option value="normal">Normal</option>
                            <option value="emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeSolicitanteSPS" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteSPS" id="inputNomeSolicitanteSPS" class="form-control clearSPS">
                        <input type="hidden" name="inputMatriculaSolicitanteSPS" id="inputMatriculaSolicitanteSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectAtividadeSPS" class="control-label">Localização</label>
                        <select name="selectAtividadeSPS" id="selectAtividadeSPS" class="form-control clearSPS">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="fiscal">Célula Fiscal</option>
                            <option value="ti">T.I.</option>
                            <option value="contasPagar">Contas a Pagar</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectFormaPagamentoSPS" class="control-label">Forma Pagamento</label>
                        <select name="selectFormaPagamentoSPS" id="selectFormaPagamentoSPS" class="form-control clearSPS">
                            <option value=""></option>
                            <option value="Credito em Conta">Crédito em Conta</option>
                            <option value="Boleto">Boleto</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputValorTotalSPS" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalSPS" id="inputValorTotalSPS" class="form-control clearRC" maxlength="14">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputContaSPS" class="control-label">Conta Bancária</label>
                        <input type="text" name="inputContaSPS" id="inputContaSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCodigoBarrasSPS" class="control-label">Código Barras</label>
                        <input type="text" name="inputCodigoBarrasSPS" id="inputCodigoBarrasSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCentroCustoSPS" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoSPS" id="inputCentroCustoSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorSPS" name="checkboxFiltrarAprovadorSPS">
                        <label for="checkboxFiltrarAprovadorSPS">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNaturezaSPS" class="control-label">Natureza</label>
                        <input type="text" name="inputNaturezaSPS" id="inputNaturezaSPS" class="form-control clearSPS">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorSPS" name="divSupervisorSPS">
                        <label for="inputNomeSupervisorSPS" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorSPS" id="inputNomeSupervisorSPS" class="form-control clearSPS aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorSPS" id="inputMatriculaSupervisorSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorSPS" name="divCoordenadorSPS">
                        <label for="inputNomeCoordenadorSPS" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorSPS" id="inputNomeCoordenadorSPS" class="form-control clearSPS aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorSPS" id="inputMatriculaCoordenadorSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteSPS" name="divGerenteSPS">
                        <label for="inputNomeGerenteSPS" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteSPS" id="inputNomeGerenteSPS" class="form-control clearSPS aprovador">
                        <input type="hidden" name="inputMatriculaGerenteSPS" id="inputMatriculaGerenteSPS" class="form-control clearSPS">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorSPS" name="divDiretorSPS">
                        <label for="inputNomeDiretorSPS" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorSPS" id="inputNomeDiretorSPS" class="form-control clearSPS aprovador">
                        <input type="hidden" name="inputMatriculaDiretorSPS" id="inputMatriculaDiretorSPS" class="form-control clearSPS">
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaSPS" 
                            id="switchExportacaoAvancadaSPS"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarSPS" name="btnConsultarSPS" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarSPS" name="btnExportarSPS" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableSPS" name="tableSPS" class="table table-striped table-bordered table-hover table-condensed">
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
                                    <th>Natureza</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorSPS" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoSPS"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoSPS" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>