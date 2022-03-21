import { useState, useEffect } from "react";

const App = () => {
  const [brew, setBrew] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [input, setInput] = useState("")
  let handleFetch = async () => {
    try {
      setError(false);
      let response = await fetch("https://api.punkapi.com/v2/beers/random");
      if (response.status !== 200) {
        throw new Error("oops");
      }
      let data = await response.json();
      setBrew(data[0]);
    } catch (error) {
      console.log("error: ", error);
      setError({ error: true, message: error.message });
    }
  };
  useEffect(() => {
    handleFetch();
    console.log("use effect worked");
  }, []);
  if(!brew ) {
    return <h1>loading...</h1>
  }
  return (
    <div>
      <h1>{brew.name}</h1>
      {brew.food_pairing.map((item, index) => {
        return <Food food={item} />;
      })}
      <button onClick={handleFetch}>fetch</button>
    </div>
  );
};

const Food = ({ food }) => {
  return (
    <>
      <h1>paired with...</h1>
      <h2>{food}</h2>
    </>
  );
};

export default App;
