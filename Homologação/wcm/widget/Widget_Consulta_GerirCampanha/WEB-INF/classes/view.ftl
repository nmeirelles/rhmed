<div id="WidgetConsultaGerirCampanha_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="WidgetConsultaGerirCampanha.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaGerirCampanha">
                <input type="hidden" class="form-control" id="pagina" name="pagina">
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNumeroRequisicao" class="control-label">Requisição</label>
                        <input type="number" name="inputNumeroRequisicao" id="inputNumeroRequisicao" class="form-control clearGerirCampanha">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="inputResponsavelRequisicao" class="control-label">Responsável Pela Requisição</label>
                        <input type="text" name="inputResponsavelRequisicao" id="inputResponsavelRequisicao" class="form-control clearGerirCampanha">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectSituacaoRequisicao" class="control-label">Situação da Requisição</label>
                        <select name="selectSituacaoRequisicao" id="selectSituacaoRequisicao" class="form-control clearGerirCampanha">
                            <option value=""></option>
                            <option value="0">Aberto</option>
                            <option value="1">Cancelado</option>
                            <option value="2">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="inputCidade" class="control-label">Cidade</label>
                        <input type="text" id="inputCidade" name="inputCidade" class="form-control clearGerirCampanha">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="selectUF" class="control-label">UF</label>
                        <select name="selectUF" id="selectUF" class="form-control clearGerirCampanha">
                            <option value=""></option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="selectStatus" class="control-label">Status</label>
                        <select name="selectStatus" id="selectStatus" class="form-control clearGerirCampanha">
                            <option value=""></option>
                            <option value="15">Analisar Requisição</option>
                            <option value="27">Atualizar / Corrigir Informações</option>
                            <option value="31">Verificar disponibilidade e Alocar Credenciado Contratado</option>
                            <option value="33">Avaliar Extensão de Prazo</option>
                            <option value="39">Contratar Credenciado</option>
                            <option value="42">Cancelar Atendimento</option>
                            <option value="110">Atualizar Informações</option>
                            <option value="35">Confirmar alocação de Credenciados na Agenda</option>
                            <option value="37">Aguardar Aprovação da Agenda</option>
                            <option value="48">Vincular Credenciado ao Cliente</option>
                            <option value="50">Gerar Kit do Colaborador</option>
                            <option value="69">Monitorar: Preparar Atendimento</option>
                            <option value="95">Resolver Problema: Preparar Atendimento</option>
                            <option value="71">Monitorar: Realizar Atendimento</option>
                            <option value="116">Resolver Problema: Realizar Atendimento</option>
                            <option value="73">Monitorar: Enviar Lista de Presença e ASOs</option>
                            <option value="115">Resolver Problema: Enviar Lista de Presença e ASOs</option>
                            <option value="54">Atualizar Sistema</option>
                            <option value="78">Monitorar: Enviar Malote</option>
                            <option value="61">Realizar Faturamento de Ausências</option>
                            <option value="Fim">Fim</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectExamesCancelados" class="control-label">Exames Cancelados</label>
                        <select name="selectExamesCancelados" id="selectExamesCancelados" class="form-control clearGerirCampanha">
                            <option value=""></option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputQtdNoShow" class="control-label">Quantidade No-Show</label>
                        <input type="number" id="inputQtdNoShow" name="inputQtdNoShow" class="form-control clearGerirCampanha">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesPlanejamentoCampanha" class="control-label">Planejamento Campanha</label>
                        <input type="text" id="inputMesPlanejamentoCampanha" name="inputMesPlanejamentoCampanha" class="form-control clearGerirCampanha" placeholder="2021-04" mask="0000-00">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultar" name="btnConsultar" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportar" name="btnExportar" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableGerirCampanha" name="tableGerirCampanha" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Requisição</th>
                                    <th>Data Criação</th>
                                    <th>Responsável Solicitante</th>
                                    <th>Responsável Atividade</th>
                                    <th>Situação</th>
                                    <th>Código Empresa</th>
                                    <th>Nome Empresa</th>
                                    <th>Código Filial</th>
                                    <th>Nome Filial</th>
                                    <th>Cidade</th>
                                    <th>UF</th>
                                    <th>Status</th>
                                    <th>Exames Requisitados</th>
                                    <th>Exames Covid</th>
                                    <th>Exames Agendados</th>
                                    <th>Exames Reagendados</th>
                                    <th>Exames Realizados</th>
                                    <th>Exames Cancelados</th>
                                    <th>Quantidade Ausências</th>
                                    <th>Mês Realização</th>
                                    <th>Mês Planejamento</th>
                                    <th>Data Lista Presença</th>
                                    <th>Quantidade No-Show</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anterior" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracao"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximo" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>