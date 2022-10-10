import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactEventHandler, useEffect, useState } from "react";
import { CountryData, Data } from "../data/data";

const Home: NextPage = () => {
  const [country, setCountry] = useState("");

  const [scoreRight, setScoreRight] = useState<number>(0);
  const [scoreWrong, setScoreWrong] = useState<number>(0);

  const [fiveCapitals, setFiveCapitals] = useState<Data[]>([]);

  const [disabled, setDisabled] = useState<Boolean>(false);

  const [rightOrWrong, setRightOrWrong] = useState<string>("");

  const [chosenBtn, setChosenBtn] = useState<number | null>(null);

  const selectRandom = () => {
    //* immutability for the data
    let capitalsClone = [...CountryData];
    let randomFiveCapitals = [];

    for (let i = 0; i < 4; i++) {
      //? it'll select an entry and assign it only to an array, and not remove it
      let selectedEntry = capitalsClone.splice(Math.floor(Math.random() * capitalsClone.length), 1);
      //? it'll push everything randomly
      randomFiveCapitals.push(selectedEntry[0]);
    }
    //? out of the five entries it'll select a single country
    let selectedCountry = randomFiveCapitals[Math.floor(Math.random() * 4)].name;
    //* this will actually make batch update it

    setCountry(selectedCountry);
    setFiveCapitals(randomFiveCapitals);
  };

  useEffect(() => {
    selectRandom();
  }, []);
  const handleCheck = (entry: Data, index: number) => {
    if (country === entry.name) {
      setRightOrWrong("right");
      setScoreRight(scoreRight + 1);
    } else {
      setRightOrWrong("wrong");
      setScoreWrong(scoreWrong + 1);
    }
    setDisabled(true);
    setChosenBtn(index);
  };
  const handleNext = () => {
    setDisabled(false);
    setRightOrWrong("");
    selectRandom();
  };
  return (
    <div className="App">
      {" "}
      <div className="rightOrWrong">
        <div>
          Right: <span className="rightScore">{scoreRight}</span>
        </div>
        <div>
          Wrong: <span className="wrongScore">{scoreWrong}</span>
        </div>
      </div>
      <div className="question">
        <div>What&apos;s the capital of:</div>
        <div className="capital">{country}</div>
      </div>
      {fiveCapitals.map((entry, i) => (
        <button key={i} onClick={() => handleCheck(entry, i)} disabled={disabled} className={chosenBtn === i ? rightOrWrong : null}>
          {entry.capital}
        </button>
      ))}
      <button className="nextBtn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Home;
