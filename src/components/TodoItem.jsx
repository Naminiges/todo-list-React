import React, { useState } from "react";

const TodoItem = ({ todo, completeTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedTimestamp, setEditedTimestamp] = useState(todo.timestamp);

  const handleComplete = () => {
    completeTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo.id, editedTask, editedTimestamp);
    setIsEditing(false);
  };
  

  const handleChangeTask = (e) => {
    setEditedTask(e.target.value);
  };

  const handleChangeTimestamp = (e) => {
    setEditedTimestamp(e.target.value);
  };

  return (
    <div className={`item ${todo.isCompleted ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={handleChangeTask}
            autoFocus
          />
          <input
            type="date"
            value={editedTimestamp}
            onChange={handleChangeTimestamp}
          />
        </>
      ) : (
        <>
          <h2>{todo.task}&nbsp;&nbsp;</h2>
          <p>{todo.timestamp}&nbsp;&nbsp;</p>
        </>
      )}
      {todo.isCompleted ? (
        <>
          <button className="undo-button" onClick={handleComplete}></button>
          <button className="trash-button" onClick={handleDelete}></button>
        </>
      ) : (
        <>
          {isEditing ? (
            <button className="save-button" onClick={handleSave}></button>
          ) : (
            <button className="edit-button" onClick={handleEdit}></button>
          )}
          <button className="check-button" onClick={handleComplete}></button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
