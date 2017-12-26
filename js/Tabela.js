var tabela;
var colunas = localStorage.setItem("colunas", 2);

function adcionarRow(array, botarV) {
  tabela = tabelar();

  for (var i = 0; i < array.length; i += 2) {
    if (botarV)
      tabela.row.add([array[i].v, array[i + 1].v]).draw();
    else
      tabela.row.add([array[i], array[i + 1]]).draw();
  }
  return tabela;
}

function tabelar() {
  if (!$.fn.dataTable.isDataTable($("#tabela"))) {
    tabela = $('#tabela').DataTable({
      dom: 'Bfrtip',
      buttons : [
        {
          extend: 'excel',
          text: 'Gerar excel',
          title: null
        }
      ]
    });
  }
  return tabela;
}

function reiniciarTabela() {
  if ($.fn.dataTable.isDataTable($("#tabela"))) {
    tabela.destroy();
    return tabelar();
  }
}
