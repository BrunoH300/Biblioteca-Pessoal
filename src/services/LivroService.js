const pool = require('../config/database');


async function listarLivros() {
    const [results] = await pool.query('SELECT * FROM livros');
    return results;
}

async function adicionarLivro(livro) {
    const { titulo, autor, editora,  dataPublicacao } = livro;
    const [results] = await pool.query('INSERT INTO livros (titulo, dataPublicacao, id_autor, id_editora ) VALUES (?, ?, ?, ?)', [titulo, dataPublicacao, autor, editora]);
    return results.insertId;

    
}

async function atualizarLivro(id, livro) {
    const { titulo, autor, editora, dataPublicacao } = livro;
    await pool.query('UPDATE livros SET titulo = ?, dataPublicacao = ? , id_autor = ?, id_editora = ? WHERE id = ?', [titulo, dataPublicacao, autor, editora , id]);
}

async function deletarLivro(id) {
    await pool.query('DELETE FROM livros WHERE id = ?', [id]);
}

module.exports = {
    listarLivros,
    adicionarLivro,
    atualizarLivro,
    deletarLivro
};