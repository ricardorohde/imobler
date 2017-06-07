$(document).ready(function() {
    $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": "http://www.imobler.info:8888/admin/imoveis__lista/api"
    } );
} );