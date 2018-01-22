var editados = [];

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

//Faz as linhas ficarem azul quando clicadas
function seleciona(){
  if($(this).hasClass('selected'))
    $(this).removeClass('selected');
  else{
    $(this).parent().children('tr.selected').removeClass('selected');
    $(this).addClass('selected');
  }
}

//Função para pegar o valor da tabela do data tables
function editarDataTable(val){
  var row = getTabela().row($("#inputEdit").parent().parent()[0]);
  var coluna = getTabela().column($('#inputEdit').parent()[0]).index();
  row.data()[coluna] = val;
  getTabela().row($("#inputEdit").parent().parent()[0]).data(row.data());
  alerta(`Item de número <strong>${ row.data()[0] }</strong> editado!`, 'info', '#con');

  adcionarEditados(false, row.index(), coluna, val, row.data()[0]);
}

//Função para pegar o valor da tabela da modal
function editar(val){
  $("#inputEdit").parent().text(val);
  $('#search').prop('disabled', true);

  var row = $('#achei table').children('tr:has(#inputEdit)').index();
  var coluna = $('#achei table tr').children('td:has(#inputEdit)').index();
  adcionarEditados(false, row, coluna, val, $('#achei table tr').children()[0].innerText);
}

//Remove a linha selecionada da tabela
function remove(){
  if(!getTabela().row('.selected').length) return;
  if(!confirm('Deseja mesmo excluir a linha selecionada?')) return;

  alerta(`Item de número <strong>${ getTabela().row('.selected').data()[0] }</strong> deletado!`, 'warning', '#con');
  let row = getTabela().row('.selected');
  adcionarEditados(true, row.index(), 0, 0, row.data()[0]);
  row.remove().draw(false);
}

//Adciona no array de linhas editadas
function adcionarEditados(del, row, col, data, id){
  for(v of editados){
    if(v.row == row && v.col == col){
      v.del = del;
      v.data = data;
      return;
    }
  };
  editados.push({'id': id, 'row': row, 'col': col, 'del': del, 'data': data});
}

function getEditados(){
  return editados;
}
