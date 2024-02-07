import React, { useEffect, useState } from "react";

export default function MenuChallenges(props) {
  const [challengeChoice, setChallengeChoice] = useState(null);
  const [challengeCompleted, setChallengeCompleted] = useState(null);

  // // Allow for switching between different challenge difficulties: level "Easy","Medium" or "Hard"
  function changeChallengeCategory(pc) {
    setChallengeChoice(pc);
  }

  function challengesFilter(searchTerm) {
    return function (Challenge) {
      let active = Challenge.status.toLowerCase();
      return active.includes(searchTerm.toLowerCase());
    };
  }

  let activeChall = props.APIData.filter(challengesFilter("in progress"));
  let completeChall = props.APIData.filter(challengesFilter("completed"));

  function emptyInProgressBasket() {
    {
      activeChall.map((t, index) => (
        <p key={index}>{props.changeStatus(t, "")}</p>
      ));
    }
  }

  function findObjectIndex(needle) {
    return function (haystack) {
      return haystack.id === needle.id;
    };
  }

  function findObjectFilterRemove(needle) {
    return function (haystack) {
      return haystack.id !== needle.id;
    };
  }

  return (
    <>
      {/* This Displays The Buttons to select Easy, Medium and Hard Challenges */}
      <div className="home-content-container">
        <h2>
          We have <strong>{props.APIData.length} </strong>Challenges to choose
          from!
        </h2>
        <h4>
          The challenges range in difficulty from <strong>Easy</strong> to{" "}
          <strong>Medium</strong> to <strong>Hard</strong>.
        </h4>
      </div>
      <button
        class="EMHMenu_button"
        onClick={() => changeChallengeCategory("Easy")}
      >
        Easy Challenges
      </button>
      &nbsp;
      <button
        class="EMHMenu_button"
        onClick={() => changeChallengeCategory("Medium")}
      >
        Medium Challenges
      </button>
      &nbsp;
      <button
        class="EMHMenu_button"
        onClick={() => changeChallengeCategory("Hard")}
      >
        Hard Challenges
      </button>
      &nbsp;
      <button
        class="CloseMenu_button"
        onClick={() => changeChallengeCategory(null)}
      >
        Close Menu
      </button>
      &nbsp;
      {/* These are conditional statements
            The two below are for buttons to appear to clear InProgress Challenges and 
            Completed Challenges if their arrays are not empty
            ie. If they have anything challenges in porgress or Completed. */}
      {activeChall.length > 0 && (
        <>
          <button
            class="clearINPROGCOMPLETED_button"
            onClick={emptyInProgressBasket}
          >
            Clear All In Progress Challenges
          </button>
        </>
      )}
      {completeChall.length > 0 && (
        <>
          <span> </span>
          <button
            class="clearINPROGCOMPLETED_button"
            onClick={() => {
              props.currentPointTotal > 0 &&
                props.WeeklyReset(props.currentPointTotal);
            }}
          >
            Weekly Reset
          </button>
        </>
      )}
      {/* Conditional Statement to show the challenges in ChallengeChoice depending on the button pressed
            e.g. Easy, Medium or Hard Challenges. */}
      {challengeChoice === "Easy" && (
        <ShowChallengesComponent
          challenges={props.APIData}
          choice={challengeChoice}
          changeStatus={props.changeStatus}
        />
      )}
      {challengeChoice === "Medium" && props.currentPointTotal >= 25 && (
        <ShowChallengesComponent
          challenges={props.APIData}
          choice={challengeChoice}
          changeStatus={props.changeStatus}
        />
      )}
      {challengeChoice === "Medium" && props.currentPointTotal < 25 && (
        <LockedChallengesComponent
          challenges={props.APIData}
          choice={challengeChoice}
          currentPointTotal={props.currentPointTotal}
        />
      )}
      {challengeChoice === "Hard" && props.currentPointTotal >= 50 && (
        <ShowChallengesComponent
          challenges={props.APIData}
          choice={challengeChoice}
          changeStatus={props.changeStatus}
        />
      )}
      {challengeChoice === "Hard" && props.currentPointTotal < 50 && (
        <LockedChallengesComponent
          challenges={props.APIData}
          choice={challengeChoice}
          currentPointTotal={props.currentPointTotal}
        />
      )}
      {/* For buttons to appear to remove InProgress Challenges and add to Completed challenges
            in the InProgress Component. 
            For a button to appear to remove completed challenges */}
      {activeChall.length > 0 && (
        <>
          <InProgressBasket
            activeChall={activeChall}
            completed={challengeCompleted}
            updateCurrentPoints={props.updateCurrentPoints}
            changeStatus={props.changeStatus}
          />
        </>
      )}
      {completeChall.length > 0 && (
        <>
          <CompletedBasket
            completeChall={completeChall}
            completedBasket={props.completedBasket}
            currentPointTotal={props.currentPointTotal}
            removeCurrentPoints={props.removeCurrentPoints}
            changeStatus={props.changeStatus}
          />
        </>
      )}
    </>
  );
}

