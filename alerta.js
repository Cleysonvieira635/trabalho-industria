// ==========================================
// InfraSmart - alerta.js
// ==========================================


// ===============================
// BASE DE DADOS LOCAL
// ===============================
let alertas = [
    {
        id: 1,
        infraestrutura: "Ponte Central",
        descricao: "Vibração acima do normal",
        nivel: "Crítico",
        status: "Ativo"
    },
    {
        id: 2,
        infraestrutura: "Hospital Municipal",
        descricao: "Temperatura elevada",
        nivel: "Médio",
        status: "Ativo"
    },
    {
        id: 3,
        infraestrutura: "Viaduto Norte",
        descricao: "Sensor offline",
        nivel: "Baixo",
        status: "Resolvido"
    }
];


// ===============================
// INICIAR
// ===============================
window.onload = function () {
    listarAlertas();
    atualizarCards();
};


// ===============================
// LISTAR ALERTAS
// ===============================
function listarAlertas(lista = alertas) {

    const tbody = document.getElementById("listaAlertas");
    tbody.innerHTML = "";

    lista.forEach(item => {

        const nivelClasse = item.nivel
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const statusClasse = item.status
            .toLowerCase();

        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.infraestrutura}</td>
                <td>${item.descricao}</td>

                <td>
                    <span class="nivel ${nivelClasse}">
                        ${item.nivel}
                    </span>
                </td>

                <td>
                    <span class="status ${statusClasse}">
                        ${item.status}
                    </span>
                </td>

                <td>
                    <button class="btn-resolver"
                        onclick="resolverAlerta(${item.id})">
                        Resolver
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirAlerta(${item.id})">
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

    const criticos = alertas.filter(
        item => item.nivel === "Crítico"
    ).length;

    const medios = alertas.filter(
        item => item.nivel === "Médio"
    ).length;

    const total = alertas.length;

    const resolvidos = alertas.filter(
        item => item.status === "Resolvido"
    ).length;

    document.getElementById("criticos").innerText = criticos;
    document.getElementById("medios").innerText = medios;
    document.getElementById("totalAlertas").innerText = total;
    document.getElementById("resolvidos").innerText = resolvidos;
}


// ===============================
// GERAR ALERTA
// ===============================
function gerarAlerta() {

    const nomes = [
        "Escola Central",
        "Ponte Sul",
        "Hospital Norte",
        "Viaduto Leste"
    ];

    const descricoes = [
        "Sensor desconectado",
        "Movimento anormal",
        "Temperatura elevada",
        "Falha estrutural"
    ];

    const niveis = [
        "Crítico",
        "Médio",
        "Baixo"
    ];

    const novo = {
        id: Date.now(),
        infraestrutura:
            nomes[Math.floor(Math.random() * nomes.length)],

        descricao:
            descricoes[Math.floor(Math.random() * descricoes.length)],

        nivel:
            niveis[Math.floor(Math.random() * niveis.length)],

        status: "Ativo"
    };

    alertas.unshift(novo);

    listarAlertas();
    atualizarCards();
}


// ===============================
// RESOLVER
// ===============================
function resolverAlerta(id) {

    const item = alertas.find(
        x => x.id === id
    );

    if (item) {
        item.status = "Resolvido";
    }

    listarAlertas();
    atualizarCards();
}


// ===============================
// EXCLUIR
// ===============================
function excluirAlerta(id) {

    if (!confirm("Deseja excluir o alerta?"))
        return;

    alertas = alertas.filter(
        item => item.id !== id
    );

    listarAlertas();
    atualizarCards();
}


// ===============================
// FILTRAR
// ===============================
function filtrarAlertas() {

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const nivel = document
        .getElementById("filtroNivel")
        .value;

    let lista = alertas.filter(item =>
        item.infraestrutura
            .toLowerCase()
            .includes(texto) ||

        item.descricao
            .toLowerCase()
            .includes(texto)
    );

    if (nivel !== "") {
        lista = lista.filter(
            item => item.nivel === nivel
        );
    }

    listarAlertas(lista);
}