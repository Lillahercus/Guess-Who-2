import { useState } from 'react'

export default function App() {
  const defaultCharacters = Array.from({ length: 24 }, (_, i) => ({ id: i, image: null, name: "", flipped: false }));
  const [player, setPlayer] = useState(1);
  const [player1Chars, setPlayer1Chars] = useState(defaultCharacters);
  const [player2Chars, setPlayer2Chars] = useState(defaultCharacters);

  const currentChars = player === 1 ? player1Chars : player2Chars;
  const setCurrentChars = player === 1 ? setPlayer1Chars : setPlayer2Chars;

  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const updated = [...currentChars];
        updated[index].image = reader.result;
        setCurrentChars(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e, index) => {
    const updated = [...currentChars];
    updated[index].name = e.target.value;
    setCurrentChars(updated);
  };

  const handleFlip = (index) => {
    const updated = [...currentChars];
    updated[index].flipped = !updated[index].flipped;
    setCurrentChars(updated);
  };

  const togglePlayer = () => setPlayer(player === 1 ? 2 : 1);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎯 Guess Who – Kétszemélyes mód</h1>
      <p className="mb-4 text-gray-600 text-sm">Játékos {player} karakterei. Húzz képet, írd be a nevet, kattints a kártyára hogy megforduljon.</p>
      <button onClick={togglePlayer} className="mb-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
        🔁 Váltás Játékos {player === 1 ? 2 : 1}-re
      </button>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {currentChars.map((char, index) => (
          <div
            key={index}
            className="relative perspective w-full h-52 cursor-pointer border rounded-xl shadow bg-white"
            onClick={() => handleFlip(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div
              className={`transition-transform duration-500 transform-style-preserve-3d w-full h-full ${
                char.flipped ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute w-full h-full backface-hidden flex items-center justify-center overflow-hidden">
                {char.image ? (
                  <img src={char.image} alt={char.name} className="object-cover w-full h-full rounded-xl" />
                ) : (
                  <div className="text-gray-400 text-sm text-center p-2">Húzz ide képet</div>
                )}
              </div>
              <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-gray-100 flex flex-col items-center justify-center rounded-xl p-2">
                <input
                  type="text"
                  placeholder="Név..."
                  value={char.name}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleNameChange(e, index)}
                  className="text-center p-1 w-full border rounded text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}