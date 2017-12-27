var dataTabelas = {};
var colunas = localStorage.setItem("colunas", 2);

//Adciona novas rows na tabela
function adcionarRow(array, botarV, id) {
  var tabela = tabelar(id);

  for (var i = 0; i < array.length; i += 2) {
    if (botarV)
      tabela.row.add([array[i].v, array[i + 1].v]).draw();
    else
      tabela.row.add([array[i], array[i + 1]]).draw();
  }
  return tabela;
}

//Cria o data Table
function tabelar(id) {
  var tabela;
  if (!$.fn.dataTable.isDataTable($(id))) {
    tabela = $(id).DataTable({
      dom: 'frtip'
    });
    dataTabelas[id] = tabela;
  }
  return getTabela(id);
}

function getTabela(id) {
  return dataTabelas[id];
}
