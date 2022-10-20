import "./App.css";
import { useEffect } from "react";
import { UilSun, UilMoon } from "@iconscout/react-unicons";
import { TodoStore } from "./stores/TodoStore";
import { UtilsStore } from "./stores/UtilsStore";
import TodoList from "./components/TodoList";
import { observer } from "mobx-react";

const App = observer(() => {
  useEffect(() => {
    TodoStore.getTodos();
  }, []);
  return (
    <div className="main" id={UtilsStore.theme === "light" ? "dark" : "light"}>
      <div className="container">
        <nav>
          <div className="switch-container">
            <p className="toggletext">
              <UilSun />
            </p>
            <label className="switch">
              <input type="checkbox" />
              <span
                className="slider round"
                onClick={UtilsStore.toggleTheme}
                checked={UtilsStore.theme === "dark"}
              ></span>
            </label>
            <p className="toggletext">
              <UilMoon />
            </p>
          </div>
          <h1>my to-do list</h1>
        </nav>
        <TodoList />
      </div>
    </div>
  );
});

export default App;
