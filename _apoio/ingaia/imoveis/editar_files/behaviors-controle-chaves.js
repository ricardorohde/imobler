// JScript File
function ExcluirChave() {
    $('.lnkExcluirChavesFiliais').click(function () {
        if (confirm("Tem certeza que deseja excluir essa chave?")) {
            $(this).closest('.classChavesFiliaisDetalhes').children("input[name='hdAcaoImovelChave']").val("0"); // EXCLUIR
            $(this).closest('.classChavesFiliaisDetalhes').hide();
        }
        return (false);
    });
}

$(function () {
    var indexChaves = $(".classChavesFiliaisDetalhes").length;
    var obj = $($(".classChavesFiliaisDetalhes").clone()[0]);
    obj.removeAttr("style");

    $("#hdQtdChavesControle").val(indexChaves);

    //EVENTO DO CLICK DO BOTÃO ADICIONAR NOVO USUÁRIO.
    $("#addChavesFiliais").click(function () {
        a = obj.clone();

        $(a).find("select,input").each(function () {
            var res = $(this).attr("id").split("_")
            $(this).attr("id", res[0] + "_" + indexChaves);
            $(this).val("");

            if(res[0] == "hdAcaoImovelChave"){
                $(this).val("1"); // INCLUIR
            }
        });

        $(a).children('.classExcluirChavesFiliais').show();

        indexChaves++;

        $("#hdQtdChavesControle").val(indexChaves);

        //ADICIONA O CONTEUDO NA TELA
        $(".addChavesFiliais").before(a);

        ExcluirChave();

        return (false);
    });

    ExcluirChave();

    //REMOVE O LINK DE EXCLUIR DO PRIMEIRO
    $($(".classChavesFiliaisDetalhes")[0]).children('.classExcluirChavesFiliais').hide();


    // controle chave cadastro/alteração imóvel
    var GerenciaApresentacaoCampos = function (obj) {
        var escolhido = parseInt(obj.val());

        switch (escolhido) {
            case 1: // não informado
                $("#cboCorretorChave, #tx_local_chave, .classChavesFiliaisDetalhes, p.addChavesFiliais").parent().hide();
                break;

            case 3: // corretor
                $("#tx_local_chave, .classChavesFiliaisDetalhes, p.addChavesFiliais").parent().hide();
                $("#cboCorretorChave").parent().show();
                break;

            case 2: // imob
                $("#cboCorretorChave, #tx_local_chave").parent().hide();
                $(".classChavesFiliaisDetalhes, p.addChavesFiliais").parent().show();
                break;

            case 4: // prop
                $("#cboCorretorChave, #tx_local_chave, .classChavesFiliaisDetalhes, p.addChavesFiliais").parent().hide();
                break;

            case 5: // outro
                $("#cboCorretorChave, .classChavesFiliaisDetalhes, p.addChavesFiliais").parent().hide();
                $("#tx_local_chave").parent().show();
                break;
        }
    }

    $("#cboLocalChave").change(function () {
        var conjuntoChave = TryParseInt($("#cboConjuntoChave").val(), 0);
        var localChave = TryParseInt($("#cboLocalChave").val(), 0);

        GerenciaApresentacaoCampos($(this));
    }).change();
});