// =======================================
// dashboard.js - InfraSmart
// Painel Dashboard
// =======================================


// ===============================
// DADOS INICIAIS
// ===============================
let totalInfra = 25;
let alertas = 4;
let criticos = 1;


// ===============================
// AO CARREGAR
// ===============================
window.onload = function () {
    atualizarCards();
    atualizarHora();
    iniciarAtualizacaoAutomatica();
};


// ===============================
// ATUALIZAR CARDS
// ===============================
function atualizarCards() {

    document.getElementById("totalInfra").innerText = totalInfra;
    document.getElementById("totalAlertas").innerText = alertas;
    document.getElementById("totalCriticos").innerText = criticos;

    const status = document.getElementById("statusSistema");

    if (criticos > 0) {
        status.innerText = "Crítico";
        status.className = "vermelho";
        return;
    }

    if (alertas > 0) {
        status.innerText = "Atenção";
        status.className = "amarelo";
        return;
    }

    status.innerText = "Normal";
    status.className = "verde";
}


// ===============================
// RELÓGIO
// ===============================
function atualizarHora() {

    const agora = new Date();

    const hora =
        agora.getHours().toString().padStart(2, "0") +
        ":" +
        agora.getMinutes().toString().padStart(2, "0") +
        ":" +
        agora.getSeconds().toString().padStart(2, "0");

    document.getElementById("horaAtual").innerText = hora;
}


// ===============================
// SIMULAÇÃO DE ALERTAS
// ===============================
function simularSistema() {

    totalInfra = 20 + Math.floor(Math.random() * 10);

    alertas = Math.floor(Math.random() * 6);

    criticos = Math.floor(Math.random() * 3);

    atualizarCards();
}


// ===============================
// AUTO UPDATE
// ===============================
function iniciarAtualizacaoAutomatica() {

    setInterval(() => {
        atualizarHora();
    }, 1000);


    setInterval(() => {
        simularSistema();
    }, 5000);
}


// ===============================
// BOTÃO MANUAL
// ===============================
function atualizarAgora() {
    simularSistema();
}