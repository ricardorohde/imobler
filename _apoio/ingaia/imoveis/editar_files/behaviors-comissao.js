// JScript File
$(function () {
    var numeroUserComissao = $(".classUserComissao").length - 1;
    var o = $($(".classUserComissao").clone()[0]);
    o.removeAttr("style");

    var fnTipoComissao = function (tipoComissao) {
        if (tipoComissao.val() == "10") {// ANÚNCIO
            tipoComissao.parent().parent().find("select").eq(2).parent().show();
            tipoComissao.parent().parent().find("input").eq(2).parent().show();
        } else {
            tipoComissao.parent().parent().find("select").eq(2).parent().hide();
            tipoComissao.parent().parent().find("input").eq(2).parent().hide();
        }
    }

    var fnTipoUsuarioTerceiro = function (tipoUsuario) {
        if (tipoUsuario.val() == "-1000") {
            tipoUsuario.closest(".classUserComissao").find("input[id^=txNomeTerceiro_]").parent().show();
            tipoUsuario.closest(".classUserComissao").find("input[id^=txTelefoneTerceiro_]").parent().show();
        }
        else {
            tipoUsuario.closest(".classUserComissao").find("input[id^=txNomeTerceiro_]").parent().hide();
            tipoUsuario.closest(".classUserComissao").find("input[id^=txTelefoneTerceiro_]").parent().hide();
        }
    }

    var fnPersonalizaTelefone = function (indice) {
        $('#txTelefoneTerceiro_' + indice).mask('(99) 9999-9999?9').before('<span class="aPhoneItemCelular" id="Span_txProprietario_menu_' + indice + '">(<)</span><span class="multiplePhonesTelOptions" id="Span_txTelefoneTerceiros_telefone_' + indice + '" style="display: none;"><span "="" rel="1" class="PhoneItemResidencial" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Tel. Residencial</span><span "="" rel="2" class="PhoneItemComercial" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Tel. Comercial</span><span "="" rel="3" class="PhoneItemCelular" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Celular</span><span "="" rel="4" class="PhoneItemRadio" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">R&aacute;dio</span></span>');
        validaDigitosTelefonePorDDD($('#txTelefoneTerceiro_' + indice));
    }

    var fnEventosTelefone = function () {
        $('span[id^="Span_txProprietario_menu"]').unbind('click');
        $('span[id^="Span_txProprietario_menu"]').click(function () {
            var menu = $(this).next();
            if ($(menu).css('display') == 'none') {
                $(this).next().show('fast');
            } else {
                $(this).next().hide('fast');
            }
        });
        $('input[id^="txTelefoneTerceiro"]').blur(function () {
            $(this).prev().hide('fast');
        });
        $('input[id^="txTelefoneTerceiro"]').prev().find('span[class^="PhoneItem"]').click(function () {
            $(this).parent().parent().find('i').html($(this).html());
            if ($(this).parent().parent().find('span[id^="Span_txProprietario_menu"]').attr('class') == 'aPhoneItemRadio' && $(this).attr('class') != 'PhoneItemRadio') {
                $(this).parent().parent().find('input').unbind().mask('(99) 9999-9999?9');
                validaDigitosTelefonePorDDD($(this).parent().parent().find('input'));
            } else if ($(this).attr('class') == 'PhoneItemRadio') {
                $(this).parent().parent().find('input').unmask();
            }
            $(this).parent().parent().find('span[id^="Span_txProprietario_menu"]').attr('class', 'a' + $(this).attr('class'));
        });
    }

    function CarregaFilial(valor) {
        if ($("#txFilial").length) {
            $.ajax({
                type: "POST",
                beforeSend: function () {
                    $("#txFilial").val("Carregando...")
                },
                url: "json/jsonNomeFilial.ashx",
                data: "idUsuario=" + valor,
                dataType: "json",
                success: function (msg) {
                    $("#txFilial").val(msg[0].filial)
                }
            });
        }
    }

    $(".classUserComissao").find("select[id^=cboComissaoTipo_]").change(function () {
        fnTipoComissao($(this));
    }).change();

    $(".classUserComissao").find("select[id^=cboCorretorComissao_]").change(function () {
        fnTipoUsuarioTerceiro($(this));
    }).change();

    $(".classUserComissao").find("input[id^=txTelefoneTerceiro_]").each(function (index, value) {
        fnPersonalizaTelefone(index);
    });

    fnEventosTelefone();

    $("#hdIQuantidadeUsuarios").val(numeroUserComissao);

    //EVENTO DO CLICK DO BOTÃO ADICIONAR NOVO USUÁRIO.
    $("#btnAddUserComissao").click(function () {
        a = o.clone();

        $(a).find("select,input").each(function () {
            $(this).attr("id", $(this).attr("id") + "_" + numeroUserComissao);

            if ($(this).prop("type") != "radio") {
                $(this).attr("name", $(this).attr("name").replace("_Default", ""));
            }
            else {
                $(this).attr("name", $(this).attr("name") + "_" + numeroUserComissao);
            }
        });

        numeroUserComissao++;
        //ADICIONA O CONTEUDO NA TELA
        $(".addUsuarioComissao").before(a);

        //COLOCA O DATEPIKER PARA O CAMPO DE DATA
        $("#dtPublicacao_" + (numeroUserComissao - 1)).datepicker();

        //ADICIONA EVENTO CHANGE PARA O CAMPO TIPO DE COMISSÃO
        $(".classUserComissao").eq($(".classUserComissao").length - 1).find("select[id^=cboComissaoTipo_]").change(function () {
            fnTipoComissao($(this));
        }).change();

        //ADICIONA EVENTO CHANGE PARA O CAMPO USUÁRIO
        $(".classUserComissao").eq($(".classUserComissao").length - 1).find("select[id^=cboCorretorComissao_]").change(function () {
            fnTipoUsuarioTerceiro($(this));
        }).change();

        $("#hdIQuantidadeUsuarios").val(numeroUserComissao);
        $(a).find("a[class=lnkExcluirComissao]").bind("click", function () { ExcluirUsuarioImovelComissao($(this)); return (false); });

        fnPersonalizaTelefone((numeroUserComissao - 1));
        fnEventosTelefone();

        return (false);
    });

    //CASO ESTEJA NO CADASTRO DE UM NOVO IMÓVEL.
    if (numeroUserComissao < 1) { $("#btnAddUserComissao").trigger("click"); }

    //REMOVE O LINK DE EXCLUIR DO PRIMEIRO USUARIO COMISSIONAMENTO.
    $("#hdIdUsuarioImovelComissao_0").parent().find("p").html("");

    //REMOVE TERCEIRO DO PRIMEIRO ITEM, PARA EVITAR PROBLEMAS COM A VALIDAÇÃO DO USUÁRIO PADRÃO DO IMÓVEL.
    $("#cboCorretorComissao_0 option[value=-1000]").remove();

    //ALTERA O CAMPO CBOCORRETOR QUE ESTA NOS DADOS PRIMARIOS.
    $("#cboCorretorComissao_0").change(function () {
        $("#cboCorretor").val($(this).val());
    }).change();

    //REGRA PARA OS MÓDULOS BÁSICOS. ESSE NÃO PODE ADICIONAR NOVOS USUÁRIO E NÃO TEM A PRETENSÃO.
    if ($("#hdModuloBasico").val() == "1") {
        $("#btnAddUserComissao").parent().remove();
        $(".classUserComissao").find("input[type=radio]").parent().parent().remove();
    }

    //ADICIONA O EVENTO CLICK PARA OS ELEMENTOS JÁ EXISTENTES NA TELA.
    $(".lnkExcluirComissao").click(function () { ExcluirUsuarioImovelComissao($(this)); return (false); });

    //FUNÇÃO QUE RETIRA UM USUÁRIO DO COMISSIONAMENTO DO IMÓVEL.
    function ExcluirUsuarioImovelComissao(objLnkExcluir) {
        if (confirm("Tem certeza que deseja excluir esse usuário?")) {

            var id = objLnkExcluir.parent().parent().find("input").val();
            var obj = objLnkExcluir.parent().parent();

            obj.find("input[id^=hdAcaoUsuarioImovelComissao_]").val("0");
            obj.hide();
        }
    }

    $("#cboCorretorComissao_0").change(function () {
        CarregaFilial($(this).val());
    }).change();
});