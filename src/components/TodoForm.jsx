import React from 'react';
import { v4 as uuidv4 } from 'uuid'; 

const TodoForm = ({ addTodo }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const textTodo = event.target.elements.title.value;
    const timestamp = event.target.elements.date.value;
    const id = uuidv4(); 
    addTodo({
      id: id, 
      task: textTodo,
      timestamp: timestamp,
      isCompleted: false
    });
    event.target.reset();
  };

  return (
    <div className="container bg-white shadow" id="add-todo">
      <h2 className="container-header text-center">Tambah yang harus dilakukan</h2>
      <form className="form" id="form" onSubmit={handleSubmit}>
        <div className="form-group form-title">
          <label htmlFor="title">Masukkan hal yang akan dilakukan</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group form-title">
          <label htmlFor="date">Masukkan tanggal harus selesai</label>
          <input type="date" id="date" name="date" required />
        </div>
        <input type="submit" value="Submit" name="Submit" className="btn-submit" />
      </form>
    </div>
  );
};

export default TodoForm;
