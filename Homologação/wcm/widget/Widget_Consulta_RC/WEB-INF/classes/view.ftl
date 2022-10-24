<div id="WidgetConsultaRC_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetRC.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaRC">
                <input type="hidden" class="form-control" id="paginaRC" name="paginaRC">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoRC" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoRC" id="inputNumeroFluxoRC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusRC" class="control-label">Status</label>
                        <select name="selectStatusRC" id="selectStatusRC" class="form-control clearRC">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntradaRC" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaRC" id="inputDataEntradaRC" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaRC" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaRC" id="inputMesEntradaRC" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaRC" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaRC" id="inputAnoEntradaRC" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeRC" class="control-label">Localização</label>
                        <select name="selectAtividadeRC" id="selectAtividadeRC" class="form-control clearRC">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="suprimentos">Suprimentos</option>
                            <option value="ti">T.I.</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectTipoRequisicaoRC" class="control-label">Tipo da Requisição</label>
                        <select name="selectTipoRequisicaoRC" id="selectTipoRequisicaoRC" class="form-control clearRC">
                            <option value=""></option>
                            <option value="padrao">Padrão</option>
                            <option value="regularizacao">Regularização</option>
                            <option value="aditivo">Aditivo Contratual</option>
                            <option value="pleito">Pleito</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectTipoPagamentoRC" class="control-label">Condição Pagamento</label>
                        <select name="selectTipoPagamentoRC" id="selectTipoPagamentoRC" class="form-control clearRC">
                            <option value=""></option>
                            <option value="normal">Normal</option>
                            <option value="emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoRC" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoRC" id="inputCentroCustoRC" class="form-control clearRC aprovador">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntregaRC" class="control-label">Data Sugerida Entrega</label>
                        <input type="date" name="inputDataEntregaRC" id="inputDataEntregaRC" class="form-control clearSPM">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntregaRC" class="control-label">Mês Entrega</label>
                        <input type="text" name="inputMesEntregaRC" id="inputMesEntregaRC" class="form-control" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntregaRC" class="control-label">Ano Entrega</label>
                        <input type="text" name="inputAnoEntregaRC" id="inputAnoEntregaRC" class="form-control" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFilialRC" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialRC" id="inputNomeFilialRC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteRC" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteRC" id="inputNomeSolicitanteRC" class="form-control clearRC">
                        <input type="hidden" name="inputMatriculaSolicitanteRC" id="inputMatriculaSolicitanteRC" class="form-control clearRC">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputFornecedorRC" class="control-label">Fornecedor</label>
                        <input type="text" name="inputFornecedorRC" id="inputFornecedorRC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputValorTotalRC" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalRC" id="inputValorTotalRC" class="form-control clearRC" maxlength="14">
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorRC" name="checkboxFiltrarAprovadorRC">
                        <label for="checkboxFiltrarAprovadorRC">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorRC" name="divSupervisorRC">
                        <label for="inputNomeSupervisorRC" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorRC" id="inputNomeSupervisorRC" class="form-control clearRC aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorRC" id="inputMatriculaSupervisorRC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorRC" name="divCoordenadorRC">
                        <label for="inputNomeCoordenadorRC" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorRC" id="inputNomeCoordenadorRC" class="form-control clearRC aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorRC" id="inputMatriculaCoordenadorRC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteRC" name="divGerenteRC">
                        <label for="inputNomeGerenteRC" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteRC" id="inputNomeGerenteRC" class="form-control clearRC aprovador">
                        <input type="hidden" name="inputMatriculaGerenteRC" id="inputMatriculaGerenteRC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorRC" name="divDiretorRC">
                        <label for="inputNomeDiretorRC" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorRC" id="inputNomeDiretorRC" class="form-control clearRC aprovador">
                        <input type="hidden" name="inputMatriculaDiretorRC" id="inputMatriculaDiretorRC" class="form-control clearRC">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaRC" 
                            id="switchExportacaoAvancadaRC"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarRC" name="btnConsultarRC" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarRC" name="btnExportarRC" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableRC" name="tableRC" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Tipo Solicitação</th>
                                    <th>Filial</th>
                                    <th>Fornecedor</th>
                                    <th>Data Entrada</th>
                                    <th>Data Sugerida Entrega</th>
                                    <th>Valor Total</th>
                                    <th>Condição Pagamento</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Tipo Requisição</th>
                                    <th>Centro de Custo</th>
                                    <th>Número Protheus</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorRC" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoRC"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoRC" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>