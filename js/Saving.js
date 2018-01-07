$(document).ready(function() {
  $('#salvar').on('click', salvar);
});

//Pega as tabelas e chama a função gerar excel
function salvar() {
  var tabelas = $('table');

  if (tabelas.length == 0) {
    alert("Sem tabelas");
    return;
  }

  gerarExcel(tabelas);
}

/*
* Faz todo o processo para gerar o excel
* Cria o objeto arquivo que possui:
*      - um array com o nome das planilhas,
*      - e outro objeto com os dados cuja chave é o nome da planilha
*
* Pega os nomes das planilhas da função declarada em AddArquivo.js - linha 133
* e coloca no array dos nomes
*
* Converte cada tabela em um workbook excel e guarda na variavel dados
* Pega os dados e coloca no objeto Sheets do arquivo
*
* Cria uma variavel blob com o arquivo passando pelo pre-processo - linha 50
*
* Salva o arquivo usando a biblioteca FileSaver
*/
function gerarExcel(tabelas) {
  var arquivo = {
    SheetNames: [],
    Sheets: {}
  }

  arquivo.SheetNames = getNomePlanilhas();
  tabelas.each(function(i) {
    var dados = XLSX.utils.table_to_book($(this)[0]);
    arquivo.Sheets[arquivo.SheetNames[i]] = dados['Sheets']['Sheet1'];
  });

  var blob = new Blob(
    [preProcesso(XLSX.write(arquivo, {bookType: 'xlsx', type: 'binary'}))],
    { type: "application/octet-stream" }
  );
  saveAs(blob, document.title + '.xlsx');
}

//Pré-processa o arquivo antes de criar -- Não sei o que faz
function preProcesso(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
