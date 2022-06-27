export class ToDoModel {
  constructor() {}

  // 현재 진행중인 투두 목록들을 가지고 온다.
  getItem(callback) {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://127.0.0.1:4000/api/v1/todo", {
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
        if (callback) {
          callback(data.data);
        }
      });
  }

  // 투두를 추가한다.
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

  // 투두를 삭제한다.
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

  // 투두를 완료한다.
  completeItem(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://127.0.0.1:4000/api/v1/todo/${id}`, {
      method: "POST",
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
}
