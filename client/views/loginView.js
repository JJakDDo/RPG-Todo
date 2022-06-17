export class LoginView {
  constructor() {
    this.main = document.getElementById("main");
  }

  render() {
    console.log("here");
    this.main.innerHTML = this.getLoginTemplate();
  }

  getLoginTemplate() {
    return `
      <div id="loginForm">
        <input id="name" type="text" placeholder="이름"></input>
        <input id="password" type="password" placeholder="비밀번호"></input> 
        <button id="btnLogin">로그인</button>
        <button>가입</button>
      </div>
        `;
  }

  loginHandler(handler) {
    const inputName = document.getElementById("name");
    const inputPassword = document.getElementById("password");
    const btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", (event) => {
      event.preventDefault;
      if (inputName.value && inputPassword.value) {
        handler({ name: inputName.value, password: inputPassword.value });
      }
    });
  }
}
