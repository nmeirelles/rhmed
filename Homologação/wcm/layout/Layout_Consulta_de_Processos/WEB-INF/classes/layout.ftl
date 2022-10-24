<#import "/wcm.ftl" as wcm/>
<@wcm.header authenticated="true"/>
<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">
    <@wcm.menu />
    <!-- Wrapper -->
    <div class="wcm-all-content">
        <div id="wcm-content" class="clearfix wcm-background">
            <!-- Your content here -->
            <head>
                <link rel="stylesheet" type="text/css" href="/style-guide/css/fluig-style-guide-filter.min.css">
                <script src="/style-guide/js/fluig-style-guide-filter.min.js"></script>
                <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
                <script type="text/javascript" src="/Layout_Consulta_de_Processos/resources/js/Layout_Consulta_de_Processos.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js"></script>
                <style>
                    .logoRhMed{
                        width: 100px;
                        height: 100px;
                    }
                </style>
            </head>
            <body>
                <div class="fluig-style-guide">
                    <div class="panel panel-default">
                        <div class="panel-heading fs-txt-center">
                            <img src="/Layout_Consulta_de_Processos/resources/images/logo.png" alt="logoRhMed" class="logoRhMed">
                            <h1 class="panel-title fs-txt-center">&nbsp;Consulta de Processos</h1>
                        </div>
                        <div class="panel-body">
                            <div class="row" style="display: none;">
                                <textarea name="textareaUserData" id="textareaUserData">${user}</textarea>
                                <input type="hidden" name="inputUserLogin" id="inputUserLogin" value="${user.login}">
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-4 col-sm-offset-4 fs-txt-center">
                                    <label for="selectProcesso" class="control-label">Escolha o processo</label>
                                    <select name="selectProcesso" id="selectProcesso" class="form-control">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="GerirCampanha" style="display: none;">
                                    <@wcm.renderSlot id="GerirCampanha" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="SPM" style="display: none;">
                                    <@wcm.renderSlot id="SPM" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="SPS" style="display: none;">
                                    <@wcm.renderSlot id="SPS" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="RC" style="display: none;">
                                    <@wcm.renderSlot id="RC" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="SPD" style="display: none;">
                                    <@wcm.renderSlot id="SPD" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="SPA" style="display: none;">
                                    <@wcm.renderSlot id="SPA" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="RF" style="display: none;">
                                    <@wcm.renderSlot id="RF" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="SPC" style="display: none;">
                                    <@wcm.renderSlot id="SPC" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="SCF" style="display: none;">
                                    <@wcm.renderSlot id="SCF" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="RPA" style="display: none;">
                                    <@wcm.renderSlot id="RPA" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="ACF" style="display: none;">
                                    <@wcm.renderSlot id="ACF" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="AFP" style="display: none;">
                                    <@wcm.renderSlot id="AFP" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="editable-slot slotfull layout-1-1" id="RP" style="display: none;">
                                    <@wcm.renderSlot id="RP" decorator="false" editableSlot="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            <@wcm.footer layoutuserlabel="wcm.layoutdefault.user" />
        </div>
    </div>
</div>