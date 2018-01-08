var dataTabelas = {};

//Adciona novas rows na tabela
function adcionarRow(array, id) {
  var tabela = tabelar(id);
  let headers = $(id).children('thead').children('tr').children().length;
  let obj = [];
  let j = 1;

  for (var i = 0; i < array.length; i ++) {
	if(!obj.length) {obj.push([array[i]]); continue;}
	if(obj[obj.length - 1].length == headers){
		j = 1;
		obj.push([array[i]]);
	}
	else{
		obj[obj.length - 1].push(array[i]);
	}
	j++;
  }
  tabela.rows.add(obj).draw();
  
  return tabela;
}



//Cria o data Table
function tabelar(id) {
  var tabela;
  if (!$.fn.dataTable.isDataTable($(id))) {
    tabela = $(id).DataTable({
      dom: 'frtip',
	  colReorder: true
    });
    dataTabelas[id] = tabela;
  }
  return getTabela(id);
}

function getTabela(id) {
  return dataTabelas[id];
}
