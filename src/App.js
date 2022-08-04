import React from "react";

// Components
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  // Общее количество загруженных покемонов
  const [pokemonsData, setPokemonsData] = React.useState([]);
  // Информация о каждом из покемонов в подробности
  const [cardsData, setCardsData] = React.useState({});
  // Для кнопки Load More
  const [loadingCounter, setLoadingCounter] = React.useState(0);
  
  // Подгружаем первоначальную 20-ку покемонов
  React.useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
        .then((res) => res.json())
        .then((data) => setPokemonsData(data.results));
  }, [])
  
  // Получаем массив подробных данных по загруженным покемонам
  React.useEffect(() => {
      pokemonsData.forEach((pokemon) => {
        fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => setCardsData((prevCardsData) => {
          return {
            ...prevCardsData,
            [data.name]: data
          }
        }))
      })
  }, [pokemonsData])

  // Handler для кнопки Load More
  function handleClick() {
    setLoadingCounter((prevLoadingCounter) => {
      return prevLoadingCounter + 1;
    })
  }

  // Подгружаем еще 20-ку покемонов по нажатию кнопки
  React.useEffect(() => {

    if (loadingCounter === 0) {
      return
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${loadingCounter*20}`)
    .then((res) => res.json())
    .then((data) => setPokemonsData((prevPokemonsData) => {
      return [
        ...prevPokemonsData,
        ...data.results
      ]
    }))
  }, [loadingCounter])

  // console.log(`Loading counter: ${loadingCounter}`)

  return (
    <div className="App">
      <Navbar />
      <Main cardsData={cardsData} pokemonsData={pokemonsData}/>
      <button onClick={handleClick}>Load More</button>
    </div>
  );
}

export default App;
