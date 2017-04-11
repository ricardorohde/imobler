var actionBar = new AddActionBar('#box_fotos');
actionBar.start();

var $boxContainer       = $('#box_fotos'),
    $viewMode           = $('.view-mode').children('button'),
    $feature            = $('.feature'),
    $gridBtn            = $('#gridMode'),
    $listBtn            = $('#listMode'),
    $checkAllBtn        = $('#checkAll'),
    $publishAllBtn      = $('#publishAll'),
    $unPublishAllBtn    = $('#unPublishAll'),
    $deleteAllBtn       = $('#deleteAll'),
    $deleteSingleBtn    = $('.item-delete'),
    $selectType         = $('.td-type').find('select'),
    $slideShowBtn       = $('#slideShow');

$(".ajax-file-upload-box").on({
    "mousedown": function(){
        $("#navbar-submit").removeClass('navbar-sticky fadeInUpBig animated');
    },
    "mouseup": function(){
        $("#navbar-submit").addClass('navbar-sticky fadeInUpBig animated');
    }
});

/** Construct actions bar */
function AddActionBar(elem) {

    var permission = true;

    if($('#hasPermission').length){
        if($('#hasPermission').val() == "false") {
            permission = false;

            // Disable all tipoFoto selects
            $('[id^="tipoFoto"]').each(function () {
                $(this).prop('disabled', true);
            });
        }
    }

    this.start = function(){
        $(elem).before(this.template());
    };
    this.template = function() {
        var html = '';
            html += " <nav class='navbar' id='upload-actions'>";
            html += "      <div class='container-fluid'>";
            if(permission) {
                html += "           <div class='navbar-form navbar-left'>";
                html += "               <input type='checkbox' name='' id='checkAll' title='Marcar todos'>";
                html += "               <div class='btn-group' role='group'>";
                html += "                    <div class='btn-group' role='group'>";
                html += "                       <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
                html += "                         <i class='fa fa-desktop'></i> Aparecer no site <i class='caret'></i>";
                html += "                       </button>";
                html += "                       <ul class='dropdown-menu'>";
                html += "                         <li><a href='javascript:;' id='publishAll'>Sim</a></li>";
                html += "                         <li><a href='javascript:;' id='unPublishAll'>Não</a></li>";
                html += "                       </ul>";
                html += "                    </div>";
                html += "                 <button type='button' id='deleteAll' class='btn btn-default'><i class='fa fa-times'></i> <span class='action-label'>Excluir</span></button>";
                html += "               </div>";
                html += "           </div>";
            }
            html += "           <div class='navbar-form navbar-right'>";
            html += "             <div class='form-group'>";
            html += "                 <button type='button' id='slideShow' class='btn btn-default'><i class='fa fa-play'></i> <span class='action-label'>Slide Show</span></button>";
            html += "             </div>";
            html += "             <div class='btn-group view-mode' role='group'>";
            html += "               <button id='gridMode' type='button' class='btn btn-default' aria-label='Mostrar em grade' title='Mostrar em grade'><i class='fa fa-th-large'></i></button>";
            html += "               <button id='listMode' type='button' class='btn btn-default' aria-label='Mostrar em lista' title='Mostrar em lista'><i class='fa fa-th-list'></i></button>";
            html += "             </div>";
            html += "           </div>";
            html += "      </div>";
            html += "  </nav>";

        return html;
    }
}

$(document).bind('dragover', function (e) {
    e.preventDefault();
    var dropZone = $('#dropzone .ajax-upload-dragdrop'),
        timeout = window.dropZoneTimeout;
    if (!timeout) {
        dropZone.addClass('in');
    } else {
        clearTimeout(timeout);
    }
    var found = false,
        node = e.target;
    do {
        if (node === dropZone[0]) {
            found = true;
            break;
        }
        node = node.parentNode;
    } while (node != null);
    if (found) {
        dropZone.addClass('hover');
    } else {
        dropZone.removeClass('hover');
    }
    window.dropZoneTimeout = setTimeout(function () {
        window.dropZoneTimeout = null;
        dropZone.removeClass('in hover');
    }, 100);
});

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

function checkErrorResponse(data){
    if(data.messages.length > 0) {
        bootbox.alert(data.messages[0].message);
        return false;
    } else {
        return true;
    }
}

