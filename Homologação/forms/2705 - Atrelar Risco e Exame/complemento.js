//window.onload = function(){
// 	preencheAcompanhamento();
//}

function alteraMaiusculo(el){
	var campo = el.id;
	document.getElementById(campo).value = document.getElementById(campo).value.replace("|", "-").toUpperCase();
}

function preencheAcompanhamento() {
	data = new Date();
	dt = data.toLocaleDateString() + " " + data.toLocaleTimeString();

	if (document.getElementById('origem').value != "") {
		document.getElementById('destino').innerHTML = '<div class="panel panel-default fs-no-margin">' +
			'<div class="panel-body fs-sm-space media clearfix">' +
			'<a class="pull-left" href="#">' +
			'<div>' +
			'<img src="/social/api/rest/social/image/profile/' + $("#inputCurrentLogin").val() + '/SMALL_PICTURE" class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy">' +
			'</div>' +
			'</a >' +
			' <div class="media-body">' +
			' <header>' +
			'<h5 class="media-heading">' +
			'<span class="wrap-element-popover"><a href="#" class="link-default">' + $("#inputCurrentNome").val() + '</a></span>' +
			'<span class="timeline-header-no-link"> compartilhou </span >' +
			'<a href="#" class="link-default">uma observação</a>' +
			'<span class="timeline-header-no-link fs-no-bold"> - </span>' +
			'<a href="#" class="link-reference-time fs-no-bold" title="15/5/2015 - 17:51:29">' + dt + '</a>' +
			'</h5 >' +
			' </header >' +
			'<p>' + $("#origem").val() + '</p>' +
			'</div>' +
			'</div>' +
			'<div class="panel-footer">' +
			'</div>' +
			'</div> <br> ' + document.getElementById('destino').innerHTML;
		document.getElementById('origem').value = "";
	}
	document.getElementById('acompanhamento').innerHTML = $("#destino").val();
}