// script.js
const fs = require('fs');
const path = require('path');

const TIME_FILE_PATH = path.join(__dirname, 'tempo.json');

// Função para obter a data e hora atual
function getCurrentTime() {
    return new Date().toISOString();
}

// Função para calcular a diferença em minutos e segundos entre dois tempos
function calcularDiferencaEmMinutosESegundos(inicio, fim) {
    const inicioDate = new Date(inicio);
    const fimDate = new Date(fim);
    const diferencaEmMs = fimDate - inicioDate;
    const diferencaEmSegundos = Math.floor(diferencaEmMs / 1000);
    const minutos = Math.floor(diferencaEmSegundos / 60);
    const segundos = diferencaEmSegundos % 60;
    return { minutos, segundos };
}

// Função para salvar os tempos e a diferença em um arquivo
function salvarTempos(inicio, fim, diferenca) {
    const data = {
        inicio,
        fim,
        diferencaEmMinutos: diferenca.minutos,
        diferencaEmSegundos: diferenca.segundos,
    };
    fs.writeFileSync(TIME_FILE_PATH, JSON.stringify(data, null, 2));
}

// Verifica os argumentos passados para o script
const [,, comando] = process.argv;

if (comando === 'inicio') {
    const inicioTempo = getCurrentTime();
    fs.writeFileSync(TIME_FILE_PATH, JSON.stringify({ inicio: inicioTempo }, null, 2));
    console.log(`Início registrado: ${inicioTempo}`);
} else if (comando === 'fim') {
    const tempos = JSON.parse(fs.readFileSync(TIME_FILE_PATH, 'utf8'));
    const fimTempo = getCurrentTime();
    const diferenca = calcularDiferencaEmMinutosESegundos(tempos.inicio, fimTempo);
    salvarTempos(tempos.inicio, fimTempo, diferenca);
    console.log(`Fim registrado: ${fimTempo}`);
    console.log(`Duração: ${diferenca.minutos} minutos e ${diferenca.segundos} segundos`);
} else {
    console.log('Comando inválido. Use "inicio" ou "fim".');
}