/** Set Featured image */
function setFeatured(){

    $item = $(this).closest('.item-box');
    index = parseInt($item.find('.photo-index span').text());

    // Set current photo as featured
    $('.feature').prop('checked', false);
    $(this).prop('checked', true);

    $("input[name^=blDestaque]").val("false");
    $item.find("input[name^=blDestaque]").val("true");

    // Set current photo as public to site
    $('.public').prop('disabled', false);
    $item.find("input[name^=publicar]").prop({'disabled': true, 'checked': true});

    $(".item-box").removeClass("item-active");
    $item.addClass("item-active");

    //Destaque Empreendimento
    $('#foto_destaque').length ? $('#foto_destaque').val(index - 1) : ''; //Zero based

}

/** Set Featured image */
function setDefaultFeatured(){

    $element    = $('.item-box > .item-content');
    $target     = $('.item-box.item-active');

    if(!$target.length) {
        $element
            .first()
            .find('.feature')
            .trigger('click')
            .closest('.item-box');
    }

}

/** Add default class for select element */
function selectFormat(){
    $('.ajax-file-upload-box select').addClass('form-control');
    //$('.ajax-file-upload-box select').addClass('form-control').bind('change', addDescription);
}

/** Update index of each photo after reorder with sortable */
function updateSort(){

    $('.item-content').each(function(i){
        $(this).find("input[id^=ordem]").val(i);
        $(this).find('.photo-index').attr('data-index', i+1);
        $(this).find('.photo-index span').text(i+1);
    });
}

function updatePhotoNum() {
    $("#numero_fotos").val(parseInt($(".item-content").length));
}

/** Set grid view mode */
function gridMode() {
    $.cookie("viewmode", "grid");
    $viewMode.removeClass('active');
    $gridBtn.addClass('active');
    $boxContainer.removeClass('list').addClass('grid');
}

/** Set list view mode */
function listMode() {
    $.cookie("viewmode", "list");
    $viewMode.removeClass('active');
    $listBtn.addClass('active');
    $boxContainer.removeClass('grid').addClass('list');
}

/** Toggle all main checkboxes of each item */
function toggleAll(){
    var checked = $(this).prop('checked');
    $('.photo-index input[type="checkbox"]').each(function(){
        $(this).prop('checked', checked);
    });
}

/** Make checkbox of publish option be checked */
function publishAll(){

    var items = getSelectedItemsId();

    if(items.length) {
        $('.item-box').each(function(){
            var checked = $(this).find('.photo-index input[type="checkbox"]').prop('checked');
            if(checked)
                $(this).find('input[name^="publicar"]').prop('checked', true);
        });
    } else {
        bootbox.alert("Nenhum item selecionado");
    }
}

/** Make checkbox of publish option be unchecked */
function unPublishAll(){

    var items = getSelectedItemsId();

    if(items.length) {
        $('.item-box').each(function(){
            if(!$(this).hasClass('item-active'))
                var checked = $(this).find('.photo-index input[type="checkbox"]').prop('checked');
            if(checked)
                $(this).find('input[name^="publicar"]').prop('checked', false);
        });
    } else {
        bootbox.alert("Nenhum item selecionado");
    }
}

/** Enable description field */
function addDescription(){

    var $container = $(this).closest('.item-box');
    var type = parseInt($(this).val());
    var $desc = $container.find('.td-description');

    if($(this).filter("[name^=tipoFoto]").length) {
        switch (type) {
            case 3:
            case 4:
            case 5:
                $desc.removeClass('hide');
                break;
            default:
                $desc.find('textarea').val('');
                $desc.addClass('hide');
        }
    } else {
        switch (type) {
            case 4:
            case 5:
            case 8:
                $desc.removeClass('hide');
                break;
            default:
                $desc.find('textarea').val('');
                $desc.addClass('hide');
        }
    }
}

function checkUrl(url) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
}

/** Initiate SlideShow */
function slideShow(){
    var $thumb = $('.item-content');

    if($thumb.length){
        var images = [];
        $thumb.each(function () {
            var src = $(this).find('[name^="fotoURLBIG"]').val();
            var title = $(this).find('[name^="fotolegenda"]').val();
            if(src !== undefined && checkUrl(src))
                images.push({href: src, title: title});
        });

        if(images.length){
            $.fancybox(
                images,
                {
                    'showNavArrows'     : true,
                    'type'              : 'image',
                    'titleShow'         : true,
                    'scrolling'         : 'no',
                    titlePosition       : 'outside'
                }
            );
        }
    } else {
        bootbox.alert("Nenhum item para exibir");
    }
}

function getItemsId() {
    var array = [];

    $('.photo-index input:checkbox').each(function(i){
        array[i] = $(this).val();
    });

    return array;
}

