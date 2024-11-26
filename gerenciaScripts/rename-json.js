const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')

const oldFilePath = path.join(__dirname, '../cypress/reports/json/cucumber-report.json');


function renameFile(oldFilePath, newFilePath) {
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error(`Erro ao renomear o arquivo: ${err.message}`);
      } else {
        console.log(`Arquivo renomeado de ${oldFilePath} para ${newFilePath}`);
      }
    });
  }

const watcher = chokidar.watch(oldFilePath, {
    persistent: true,
    ignoreInitial: true
})

watcher.on('add', (oldFilePath) => {
    var today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    var dateRelatorio = `${day}-${month}` 
    var timeRelatorio = today.getHours() + "h" + today.getMinutes() + "m" + today.getSeconds() + "s" + today.getMilliseconds() + "ms";
    var dateTimeRelatorio = dateRelatorio+'-'+timeRelatorio;
    var newFilePath = path.join(__dirname, `../reports/json/cucumber-report-${dateTimeRelatorio}.json`);
    console.log(`Novo arquivo detectado: ${oldFilePath}`)
    renameFile(oldFilePath, newFilePath)
})

  console.log(`Monitorando o diretório: ${oldFilePath}`);





