

// JavaScript Document



$('#fileupload').fileupload({
    url: "../admin/upload_image.ashx",
    formData: { "imovelId": "", "module": "property" },
    disableImageResize: false,
    imageMaxWidth: "1024",
    imageMaxHeight: "768",
    imageCrop: false, // Force cropped images
    dropZone: $('#dropzone'),
    acceptFileTypes: /(\.|\/)(jpe?g|JPE?G)$/i,
    autoSubmit: false,
    maxFileSize: 5000000, // 5MB
    sequentialUploads: true,
    messages: {
        maxFileSize: 'Tamanho máximo permitido 5MB',
        acceptFileTypes: 'Extensão do arquivo não permitida. Utilize os formatos .jpg ou jpeg'
    },
    submit: function(){
        disableSave(true, "Fazendo upload das imagens. Por favor, aguarde");
    },
    add: function (e, data) {

        data.uploadID = new Date().valueOf();

        this.statusbar = $('<div id="'+ data.uploadID +'" class="col-sm-4 col-md-3 item-box item-progress"></div>').insertBefore("#dropzone");
        this.container = $('<div class="ajax-file-upload-statusbar"></div>').appendTo(this.statusbar);
        this.filename = $('<div class="ajax-file-upload-filename"><div class="ellipsis">'+ data.files[0].name +'</div> <div class="pull-right"><span class="loaded">'+humanFileSize(data._progress.loaded, true)+'</span>/<span class="total">'+humanFileSize(data.files[0].size, true)+'</span></div></div>').appendTo(this.container);
        this.progressDiv = $('<div class="ajax-file-upload-progress"></div>').appendTo(this.container);
        this.progressbar = $('<div class="ajax-file-upload-bar"></div>').appendTo(this.progressDiv);
        this.success = $('<div class="icon-action success" style="display: none;"><i class="fa fa-check"></i></div>').insertAfter(this.progressbar);
        this.success = $('<div class="icon-action abort"><i class="fa fa-times"></i></div>').insertAfter(this.progressbar);

        $('#'+data.uploadID).find('.abort').click(function (e) {
            data.abort();
            $('#'+data.uploadID).remove();
        });

        var $this = $(this);
        data.process(function (d) {
            return $this.fileupload('process', data);
        }).done(function() {
            var jqXHR = data.submit()
            .success(function (result, textStatus, jqXHR) { addItem(result) })
            .error(function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                $('#'+data.uploadID).remove();
            });
        });

    },
    progress: function (e, data) {
        var $this = $('#'+data.uploadID);
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $this.find('.loaded').text(humanFileSize(data.loaded,true));
        $this.find('.total').text(humanFileSize(data.total, true));
        $this.find('.ajax-file-upload-bar').css( 'width', progress + '%');
    },
    done: function (e, data) {

        var $this = $('#'+data.uploadID);
        $this.find('.success').show();
        $this.find('.abort').hide();

        $this.addClass("bounceOutLeft animated").fadeOut(400, function(){
            $(this).remove();
        });

        disableSave(false);

    }
}).on('fileuploadprocessalways', function (e, data) {
  var currentFile = data.files[data.index];
  if (data.files.error && currentFile.error) {
    // there was an error
    $('#'+data.uploadID).remove();

    var errorTpl = '<div class="ajax-file-upload-error-container"><div class="ajax-file-upload-error alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-ban"></i><b>' + currentFile.name + '</b> Opss... não é permitido fazer o upload deste tipo de arquivo. ' + currentFile.error + '</div></div>';
    $('#dropzone').after(errorTpl);
  }
});

/************************************************************************/

