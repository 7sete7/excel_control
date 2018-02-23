
function worker_function(){
  onmessage = function(e){
    importScripts(e.data.url + "/js/Terceiros/xlsx.full.min.js");
    let todoXls = XLSX.read(e.data.binary, {type: 'binary'});
    postMessage(todoXls);
  }
}

function worker_function_save(){
  onmessage = function(e){
    importScripts(e.data.url + "/js/Terceiros/xlsx.full.min.js");
    let blob = XLSX.write(e.data.arquivo, {bookType: 'xlsx', type: 'binary'});
    postMessage(blob);
  }
}
