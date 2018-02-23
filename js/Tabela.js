var dataTabelas = {};
var keys = [];

//Adciona rows na tabela usando um objeto
function adcionarRowObjeto(objeto){
  let tabela = tabelar();
  for(k in objeto){
    tabela.row.add(objeto[k]).draw();
  };
  return tabela;
}

/**
* @param array: Array - O array com dados a ser adcionado.
* @param id: String - O id da tabela que vai ser adcionado.
* Adciona novas rows na tabela usando a prórpia ordenação do array.
* Gera array de arrays.
* @return tabela: Objeto dataTable - A instância datatable da tabela.
* @return node: Node html - O node html da linha adcionada.
*/
function adcionarRow(array, id) {
  var tabela = tabelar(id);
  let headers = $(id).children('thead').children('tr').children().length;
  let obj = [];

  for (var i = 0; i < array.length; i ++) {
  	if(!obj.length) {obj.push([array[i]]); continue;}
  	if(obj[obj.length - 1].length == headers){
  		obj.push([
        array[i] !== undefined ? array[i] : "--"
      ]);
  	}
  	else{
  		obj[obj.length - 1].push(
        array[i] !== undefined ? array[i] : "--"
      );
  	}
  }
  var node = tabela.rows.add(obj).draw().nodes();

  return {tabela, node};
}

//Cria o data Table
function tabelar() {
  var tabela;
  var id = '#tabela1';
  if (!$.fn.dataTable.isDataTable($(id))) {
    tabela = $(id).DataTable({
      dom: 'frtip',
      'pageLength': 30
    });
    dataTabelas[id] = tabela;
    botao();
  }
  getTabela().column(0).nodes().to$().off('click');
  return dataTabelas[id];
}

function botao(){
  $('#tabela1_wrapper').prepend(`
    <button id="remove" class="btn btn-danger" title="Remover linha" style="margin-bottom: 3.5px">Remover</button>
  `);
}

function getTabela() {
  return dataTabelas['#tabela1'];
}
