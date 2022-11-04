import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./component/Header";
import CharacterGrid from "./component/CharacterGrid";
import Search from "./component/Search";
import Pagination from "./component/Pagination";

import "./styles.css";

const links = {
  1: "https://en.wikipedia.org/wiki/Walter_White_(Breaking_Bad)",
  2: "https://en.wikipedia.org/wiki/Jesse_Pinkman",
  3: "https://en.wikipedia.org/wiki/Skyler_White",
  4: "https://en.wikipedia.org/wiki/Walter_White_Jr.",
  5: "https://hero.fandom.com/wiki/Hank_Schrader",
  6: "https://en.wikipedia.org/wiki/Marie_Schrader",
  7: "https://breakingbad.fandom.com/wiki/Mike_Ehrmantraut",
  8: "https://en.wikipedia.org/wiki/Saul_Goodman",
  9: "https://breakingbad.fandom.com/wiki/Gustavo_Fring",
  10: "https://breakingbad.fandom.com/wiki/Hector_Salamanca",
  11: "https://breakingbad.fandom.com/wiki/Krazy-8",
  12: "https://breakingbad.fandom.com/wiki/Tuco_Salamanca",
  13: "https://en.wikipedia.org/wiki/Daniel_and_Luis_Moncada",
  14: "https://breakingbad.fandom.com/wiki/Lydia_Rodarte-Quayle",
  15: "https://breakingbad.fandom.com/wiki/Todd_Alquist",
  16: "https://breakingbad.fandom.com/wiki/Jane_Margolis",
  17: "https://breakingbad.fandom.com/wiki/Skinny_Pete",
  18: "https://breakingbad.fandom.com/wiki/Badger",
  19: "https://breakingbad.fandom.com/wiki/Huell_Babineaux",
  20: "https://breakingbad.fandom.com/wiki/Steven_Gomez",
  21: "https://breakingbad.fandom.com/wiki/Ted_Beneke",
  22: "https://breakingbad.fandom.com/wiki/Gale_Boetticher",
  23: "https://breakingbad.fandom.com/wiki/Andrea_Cantillo",
  24: "https://breakingbad.fandom.com/wiki/Brock_Cantillo",
  25: "https://breakingbad.fandom.com/wiki/Carmen_Molina",
  26: "https://breakingbad.fandom.com/wiki/Gretchen_Schwartz",
  27: "https://breakingbad.fandom.com/wiki/Elliott_Schwartz",
  28: "https://breakingbad.fandom.com/wiki/Gonzo",
  29: "https://breakingbad.fandom.com/wiki/Combo,",
  30: "https://breakingbad.fandom.com/wiki/Diane_Pinkman",
  31: "https://breakingbad.fandom.com/wiki/Adam_Pinkman",
  32: "https://breakingbad.fandom.com/wiki/Jake_Pinkman",
  33: "https://breakingbad.fandom.com/wiki/No-Doze",
  34: "https://breakingbad.fandom.com/wiki/Emilio_Koyama",
  35: "https://breakingbad.fandom.com/wiki/Dr._Delcavoli",
  36: "https://breakingbad.fandom.com/wiki/Wendy",
  37: "https://breakingbad.fandom.com/wiki/Bogdan_Wolynetz",
  38: "https://breakingbad.fandom.com/wiki/Ken",
  39: "https://breakingbad.fandom.com/wiki/Holly_White",
  40: "https://breakingbad.fandom.com/wiki/George_Merkert",
  41: "https://breakingbad.fandom.com/wiki/Donald_Margolis",
  42: "https://breakingbad.fandom.com/wiki/Clovis",
  43: "https://breakingbad.fandom.com/wiki/Austin_Ramey",
  44: "https://breakingbad.fandom.com/wiki/Victor",
  45: "https://breakingbad.fandom.com/wiki/Tom%C3%A1s_Cantillo",
  46: "https://breakingbad.fandom.com/wiki/Francesca_Liddy",
  47: "https://breakingbad.fandom.com/wiki/Cynthia",
  48: "https://breakingbad.fandom.com/wiki/Tortuga",
  49: "https://breakingbad.fandom.com/wiki/Tim_Roberts",
  50: "https://breakingbad.fandom.com/wiki/Juan_Bolsa",
  51: "https://breakingbad.fandom.com/wiki/Group_Leader_(Breaking_Bad)",
  52: "https://breakingbad.fandom.com/wiki/Kaylee_Ehrmantraut",
  53: "https://breakingbad.fandom.com/wiki/Pamela_Orbic",
  54: "https://breakingbad.fandom.com/wiki/Duane_Chow",
  55: "https://breakingbad.fandom.com/wiki/Stacey_Ehrmantraut",
  56: "https://breakingbad.fandom.com/wiki/Saxton",
  57: "https://breakingbad.fandom.com/wiki/Jack_Welker",
  58: "https://breakingbad.fandom.com/wiki/Kim_Wexler",
  59: "https://breakingbad.fandom.com/wiki/Howard_Hamlin",
  60: "https://breakingbad.fandom.com/wiki/Chuck_McGill",
  61: "https://breakingbad.fandom.com/wiki/Nacho_Varga",
  62: "https://breakingbad.fandom.com/wiki/Lalo_Salamanca"
};

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );

      setItems(
        result.data.map((char) => {
          char["wikiLink"] = char.char_id ? links[char.char_id] : "";
          return char;
        })
      );
      setIsLoading(false);
    };
    fetchItems();
  }, [query]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = items.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <Header />
      <Search getQuery={(val) => setQuery(val)} />
      <CharacterGrid items={currentCards} isLoading={isLoading} />
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={items.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
