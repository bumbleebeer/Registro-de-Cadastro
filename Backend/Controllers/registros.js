import { database } from "../database.js";

export const listarRegistros = async (_, resposta) => {
  const consultaSQL = "SELECT * FROM registros";

  try {
    const [empresasEncontradas] = await database.promise().query(consultaSQL);
    resposta.status(200).json(empresasEncontradas); 
  } catch (erroConsultaEmpresas) {
    resposta.status(500).json ({
      mensagem: "Erro ao listar Registro de Empresas !",
      erro: erroConsultaEmpresas,
    })
  }
};

export const cadastrarEmpresa = async (requisicao, resposta) => {
  const consultaSQL = "INSERT INTO registros(`cnpj`, `razao`, `telefone`, `email`) VALUES(?)";
  const values = [
    requisicao.body.cnpj,
    requisicao.body.razao,
    requisicao.body.telefone,
    requisicao.body.email,
  ];

  try {
    await database.promise().query(consultaSQL, [values]);
    resposta.status(200).json({ mensagem: "Empresa cadastrada com sucesso!" });
  } catch (erroAoInserir) {
    resposta.status(500).json({
      mensagem: "Erro ao cadastrar empresa.",
      erro: erroAoInserir,
    });
  }
};

export const editarDados = async (requisicao, resposta) => {
  const consultaSQL = "UPDATE registros SET `cnpj` = ?, `razao` = ?, `telefone` = ?, `email` = ? WHERE `id` = ?";
  const values = [
    requisicao.body.cnpj,
    requisicao.body.razao,
    requisicao.body.telefone,
    requisicao.body.email,
  ];

  try {
    await database.promise().query(consultaSQL, [...values, requisicao.params.id]);
    resposta.status(200).json({ mensagem: "Dados atualizados com sucesso." });
  } catch (erro) {
    resposta.status(500).json({ mensagem: "Erro ao atualizar dados.", erro });
  }
};

export const deletarRegistro = async (requisicao, resposta) => {
  const consultaSQL = "DELETE FROM registros WHERE `id` = ?";

  try {
    await database.promise().query(consultaSQL, [requisicao.params.id]);
    resposta.status(200).json({ mensagem: "Registro removido com sucesso." });
  } catch (erro) {
    resposta.status(500).json({ mensagem: "Erro ao remover empresa.", erro });
  }
};