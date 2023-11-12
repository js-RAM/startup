function login() {
    const name = document.querySelector("#name");
    const pass = document.querySelector("#password");
    localStorage.setItem("userName", name.value);
    window.location.href = "user-page.html";
}