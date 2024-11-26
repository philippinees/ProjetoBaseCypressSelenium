const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const loginUsuario = require('../cypress.env.json').usuario.login
const totalTimeData = JSON.parse(fs.readFileSync('./gerenciaScripts/tempo.json', 'utf-8'));
var today = new Date();
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
var time = today.getHours() + "h" + today.getMinutes() + "m" + today.getSeconds() + "s";
var dateTime = date+' às '+time;

report.generate({
	jsonDir: "./reports/json/",
	reportPath: "./reports/report-html/",
  pageTitle: "Relatório Teste Automatizados",
  reportName: "Relatório de testes -  Projeto de Testes Automatizados",
  pageFooter: "<div><center></br></br><p>Relatório de testes automatizados</p></br></br></center></div>",
  launchReport: true,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  displayDuration: true,
	metadata:{
        platform: {
            name: 'Windows',
        },
    },
    customData: {
        title: 'Informações',
        data: [
            {label: 'Projeto', value: 'Sisprev Web'},
            {label: 'Teste', value: 'Teste Funcional'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Executado dia ', value: dateTime},
            {label: 'Usuário', value: loginUsuario},
            {label: 'Tempo Total de Execução', value: `${totalTimeData.diferencaEmMinutos}m:${totalTimeData.diferencaEmSegundos}s`},
        
        ]
    }
});