function getSelectedItemsId() {

    var array = [];
    $('.photo-index input:checkbox').each(function(i){
        if($(this).prop('checked')) {
            if($(this).val() != '')
                array[i] = $(this).val();
        }
    });

    return array;
}

/** Removes items HTML from the DOM (when creating a new register. At this point there's no id defined) */
function getNewSelectedItems() {

    var array = [];
    $('.photo-index input:checkbox').each(function(i){
        if($(this).prop('checked')) {
            array.push($(this).closest('.item-box'));
        }
    });
    return array;
}

/** Removes items HTML from the DOM (when creating a new register. At this point there's no id defined) */
function removeItems(obj){
    $(obj).each(function () {
        if(typeof this == "object") {
            $(this).closest('.item-box').fadeOut(400, function () {
                $(this).remove();
            });
        }
    });
}

function deleteSelectedItems() {

    var newItems = getNewSelectedItems();

    if(newItems.length) {

        var pluralizeTitle = (newItems.length > 1) ? "Deseja excluir estas imagens?" : "Deseja excluir esta imagem";
        var pluralizeMessage = (newItems.length > 1) ? "As imagens selecionadas serão excluídas permanentemente." : "A imagem selecionada será excluída permanentemente.";

        bootbox.dialog({
            message: pluralizeMessage,
            title: pluralizeTitle,
            buttons: {
                danger: {
                    label: "Não",
                    className: "btn-danger"
                },
                success: {
                    label: "Sim",
                    className: "btn-success",
                    callback: function () {
                        $(newItems).each(function(){
                            var self = $(this);
                            var href = self.find('.item-delete').attr('href');

                            $.ajax({
                                beforeSend: function () {
                                    self.addClass('deleting animated bounceOut');
                                    disableSave(true, 'Excluindo... Por favor, aguarde.');
                                },
                                url: href,
                                method: 'POST',
                                success: function () {
                                    $('.deleting').fadeOut(400, function () {
                                        $(this).remove();
                                        updateSort();
                                        setDefaultFeatured();
                                        updatePhotoNum();
                                    });
                                },
                                error: function () {
                                    bootbox.alert('Não foi possível efetuar a exclusão. Por favor, tente mais tarde.');
                                    $('.item-box').removeClass('deleting');
                                },
                                complete: function () {
                                    disableSave(false);
                                }
                            });
                        });
                    }
                }
            }
        });
    } else {

        var array = getSelectedItemsId();

        var pluralizeTitle = (array.length > 1) ? "Deseja excluir estas imagens?" : "Deseja excluir esta imagem";
        var pluralizeMessage = (array.length > 1) ? "As imagens selecionadas serão excluídas permanentemente." : "A imagem selecionada será excluída permanentemente.";

        if (array.length) {
            bootbox.dialog({
                message: pluralizeMessage,
                title: pluralizeTitle,
                buttons: {
                    danger: {
                        label: "Não",
                        className: "btn-default"
                    },
                    success: {
                        label: "Sim",
                        className: "btn-success",
                        callback: function () {

                            var items = array.join(),
                                href = $('.item-delete').first().attr('href').split('?')[0];

                            $.ajax({
                                beforeSend: function () {
                                    for (var i = 0; i <= array.length; i++) {
                                        $('.photo-index input[value="' + array[i] + '"]').closest('.item-box').addClass('deleting animated bounceOut');
                                    }
                                    disableSave(true, 'Excluindo... Por favor, aguarde.');
                                },
                                url: href,
                                method: 'POST',
                                data: {idFoto: items},
                                success: function () {
                                    $('.deleting').fadeOut(400, function () {
                                        $(this).remove();
                                        updateSort();
                                        setDefaultFeatured();
                                        updatePhotoNum();
                                    });
                                },
                                error: function () {
                                    bootbox.alert('Não foi possível efetuar a exclusão. Por favor, tente mais tarde.');
                                    $('.item-box').removeClass('deleting');
                                },
                                complete: function () {
                                    disableSave(false);
                                }
                            });
                        }
                    }
                }
            });
        } else {
            bootbox.alert("Nenhum item selecionado");
        }
    }
}

function deleteNewItem(ele){
    var self = $(ele).closest('.item-box');
    bootbox.dialog({
        message: "A imagem selecionada será excluída permanentemente.",
        title: "Deseja excluir esta imagem?",
        buttons: {
            danger: {
                label: "Não",
                className: "btn-default"
            },
            success: {
                label: "Sim",
                className: "btn-success",
                callback: function () {
                    self.fadeOut(400, function(){
                        $(this).remove();
                        updateSort();
                        updatePhotoNum();
                        setDefaultFeatured();
                    });
                }
            }
        }
    });
}

