import React, { useState, useReducer, useEffect } from "react";
import './App.css';
import { userReducer, initialState } from "./userReducer";

const InputHandler = ({ onSubmit, editMode, editedUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editMode && editedUser) {
      setName(editedUser.name);
      setEmail(editedUser.email);
    }
  }, [editMode, editedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !validateEmail(email)) {
      alert("Please enter a valid name and email.");
      return;5
    }
    onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">
        {editMode ? "Edit user" : "Add user"}
      </button>
    </form>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(userReducer, initialState);

  const addUser = (user) => {
    if (state.editedUser !== null) {
      const updatedUsers = users.map((u, index) =>
        index === state.editedUser.index ? user : u
      );
      setUsers(updatedUsers);
      dispatch({ type: "CLEAR_EDITED_USER" });
    } else {
      setUsers([...users, user]);
    }
  };

  const deleteUser = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
    }
  };

  const editUser = (index) => {
    dispatch({ type: "SET_EDITED_USER", payload: { ...users[index], index } });
  };

  return (
    <div className="app-container">
      <InputHandler onSubmit={addUser} editMode={state.editedUser !== null} editedUser={state.editedUser} />
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editUser(index)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => deleteUser(index)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
