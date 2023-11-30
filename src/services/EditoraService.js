const pool = require('../config/database');

async function listarEditoras() {
    const [results] = await pool.query('SELECT * FROM editoras');
    return results;
}

async function adicionarEditora(editora) {
    const { nome, endereco, telefone } = editora;
    console.log(editora)
    const [results] = await pool.query('INSERT INTO editoras (nome, endereco, telefone) VALUES (?, ?, ?)', [nome, endereco,telefone]);
    return results.insertId;
}

async function atualizarEditora(id, editora) {
    const { nome, endereco, telefone } = editora;
    await pool.query('UPDATE editoras SET nome = ?, endereco = ?, telefone = ? WHERE id = ?', [nome, endereco, telefone, id]);
}

async function deletarEditora(id) {
    await pool.query('DELETE FROM editoras WHERE id = ?', [id]);
}

module.exports = {
    listarEditoras,
    adicionarEditora,
    atualizarEditora,
    deletarEditora
};