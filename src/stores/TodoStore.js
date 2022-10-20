import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { v4 as uuid } from "uuid";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/todos";

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  todos = [];
  filter = "all";

  getTodos = () => {
    axios
      .get("?_limit=5")
      .then((response) => {
        let allTodos = response.data;
        allTodos.forEach((todo) => (todo.editing = false));
        runInAction(() => {
          this.todos = allTodos;
          console.log(allTodos);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createTodo = (todo) => {
    axios
      .post("", {
        title: todo,
        completed: false,
      })
      .then((response) => {
        runInAction(() => {
          this.todos.push({
            id: uuid(),
            title: response.data.title,
            completed: false,
            editing: false,
          });
          console.log(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkTodo = (todo, id) => {
    axios
      .patch(`/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      })
      .then(() => {
        runInAction(() => {
          todo.completed = !todo.completed;
          const index = this.todos.findIndex((todo) => todo.id === id);
          if (index > -1) {
            this.todos[index].completed = !this.todos[index].completed;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteTodo = (id) => {
    axios
      .delete(`/${id}`)
      .then(() => {
        runInAction(() => {
          const index = this.todos.findIndex((item) => item.id === id);
          this.todos.splice(index, 1);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editTodo = (todo) => {
    todo.editing = true;
  };

  doneEdit = (todo, event) => {
    todo.editing = false;
    todo.title = event.target.value;
    axios
      .patch("/" + todo.id, {
        title: todo.title,
        completed: todo.completed,
      })
      .then(() => {
        runInAction(() => {
          const index = this.todos.findIndex((item) => item.id === todo.id);
          this.todos.splice(index, 1, todo);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateFilter = (newFilter) => {
    this.filter = newFilter;
  };

  get filterTodo() {
    if (this.filter === "all") {
      return this.todos;
    } else if (this.filter === "active") {
      return this.todos.filter((todo) => !todo.completed);
    } else if (this.filter === "completed") {
      return this.todos.filter((todo) => todo.completed);
    }
    return this.todos;
  }

  get remainingTodos() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  get totalTodos() {
    return this.todos.length;
  }
}

export const TodoStore = new Store();
