export class ToDoEditModel {
  constructor() {
    this.payload = {};
  }

  // 현재 진행중인 투두 목록들을 가지고 온다.
  getTodo(id, callback) {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://127.0.0.1:4000/api/v1/todo/${id}`, {
      method: "GET",
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
        console.log(data.data);
        if (callback) {
          callback(data.data);
        }
      });
  }

  updateTodo(id, body, callback) {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://127.0.0.1:4000/api/v1/todo/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.data);
        if (callback) {
          callback(data.data);
        }
      });
  }
}
