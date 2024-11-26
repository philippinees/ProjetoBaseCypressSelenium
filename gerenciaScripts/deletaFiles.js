const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../reports/json');

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    if (files.length > 0) {
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
        console.log('Todos os arquivos dentro da pasta /reports/json foram excluídos.');
    } else {
        console.log('Nenhum arquivo encontrado na pasta /reports/json.');
    }
});
