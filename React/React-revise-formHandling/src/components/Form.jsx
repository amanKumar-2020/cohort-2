import React from "react";

const Form = () => {
  const handleSubmit = function (e) {
    e.preventDefault();
  };
  return (
    <div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your Name" />
          <button className="btn">Create user</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
