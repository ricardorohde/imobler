$(document).ready(function () {

    var scope = angular.element($("#header")).scope();

    $('#cepTipo').cep({
        showPosicionamentoManual: true,
        createAddress: scope.permissions != undefined && scope.permissions.address[0] == 'CREATE',
        createAddressBrazil: scope.permissions != undefined && scope.permissions.address[1] == 'CREATE-BRAZIL',
        showNeighborhood: true,
        address: scope.profile == undefined ? null : scope.profile.agency_address,
        coordinatess: scope.profile == undefined ? null : scope.profile.agency_coordinates
    });

    $('#s2id_CEPValor').find("input[class*='select2-input']").on("keypress", function (event) {

        //Permitir somente valores numéricos
        if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
            return false;
        }

        //Não permitir números com mais de 8 dígitos
        if (event.which > 47 && event.which < 58 && $(this).val().length > 7) {
            event.preventDefault();
            return false;
        }
    });
});


