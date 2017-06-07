(function () {
    var app;

    app = angular.module("app", ['ngResource', 'formatFilters', 'ngAnimate', 'ui.bootstrap']);

    app.factory('Enterprise', [
      '$resource', function ($resource) {
          return $resource('../../../json/EmpreendimentoFicha.ashx?idEmpreendimento=:id', {
              id: '@id'
          });
      }
    ]);

    app.controller("ctrl", function ($scope, $http, $sce, Enterprise) {
        $scope.getEnterprise = function () {
            $scope.connection_error = false;
            $scope.loading = true;
            $scope.map = {
                latitude: 0,
                longitude: 0
            };
            $scope.$watch('enterprise', function (val) {
                if (val) {
                    if (val.address.coordinates) {
                        return $scope.map = val.address.coordinates;
                    }
                }
            });
            return Enterprise.get({
                id: $scope.enterprise_id
            }, function (response) {
                $scope.loading = false;
                if (response.id) {
                    response.description = $sce.trustAsHtml(response.description.toString())
                    $scope.enterprise = response;
                    $scope.style = {
                        "background-image": "url('" + $scope.enterprise.banner.url + "')"
                    };
                    return $scope.connection_error = false;
                } else {
                    return $scope.connection_error = true;
                }
            }, function (error) {
                $scope.connection_error = true;
                return $scope.loading = false;
            });
        };
        $scope.delete_enterprise = function () {
            if (confirm("Deseja realmente apagar " + $scope.enterprise.name + "?")) {
                return $http.get($scope.enterprise.delete_url).success(function (data, status, headers, config) {
                    if (data.falhas != '') {
                        return alert(data.falhas);
                    } else {
                        parent.$.fancybox.close();
                        parent.gridReload();
                        return true;
                    }
                }).error(function (data, status, headers, config) {
                    return alert("error");
                });
            } else {
                return false;
            }
        };

        $scope.edit_property = function (property_id) {
            $.fancybox({
                href: '../../../json/fichaCompleta.aspx?id=' + property_id,
                type: 'iframe',
                width: '98%',
                height: '98%',
                showNavArrows: true,
                transitionIn: 'none',
                modal: false
            });
            console.log(href);
        };

        $scope.edit_enterprise = function () {
            parent.$.fancybox.close();
            window.top.newWindow($scope.enterprise.edit_url);
        };
        $scope.duplicate_property = function (duplicate_url) {
            parent.$.fancybox.close();
            window.top.newWindow(duplicate_url);
        };
        $scope.currentIndex = 0;
        $scope.setCurrentIndex = function (index) {
            return $scope.currentIndex = index;
        };
        return $scope.isCurrentIndex = function (index) {
            return $scope.currentIndex === index;
        };
    });

    $(function () {
        // TODO change this to angular
        $.ajax({
            url: '../../../json/EmpreendimentoMapa.ashx?id_empreendimento=' + $('html').attr('data-ng-init').split('= ')[1],
            success: function (response) {

                if (response.id_empreendimento_mapa > 0) {

                    $("#block-mapa-vendas").show();
                    $("#icon-mapa-vendas").show();

                    $('#mapa-vendas div').html('<img src="' + response.tx_arquivo_mapa + '" class="map-image"/>');

                    $.each(response.markers, function (index, marker) {

                        var status = getStatus(marker.id_imovel_status, marker.fl_proposta);

                        $($('#mapa-vendas').find('div')[0]).append('<div class="marker-' + index + ' marker status-' + marker.id_imovel_status + ((marker.fl_proposta && marker.id_imovel_status == 1) ? '-proposta' : '')
                            + '" style="top: ' + marker.dl_top + 'px; left:' + marker.dl_left + 'px; ">' + marker.tx_sigla + '</div>');

                        $($(".marker-" + index)[$(".marker-" + index).length - 1]).one("mouseover", function () {

                            $(this).popover({
                                title: marker.tx_sigla + '<button class="close" type="button" onclick=\'$($(".marker-' + index + '")[$(".marker-' + index + '").length - 1]).popover("hide");\'>&times;</button>',
                                content: propertyInfoHtml(marker.id_imovel),
                                template: '<div class="popover popover-hint" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                                placement: function (context, source) {
                                    var position = $(source).position();

                                    if (position.left > 515)
                                        return "left";
                                    if (position.left < 515)
                                        return "right";
                                    if (position.top < 200)
                                        return "bottom";

                                    return "top";
                                },
                                html: true
                            });

                        });

                    });
                }
            }
        });
    });

    function propertyInfoHtml(property_id) {

        if(property_id == 0 || property_id == null)
            return 'Nenhum im&oacute;vel associado'

        var content = "";
        $.ajax({
            url: "../mapa-de-vendas/imovel-detalhes.ashx",
            type: "GET",
            data: { id_imovel: property_id },
            async: false,
            success: function (response) {

                content = '<div class="property-details row" style="padding: 0;"><div class="col-md-12"><strong>' + response.tx_referencia + '</strong><br></div>';

                if (response.tx_foto_miniatura != null)
                    content += "<div class='col-md-4'><img src='" + response.tx_foto_miniatura + "' /></div>";

                var status = getStatus(response.id_imovel_status, response.fl_proposta);

                if (status.title != null) {
                    content += "<div class='col-md-8'>" + status.title;
                    content += "<div class='status-circle' style='background-color: " + status.color + "'></div>";
                }

                if (response.tx_logradouro != null && response.tx_logradouro != '')
                    content += "<br>" + response.tx_logradouro;

                if (response.tx_dimensao_terreno != null)
                    content += "<br>Terreno: " + response.tx_dimensao_terreno;

                if (response.dl_dimensao_frente > 0)
                    content += "<br>Frente: " + formatNumber(response.dl_dimensao_frente) + " m";

                if (response.dl_dimensao_fundo > 0)
                    content += "<br>Fundo: " + formatNumber(response.dl_dimensao_fundo) + " m";

                if (response.dl_dimensao_lateral_direita > 0)
                    content += "<br>Lateral direita: " + formatNumber(response.dl_dimensao_lateral_direita) + " m";

                if (response.dl_dimensao_lateral_esquerda > 0)
                    content += "<br>Lateral esquerda: " + formatNumber(response.dl_dimensao_lateral_esquerda) + " m";

                if (response.dl_area_total > 0)
                    content += "<br>Area total: " + formatNumber(response.dl_area_total) + " m&sup2;";;

                if (response.dl_preco_venda > 0)
                    content += "<br>Valor: R$ " + formatNumber(response.dl_preco_venda);

                if (response.fl_repasse && (response.dl_sinal > 0 || response.parcelas.length > 0))
                    content += '<br><br><b><u>&#192; Prazo</u></b> '

                if (response.fl_repasse && response.dl_sinal > 0)
                    content += "<br>Entrada: R$ " + formatNumber(response.dl_sinal);

                if (response.fl_repasse && response.parcelas.length > 0) {
                    content += "<br>Parcelas: ";

                    var totalParcelas = 0;

                    $.each(response.parcelas, function (i, parcela) {
                        content += "<br>Tipo: " + parcela.tx_periodicidade + " - Quant: " + parcela.in_parcelas + " - Valor: R$ " + formatNumber(parcela.dl_valor);
                        totalParcelas += parcela.in_parcelas * parcela.dl_valor;
                    });

                    content += "<br>Valor &#224; prazo: R$ " + formatNumber(totalParcelas);
                }

                if (response.id_imovel_status == 3 || response.id_imovel_status == 8) {
                    content += "<br>Data do fechamento: " + $.datepicker.formatDate('dd/mm/yy', new Date(parseInt(response.negociacao.dt_fechamento.substr(6))));
                    content += "<br>Corretor(es) que fechou neg&#243;cio: " + response.negociacao.tx_corretores;
                }

                content += '</div>';

                if (response.id_imovel > 0 && (response.id_imovel_status == 1 && response.fl_permissao_proposta) || (response.id_imovel_status == 1 && response.fl_permissao_status))
                    content += '<div class="col-md-12"><hr class="divider"><div class="btn-group btn-group-sm btn-group-justified">';

                if (response.id_imovel > 0 && response.id_imovel_status == 1 && response.fl_permissao_proposta)
                    content += '<a class="btn btn-sm btn-warning" href="../../imoveis_beta/proposta/imovel-proposta-adicionar.aspx?idImovel=' + response.id_imovel + '" target="_blank">Adicionar proposta</a>';

                if (response.id_imovel > 0 && response.id_imovel_status == 1 && response.fl_permissao_status)
                    content += '<a class="btn btn-sm btn-success" href="../../imoveis_beta/fechamento/imovel-fechamento.aspx?id=' + response.id_imovel + '" target="_blank">Vender im&oacute;vel</a>';

                content += '</div></div></div>';

                if (response.id_imovel == 0)
                    content = 'Nenhum im&oacute;vel associado'
            }
        });

        return content;
    }

    function formatNumber(number) {
        return number_format(number, 2, ',', '.');
    }

    function number_format(number, decimals, dec_point, thousands_sep) {

        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    function getStatus(id, proposta) {

        switch (id) {
            case 1:
                if (proposta)
                    return { title: "Ativo - Com proposta", color: "#ffb41d" };
                else
                    return { title: "Ativo", color: "#239a02" };
            case 2:
                return { title: "Suspenso", color: "#b50002" };
            case 3:
                return { title: "Vendido", color: "#ff4c0a" };
            case 4:
                return { title: "Proposta", color: "#ffb41d" };
            case 5:
                return { title: "Ficha", color: "#ffb41d" };
            case 7:
                return { title: "Cancelado", color: "#b50002" };
            case 8:
                return { title: "Locado", color: "#ff4c0a" };
            case 9:
                return { title: "Provis&#243;rio", color: "#ffb41d" };
            case 10:
                return { title: "Vencido", color: "#239a02" };
            default:
                return { title: "", color: "" };
        }
    }

}).call(this);
