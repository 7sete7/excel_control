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
  loading.modal({backdrop: 'static', keyboard: false});

  return loading;
}

// Adciona células no worksheet
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

/**
* @param iteravel: Object - Objeto json que contenha endereços estilo worksheet(A1, B16, H44).
* @param linha: int - O número da linha.
* Apaga tudo que está nessa linha.
* @return O worksheet sem a linha apagada.
*/
function apagarLinha(iteravel, linha){
  let entries = Object.entries(iteravel);
  iteravel = entries.filter(v => !v[0].match(`[A-Za-z]+${linha}$`));
  return iteravel;
}

/**
* @param node: Object - objeto dataTable correspondente à linha adcionada.
* Adciona uma linha nova ao arquivo de worksheet.
*/
function adcionarLinha(node){
  let data = tabelar().row(node).data();
  let wb = getXls().Sheets["DADOS - PENDANT_KANBAN_PPS"];
  let lastRow = XLSX.utils.decode_range(wb['!ref']).e.r;

  for(let i = 0; i < data.length; i++){
    let col = pegaColuna(i);
    add_cell_to_sheet(wb, `${col}${lastRow + 1}`, data[i]);
  }
}

/**
* Remove as classes disabled dos itens da nav
*/
function removeDisabled() {
  $('#linkAdd').removeClass('disabled');
  $('#linkProcurar').removeClass('disabled');
  $('#linkPrint').removeClass('disabled');
  $("#inputFile").hide();
}

/**
* @param content: String/Int - Valor que será procurado.
* @param col: Int - Coluna da tabela que será procurada, -1 para todas.
* @param isUnico: boolean - Descreve se a linha procurada é única.
* Procura linhas na tabela que contenham o \content\.
* @return data: Array - Array de arrays com as linhas que foram encontradas.
*/
function procurarNaTabela(content, col, isUnico) {
  let data = [];
  let rows = [];
  let achei;
  let i = 0;
  let tabela = getTabela();

  tabela.rows()[0].forEach(function(v){
    rows.push(tabela.row(v).data());
  });

  for(linha of rows){
    i = 0;
    for(dado of linha){
      if(dado === 'undefined') continue;
      if(dado.toString().toUpperCase().includes(content.toString().toUpperCase())){
        data.push(linha);
        achei = true;
        break;
      }
      if(i == col) break;
      i++;
    }
    if(achei && isUnico) break;
  }

  return data;
}

//Retorna a data e horário atual: 31/01/2018  14:32
function dataAtual(){
  let data = new Date();
  return data.toLocaleDateString() +'  '+ formataHoras(data.getHours(), data.getMinutes());
}

// Formata as horas e minutos botando 0 na frente
function formataHoras(hora, minuto){
  if(hora.toString().length == 1){
    hora = '0' + hora.toString();
  }

  if(minuto.toString().length == 1){
    minuto = '0' + minuto.toString();
  }

  return hora + ':' + minuto;
}

function validaOsDados(value){
  if(!typeof value === null && !typeof value === undefined)
    return value;

  try{
    if(!value.toString().match(/^[\s]$/))
      return value;
  }
  catch(e){
    console.log(value+'->'+value);
  }

  return '--';
}

function alert(e){
  if(!console.group)
    console.groupCollapsed('Alertas customizados.');

  console.log("Alerta: "+e);
}
