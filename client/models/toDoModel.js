export class ToDoModel {
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
        if (callback) {
          callback(data.user);
        }
      });
  }

  getItem(callback) {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://127.0.0.1:4000/api/v1/todo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (callback) {
          callback(data.data);
        }
      });
  }

  addItem(item, callback) {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(item);
    fetch("http://127.0.0.1:4000/api/v1/todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: item }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((data) => {
        if (callback) callback(data.todo);
        console.log(data);
      });

    // return [];
  }

  deleteItem(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://127.0.0.1:4000/api/v1/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  }

  storeItem() {
    localStorage.setItem("todos", JSON.stringify(this.items));
  }

  completeItem(id) {
    this.player.addExp(this.items.filter((elem) => elem.id == id)[0].exp);
    this.deleteItem(id);
  }
}
