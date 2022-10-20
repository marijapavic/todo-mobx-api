import { makeAutoObservable } from "mobx";
import { TodoStore } from "./TodoStore";

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  theme = "dark";
  newTodo = "";
  setInput = false;
  showEdit = false;

  toggleTheme = () => {
    this.theme = this.theme === "dark" ? "light" : "dark";
  };

  setTodo = (todo) => {
    this.newTodo = todo;
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setTodo(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.newTodo) {
      TodoStore.createTodo(this.newTodo);
    }
    this.newTodo = "";
  };

  handleDoubleClick = () => {
    this.showEdit = true;
  };
}

export const UtilsStore = new Store();
