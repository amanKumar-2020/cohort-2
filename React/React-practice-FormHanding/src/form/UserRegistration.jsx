import React, { useState } from "react";
import "./UserRegistration.css";

const UserRegistration = () => {
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
  const handleChange = function(e){
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          name="username"
          type="text"
          value={formData.username}
          // onChange={(e) => setFormData({
          //   ...formData,
          //   username: e.target.value
          // })}
          onChange={handleChange}
          placeholder="Enter your Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          // onChange={(e) =>
          //   setFormData({
          //     ...formData,
          //     email: e.target.value,
          //   })
          // }
          onChange={handleChange}
          className="input email_input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          // onChange={(e) =>
          //   setFormData({
          //     ...formData,
          //     password: e.target.value,
          //   })
          // }
          onChange={handleChange}
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
