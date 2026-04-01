function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Painel Gestão EJC')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Retorna os dados da planilha para a tabela do painel
function buscarFichas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Fichas') || ss.insertSheet('Fichas');
  const dados = sheet.getDataRange().getValues();
  
  if (dados.length <= 1) return [];
  
  const cabecalho = dados.shift(); 
  return dados.map(linha => ({
    id: linha[0],
    nome: linha[1],
    cpf: linha[2],
    bairro: linha[3]
  }));
}

// Salva nova ficha com trava de CPF
function salvarFicha(obj) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Fichas');
  const dados = sheet.getDataRange().getValues();
  const cpfLimpo = obj.cpf.replace(/\D/g, '');

  // Validação de CPF único
  for (let i = 1; i < dados.length; i++) {
    if (dados[i][2].toString() === cpfLimpo) {
      throw new Error("Este CPF já está cadastrado!");
    }
  }

  const novoId = new Date().getTime(); // Gera ID único
  sheet.appendRow([novoId, obj.nome, cpfLimpo, obj.bairro, new Date()]);
  return "Cadastrado com sucesso!";
}

// Função para Deletar
function deletarFicha(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Fichas');
  const dados = sheet.getDataRange().getValues();

  for (let i = 0; i < dados.length; i++) {
    if (dados[i][0].toString() === id.toString()) {
      sheet.deleteRow(i + 1);
      return "Ficha excluída com sucesso.";
    }
  }
  throw new Error("Ficha não encontrada.");
}
