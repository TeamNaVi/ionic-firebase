signInBtn = document.getElementById("signIn");
signUpBtn = document.getElementById("signUp");
fistForm = document.getElementById("form1");
secondForm = document.getElementById("form2");
container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());
