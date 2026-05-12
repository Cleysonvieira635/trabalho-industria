// ==========================================
// InfraSmart - infraestrutura.js
// ==========================================


// ===============================
// BANCO LOCAL
// ===============================
let infraestruturas = [
    {
        id: 1,
        nome: "Ponte Central",
        tipo: "Ponte",
        local: "Centro",
        status: "Ativa"
    },
    {
        id: 2,
        nome: "Hospital Municipal",
        tipo: "Hospital",
        local: "Zona Sul",
        status: "Manutenção"
    },
    {
        id: 3,
        nome: "Viaduto Norte",
        tipo: "Viaduto",
        local: "Zona Norte",
        status: "Crítica"
    }
];

let editandoId = null;


// ===============================
// INICIAR
// ===============================
window.onload = function () {
    listarInfra();
    atualizarCards();
};


// ===============================
// LISTAR
// ===============================
function listarInfra(lista = infraestruturas) {

    const tbody = document.getElementById("listaInfra");
    tbody.innerHTML = "";

    lista.forEach(item => {

        const classe = item.status
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.tipo}</td>
                <td>${item.local}</td>
                <td>
                    <span class="status ${classe}">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <button class="btn-editar"
                        onclick="editarInfra(${item.id})">
                        Editar
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirInfra(${item.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// CARDS
// ===============================
function atualizarCards() {

    const total = infraestruturas.length;

    const ativas = infraestruturas.filter(
        item => item.status === "Ativa"
    ).length;

    const manutencao = infraestruturas.filter(
        item => item.status === "Manutenção"
    ).length;

    const criticas = infraestruturas.filter(
        item => item.status === "Crítica"
    ).length;

    document.getElementById("totalInfra").innerText = total;
    document.getElementById("ativas").innerText = ativas;
    document.getElementById("manutencao").innerText = manutencao;
    document.getElementById("criticas").innerText = criticas;
}


// ===============================
// MODAL
// ===============================
function abrirModal() {

    limparCampos();

    editandoId = null;

    document
        .getElementById("modalInfra")
        .classList.remove("hidden");
}

function fecharModal() {

    document
        .getElementById("modalInfra")
        .classList.add("hidden");
}


// ===============================
// LIMPAR
// ===============================
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("local").value = "";
    document.getElementById("status").value = "Ativa";
}


// ===============================
// SALVAR
// ===============================
function salvarInfra() {

    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const local = document.getElementById("local").value.trim();
    const status = document.getElementById("status").value;

    if (!nome || !tipo || !local) {
        alert("Preencha todos os campos.");
        return;
    }

    if (editandoId === null) {

        const novo = {
            id: Date.now(),
            nome,
            tipo,
            local,
            status
        };

        infraestruturas.push(novo);

    } else {

        const item = infraestruturas.find(
            x => x.id === editandoId
        );

        item.nome = nome;
        item.tipo = tipo;
        item.local = local;
        item.status = status;
    }

    listarInfra();
    atualizarCards();
    fecharModal();
}


// ===============================
// EDITAR
// ===============================
function editarInfra(id) {

    const item = infraestruturas.find(
        x => x.id === id
    );

    editandoId = id;

    document.getElementById("nome").value = item.nome;
    document.getElementById("tipo").value = item.tipo;
    document.getElementById("local").value = item.local;
    document.getElementById("status").value = item.status;

    document
        .getElementById("modalInfra")
        .classList.remove("hidden");
}


// ===============================
// EXCLUIR
// ===============================
function excluirInfra(id) {

    if (!confirm("Deseja excluir?")) return;

    infraestruturas = infraestruturas.filter(
        item => item.id !== id
    );

    listarInfra();
    atualizarCards();
}


// ===============================
// FILTRAR
// ===============================
function filtrarInfra() {

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const status = document
        .getElementById("statusFiltro")
        .value;

    let lista = infraestruturas.filter(item =>
        item.nome.toLowerCase().includes(texto) ||
        item.tipo.toLowerCase().includes(texto) ||
        item.local.toLowerCase().includes(texto)
    );

    if (status !== "") {
        lista = lista.filter(
            item => item.status === status
        );
    }

    listarInfra(lista);
}