// ==========================================
// InfraSmart - relatorios.js
// ==========================================


// ===============================
// BASE LOCAL
// ===============================
let relatorios = [
    {
        id: 1,
        nome: "Relatório Mensal",
        tipo: "PDF",
        data: "26/04/2026",
        status: "Concluído"
    },
    {
        id: 2,
        nome: "Infraestruturas Ativas",
        tipo: "Excel",
        data: "26/04/2026",
        status: "Pendente"
    },
    {
        id: 3,
        nome: "Alertas Gerais",
        tipo: "CSV",
        data: "25/04/2026",
        status: "Falha"
    }
];


// ===============================
// INICIAR
// ===============================
window.onload = function () {
    listarRelatorios();
    atualizarCards();
};


// ===============================
// LISTAR
// ===============================
function listarRelatorios(lista = relatorios) {

    const tbody = document.getElementById("listaRelatorios");
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
                <td>${item.data}</td>

                <td>
                    <span class="status ${classe}">
                        ${item.status}
                    </span>
                </td>

                <td>
                    <button class="btn-download"
                        onclick="baixarRelatorio(${item.id})">
                        Baixar
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirRelatorio(${item.id})">
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

    const total = relatorios.length;

    const hoje = relatorios.filter(
        item => item.data === "26/04/2026"
    ).length;

    const pendentes = relatorios.filter(
        item => item.status === "Pendente"
    ).length;

    const falhas = relatorios.filter(
        item => item.status === "Falha"
    ).length;

    document.getElementById("totalRelatorios").innerText = total;
    document.getElementById("hoje").innerText = hoje;
    document.getElementById("pendentes").innerText = pendentes;
    document.getElementById("falhas").innerText = falhas;
}


// ===============================
// GERAR RELATÓRIO
// ===============================
function gerarRelatorio() {

    const nomes = [
        "Relatório Diário",
        "Análise Infraestrutura",
        "Resumo Alertas",
        "Exportação Geral"
    ];

    const tipos = [
        "PDF",
        "Excel",
        "CSV"
    ];

    const novo = {
        id: Date.now(),
        nome: nomes[Math.floor(Math.random() * nomes.length)],
        tipo: tipos[Math.floor(Math.random() * tipos.length)],
        data: "26/04/2026",
        status: "Concluído"
    };

    relatorios.unshift(novo);

    listarRelatorios();
    atualizarCards();
}


// ===============================
// BAIXAR
// ===============================
function baixarRelatorio(id) {

    const item = relatorios.find(
        x => x.id === id
    );

    alert("Download iniciado: " + item.nome);
}


// ===============================
// EXCLUIR
// ===============================
function excluirRelatorio(id) {

    if (!confirm("Deseja excluir relatório?"))
        return;

    relatorios = relatorios.filter(
        item => item.id !== id
    );

    listarRelatorios();
    atualizarCards();
}


// ===============================
// FILTRAR
// ===============================
function filtrarRelatorios() {

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const tipo = document
        .getElementById("filtroTipo")
        .value;

    let lista = relatorios.filter(item =>
        item.nome.toLowerCase().includes(texto)
    );

    if (tipo !== "") {
        lista = lista.filter(
            item => item.tipo === tipo
        );
    }

    listarRelatorios(lista);
}