import React from "react";

function Character({ item }) {
  console.log(item);
  return (
    <a href={item.wikiLink}>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <img src={item.img} alt="Card" />
          </div>
          <div className="card-back">
            <h1>{item.name}</h1>
            <ul>
              <li>
                <strong>Actor Name:</strong> {item.portrayed}
              </li>
              <li>
                <strong>Nickname:</strong> {item.nickname}
              </li>
              <li>
                <strong>Birthday:</strong> {item.birthday}
              </li>
              <li>
                <strong>Status:</strong> {item.status}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
}

export default Character;
