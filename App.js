import React, { useEffect, useState } from "react";
import Home from "./components/Home Page/Home.js";
import ProfilePage from "./components/ProfilePage/ProfilePage.js";
import MenuChallenges from "./components/challenges/challenges.js";
import PointsChart from "./components/Stats Page/PointsChart.js";
import "./styles.css";

import logoBanner from "./images/banner1.png";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL =
      "https://raw.githubusercontent.com/TMcSweeney100/APIMobileChallApp/main/apiFinal.txt";

    async function fetchData() {
      try {
        const response = await fetch(URL);
        const json = await response.json();
        setLoading(true);

        setData(json.challenges);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  //change data in state using map
  function changeStatus(item, status) {
    const nextData = data.map((data) => {
      if (data.id != item.id) {
        return data;
      } else {
        return {
          ...data,
          status: (data.status = status),
        };
      }
    });
    // Re-render with the new array
    setData(nextData);
  }
  const [currentPointTotal, setCurrentPointTotal] = useState(0);
  const [allTimePointTotal, setAllTimePointTotal] = useState(0);
  const [weeklyPointTotal, setWeeklyPointTotal] = useState([]);

  function updateCurrentPoints(i) {
    //updates both current and all-time points
    setCurrentPointTotal(currentPointTotal + i);
    setAllTimePointTotal(allTimePointTotal + i);
  }

  function WeeklyReset(currentPointTotal) {
    //logs weekly total into array and sets to zero
    setWeeklyPointTotal([...weeklyPointTotal, currentPointTotal]);
    setCurrentPointTotal(0);
    //reset status
    {
      data.map((t, index) => <p key={index}>{changeStatus(t, "")}</p>);
    }
  }

  //menu choice
  const [choice, setChoice] = useState(null);
  function changeChoice(pc) {
    setChoice(pc);
  }

  if (error) {
    return <h1>Oops! An error has occurred: {error.toString()}</h1>;
  } else if (loading === false) {
    return <h1>Waiting for the data ...... waiting....</h1>;
  } else {
    return (
      <>
        <div className="logo-container">
          <img src={logoBanner} className="logo-banner" />
        </div>
        <div className="button-container"></div>
        <button className="reset-button1" onClick={() => changeChoice(null)}>
          Home
        </button>
        <button
          className="reset-button1"
          onClick={() => changeChoice("profile")}
        >
          Profile
        </button>
        <button className="reset-button1" onClick={() => changeChoice("all")}>
          All Challenges
        </button>
        <button className="reset-button1" onClick={() => changeChoice("stats")}>
          Stats
        </button>

        {choice === null && <Home />}
        {choice === "all" && (
          <MenuChallenges
            APIData={data}
            currentPointTotal={currentPointTotal}
            updateCurrentPoints={updateCurrentPoints}
            changeStatus={changeStatus}
            WeeklyReset={WeeklyReset}
          />
        )}

        {choice === "profile" && (
          <ProfilePage
            APIData={data}
            currentPointTotal={currentPointTotal}
            updateCurrentPoints={updateCurrentPoints}
            changeStatus={changeStatus}
            WeeklyReset={WeeklyReset}
          />
        )}

        {choice === "stats" && (
          <PointsChart
            allTimePointTotal={allTimePointTotal}
            weeklyPointTotal={weeklyPointTotal}
            WeeklyReset={WeeklyReset}
          />
        )}

        <img
          src={logoBanner}
          class="img-fluid"
          alt="CS385 The Environment Challenge"
        />
      </>
    );
  }
}

export default App;
