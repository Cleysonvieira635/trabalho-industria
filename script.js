// ==========================================
// InfraSmart - script.js
// ==========================================


// ===============================
// ABRIR LOGIN
// ===============================
function abrirLogin() {
    document
        .getElementById("loginModal")
        .classList.remove("hidden");
}


// ===============================
// FECHAR LOGIN
// ===============================
function fecharLogin() {
    document
        .getElementById("loginModal")
        .classList.add("hidden");
}


// ===============================
// ABRIR CADASTRO
// ===============================
function abrirCadastro() {
    document
        .getElementById("cadastroModal")
        .classList.remove("hidden");
}


// ===============================
// FECHAR CADASTRO
// ===============================
function fecharCadastro() {
    document
        .getElementById("cadastroModal")
        .classList.add("hidden");
}


// ===============================
// CADASTRAR USUÁRIO
// ===============================
function cadastrarUsuario() {

    const nome =
        document.getElementById("nomeCadastro").value.trim();

    const email =
        document.getElementById("emailCadastro").value.trim();

    const senha =
        document.getElementById("senhaCadastro").value.trim();

    if (nome === "" || email === "" || senha === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    localStorage.setItem(
        "usuarioInfraSmart",
        JSON.stringify(usuario)
    );

    alert("Cadastro realizado com sucesso!");

    fecharCadastro();

    document.getElementById("nomeCadastro").value = "";
    document.getElementById("emailCadastro").value = "";
    document.getElementById("senhaCadastro").value = "";
}


// ===============================
// LOGIN
// ===============================
function entrarSistema() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const senha =
        document.getElementById("loginSenha").value.trim();

    const dados =
        localStorage.getItem("usuarioInfraSmart");

    if (!dados) {
        alert("Nenhum usuário cadastrado.");
        return;
    }

    const usuario = JSON.parse(dados);

    if (
        email === usuario.email &&
        senha === usuario.senha
    ) {

        localStorage.setItem(
            "logadoInfraSmart",
            "true"
        );

        alert("Login realizado com sucesso!");

        window.location.href =
            "dashboard.html";

    } else {

        alert("Email ou senha inválidos.");
    }
}


// ===============================
// FECHAR MODAL AO CLICAR FORA
// ===============================
window.onclick = function (event) {

    const login =
        document.getElementById("loginModal");

    const cadastro =
        document.getElementById("cadastroModal");

    if (event.target === login) {
        fecharLogin();
    }

    if (event.target === cadastro) {
        fecharCadastro();
    }
};


// ===============================
// ROLAGEM SUAVE MENU
// ===============================
document.querySelectorAll(".menu-nav a")
.forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const destino =
            document.querySelector(
                this.getAttribute("href")
            );

        destino.scrollIntoView({
            behavior: "smooth"
        });

    });

});