/* This is the ShowProductsComponent 
      It is primarily used to allow us to display products
      and encapsulate this code away from the parent App component */
function ShowChallengesComponent(props) {
  // a filter function for productCategory
  function challengesFilter(prod) {
    return function (challengesObject) {
      return challengesObject.level === prod;
    };
  }
  // use filter to find the number of items for this product
  let n = props.challenges.filter(challengesFilter(props.choice));

  return (
    <>
      <hr />
      <div class="challenges_Container">
        <h3>
          Our {props.choice} Challenges ({n.length} Available)
        </h3>

        {props.challenges
          .filter(challengesFilter(props.choice))
          .map((p, index) => (
            <p key={index}>
              <strong>{p.title} Awarded Points: </strong>
              {p.points.awarded}{" "}
              {/* conditionally rendering of button 
            1. Add to in progress button available if status is empty(status === ""). 
            This button change the status to "in progress".
            2. In progress button available if status is in progress. This button has no functionality
            and acts as a visual marker to show the user the challenge is set to in progress from this 
            component.
            3. Completed button has no functionality and is a visual marker to show challenge is completed*/}
              {p.status === "" && (
                <button
                  class="AddToInProgress_button"
                  onClick={() => {
                    p.status === "" && props.changeStatus(p, "in progress");
                  }}
                >
                  Add to In Progress
                </button>
              )}
              {p.status === "in progress" && (
                <button class="InProgress_button">In Progress</button>
              )}
              {p.status === "completed" && (
                <button class="Completed_button">
                  <bold>Completed</bold>
                </button>
              )}
              <br></br> {p.description}
            </p>
          ))}
      </div>
    </>
  );
} // end of ShowProductsComponent

/* This is the ShowProductsComponent 
      It is primarily used to allow us to display products
      and encapsulate this code away from the parent App component */
function LockedChallengesComponent(props) {
  // a filter function for productCategory
  function challengesFilter(prod) {
    return function (challengesObject) {
      return challengesObject.level === prod;
    };
  }

  return (
    <>
      <hr />
      <div class="locked_Container">
        {props.choice === "Medium" && (
          <h3>
            The {props.choice} Challenges are <strong>LOCKED!</strong> <br></br>{" "}
            Earn <strong>{25 - props.currentPointTotal} more points</strong> to
            unlock them.
          </h3>
        )}
        {props.choice === "Hard" && (
          <h3>
            The {props.choice} Challenges are <strong>LOCKED!</strong> <br></br>{" "}
            Earn <strong>{50 - props.currentPointTotal} more points</strong> to
            unlock them.
          </h3>
        )}
      </div>
    </>
  );
}

function InProgressBasket(props) {
  // create a call back for the reduce function
  // note how we access the price of each object.
  function getInProgressBasketTotal(acc, obj) {
    return acc + obj.points.awarded;
  }
  return (
    <>
      <hr />
      <div class="inProgress_Container">
        <h3>In Progress Challenges</h3>
        <p>
          You currently have <b>{props.activeChall.length}</b> challenges in
          progress.
        </p>
        <p>
          <b>
            Points upon completion:{" "}
            {props.activeChall.reduce(getInProgressBasketTotal, 0)}
          </b>
        </p>
        {props.activeChall.map((p, index) => (
          <p key={index}>
            {p.title} <strong>Awarded Points: </strong>
            {p.points.awarded}{" "}
            <button
              class="Remove_button"
              onClick={() => {
                props.changeStatus(p, "");
              }}
            >
              Remove
            </button>
            <span> </span>
            <button
              class="AddToCompleted_button"
              onClick={() => {
                props.updateCurrentPoints(p.points.awarded),
                  props.changeStatus(p, "completed");
              }}
            >
              Mark as Completed
            </button>
          </p>
        ))}
      </div>
    </>
  );
}

function CompletedBasket(props) {
  let y = props.completeChall.length;

  return (
    <>
      <hr />
      <div class="Completed_Container">
        <h3>Completed Challenges</h3>
        <p>
          You currently have <b>{y}</b> challenges completed.
        </p>
        <p>
          <b>Total Points: {props.currentPointTotal}</b>
        </p>
        {props.completeChall.map((p, index) => (
          <p key={index}>
            <strong>{p.title} - </strong> <b>Awarded Points: </b>
            {p.points.awarded}
            {"    "} <br></br>
            {p.tip}
          </p>
        ))}
      </div>
    </>
  );
}
