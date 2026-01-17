import React, { useState } from "react";
import "./UserRegistration.css";

const UserRegistration = () => {
  // const [username, setUsername] = useState("");
  // const [email,setEmail] = useState("");
  // const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    username : "",
    email : "",
    password:""
    })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.username);
    console.log(formData.email);
    // console.log(e.target.value);
    
    
  };


  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({
            ...formData,
            username: e.target.value
          })}
          placeholder="Enter your Name"
        />
        <input 
        type="email" 
        value={formData.email}
        placeholder="Enter your Email"
        onChange={(e)=> setFormData({
          ...formData,
          email: e.target.value
        })}
        className="input email_input"
        />
        <input 
        type="password"
        value={formData.password}
        onChange={(e)=>setFormData({
          ...formData,
          password: e.target.value
        })}
        className="input"
        placeholder="Enter your password"
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
