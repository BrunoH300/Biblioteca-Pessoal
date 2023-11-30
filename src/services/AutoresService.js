const pool = require('../config/database');

async function listarAutores() {
    const [results] = await pool.query('SELECT * FROM autores');
    return results;
}

async function adicionarAutores(autor) {
    const { nome, biografia, dataNascimento } = autor;
    const [results] = await pool.query('INSERT INTO autores (nome, biografia, dataNascimento) VALUES (?, ?, ?)', [nome, biografia, dataNascimento]);
    return results.insertId;
}

async function atualizarAutor(id, autor) {
    const { nome, biografia, dataNascimento } = autor;
    await pool.query('UPDATE autores SET nome = ?, biografia = ?, dataNascimento = ? WHERE id = ?', [nome, biografia, dataNascimento,id]);
}

async function deletarAutor(id) {
    await pool.query('DELETE FROM autores WHERE id = ?', [id]);
}

module.exports = {
    listarAutores,
    adicionarAutores,
    atualizarAutor,
    deletarAutor
};