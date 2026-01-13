import React from 'react'
import "./card.css"


const Card = ({ data }) => {
  console.log(data);
  
  return (
    <div className="profile-card">
      <img className="avatar" src={data.avatar} alt={data.name} />

      <h2>{data.name}</h2>
      <p className="subtitle">{data.subtitle}</p>

      <div className="stats">
        <div className="stat">
          <h3>{data.projects}</h3>
          <span>Projects</span>
        </div>
        <div className="stat">
          <h3>{data.likes}</h3>
          <span>Likes</span>
        </div>
        <div className="stat">
          <h3>{data.comments}</h3>
          <span>Comments</span>
        </div>
      </div>

      <div className="links">
        <a href={data.linkedin} className="link-btn">LinkedIn</a>
        <a href={data.behance} className="link-btn">Behance</a>
      </div>

      <button className="contact-btn">Contact me</button>
    </div>
  );
};

export default Card;


