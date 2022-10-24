<div id="WidgetConsultaRP_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetRP.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaRP">
                <input type="hidden" class="form-control" id="paginaRP" name="paginaRP">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoRP" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoRP" id="inputNumeroFluxoRP" class="form-control clearRP">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFilialRP" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialRP" id="inputNomeFilialRP" class="form-control clearRP">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectUrgenciaRP" class="control-label">Urgência</label>
                        <select name="selectUrgenciaRP" id="selectUrgenciaRP" class="form-control clearRP">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="selectAreaRHRP" class="control-label">Área do RH (Responsável)</label>
                        <select class="form-control" name="selectAreaRHRP" id="selectAreaRHRP">
                            <option value=""></option>
                            <option value="rhExterno">RH Externo</option>
                            <option value="rhInterno">RH Corporativo</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataEntradaRP" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaRP" id="inputDataEntradaRP" class="form-control">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesEntradaRP" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaRP" id="inputMesEntradaRP" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoEntradaRP" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaRP" id="inputAnoEntradaRP" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoRP" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoRP" id="inputCentroCustoRP" class="form-control clearRP">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-3">
                        <label class="control-label" for="selectMotivoContratacaoRP">Motivo da Contratação</label>
                        <select class="form-control" name="selectMotivoContratacaoRP" id="selectMotivoContratacaoRP">
                            <option value=""></option>
                            <option value="aumentoQuadro">Aumento de Quadro</option>
                            <option value="coberturaFalta">Cobertura - Falta</option>									
                            <option value="coberturaFerias">Cobertura - Férias</option>
                            <option value="implantacao">Implantação</option>
                            <option value="substituicao">Substituição</option>									
                        </select>
                    </div>	
                    <div class="form-group col-md-3">
                        <label class="control-label" for="selectTipoContratacaoRP">Tipo da Contratação</label>
                        <select class="form-control" name="selectTipoContratacaoRP" id="selectTipoContratacaoRP">
                            <option value=""></option>
                            <option value="cltIndeterminato">CLT (Tempo Indeterminado)</option>
                            <option value="cltDeterminato">CLT (Tempo Determinado)</option>
                            <option value="pj">PJ</option>
                            <option value="rpa">RPA</option>
                            <option value="credenciado">Credenciado</option>
                        </select>
                    </div>
                    <div class="form-group col-md-3">
                        <label class="control-label" for="selectCargoRP">Cargo do Candidato</label>
                        <select class="form-control" name="selectCargoRP" id="selectCargoRP">
                            <option value=""></option>
                            <option value="staff">Staff</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="gerente">Gerente</option>
                        </select>
                    </div>	
                    <div class="form-group col-sm-3">
                        <label for="inputFuncaoRP" class="control-label">Função do Candidato</label>
                        <input type="text" name="inputFuncaoRP" id="inputFuncaoRP" class="form-control clearRP">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeRP" class="control-label">Localização</label>
                        <select name="selectAtividadeRP" id="selectAtividadeRP" class="form-control clearRP">
                            <option value=""></option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="rhcorporativo">RH Corporativo</option>
                            <option value="rhexterno">RH Externo</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteRP" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteRP" id="inputNomeSolicitanteRP" class="form-control clearRP">
                        <input type="hidden" name="inputMatriculaSolicitanteRP" id="inputMatriculaSolicitanteRP" class="form-control clearRP">
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorRP" name="checkboxFiltrarAprovadorRP">
                        <label for="checkboxFiltrarAprovadorRP">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteRP" name="divGerenteRP">
                        <label for="inputNomeGerenteRP" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteRP" id="inputNomeGerenteRP" class="form-control clearRP aprovador">
                        <input type="hidden" name="inputMatriculaGerenteRP" id="inputMatriculaGerenteRP" class="form-control clearRP">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorRP" name="divDiretorRP">
                        <label for="inputNomeDiretorRP" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorRP" id="inputNomeDiretorRP" class="form-control clearRP aprovador">
                        <input type="hidden" name="inputMatriculaDiretorRP" id="inputMatriculaDiretorRP" class="form-control clearRP">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaRP" 
                            id="switchExportacaoAvancadaRP"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarRP" name="btnConsultarRP" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarRP" name="btnExportarRP" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableRP" name="tableRP" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Filial</th>
                                    <th>Urgência</th>
                                    <th>Área RH</th>
                                    <th>Data Entrada</th>
                                    <th>Centro de Custo</th>
                                    <th>Motivo</th>
                                    <th>Tipo</th>
                                    <th>Cargo</th>
                                    <th>Função</th>
                                    <th>Localização</th>
                                    <th>Solicitante</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorRP" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <RPn id="numeracaoRP"></RPn>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoRP" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>