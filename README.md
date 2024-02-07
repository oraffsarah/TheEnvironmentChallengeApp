# **The Environment Challenge**
## **Overview**

The Environment Challenge is a mobile app developed by our team, **"Team Everest"**, using *JavaScript React, HTML, CSS* and *Bootstrap*. 

*React* version 18.2.0 (Date 07 FEB 24). 

This readme will provide an overview of the app's components and their functionality. The main concept of this project is to develop an application where a user is able to accept a wide variety of **environmentally friendly challenges**, that they are able to keep track of through the application , over a number of weeks, while the challenges increase in difficulty as you progress through them. 

## **Running the Software**

The app can be run in code-sandbox [here](https://codesandbox.io/dashboard/recent). Running the app will require the dependencies: `bootstrap.js` and `chart.js`.

## **Component Breakdown**

 The app's components are:
 
| `App.js` | `Home.js` | `ProfilePage.js` | `challenges.js` |
|----------|----------|----------|----------|
| `PointsChart.js` | `API.js` |    `index.js` |    `styles.js` |
 


 ## **App Component** 

The `App Component` consists of functionality to be used throughout all components. 
Data from the [JSON file](https://raw.githubusercontent.com/DeclanDavis/TheEnvironmentChallengeApp/main/CODE%20/BackUpAPI.js) is taken in as an array. A function called `changeStatus()` is used to update this array whilst being careful not to mess with the `useState`. 

The user can select the `Home` , `Profile` , `All Challenges` or `Stats` button from here.

The app hinges on the idea that every `'challenge'` has a **status**; `'null'`, `'in progress'`, or `'completed'`. 
Other functions inlcude updating the current, weekly and all-time points the user has accumulated. This uses the idea of **'Write once, read many'** so that other components in the app need only be passed these functions by **props**, and this allows each component to communicate smoothly and update automatically. 

![App Display](https://github.com/DeclanDavis/TheEnvironmentChallengeApp/blob/4ce53f12736debba4099de93dd588eabc8c70d43/CODE%20/Images/app.png?raw=true)

## **Home Component** 

The `Home Component` contains the welcoming text for the app, explaining briefly what the app does and who it's aimed at. A few simple paragraphs to welcome the user and inform right away, this is the default page.

![Home Display](https://github.com/DeclanDavis/TheEnvironmentChallengeApp/blob/main/CODE%20/Images/home.png?raw=true)

## **Challenges Component** 

The `Challenges Component` displays all the challenges from the data for the user, and has four sub-components. A top-bar menu displays button for the user, to select `Easy`, `Medium`, or `Hard` challenges using conditional rendering. 
![Challenges easy](https://github.com/DeclanDavis/TheEnvironmentChallengeApp/blob/main/CODE%20/Images/challenges.1.png?raw=true)

The `Medium` and `Hard` challenges are initially *locked*. The user must accumulate a number of points, before they become available. This is achieved by using conditional rendering to dislay the `locked challenges component` should the `currentPointTotal` be below the required *threshold*. 

![Challenges locked](https://github.com/DeclanDavis/TheEnvironmentChallengeApp/blob/main/CODE%20/Images/challenges.2.png?raw=true)

Within each section, individual challenges with varying points are attached to them. The user can accept these challenges by clicking the add to `in progress button`, which changes the status to *‘in progress’*, and in turn displays them in the `InProgressBasket Component`, where they can be `Removed`, or `Marked as completed` with buttons.  

![Challenges inProgr](https://github.com/DeclanDavis/TheEnvironmentChallengeApp/blob/main/CODE%20/Images/challenges.3.png?raw=true)

The latter changes the status to *‘completed’*, which means they are then moved to the `CompletedBasket Component`. The user then gets a congratulatory message which is displayed in the `CompletedBasket component`. 

The buttons in the challenge sections change as the user goes through completing them, and become unclickable if they are already `in progress` or `completed`. 

A variable called `activeChall` uses a filter which takes only challenges that have a status of `‘in progress’`, and similarly, `completeChall` filters challenges with the status `‘completed’`. Properties of these two filtered arrays are used to populate both the `InProgressBasket`, and the `CompletedBasket`, and update as the data from the App is altered. There is also functionality for the user to empty their `‘in progress’ challenges`, or do a `‘weekly reset’` in the menu. The weekly 
reset uses the function from the main app to log that weeks points and set everything back to zero. 

When we have sufficient points accumulated we can see that the `Medium Challenges` are *unlocked*. You are now able to view the `Medium Challenges` that are available. This is the case for when the Hard Challenges are unlocked also. 

![Challenges Unlocked](https://github.com/DeclanDavis/TheEnvironmentChallengeApp/blob/main/CODE%20/Images/challenges.4.png?raw=true)

  
