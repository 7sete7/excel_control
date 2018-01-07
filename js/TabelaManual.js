var pos;
var aDiv;

$(document).ready(function() {
  pos = $(window).scrollTop() + $(window).height();
  $('#undo').css('margin-bottom', -pos);

  $(document).on('click', '#remove', remover);
  $(document).on('click', '#undo', () => aDiv.slideDown('slow'));
});

function remover() {
  aDiv = $(this).parent();
  $(this).parent().slideUp('slow', function() {
    aparece();
    setTimeout(desaparece, 5000);
  });
  setTimeout(function(){
    if(aDiv.css('display') == 'none'){
      aDiv.remove();
    }
  }, 10000);
}

function aparece(){
  var div = $("#undo");
  div.show().animate({'bottom' : (pos + div.height() - 10)});
}

function desaparece() {
  var div = $("#undo");
  div.animate({'bottom' : -(pos + div.height())}, function() {
    $(this).hide();
  });
}
