// JScript File
$(function () {
    var selectedArray = [];
    var numeroTaxa = $(".classTaxa").length - 1;
    var o = $($(".classTaxa").clone()[0]);
    o.removeAttr("style");
   
    var fnTipoTaxa = function (selectTaxa) {

        calculaPacoteLocacao();

        var drop = selectTaxa.attr("id").replace("cboTaxaTipo_", "");
        selectedArray[drop] = selectTaxa.val();

        //Percorre os dropdowns
        $(".classTaxaTipo").find("select").each(function () {

            //Não percorrer o dropdown default
            if ($(this).attr("id") != "cboTaxaTipo_Default") {
                var selectValue = $(this).val();

                //Percorre as opçoes do select
                $(this).find("option").each(function (i) {

                    if ($(this).val() != 0 && $(this).val() != selectValue && ($.inArray($(this).val(), selectedArray) != -1))
                        $(this).prop("disabled", true);
                    else
                        $(this).prop("disabled", false);

                    //Se for laudêmio, ocultar a periodicidade
                    if (selectValue == 3)
                        $(this).parent().parent().next().hide();
                    else
                        $(this).parent().parent().next().show();
                });
            }
        });
    }

    //Adicionar uma taxa
    $("#btnAddTaxa").click(function () {

        if ($(".classTaxa").length - 1 == $("#hdMaxTaxas").val())
            bootbox.alert("Você pode adicionar somente uma taxa de cada tipo.", function () { });
        else {
            a = o.clone();

            $(a).find("select,input").each(function () {
                $(this).attr("id", $(this).attr("id") + "_" + numeroTaxa);

                $(this).attr("name", $(this).attr("name").replace("_Default", "") + "_" + numeroTaxa);
            });

            $(a).find("[class=classTaxaValor]").maskMoney();

            numeroTaxa++;

            $(".addTaxa").before(a);

            $(a).find("a[class=lnkExcluirTaxa]").bind("click", function () {
                ExcluirTaxa($(this)); return (false);
                numeroTaxa = numeroTaxa - 1;
            });

            //Adiciona evento change
            $(a).find("select[class=classTaxaTipo]").change(function () {
                fnTipoTaxa($(this));
            }).change();

            //Adiciona evento calculaPacoteLocacao
            $(a).find("select[name*='cboTaxaPeriodicidade_']").change(function () {
                calculaPacoteLocacao();
            });
            $(a).find("input[name*='txTaxa_']").bind('keyup', calculaPacoteLocacao);

            $("#hdTotalTaxas").val($(".classTaxa").length - 1);
        }

        return (false);
    });



    //Adicionar evento excluir para os elementos que já existem
    $(".lnkExcluirTaxa").click(function () { ExcluirTaxa($(this)); return (false); });

    //Adicionar evento change para os elementos que já existem
    $(".classTaxaTipo").find("select").change(function () { fnTipoTaxa($(this)); }).change();

    //Adicionar evento calculaPacoteLocacao para os elementos que já existem
    $("select[name*='cboTaxaPeriodicidade_']").change(calculaPacoteLocacao);
    $("input[name*='txTaxa_']").bind('keyup', calculaPacoteLocacao);

    //Excluir uma taxa
    function ExcluirTaxa(objLnkExcluir) {
        bootbox.confirm({
            message: "Tem certeza que deseja excluir essa taxa?",
            callback: function (result) {
                if (result) {
                    var drop = objLnkExcluir.parent().parent().find("select").attr("id").replace("cboTaxaTipo_", "");

                    objLnkExcluir.parent().parent().find("select").parent().remove();
                    objLnkExcluir.parent().parent().find("input[name*='txTaxa_']").parent().remove();

                    selectedArray[drop] = null;
                    objLnkExcluir.parent().parent().hide();
                    $("#hdTotalTaxas").val($(".classTaxa").length - 1);
                    calculaPacoteLocacao();
                }
            }
        });
    }

    //Popula array com valores de dropdowns já existentes
    $(".classTaxaTipo").find("select").each(function () {

        //Não percorrer o dropdown default
        if ($(this).attr("id") != "cboTaxaTipo_Default") {
            var drop = $(this).attr("id").replace("cboTaxaTipo_", "");
            selectedArray[drop] = $(this).val();
        }
    });

    //Caso seja um imóvel novo ou que não possua nenhuma taxa, adicionar uma vazia
    if (numeroTaxa < 1) { $("#btnAddTaxa").trigger("click"); }

    //Dispara um change inicial
    $(".classTaxaTipo").find("select").eq(1).change();

    $("#hdTotalTaxas").val($(".classTaxa").length - 1);
});