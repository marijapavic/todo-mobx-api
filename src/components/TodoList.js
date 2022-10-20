import React from "react";
import { observer } from "mobx-react";
import { TodoStore } from "../stores/TodoStore";
import { UtilsStore } from "../stores/UtilsStore";

const TodoList = observer(() => {
  return (
    <div>
      <p className="status">
        tasks left: {TodoStore.remainingTodos}/{TodoStore.totalTodos}
      </p>
      <form className="form-container" onSubmit={UtilsStore.handleSubmit}>
        <input
          type="text"
          className="input"
          value={UtilsStore.newTodo}
          onChange={UtilsStore.handleChange}
        />
        <button className="submit-btn" type="submit">
          ADD
        </button>
      </form>
      <div className="div-filter">
        <label className="filter">
          <select
            className="select"
            onChange={(e) => TodoStore.updateFilter(e.target.value)}
            value={TodoStore.filter}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </label>
      </div>
      {TodoStore.filterTodo.map((todo) => (
        <ul key={todo.id}>
          <li>
            <div>
              <input
                className="checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => TodoStore.checkTodo(todo, e)}
              />
              {!todo.editing && (
                <div className="todo">
                  <p
                    className={todo.completed ? "completed" : null}
                    onDoubleClick={(e) => TodoStore.editTodo(todo, e)}
                  >
                    {todo.title}
                  </p>
                </div>
              )}
              {todo.editing && (
                <input
                  className="todo-edit"
                  type="text"
                  autoFocus
                  defaultValue={todo.title}
                  onBlur={(e) => TodoStore.doneEdit(todo, e)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      TodoStore.doneEdit(todo, e);
                    }
                  }}
                />
              )}
            </div>
            <button
              className="delete-btn"
              onClick={() => TodoStore.deleteTodo(todo.id)}
            >
              x
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
});

export default TodoList;
