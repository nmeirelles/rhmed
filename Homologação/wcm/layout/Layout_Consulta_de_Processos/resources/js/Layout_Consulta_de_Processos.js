let colleagueDataset = DatasetFactory.getDataset('colleague', null, null, null,{
    success:(result)=>{
        colleagueDataset = result;
    },error:(err)=>{
        colleagueDataset = err;
    }
});
$(document).ready(function(){
    let selectProcesso = $("#selectProcesso");
    let slotfull = $(".slotfull");
    let GerirCampanha = $("#GerirCampanha");
    let SPM = $("#SPM");
    let SPS = $("#SPS");
    let RC = $("#RC");
    let SPD = $("#SPD");
    let SPA = $("#SPA");
    let RF = $("#RF");
    let SPC = $("#SPC");
    let SCF = $("#SCF");
    let RPA = $("#RPA");
    let ACF = $("#ACF");
    let AFP = $("#AFP");
    let RP = $("#RP");

    selectProcesso.on('change', () => {
        let processo = $('#selectProcesso option:selected').text();
        if(processo == "Gerir Campanha") GerirCampanha.show();
        else{
            let sigla = processo.split("-")[0].trim();
            slotfull.hide();
            if(sigla == "SPM") SPM.show();
            if(sigla == "SPS") SPS.show();
            if(sigla == "RC") RC.show();
            if(sigla == "SPD") SPD.show();
            if(sigla == "SPA") SPA.show();
            if(sigla == "RF") RF.show();
            if(sigla == "SPC") SPC.show();
            if(sigla == "SCF") SCF.show();
            if(sigla == "RPA") RPA.show();
            if(sigla == "ACF") ACF.show();
            if(sigla == "AFP") AFP.show();
            if(sigla == "RP") RP.show();
        }
    });

    const validarGrupoRelatorio = () => {
        const inputUserLogin = $("#inputUserLogin").val();
        fetch("/api/public/2.0/groups/findGroupsByUser/"+inputUserLogin, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            DatasetFactory.getDataset("ds_form_suporte_relatorios_grupos", null, null, null, {
                success: function(result){
                    const relatoriosGrupos = result.values;
                    console.log(relatoriosGrupos);
                    for(let i = 0; i < data.content.length; i++){
                        let grupo = data.content[i]["code"];
                        for(let j = 0; j < relatoriosGrupos.length; j++){
                            let selectGrupo = relatoriosGrupos[j].selectGrupo;
                            let selectFluxo = relatoriosGrupos[j].selectFluxo;
                            let inputFluxoDescricao = relatoriosGrupos[j].inputFluxoDescricao;
                            if(grupo == selectGrupo) $("#selectProcesso").append('<option value="'+selectFluxo+'">'+inputFluxoDescricao+'</option>');
                        }
                    }
                }
            });
        }).catch((error) => {
            console.error("Error:", error);
            FLUIGC.toast({title: 'Erro: ',message: error, type: 'warning'});
        });
    }

    setTimeout(() => {
        validarGrupoRelatorio();
    }, 1000);
});