var tabela;
var colunas = localStorage.setItem("colunas", 2);

//Adciona novas rows na tabela
function adcionarRow(array, botarV ,id) {
  tabela = tabelar(id);

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
  if (!$.fn.dataTable.isDataTable($(id))) {
    tabela = $(id).DataTable({
      dom: 'frtip'
    });
  }
  return tabela;
}

//Reinicia o data table, não utilizado
function reiniciarTabela() {
  if ($.fn.dataTable.isDataTable($("#tabela"))) {
    tabela.destroy();
    return tabelar();
  }
}
