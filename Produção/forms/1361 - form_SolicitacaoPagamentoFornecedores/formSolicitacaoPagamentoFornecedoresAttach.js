function showCameraCustomTabela(obj, id) {
	var inputIdSplit = obj.id.split("___");
	
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	} 
		
	var parameter = id;
	
	if(id) {
//		currentIdAnexo = parameter;
//		
//		console.log("INPUT ANEXO CORRENTE::: " + currentIdAnexo);
		
	    var tabAttachments = parent.document.getElementById("tab-attachments");
	    if (tabAttachments) {
	        var $tabList = $(tabAttachments).parent();
	        if ($tabList.hasClass("active") && !$tabList.hasClass("out")) {
	        	console.log("scroll");
	        } else {
	        	//console.log("tabAttachments.click()");
	            //tabAttachments.click()
	        }
	        
	        if (parent.WCMAPI.isIe9()) {
	            $(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
	            $("#ecm-navigation-silverlight", parent.document).attr({
	                "data-on-camera": "true",
	                "data-file-name-camera": parameter
	            });
	            $(parent.document).on("keyup", this.actionKeyup)
	        } else {
	        	//console.log("before openInputFile");
	        	openInputFileCustom("ecm-navigation-inputFile-clone", parameter)
	        }
	    }
	}
}

function downloadAnexoTabela(obj, id) {
	var inputIdSplit = obj.id.split("___");
		
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	} 
	
	//console.log("IDENTIFICADOR DO INPUT::: " + id);
		
	var nomeArquivo = $("#"+id).val();
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.id;
		var attachmentName = attachment.name;
		//console.log("descricao:::::::: " + descricao);
		//console.log("attachmentId::::: " + attachmentId);
		//console.log("attachmentName::: " + attachmentName);
        if(id == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.downloadAttach([i]);
        }
    });
}

function viewerAnexoTabela(obj, id) {	
	var inputIdSplit = obj.id.split("___");
	
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	} 
	
	//console.log("viewerAnexo::: " + id)
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.id;
		var attachmentName = attachment.name;
        if(id == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.openAttachmentView('admin',attachment.documentId, 1000);
        }
    });
}

function openInputFileCustom(elementId, parameter) {
    var element = parent.document.getElementById(elementId);
    
    if (element && document.createEvent) {
        element.setAttribute("data-on-camera", "true");
        if (parameter) {
            element.setAttribute("data-file-name-camera", parameter)
        }
        
        element.click();
    }
}