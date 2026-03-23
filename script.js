import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const btnContent = document.getElementById('btnContent');
const btnLoading = document.getElementById('btnLoading');
const registerBtn = document.getElementById('registerBtn');
const registerContent = document.getElementById('registerContent');
const registerLoading = document.getElementById('registerLoading');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Preencha todos os campos");
    return;
  }

  // Loading
  submitBtn.disabled = true;
  btnContent.style.display = 'none';
  btnLoading.style.display = 'block';

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      // Sucesso
      alert("✅ Login realizado com sucesso!");

      console.log(userCredential.user);

      // Redireciona (opcional)
      // window.location.href = "home.html";

    })
    .catch((error) => {

      let mensagem = "Erro ao logar";

      if (error.code === "auth/user-not-found") {
        mensagem = "Usuário não existe";
      } else if (error.code === "auth/wrong-password") {
        mensagem = "Senha incorreta";
      }

      alert("❌ " + mensagem);
    })
    .finally(() => {
      submitBtn.disabled = false;
      btnContent.style.display = 'block';
      btnLoading.style.display = 'none';
    });
});

// Registro
registerBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Preencha todos os campos");
    return;
  }

  if (password.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres");
    return;
  }

  // Loading
  registerBtn.disabled = true;
  registerContent.style.display = 'none';
  registerLoading.style.display = 'block';

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Conta criada com sucesso! Agora você pode fazer login.");
      console.log(userCredential.user);
    })
    .catch((error) => {
      let mensagem = "Erro ao criar conta";

      if (error.code === "auth/email-already-in-use") {
        mensagem = "Este e-mail já está em uso";
      } else if (error.code === "auth/weak-password") {
        mensagem = "Senha muito fraca";
      } else if (error.code === "auth/invalid-email") {
        mensagem = "E-mail inválido";
      }

      alert("❌ " + mensagem);
    })
    .finally(() => {
      registerBtn.disabled = false;
      registerContent.style.display = 'block';
      registerLoading.style.display = 'none';
    });
});