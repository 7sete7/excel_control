$(document).ready(function() {
  $(document).on('click', '#linkProcurar', abrir);
  $(document).on('keypress', '#search', procurar);
  $(document).on('click', '#salvarSearch', salvarAlteracoes);
  $(document).on('click', '#cancel', cancelar);
});

function abrir(){
  if($(this).hasClass('disabled')) return;
  $('#searchModal').modal();
}

//Procura o item na tabela e coloca na modal
function procurar(e) {
  if(e.keyCode != 13) return;

  let content;

  $('#achei table').html(' ');
  content = $(this).val();
  if(!content) return;

  let data = procurarNaTabela(content, -1, false);

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

//Salva as alterações feito no procurar
function salvarAlteracoes(){
  $('#search').prop('disabled', false);
  var dados = $('#achei table').find('tr');

  for(linha of dados){
    var id = $(linha).children('td')[0].innerText;
    getTabela().column(0).data().each(function(v, i){
      if(v == id){
        var tudo = [];
        for(item of $(linha).children()){ tudo.push(item.innerText); }
        getTabela().row(i).data(tudo);
      }
    });
  }
}

function cancelar(){
  $('#searchModal').modal('hide');
  $('#achei table').html(' ');
  $('#search').prop('disabled', false);
}
