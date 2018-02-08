var nomePlanilhas = [];
var reader = new FileReader();
var tabela;
var header = [];
var load;
var todoXls;
var corpo = {};

$(document).ready(function() {
  $("#inputFile").change(aFuncao);
});

// Chama o loading trevoso
function aFuncao() {
  new Promise((resolve, reject) => { resolve(abrirLoading('Carregando', 'sm', 'warning') )})
  .then(function(l) {
	load = l;
	setTimeout(lerArquivo, 300);
  })
  .catch((l) => {console.log("Deu ruim mulesk")});
}

//Lê o arquivo e faz os paranaue
function lerArquivo(){
  var content = document.getElementById('inputFile').files[0];
  let worker = setWorker();
  reader.onload = function(e) {
    var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    worker.postMessage({
      'binary': binary,
      'url': document.location.toString().substring(0, document.location.toString().lastIndexOf('/'))
    });
  }

  reader.readAsArrayBuffer(content);
}

// Seta os handlers pro worker
function setWorker() {
  let blob = new Blob(['('+ worker_function.toString() +')()'], {type: 'text/javascript'});
  let worker = new Worker(window.URL.createObjectURL(blob));

  worker.onmessage = function(e){
    let sheetName = "DADOS - PENDANT_KANBAN_PPS";
    nomePlanilhas.push(sheetName);
    var s = e.data.Sheets[sheetName];
    pegarDados(s);
  }

  return worker;
}

//Separa os headers do corpo pegando as linhas (ex: A1, B6, H13)
function pegarDados(res) {
  var range = XLSX.utils.decode_range("B16:K25");
  for(var R = range.s.r; R <= range.e.r; ++R) {
    for(var C = range.s.c; C <= range.e.c; ++C) {
      var coord = XLSX.utils.encode_cell({r:R,c:C});
      if(!res[coord])
        res[coord] = "--";
    }
  }

  for(k in res){
    if (k.match("^(B|C|D|E|J|K)16$"))
      header.push(res[k]);
    //else if(k.match("^(B|C|D|E|J|K)(1[7-9]|[2-9][0-9]|[1-9][0-9][0-9])$")){
    else if(k.match("^(B|C|D|E|J|K)(1[7-9]|2[0-5])$")){
      corpo[k.substring(k.search('[1-9]'))] ?
      corpo[k.substring(k.search('[1-9]'))].push(res[k].v !== undefined ? res[k].v : "--") :
      corpo[k.substring(k.search('[1-9]'))] = [res[k].v !== undefined ? res[k].v : "--"];
    }
  }
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
  tabela = adcionarRowObjeto(corpo);
  load.modal('hide');
}

function adcionarHeader(header) {
  var texto = "";

  for (var i = 0; i < header.length; i++) {
    texto += `<td>${ header[i].v }</td>`;
  }
  return texto;
}

function gerarTabela(header) {
  id = "tabela1";
  $("#main").append(`
    <br><br><br>
    <div id="div-${id}">
      <table id="${id}" class="table table-striped table-hover table-bordered display">
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
    `);

  removeDisabled();
  return ("#" + id);
}

function getNomePlanilhas() {
  return nomePlanilhas;
}

function getHeaders(){
  return header;
}

function getCorpo(){
  return corpo;
}

function getXls(){
  return todoXls;
}
