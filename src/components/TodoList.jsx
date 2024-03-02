import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [sortBy, setSortBy] = useState("terbaru");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const sortedUncompletedTodos = todoList
    .filter((todo) => !todo.isCompleted)
    .slice()
    .sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();

      if (sortBy === "terlama") {
        return timestampB - timestampA;
      } else {
        return timestampA - timestampB;
      }
    });

  const completedTodos = todoList.filter((todo) => todo.isCompleted);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const deleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const updateTodo = (id, updatedTask, updatedTimestamp) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask, timestamp: updatedTimestamp }; // Menyimpan perubahan pada task dan timestamp
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };  

  return (
    <div className="wrapper">
      <TodoForm addTodo={addTodo} /> {/* Menambahkan TodoForm di sini */}
      <div className="container">
        <h2 className="container-header">Yang harus dilakukan</h2>
        <div className="list-item" id="todos">
          <div className="select-container">
            <label htmlFor="select">Urutkan Deadline :&nbsp;</label>
            <select
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="terbaru">Terdekat</option>
              <option value="terlama">Terjauh</option>
            </select>
            <div className="select-icon"></div>
          </div>
          {sortedUncompletedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </div>
      </div>
      <div className="container">
        <h2 className="container-header">Yang sudah dilakukan</h2>
        <div className="list-item" id="completed-todos">
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
