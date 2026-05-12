// ==========================================
// InfraSmart - configuracoes.js (Melhorado)
// ==========================================

// ===============================
// CONFIG PADRÃO
// ===============================
const CONFIG_PADRAO = {
    empresa: "InfraSmart LTDA",
    email: "admin@infrasmart.com",
    modo: "Escuro",
    alertaEmail: "Sim",
    autoUpdate: "Ativado"
};

// ===============================
// INICIAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    carregarConfiguracoes();
    verificarSistema();
});

// ===============================
// UTIL
// ===============================
function get(id) {
    return document.getElementById(id);
}

// ===============================
// CARREGAR DADOS
// ===============================
function carregarConfiguracoes() {
    Object.keys(CONFIG_PADRAO).forEach(chave => {
        const valor = localStorage.getItem(chave) || CONFIG_PADRAO[chave];
        get(chave).value = valor;

        if (chave === "modo") {
            aplicarTema(valor);
        }
    });
}

// ===============================
// SALVAR
// ===============================
function salvarConfiguracoes() {
    Object.keys(CONFIG_PADRAO).forEach(chave => {
        const valor = get(chave).value;
        localStorage.setItem(chave, valor);

        if (chave === "modo") {
            aplicarTema(valor);
        }
    });

    alert("Configurações salvas com sucesso!");
}

// ===============================
// TEMA
// ===============================
function aplicarTema(modo) {
    const isClaro = modo === "Claro";

    document.body.style.background = isClaro ? "#f1f5f9" : "#0f172a";
    document.body.style.color = isClaro ? "#111827" : "#ffffff";

    document.querySelectorAll(".box-config, .status-box")
        .forEach(box => {
            box.style.background = isClaro ? "#ffffff" : "#111827";
        });
}

// ===============================
// VERIFICAR SISTEMA
// ===============================
function verificarSistema() {
    document.querySelectorAll(".online")
        .forEach(item => item.innerText = "Online");
}

// ===============================
// EVENTOS
// ===============================
document.addEventListener("change", (e) => {
    if (e.target.id === "modo") {
        aplicarTema(e.target.value);
    }
});