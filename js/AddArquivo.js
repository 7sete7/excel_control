var nomePlanilhas = [];
var reader = new FileReader();
var tabela;
var header = [];

$(document).ready(function() {
  $('#nav-brand').text(document.title);
  $("#inputFile").change(lerArquivo);
});

//Pega o arquivo xlsx
function lerArquivo() {
  var todoXls;
  var gal = {};
  var content = document.getElementById('inputFile').files[0];
  reader.onload = function(e) {

    var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    todoXls = XLSX.read(binary, {
      type: 'binary'
    });

    sheetName = "DADOS - PENDANT_KANBAN_PPS";
    nomePlanilhas.push(sheetName);
    var s = todoXls.Sheets[sheetName];

    pegarDados(s);
  }

  reader.readAsArrayBuffer(content);
}

//Separa os headers do corpo pegando a primeira linha (ex: A1, B6, H13)
function pegarDados(res) {
  var corpo = {};

  var range = XLSX.utils.decode_range("B16:K25");
  for(var R = range.s.r; R <= range.e.r; ++R) {
    for(var C = range.s.c; C <= range.e.c; ++C) {
      var coord = XLSX.utils.encode_cell({r:R,c:C});
      if(!res[coord])
        res[coord] = "--";
    }
  }

  Object.keys(res).forEach(function(k) {
    if (k.match("^(B|C|D|E|K)16$"))
      header.push(res[k]);
    //else if(k.match("^(B|C|D|E|K)(1[7-9]|[2-9][0-9]|[1-9][0-9][0-9])$")){
    else if(k.match("^(B|C|D|E|K)(1[7-9]|2[0-5])$")){
      corpo[k.substring(k.search('[1-9]'))] ?
      corpo[k.substring(k.search('[1-9]'))].push(res[k].v !== undefined ? res[k].v : "--") :
      corpo[k.substring(k.search('[1-9]'))] = [res[k].v !== undefined ? res[k].v : "--"];
    }
  });
  var id = gerarTabela(header);
  adcionarNaTabela(header, corpo, id);
}

//Bota na tabela
function adcionarNaTabela(header, corpo, id) {
    if (!$(id).has("thead tr").length) {
      $(id + ' thead').html(`
            <tr>
              ${ adcionarHeader(header) }
            </tr>
          `);
    }
    tabela = adcionarRowObjeto(corpo, id);
}

function adcionarHeader(header) {
  var texto = "";

  for (var i = 0; i < header.length; i++) {
    texto += `<td>${ header[i].v }</td>`;
  }
  return texto;
}

function gerarTabela(header) {
  //id = "tabela" + ($("table").length + 1);
  id = "tabela1"
  $("#main").append(`
    <br><br><br>
    <div id="div-${id}">
      <table id="${id}" class="table table-striped table-hover table-bordered display">
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
    `);
  $('#linkAdd').removeClass('disabled');
  return ("#" + id);
}

function getNomePlanilhas() {
  return nomePlanilhas;
}

function getHeaders(){
  return header;
}
