export class LoginView {
  constructor() {
    this.main = document.getElementById("main");
  }

  // 로그인 페이지를 렌더링한다.
  render() {
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

  //로그인 버튼의 클릭 이벤트 핸들러를 추가해준다.
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
