$(function () {

    var iTotalParcelaPromocao = $("#hdTotalDetalhePromocao").val();
    var settings = {
        // armazena informações dos detalhes das parcelas quando imóvel tiver selecionado repasse
        arrInfoTipoParcela: [
              { id_periodicidade_parcela: 3, tx_periodicidade: "Intermeriária", in_parcela: 1, data_inicio: true, data_final: false }
            , { id_periodicidade_parcela: 5, tx_periodicidade: "Financiamento bancário", in_parcela: 1, data_inicio: true, data_final: false }
            , { id_periodicidade_parcela: 2, tx_periodicidade: "Anual", in_parcela: 1, data_inicio: true, data_final: false }
            , { id_periodicidade_parcela: 1, tx_periodicidade: "Semestral", in_parcela: 0, data_inicio: true, data_final: false }
        ]

        // armazena os titulos que serão apresetados quando selecionada cada opção (repasse, promoção)
        , labelPromocaoRepasse: [
              { ref: "repasse", text: "Repasse - Condições de pagamento" }
            , { ref: "promocao", text: "Promoção - Condições de pagamento" }
            , { ref: "repassepromocao", text: "Repasse/Promoção - Condições de pagamento" }
        ]

        // armazena html onde o texto da propriedade 'labelPromocaoRepasse' será alterado
        , localLabelPromocaoRepasse: $(".dadosBaseRepasse p.formatText")

        // armazena todos os campos base da promoção
        , fieldsPromocaoRepasse: [
              { name: $("#dlValorTabela"), type: "field" }
            , { name: $("#dlDesconto"), type: "field" }
            , { name: $("#dlSinal"), type: "field" }
            , { name: $("#dlSaldoDevedor"), type: "field" }
            , { name: $("#cboPromocaoExpira"), type: "field" }
            , { name: $(".dadosDetalheRepasse"), type: "class" /*class ou div*/ }
            , { name: $("#txDescricaoPromocao"), type: "field" }
        ]

        // indica quais campos serão apresentados quando o usuário selecionar check repasse
        , ShowFieldRepasse: [
             { name: "dlSinal", type: "field" }
           , { name: "dlSaldoDevedor", type: "field" }
           , { name: "dlSaldoDevedor", type: "field" }
           , { name: "dadosDetalheRepasse", type: "class" /*class ou div*/ }
           , { name: "txDescricaoPromocao", type: "field" }
        ]

        // indica quais campos serão apresentados quando o usuário selecionar check promoção
        , ShowFieldPromocao: [
              { name: "dlValorTabela", type: "field" }
            , { name: "dlDesconto", type: "field" }
            , { name: "cboPromocaoExpira", type: "field" }
        ]

        // indica quais campos serão apresentados quando o usuário selecionar check repasse e promoção
        , ShowFieldRepasseAndPromocao: [
              { name: "dlValorTabela", type: "field" }
            , { name: "dlDesconto", type: "field" }
            , { name: "dlSinal", type: "field" }
            , { name: "dlSaldoDevedor", type: "field" }
            , { name: "cboPromocaoExpira", type: "field" }
            , { name: "dadosDetalheRepasse", type: "class" /*class ou div*/ }
            , { name: "txDescricaoPromocao", type: "field" }
        ]
    }


    var fnRemoverParcela = function (obj) {
        if (confirm("Deseja excluir essa parcela?")) {
            objParcelaGrupo = obj.closest(".classPromocao");
            id = objParcelaGrupo.find("input[id^=hdIdImovelDetalhePromocao_]").val();

            if (id > 0) {
                objParcelaGrupo.find("input[id^=hdAcaoImovelDetalhePromocao_]").val("0");
                objParcelaGrupo.hide();
            }
            else {
                iTotalParcelaPromocao--;
                $("#hdTotalDetalhePromocao").val(iTotalParcelaPromocao);
                objParcelaGrupo.remove();
            }
        }
    }

    var fnGerenciaAreaRepassePromocao = function () {
        var repasse = ($('#chkRepasse:checked').length > 0);
        var promocao = ($('#chkPromocao:checked').length > 0);
        var show = false;

        //área
        if (repasse || promocao) {
            $("#promocaoImovel").show();
        } else {
            $("#promocaoImovel").hide();
        }

        //label
        if (repasse && !promocao) {
            settings.localLabelPromocaoRepasse.text(fnIndexOfLabelConfiguracao("repasse").text);
        }
        else if (!repasse && promocao) {
            settings.localLabelPromocaoRepasse.text(fnIndexOfLabelConfiguracao("promocao").text);
        }
        else if (repasse && promocao) {
            settings.localLabelPromocaoRepasse.text(fnIndexOfLabelConfiguracao("repassepromocao").text);
        }

        //fields
        for (var i = 0; i < settings.fieldsPromocaoRepasse.length; i++) {
            if (repasse && !promocao) {
                show = fnIndexOfShowField(settings.ShowFieldRepasse, settings.fieldsPromocaoRepasse[i]);
            }
            else if (!repasse && promocao) {
                show = fnIndexOfShowField(settings.ShowFieldPromocao, settings.fieldsPromocaoRepasse[i]);
            }
            else if (repasse && promocao) {
                show = fnIndexOfShowField(settings.ShowFieldRepasseAndPromocao, settings.fieldsPromocaoRepasse[i]);
            }

            switch (settings.fieldsPromocaoRepasse[i].type) {
                case "field":
                    if (show)
                        $(settings.fieldsPromocaoRepasse[i].name).parent().show();
                    else {
                        $(settings.fieldsPromocaoRepasse[i].name).parent().hide();
                        $(settings.fieldsPromocaoRepasse[i].name).val("");
                    }
                    break;

                case "div":
                case "class":
                    if (show)
                        $(settings.fieldsPromocaoRepasse[i].name).show();
                    else
                        $(settings.fieldsPromocaoRepasse[i].name).hide();
                    break;
            }
        }
    }

    var fnGerenciaTipoParcela = function (obj) {
        idTipoParcela = obj.val(); // id tipo da parcela selecionada pelo usuário
        objParcelaGrupo = obj.closest(".classPromocao"); // obtem o corpo do html das promoções
        objInfoParcela = fnIndexOfTipoParcela(idTipoParcela); // obtem informações do tipo de parcela selecionada
        blObjectTipoIsUndefined = (typeof (objInfoParcela) == "undefined"); // indica que o tipo de parcela não esta definido no objeto no inicio desse arquivo

        //se o tipo de parcela não existir nos defaults inclui todos os campos sem regras de apresentação
        if (blObjectTipoIsUndefined) {
            if (TryParseInt(objParcelaGrupo.find("input[id^=inParcelas_]").val(), 0) == 0)
                objParcelaGrupo.find("input[id^=inParcelas_]").val("");

            objParcelaGrupo.find("input[id^=inParcelas_]").prop('readonly', false);

            objParcelaGrupo.find("input[id^=dtInicial_]").parent().show();
            objParcelaGrupo.find("input[id^=dtFinal_]").parent().show();
        }

        // verifica se o campo data inicial ficará visivel para o tipo de parcela selecionado
        if (!blObjectTipoIsUndefined) {
            if (objInfoParcela.data_inicio) {
                objParcelaGrupo.find("input[id^=dtInicial_]").parent().show();
            } else {
                if (objParcelaGrupo.find("input[id^=dtInicial_]").val() == "")
                    objParcelaGrupo.find("input[id^=dtInicial_]").val("");

                objParcelaGrupo.find("input[id^=dtInicial_]").parent().hide();
            }
        }

        // verifica se o campo data final ficará visivel para o tipo de parcela selecionado
        if (!blObjectTipoIsUndefined) {
            if (objInfoParcela.data_final) {
                objParcelaGrupo.find("input[id^=dtFinal_]").parent().show();
            } else {
                if (objParcelaGrupo.find("input[id^=dtFinal_]").val() == "")
                    objParcelaGrupo.find("input[id^=dtFinal_]").val("");

                objParcelaGrupo.find("input[id^=dtFinal_]").parent().hide();
            }
        }

        // verifica se o objeto não é nullo e aplica ao campo "qtd de parcelas" o valor 1 e desabilita o mesmo.
        if (!blObjectTipoIsUndefined && objInfoParcela.in_parcela == 1) {
            objParcelaGrupo.find("input[id^=inParcelas_]").val(1);
            objParcelaGrupo.find("input[id^=inParcelas_]").prop('readonly', true);

            //if (objParcelaGrupo.find("input[id^=dtFinal_]").val() == "")
            //objParcelaGrupo.find("input[id^=dtFinal_]").val("");

            //objParcelaGrupo.find("input[id^=dtFinal_]").parent().hide();
        }
        else {
            if (TryParseInt(objParcelaGrupo.find("input[id^=inParcelas_]").val(), 0) == 0)
                objParcelaGrupo.find("input[id^=inParcelas_]").val("");

            objParcelaGrupo.find("input[id^=inParcelas_]").prop('readonly', false);

            //if (objParcelaGrupo.find("input[id^=dtFinal_]").val() == "")
            //objParcelaGrupo.find("input[id^=dtFinal_]").val("");

            //objParcelaGrupo.find("input[id^=dtFinal_]").parent().show();
        }
    }

    var fnIndexOfTipoParcela = function (idTipoParcela) {
        for (var i = 0; i < settings.arrInfoTipoParcela.length; i++) {
            if (settings.arrInfoTipoParcela[i].id_periodicidade_parcela == idTipoParcela)
                return settings.arrInfoTipoParcela[i];
        }
    }

    var fnIndexOfLabelConfiguracao = function (tipoLabel) {
        for (var i = 0; i < settings.labelPromocaoRepasse.length; i++) {
            if (settings.labelPromocaoRepasse[i].ref == tipoLabel)
                return settings.labelPromocaoRepasse[i];
        }
    }

    var fnIndexOfShowField = function (findArray, findValue) {
        var bReturn = false;
        var nameItemFind = "";

        switch (findValue.type) {
            case "field":
                nameItemFind = $(findValue.name).attr("id");
                break;

            case "class":
                nameItemFind = $(findValue.name).attr("class");
                break;

            case "div":
                nameItemFind = $(findValue.name).attr("id");
                break;
        }

        for (var i = 0; i < findArray.length; i++) {
            if (findArray[i].name == nameItemFind) {
                bReturn = true;
                break;
            }
        }

        return bReturn;
    }

    var fnAttachaEventsLoadPage = function () {
        $("#promocaoImovel").find(".classPromocao").each(function () {

            $(this).find("select[id^=cboPeriodicidadeTipo_]").bind("change",
                function () {
                    fnGerenciaTipoParcela($(this));
                }).change();
        });
    }

    var fnGerenciaExpiracaoPromocao = function () {
        if (ParseBool($("#cboPromocaoExpira").val())) {
            $("#dtExpiracao").parent().show();
        } else {
            $("#dtExpiracao").parent().hide();
        }
    }

    var fnGerenciaValorDesconto = function () {
        var dlValorImovel = FormataStringValorParaCalcular($("#txValorVenda").val());
        var dlValorTabela = FormataStringValorParaCalcular($("#dlValorTabela").val());
        var dlResultado = parseFloat(dlValorTabela) - parseFloat(dlValorImovel);
        if(dlResultado > 0)
            $("#dlDesconto").val(dlResultado.formatMoney(2, ",", "."));
        else
            $("#dlDesconto").val(0);
    }

    var fnGerenciaSaldoDevedor = function () {
        var dlValorImovel = FormataStringValorParaCalcular($("#txValorVenda").val());
        var dlSinal = FormataStringValorParaCalcular($("#dlSinal").val());
        var dlResultado = parseFloat(dlValorImovel) - parseFloat(dlSinal);

        $("#dlSaldoDevedor").val(dlResultado.formatMoney(2, ",", "."));
    }

    var fnGerenciaSinal = function () {
        var dlValorImovel = FormataStringValorParaCalcular($("#txValorVenda").val());
        var dlSaldoDevedor = FormataStringValorParaCalcular($("#dlSaldoDevedor").val());
        var dlResultado = parseFloat(dlValorImovel) - parseFloat(dlSaldoDevedor);

        $("#dlSinal").val(dlResultado.formatMoney(2, ",", "."));
    }

    var fnGeranciaObservacao = function (blRecolhe) {
        var txObservacao = $("#txDescricaoPromocao");

        if (blRecolhe) {
            txObservacao.removeClass("textarea_label_focus").addClass("textarea_label_blur");
        }
        else {
            txObservacao.removeClass("textarea_label_blur").addClass("textarea_label_focus");
        }
    }

    var fnGerenciaCadastroPromocaoRepasse = function () {
        var b = (($('#chkPretVenda:checked').length > 0));

        if (b) {
            $("#chkRepasse").parent().parent().show();
        } else {
            $("#chkRepasse").parent().parent().hide();
        }
    }

    var fnAddDetalhePromocao = function () {
        iTotalParcelaPromocao++;

        $("#hdTotalDetalhePromocao").val(iTotalParcelaPromocao);

        clone = $($(".classPromocao").clone()[0]);
        clone.removeAttr("style");
        $(clone).find("input,select").each(function () {
            $(this).attr("id", $(this).attr("id") + "_" + iTotalParcelaPromocao);
            $(this).attr("name", $(this).attr("name").replace("_Default", ""));
        });

        //ADICIONA CLONE NA TELA
        $(".btnAddItemTela").before(clone);

        //ADICIONA MASCARA
        $("#dtInicial_" + iTotalParcelaPromocao).datepicker();
        $("#dtFinal_" + iTotalParcelaPromocao).datepicker();
        $("#dlValor_" + iTotalParcelaPromocao).maskMoney();
        $("#inParcelas_" + iTotalParcelaPromocao).maskNumber();

        //ADICIONA EVENTO PARA ELEMENTOS
        $(clone).find("a[class=lnkExcluirParcela]").click(function () {
            fnRemoverParcela($(this));
            return (false);
        });

        $("#cboPeriodicidadeTipo_" + iTotalParcelaPromocao).change(function () {
            fnGerenciaTipoParcela($(this));
        });

        $("#cboPeriodicidadeTipo_" + iTotalParcelaPromocao).change();
    }

    $("#btnAddPromocao").click(function () {
        fnAddDetalhePromocao();
    });

    $("#chkRepasse, #chkPromocao").bind("click", fnGerenciaAreaRepassePromocao);
    $("#cboPromocaoExpira").bind("change", fnGerenciaExpiracaoPromocao).change();
    $("#dlValorTabela").bind("keyup", fnGerenciaValorDesconto);
    $("#dlSinal").bind("keyup", fnGerenciaSaldoDevedor);
    $("#txDescricaoPromocao").focus(function () { fnGeranciaObservacao(false); });
    $("#txDescricaoPromocao").blur(function () { fnGeranciaObservacao(true); });
    $("#chkPretVenda").bind("click", fnGerenciaCadastroPromocaoRepasse);

    //AO CARREGAR A PÁGINA
    fnGerenciaAreaRepassePromocao();
    fnAttachaEventsLoadPage();
    fnGerenciaSinal();
    fnGerenciaCadastroPromocaoRepasse();

    //ADICIONA O EVENTO CLICK PARA OS ELEMENTOS JÁ EXISTENTES NA TELA.
    $(".lnkExcluirParcela").click(function () { fnRemoverParcela($(this)); return (false); });
});