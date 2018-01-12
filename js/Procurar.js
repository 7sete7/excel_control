$(document).ready(function() {
  $(document).on('click', '#botaoNav', abrir);
  $(document).on('keypress', '#search', procurar)
});

function abrir(){
  $('#searchModal').modal();
}

function procurar(e) {
  let content;
  let data = [];
  let rows = [];

  if(e.keyCode == 13){
    $('#achei table').html(' ');
    content = $(this).val();
    if(!content) return;

    var tabela = getTabela()['#tabela1'];
    tabela.rows()[0].forEach(function(v){
      rows.push(tabela.row(v).data());
    });

    for(linha of rows){
      for(dado of linha){
        if(dado.toString().toUpperCase().includes(content.toUpperCase())){
          data.push(linha);
          break;
        }
      }
    }

    $('#achei table').append(
      data.map(function(a){
        return `
        <tr>
        ${ a.map(function(b){
          return `<td>${ b }</td>`;
        }).join(' ') }
        </tr>`;
      }).join(' ')
    );

  }
}
