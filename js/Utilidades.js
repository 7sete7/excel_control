$(document).ready(function() {
  $('#nav-brand').text(document.title);
  $(document).scroll(oBotao);
  $(document).on('click', '#goTop', subir);
  $(document).on('click', '.closeAlert', fechar);
});

//Fecha o container ao clicar na classe .close
function fechar(){
	$(this).parent().fadeOut('fast');
}

//Display um alerta
function alerta(msg, type, container) {
  $('.alert').alert('close');
  $(container).prepend(`
    <div class="alert alert-${ type } alert-dismissible" role="alert" >
      ${ msg }
      <button class="close closeAlert" data-dissmiss="alert" aria-label="Close">
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

//Cria a modal do loading
function abrirLoading(msg, tamanho, tipo, callback){
  var loading = $();
  if(typeof msg === 'undefined')
    msg = 'Loading';
  if(typeof tipo === 'undefined')
    tipo = 'primary';
  if(typeof callback === 'function')
    $(document).on('shown.bs.modal', loading, callback);

  loading = $(`
    <div class="modal fade" id="load" role="dialog" style="padding-top: 13%">
      <div class="modal-dialog modal-${ tamanho }" role="document">
        <div class="modal-header"><h4 class="modal-title">${ msg }</h4></div>
        <div class="modal-body">
          <div class="progress active">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-${ tipo }" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  `);
  loading.modal();

  return loading;
}

function add_cell_to_sheet(worksheet, address, value) {
	var cell = {t:'?', v:value};

	if(typeof value == "string") cell.t = 's';
	else if(typeof value == "number") cell.t = 'n';
	else if(value === true || value === false) cell.t = 'b';
	else if(value instanceof Date) cell.t = 'd';
	else throw new Error("cannot store value");

	worksheet[address] = cell;

	var range = XLSX.utils.decode_range(worksheet['!ref']);
	var addr = XLSX.utils.decode_cell(address);

	if(range.s.c > addr.c) range.s.c = addr.c;
	if(range.s.r > addr.r) range.s.r = addr.r;
	if(range.e.c < addr.c) range.e.c = addr.c;
	if(range.e.r < addr.r) range.e.r = addr.r;

	worksheet['!ref'] = XLSX.utils.encode_range(range);
}