function addItem(data) {

    var maxIndice = [];
    $('.item-content').each(function (index, value) {
        maxIndice.push(parseInt($(this).find("input[id^='fotoURL']").attr("id").replace("fotoURL", "")));
    });

    var newIndex = 0;

    if ( maxIndice.length > 0){
        newIndex = (Math.max.apply(Math,maxIndice)) + 1;
    }

    var $dropzone  = $('#dropzone'),
        index = newIndex,
        sort = index - 1,
        id = (data.imageId > 0) ? data.imageId : 0,
        imgId = (data.imageId > 0) ? data.imageId : index,
        src = data.pathImageSmall,
        name = (src.split('thumbs/thumb')[1]) ? src.split('thumbs/thumb')[1] : '',
        srcBig = data.pathImageBig,
        FlUrlGoogle = data.FlUrlGoogle,
        Mimetype = data.Mimetype,
        UrlKey = data.UrlKey,
        UrlQuery = data.UrlQuery,
        UrlServing = data.UrlServing,
        deleteHref = (data.imageId > 0) ? 'modules/imoveis_beta/imovel-foto-excluir.aspx?idFoto=' + data.imageId : 'modules/imoveis_beta/imovel-foto-excluir.aspx?foto=' + name;

    var template =  '';
        template += '<div id="'+ id +'" class="col-sm-4 col-md-3 item-box fadeIn animated">';
        template += '   <div class="item-content">';
        template += '       <div class="td td-index">';
        template += '           <b class="photo-index" data-index="'+ index +'"><input type="checkbox" value="'+ id +'"> <span>'+ index +'</span></b>';
        template += '       </div>';
        template += '       <button type="button" class="item-delete" href="'+ deleteHref +'" data-toggle="tooltip" data-placement="left" title="Excluir foto"><i class="fa fa-times"></i></button>';
        template += '       <div class="td td-thumb">';
        
           template += '<img src="'+ src +'" class="thumb" />';
        
        template += '       </div>';
        template += '       <div class="td td-title">';
        template += '          <div class="input-group">';
        template += '           <label class="form-icon edit-icon">';
        template += '               <input type="text" class="form-control" placeholder="Sem título" maxlength="30" id="fotolegenda'+ index +'" name="fotolegenda'+ index +'" value="">';
        template += '           </label>';
        template += '           <span class="hint photo-help input-group-addon" data-toggle="popover"><i class="fa fa-question-circle"></i></span>';
        template += '          </div>';
        template += '       </div>';
        template += '       <div class="td td-description">';
        template += '           <p class="form-icon edit-icon"><textarea placeholder="Sem descrição" class="form-control" name="fotodescricao'+ index +'" id="fotodescricao'+ index +'"></textarea></p>';
        template += '       </div>';
        template += '       <div class="td td-option">';
        template += '           <label><input type="checkbox" id="capa'+ index +'" class="feature"> Foto de capa</label>';
        template += '       </div>';
        template += '       <div class="td td-option">';
        template += '           <label><input type="checkbox" name="publicar'+ index +'" id="publicar'+ index +'" class="public" checked="checked"> Aparecer no site</label>';
        template += '       </div>';
        template += "       <div class='td td-type check-type'><p><select id='tipoFoto"+ index + "' name='tipoFoto"+ index + "'><option value='1' selected='selected'>Foto</option><option value='2' >Banner</option><option value='3' >Perspectiva</option><option value='4' >Decorado</option><option value='5' >Foto planta</option></select></p></div>";
        template += '       <input id="ordem'+ index +'" name="ordem'+ index +'" type="hidden" value="'+ sort +'" />';
        template += '       <input id="blDestaque'+ index +'" name="blDestaque'+ index +'" type="hidden" value="false" />';
        template += '       <input id="foto'+ index +'" name="foto'+ index +'"type="hidden" value="'+ name +'" />';
        template += '       <input id="fotoURL'+ index +'" name="fotoURL'+ index +'" type="hidden" value="'+ src +'" />';
        template += '       <input id="fotoURLBIG'+ index +'" name="fotoURLBIG'+ index +'" type="hidden" value="'+ srcBig +'" />';
        template += '       <input id="FlUrlGoogle'+ index +'" name="FlUrlGoogle'+ index +'" type="hidden" value="'+ FlUrlGoogle +'" />';
        template += '       <input id="Mimetype'+ index +'" name="Mimetype'+ index +'" type="hidden" value="'+ Mimetype +'" />';
        template += '       <input id="UrlKey'+ index +'" name="UrlKey'+ index +'" type="hidden" value="'+ UrlKey +'" />';
        template += '       <input id="UrlQuery'+ index +'" name="UrlQuery'+ index +'" type="hidden" value="'+ UrlQuery +'" />';
        template += '       <input id="UrlServing'+ index +'" name="UrlServing'+ index +'" type="hidden" value="'+ UrlServing +'" />';

        template += '       <input id="idFoto'+ index +'" name="idFoto'+ index +'" type="hidden" value="'+ id +'" />';
        template += '   </div>';
        template += '</div>';

    $(template).insertBefore($dropzone);

    selectFormat();
    updateSort();
    updatePhotoNum();
    popoverPhoto();
    startTooltip();

    $('.feature').bind('click', setFeatured);

    var imovelId = parseInt("");

    if(!isNaN(imovelId) && id != 0){
        $('#'+ id).find('.item-delete').bind('click', function(){
            deleteSingleItem(id);
        });
    } else {
        $('.item-delete').last().bind('click', function(){
            deleteNewItem(this);
        });
    }



    // Rebind event for individual slide show for each new image added


    setDefaultFeatured();
    substrDesc();

}

/*
* Pagina de Edicao de imovel
*/
$('#box_fotos').on('click', '.rotate a', function(e){
    e.preventDefault();
    
    var photoId = parseInt($(this).closest('.item-box').attr("id"));
    if (photoId == 0){        
        var el = $(this).parent().parent().parent();            
        photoId = $(this).closest('.item-box').find(".photo-index").attr('data-index') -1;        
    }

    var src = $(this).closest('.td-thumb').find('img').attr("src");
    var imovelId = parseInt("");
    var type = '';
    if(imovelId > 0 && photoId > 0){
        type = "imovel";
        src = "";
    }
    else if(imovelId > 0 && photoId <= 0) {
        type = "imovel_add";
        src = "";
    }
    else
        type = "imovel_idx";

    var imgidx = $(this).closest('.item-box').find(".photo-index").attr('data-index') -1;    
    var objimg =  $(this).closest('.td-thumb').find('img');
    imgRotate(objimg ,photoId, type, "", src,imgidx);

});

function imgRotate(objimg,photoId, type, imovelId,pathImg,imgidx) {
    RotacionarImagem(objimg, photoId , 90, type, "mini", pathImg, imovelId,imgidx);
    return false;
}