$(document).ready(function() {
  $(document).one('dblclick', 'td', clicar);
  $(document).on("blur", '#inputEdit', voltarNormal);
  $(document).on('click', 'tr', seleciona);
  $(document).on('click', '#remove', remove);
});

//Adciona o input no local do clique
function clicar(e) {
  var td = $(e.target);
  var texto = td.text();
  td.html(`<input type="${$.isNumeric(texto) ? "number" : "text"}" id="inputEdit"/>`);
  $("#inputEdit").val(texto);
}

//Bota o valor do input no td da tabela
function voltarNormal() {
  var val = $("#inputEdit").val();
  $('#searchModal').hasClass('in') ? editar(val) :editarDataTable(val);
  $("#inputEdit").remove();
  $(document).one('dblclick', 'td ', clicar);
}

function seleciona(){
  if($(this).hasClass('selected'))
    $(this).removeClass('selected');
  else{
    $(this).parent().children('tr.selected').removeClass('selected');
    $(this).addClass('selected');
  }
}

function editarDataTable(val){
  var row = getTabela().row($("#inputEdit").parent().parent()[0]).data();
  var coluna = getTabela().column($('#inputEdit').parent()[0]).index();
  row[coluna] = val;
  getTabela().row($("#inputEdit").parent().parent()[0]).data(row);
  alerta(`Item de número ${ row[0] } editado!`, 'info', '#con');
}

function editar(val){
  $("#inputEdit").parent().text(val);
}

function remove(){
  if(!getTabela().row('.selected').length) return;
  if(!confirm('Deseja mesmo excluir a linha selecionada?')) return;

  alerta(`Item de número ${ getTabela().row('.selected').data()[0] } deletado!`, 'warning', '#con');
  getTabela().row('.selected').remove().draw(false);
}
