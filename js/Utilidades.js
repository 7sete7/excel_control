$(document).ready(function() {
  $('#nav-brand').text(document.title);
  $(document).scroll(oBotao);
  $(document).on('click', '#goTop', subir);
  $(document).on('click', '.close', fechar);
});

function fechar(){
	$(this).parent().fadeOut();
}

//Display um alerta
function alerta(msg, type) {
  $('.alert').alert('close'); 
  $('#con').prepend(`
    <div class="alert alert-${ type } alert-dismissible" role="alert" >
      ${ msg }
      <button class="close" data-dissmiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `);
}

//Mostra e desmostra o botão de volta ao top
function oBotao(){
  if ($(document).scrollTop() > 20)
   $('#goTop').show();
 else
   $('#goTop').hide();
}

//Rola a página pra cima
function subir(){
  $('html, body').animate({scrollTop: 0}, 200);
}