function deleteSingleItem(id) {
    bootbox.dialog({
        message: "A imagem será excluída permanentemente.",
        title: "Deseja excluir esta imagem?",
        buttons: {
            danger: {
                label: "Não",
                className: "btn-default"
            },
            success: {
                label: "Sim",
                className: "btn-success",
                callback: function () {

                    var $self = $('#' + id),
                        href = $self.find('.item-delete').attr('href');

                    $.ajax({
                        beforeSend: function () {
                            $self.addClass('deleting animated bounceOut');
                            disableSave(true, 'Excluindo imagens. Por favor, aguarde.');
                        },
                        url: href,
                        method: 'POST',
                        //data: {idFoto: id},
                        success: function () {
                            $self.fadeOut(400, function () {
                                $(this).remove();
                                updateSort();
                                updatePhotoNum();
                                setDefaultFeatured();
                            });
                        },
                        error: function () {
                            bootbox.alert('Não foi possível excluir as imagens. Por favor, tente mais tarde.');
                            $('.item-box').removeClass('deleting');
                        },
                        complete: function () {
                            disableSave(false);
                        }
                    });
                }
            }
        }
    });
}

/** Initialize popover hint */
function popoverPhoto(){
    var title = 'Esta informação aparecerá no SlideShow de Fotos do seu site';
    var content = '<div class="hint-title hint-photo"></div>';
    popoverHint('.hint.photo-help', title, content, 'top');
}

function startTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
}

/** Check for default view mode */
function checkViewMode() {
    if($boxContainer.hasClass('grid'))
        $gridBtn.addClass('active');
    else
        $listBtn.addClass('active');
}

function disableSave(state, msg){

    var $container = $('#navbar-submit'),
        $target = $container.children('input');

    if(state == true){
        // Default message
        msg = (msg === undefined) ? "Por favor, aguarde." : msg;

        $target.attr('disabled', true)
            .addClass('disabled');
        if($container.find('.info-text').length == 0)
            $container.append('<span class="info-text"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> '+ msg +'</span>');
    } else {
        $target.removeAttr('disabled')
            .removeClass('disabled');
        $container.find('.info-text').remove();
    }
}

// Substring for description field
function substrDesc() {
    var charLimit = 24;
    $('.item-content').each(function(){
        var $place  = $(this).find('.td-description');
        var $target = $place.find('textarea');
        if ($target.val().length > charLimit) {
            var resume = $target.val().substr(0, charLimit).concat('...');
            if (!$place.find('.resume').length)
                $place.append('<span class="resume">' + resume + '</span>');
        }
    });

    $('.item-content textarea').on({
        'focus': function () {
            $(this).closest('.td-description').find('.resume').remove();
        },
        'focusout': function () {
            substrDesc();
        }
    });
}

substrDesc();

// Create sortable functionality

var box_fotos = document.getElementById('box_fotos');

if(box_fotos != undefined) {
    Sortable.create(box_fotos, {
        //draggable: '.item-box',
        sort: true,
        animation: 400,
        onUpdate: function (e, ui) {
            updateSort();
        }
    });
}

$boxContainer.disableSelection();

checkViewMode();
popoverPhoto();
startTooltip();
selectFormat();

// Binding events to the DOM
//$selectType.on('change', addDescription);
$checkAllBtn.on('click', toggleAll);
$deleteAllBtn.on('click', deleteSelectedItems);
$feature.on('click', setFeatured);

// Publish selected items
$publishAllBtn.on('click', function (e) {
    e.preventDefault();
    publishAll();
});

// Unpublish selected items
$unPublishAllBtn.on('click', function (e) {
    e.preventDefault();
    unPublishAll();
});

// Grid and list layout
$gridBtn.click(gridMode);
$listBtn.click(listMode);

// Check default view mode option
if($.cookie("viewmode")){
    if($.cookie("viewmode") == "grid"){
        gridMode()
    } else if ($.cookie("viewmode") == "list"){
        listMode()
    }
}

// Delete single image
$deleteSingleBtn.on('click', function (e) {
    var id = $(this).attr('href').split('=')[1];
    deleteSingleItem(id);
    e.preventDefault();
});

// Slide show for all images
$slideShowBtn.click(slideShow);

// Individual slide show for each new image added
$boxContainer.on('click', 'img', function (e) {
    e.preventDefault();
    var src = $(this).closest('.item-content').find('[name^="fotoURLBIG"]').val();
    return $.fancybox(src, {
        'type': 'image',
        'titleShow': true
    });
});