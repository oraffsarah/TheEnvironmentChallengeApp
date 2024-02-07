The Environment Challenge: Is a mobile app developed by our team, "Team Everest", using JavaScript React, HTML, CSS and Bootstrap. 

The app accesses our custom online database of challenges through GitHub. The user can take on challenges to help improve the environment and earn points. 

My Responsibilities:

Programmed the “Challenges” component.  

This component displays all the challenges from the data for the user, and has four sub-components. A top-bar menu displays button for the user, to select easy, medium, or hard challenges using conditional rendering. 
The medium and hard challenges are initially locked. The user must accumulate a number of points, before they become available. This is achieved by using conditional rendering to dislay the locked challenges component should
the currentTotalPoints be below the required threshold.   
Within each section, individual challenges with varying points are attached to them. The user can accept these challenges by clicking the add to in progress button, which changes the status to ‘in progress’, and in turn  
displays them in the InProgressBasket Component, where they can be removed, or marked as completed with buttons.  

The latter changes the status to ‘completed’, which means they are then moved to the CompletedBasket Component. The user then gets a congratulatory message which is displayed in the completed basket component. 

The buttons in the challenge sections change as the user goes through completing them, and become unclickable if they are already in progress or completed. 

A variable called activeChall uses a filter which takes only challenges that have a status of ‘in progress’, and similarly, completeChall filters challenges with the status ‘completed’. Properties of these two filtered arrays are used to 
populate both the InProgressBasket, and the CompletedBasket, and update as the data from the App is altered. There is also functionality for the user to empty their ‘in progress’ challenges, or do a ‘weekly reset’ in the menu. The weekly 
reset uses the function from the main app to log that weeks points and set everything back to zero. 
When we have sufficient points accumulated we can see that the medium challenges are unlocked. You are now able to view the medium challenges that are available. This is the case for when the hard Challenges are locked also. 

  
