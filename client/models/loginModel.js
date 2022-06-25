export class LoginModel {
  constructor() {}

  login(userInfo, callback) {
    // this.items.push({
    //   todo: item,
    //   id: this.count,
    //   monster: Math.floor(Math.random() * this.totalMonster),
    //   exp:
    //     this.count % 10 == 0 ? 1000 : Math.round(Math.random() * 2 + 1) * 100,
    // });
    // if (callback) {
    //   callback();
    // }
    // this.count++;
    // this.storeItem();

    // call API to login
    fetch("http://127.0.0.1:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token));
        if (callback) {
          callback(data.user);
        }
      });
  }
}
