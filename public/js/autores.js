function displayAutor(autores) {
    const tbody = document.getElementById("listaAutor");
    tbody.innerHTML = ""; // Limpar a tabela

    autores.forEach(autor => {
        const row = tbody.insertRow();

        const nomeCell = row.insertCell(0);
        nomeCell.textContent = autor.nome;

        const biografiaCell = row.insertCell(1);
        biografiaCell.textContent = autor.biografia;

        const dataCell = row.insertCell(2);
        dataCell.textContent = new Date(autor.dataNascimento).toLocaleDateString();

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button class="icon-btn" onclick='editarAutor(${JSON.stringify(autor)})'>
        <i class="fas fa-edit"></i> Editar
    </button>
    <button class="icon-btn" onclick="deleteAutor(${autor.id})">
    <i class="fas fa-trash"></i> Excluir
    </button>`;
    });
}

function fetchAutor() {
    fetch("/api/autores")
        .then(res => res.json())
        .then(data => {
            displayAutor(data);
        })
        .catch(error => {
            console.error("Erro ao buscar Autor:", error);
        });
}

function deleteAutor(id) {
    fetch(`/api/autores/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        fetchAutor();
    })
    .catch(error => {
        console.error("Erro ao deletar Autor:", error);
    });
}

function editarAutor(autor) {
    const addBookBtn = document.getElementById("addBookBtn");
    const nome = document.getElementById("nome");
    const biografia = document.getElementById("biografia");
    const dataNascimento = document.getElementById("dataNascimento");
    const autorId= document.getElementById("id_autor");
    nome.value = autor.nome;
    biografia.value = autor.biografia;
    dataNascimento.value = new Date(autor.dataNascimento).toISOString().split('T')[0];
    autorId.value = autor.id;
    addBookBtn.click();
/**/
}

function limparFormulario(){
    const titulo = document.getElementById("nome");
    const autor = document.getElementById("biografia");
    const dataPublicacao = document.getElementById("dataNascimento");
    const livroId= document.getElementById("id_autor");

    titulo.value = "";
    autor.value = "";
    dataPublicacao.value = "";
    livroId.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "/api/autores";
    const bookForm = document.getElementById("bookForm");
    const bookPopup = document.getElementById("bookPopup");
    const addBookBtn = document.getElementById("addBookBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Carregar livros ao carregar a página
    fetchAutor()

    // Mostrar popup ao clicar no botão "Adicionar Livro"
    addBookBtn.addEventListener("click", function() {
        bookPopup.classList.add("show");
        bookPopup.classList.remove("hidden");
    });

    // Fechar popup
    closePopupBtn.addEventListener("click", function() {
        bookPopup.classList.add("hidden");
        bookPopup.classList.remove("show");
        limparFormulario();
    });

    // Adicionar novo livro ou atualizar um existente
    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const biografia = document.getElementById("biografia").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const autorId= document.getElementById("id_autor").value;

        let methodSalvar = "POST";
        let apiUrlSalvar = apiUrl;
        if(autorId != "" && autorId > 0){
            methodSalvar = "PUT";
            apiUrlSalvar += "/" + autorId;
        }
    
        fetch(apiUrlSalvar, {
            method: methodSalvar,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, biografia, dataNascimento})
        })
        .then(res => {
            if (res.ok && res.status == "201") return res.json();
            else if (res.ok && res.status == "204") return;
            throw new Error(res.statusText);
        })
        .then(data => {
            fetchAutor();
            limparFormulario();
            closePopupBtn.click();
        })
        .catch(error => {
            console.error("Erro ao adicionar/atualizar autor:", error);
        });
    
    });
});
