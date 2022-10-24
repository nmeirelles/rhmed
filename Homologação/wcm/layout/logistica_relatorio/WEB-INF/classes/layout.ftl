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
                <script type="text/javascript" src="/logistica_relatorio/resources/js/logistica_relatorio.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js"></script>
            </head>
            <body>
                <div class="editable-slot slotfull layout-1-1" id="logisticaRelatorio">
                    <@wcm.renderSlot id="logisticaRelatorio" decorator="false" editableSlot="true" />
                </div>
            </body>
            <@wcm.footer layoutuserlabel="wcm.layoutdefault.user" />
        </div>
    </div>
</div>