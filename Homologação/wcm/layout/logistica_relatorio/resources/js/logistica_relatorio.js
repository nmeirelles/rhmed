let colleague;
let dsGerirCampanha;
let tabelaCredenciado;
let tabelaReagendamento;

$(document).ready(()=>{

    let myLoading = FLUIGC.loading(window,{
        textMessage: 'Aguarde, preparando o ambiente...',
    });
    let msgErro = "";

    const getTabelaReagendamento = () => {
        const c1 = DatasetFactory.createConstraint("tablename", "tabelaReagendamento", "tabelaReagendamento", ConstraintType.MUST);
        const c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
        tabelaReagendamento = DatasetFactory.getDataset('dsGerirCampanha', null, [c1,c2], null,{
            success:(result)=>{
                tabelaReagendamento = result;
                finalizarCarregamento();
            },
            error:(err)=>{
                tabelaReagendamento = err;
                msgErro += "Erro ao consultar o dataset: Tabela Reagendamento.\n";
                finalizarCarregamento();
            }
        });
    }

    const getTabelaCredenciado = () => {
        const c1 = DatasetFactory.createConstraint("tablename", "tabelaCredenciado", "tabelaCredenciado", ConstraintType.MUST);
        const c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
        tabelaCredenciado = DatasetFactory.getDataset('dsGerirCampanha', null, [c1,c2], null,{
            success:(result)=>{
                tabelaCredenciado = result;
                getTabelaReagendamento();
            },error:(err)=>{
                tabelaCredenciado = err;
                msgErro += "Erro ao consultar o dataset: Tabela Credenciado.\n";
                getTabelaReagendamento();
            }
        });
    }

    const getDsGerirCampanha = () => {
        const c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
        dsGerirCampanha = DatasetFactory.getDataset('dsGerirCampanha', null, [c1], null,{
            success:(result)=>{
                dsGerirCampanha = result;
                getTabelaCredenciado();
            },error:(err)=>{
                dsGerirCampanha = err;
                msgErro += "Erro ao consultar o dataset: Gerir Campanha.\n";
                getTabelaCredenciado();
            }
        });
    };

    const getColleague = () => {
        colleague = DatasetFactory.getDataset('colleague', null, null, null,{
            success:(result)=>{
                colleague = result;
                getDsGerirCampanha();
            },error:(err)=>{
                colleague = err;
                msgErro += "Erro ao consultar o dataset: Usuários.\n";
                getDsGerirCampanha();
            }
        });
    };

    const finalizarCarregamento = () => {
        myLoading.hide();
        if(msgErro != "") FLUIGC.toast({title: 'Atenção!', message: msgErro, type: 'danger'});
        else FLUIGC.toast({title: 'Concluído!', message: "Obrigado por aguardar.", type: 'sucess'});
    }

    const carregarPagina = () => {
        myLoading.show();
        getColleague();
    };

    setTimeout(() => {
        carregarPagina();
    }, 900);
});