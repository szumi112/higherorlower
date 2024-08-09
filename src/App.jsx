import { useEffect, useRef, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { roundTurns } from "./helpers/roundDown";

const cardImages = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/35/Eye_reasonably_small_400x400.jpg",
  },
  {
    src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0f14794-d139-4edf-8b9f-07053b24b754/d4wc7re-346bce20-8127-4722-ad21-a04c3bb8642b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwZjE0Nzk0LWQxMzktNGVkZi04YjlmLTA3MDUzYjI0Yjc1NFwvZDR3YzdyZS0zNDZiY2UyMC04MTI3LTQ3MjItYWQyMS1hMDRjM2JiODY0MmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.J2UkaayEZEUU96gjRzmf6hxcZxc--YkFHR2EeGJ-t6w",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/94/Image_400x400.png",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/512e6d67e4b0e0699d1444d6/1362416618299-TKCN30T7YZJNXYS677SU/pirate_mickey-400x400.jpg",
  },
  {
    src: "https://www.ibm.com/blogs/southeast-europe/wp-content/uploads/2019/02/securitythumbnail400x400.png",
  },
  {
    src: "https://pbs.twimg.com/profile_images/501947955113254912/zUIyirNj_400x400.png",
  },
];

const FLIP_DELAY = 250;

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const turnsRef = useRef(0);
  const matchedRef = useRef(0);
  const startRef = useRef(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        flipped: false,
        matched: false,
      }));
    setCards(shuffledCards);
    turnsRef.current = 0;
    reset();
    matchedRef.current = 0;
  };

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    if (
      choiceOne !== null &&
      choiceTwo !== null &&
      choiceOne.src !== choiceTwo.src
    ) {
      reset();
      setTimeout(() => {
        setCards(cards.map((c) => ({ ...c, flipped: false })));
      }, FLIP_DELAY);
    } else if (
      choiceOne !== null &&
      choiceTwo !== null &&
      choiceOne.src === choiceTwo.src
    ) {
      setCards(
        cards.map((c) =>
          c.src === choiceOne.src && c.src === choiceTwo.src
            ? { ...c, flipped: true, matched: true }
            : c
        )
      );
      matchedRef.current += 1;
      reset();
    }
  }, [choiceOne, choiceTwo]);

  const handleChoice = (card) => {
    if (card.flipped || card.matched) return;
    if (choiceOne) {
      setChoiceTwo(card);
      turnsRef.current += 1;
      flipCard(card);
    } else {
      setChoiceOne(card);
      turnsRef.current += 1;
      flipCard(card);
    }
  };

  const flipCard = (card) =>
    setCards((cards) =>
      cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

  useEffect(() => {
    if (cards.length === 0 || matchedRef.current === cardImages.length)
      startRef.current.focus();
  }, [cards]);

  return (
    <div className="App">
      <button onClick={shuffleCards} ref={startRef}>
        New game!
      </button>
      <h2>Turns: {roundTurns(turnsRef.current)}</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
      {matchedRef.current === cardImages.length && (
        <>
          <h1>
            Congrats, you finished in{" "}
            <span style={{ color: "red" }}>{roundTurns(turnsRef.current)}</span>{" "}
            turns !!!
          </h1>
          <h1>Press 'ENTER' to continue</h1>
        </>
      )}
    </div>
  );
}

export default App;
