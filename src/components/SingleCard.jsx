import React from "react";

const SingleCard = ({ card, handleChoice }) => {
  return (
    <div className="card">
      <div>
        <img
          className="front"
          width="150px"
          src={card.src}
          style={{ display: card.flipped || card.matched ? "block" : "none" }}
        />
        <img
          className="back"
          width="150px"
          onClick={() => handleChoice(card)}
          src="https://media.licdn.com/dms/image/D5610AQEkrsXeQxcL5A/image-shrink_1280/0/1722499228971?e=2147483647&v=beta&t=facvCDOoPb6s_Jfjw66eYZCcXVHyv1RcmfXGuFQTM8E"
          style={{ display: !card.flipped && !card.matched ? "block" : "none" }}
        />
      </div>
    </div>
  );
};

export default SingleCard;
