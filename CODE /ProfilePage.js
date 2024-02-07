import React, { useEffect, useState } from "react";
function ProfilePage(props) {
  const [challengeChoice, setChallengeChoice] = useState(null);

  function activeChallengesFilter(searchTerm) {
    return function (Challenge) {
      let active = Challenge.status.toLowerCase();
      return active.includes(searchTerm.toLowerCase());
    };
  }

  function clearAllChallenges() {
    {
      activeChall.map((t, index) => (
        <p key={index}>{props.changeStatus(t, "")}</p>
      ));
    }
  }

  function getPotentialPointTotal(acc, obj) {
    return acc + obj.points.awarded;
  }
  function setChallTocomplete() {}

  function changeChallengeCategory(complete) {
    setChallengeChoice(completed);
  }

  //active challenges
  let activeChall = props.APIData.filter(activeChallengesFilter("in progress"));

  return (
    <>
      <h1 className="profile-container">Your Profile Page</h1>
      <div className="button-container">
        <button
          className="reset-button"
          onClick={() =>
            props.currentPointTotal > 0 &&
            props.WeeklyReset(props.currentPointTotal)
          }
        >
          Weekly Reset
        </button>
      </div>
      <div className="styled-points-container">
        <div className="styled-accumulated-points">
          <h2>You have accumulated {props.currentPointTotal} points!</h2>
        </div>
        <div className="styled-points-info">
          <h2>
            You could earn {activeChall.reduce(getPotentialPointTotal, 0.0)}{" "}
            more points!
          </h2>
        </div>
      </div>

      <h1 className="styled-challenges-heading">
        Number Of Active Challenges : {activeChall.length}{" "}
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Challenge Name</th>
            <th>Challenge Info</th>
            <th>Points On Offer</th>
            <th>Level</th>
            <th>Challenge complete</th>
          </tr>
        </thead>
        <tbody>
          {activeChall.map((p, index) => (
            <tr key={index}>
              <td>
                <i>{p.title}</i>
              </td>
              <td>
                <b>{p.description}</b>
              </td>
              <td>
                <b>{p.points.awarded}</b>
              </td>
              <td>
                <b>{p.level}</b>
              </td>
              <td>
                <b>
                  {
                    <button
                      onClick={() => {
                        props.changeStatus(p, "completed"),
                          props.updateCurrentPoints(p.points.awarded);
                      }}
                    >
                      Completed
                    </button>
                  }
                </b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button className="reset-button" onClick={clearAllChallenges}>
          Clear all challenges
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
