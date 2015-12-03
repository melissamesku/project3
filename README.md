# Project 3 - TimeCapsule
Team Danaerys: Eric Devlin, Melissa Mesku, Amanda Corlett

=============
TECHNOLOGIES
=============
• Express.js
• Node.js
• MongoDB
• HTML5
• CSS3
• Handlebars for templating
• Mongoose for schema modeling
• md5 for password hashing
• Mandrill for email functionality
• Body-parser
• Cookie-parser
• Morgan

========
SUMMARY
========
TimeCapsule is a MongoDB/Express.js/Node.js CRUD app that allows users to register an account, respond to questions, and save responses into a time capsule. The user can view his or her saved time capsules, but not make changes to them - time capsules capture thoughts at a given moment in time! Instead, the create and update functionalities are featured in the user's ability to make changes to his or her account information, or delete the account altogether.

In addition to the time capsules, users have the option to save their age and location to their account, adding value to the API created by including demographic data with the question-and-answer sets that make up the time capsules.

===========
WIREFRAMES
===========
Link: https://drive.google.com/open?id=0B_SVqrLJRiUgNHdNTU1FYUl6RDA

=============
USER STORIES
=============
MAIN
1. user accesses page, views nav bar and question boxes
2. if user doesn't choose to  sign up or log in via the links in the nav bar, the first click on any question box prompts the appearance of a modal displaying buttons leading to the sign-up and log-in forms
3. once signed in, user selects a question box by clicking it
4. user enters response into text field and submits
5. text of those questions that are responded to populate the righthand time capsule column as they are answered
6. once user has completed answering questions, user submits all questions as a single time capsule by clicking submit
7. five years from the date of submission, user receives an email containing the contents of the time capsule **not in effect as of presentation date**

SIGNUP
1. user accesses page and clicks the signup link
2. signup form appears
3. user enters name, email, password (required) and age, location (optional) and clicks signup
4. form disappears and question boxes render

LOGIN
1. user accesses page and clicks the login link
2. login form appears
3. user enters name and password and clicks login
4. form disappears and question boxes render

VIEW TIME CAPSULES
1. logged-in user selects My Time Capsules link in nav bar (or the view my time capsules button within the My Account section)
2. list of user's time capsules (identified by date created) populates

EDIT ACCOUNT
1. logged-in user clicks My Account in the nav bar
2. edit account information, delete account, and view my time capsules buttons appear
3. if user selects edit account, a form appears that is pre-populated with the user information
4. user replaces information as desired and clicks submit
5. question boxes render

DELETE ACCOUNT
1. logged-in user clicks My Account in the nav bar
2. edit account information, delete account, and view my time capsules buttons appear
3. if user selects delete account, a secondary view renders asking the user if he or she is sure; if the confirmation button is clicked, the account, including time capsules, is deleted
4.question boxes render

============
CHALLENGES
============

On the backend side, we ran into a challenge where we were trying to have each answer be saved as an object in array on the front end with the other answers. Then having the entire array be passed to the  server in an ajax request. Ajax, however, won’t take a complex array-of-objects data structure. It removes the ‘object' wrapping each piece of data and changes it into a giant object with each key being an array index. We tried to play with some of the ajax settings (such as processData:false, etc.) but were unsuccessful.

We ended up simplifying the data passed to the ajax, by just passing each answer at a time. The first answer passed creates a time capsule and passes it’s ID into a cookie. With each subsequent answer, the front end uses an if statement to see if a capsule cookie exists, and if so, saves it into the same capsule via a query using the capsule cookie. Then when the user clicks ‘submit capsule’, the cookie is deleted. Essentially it’s a session just for a capsule.

Late in the process, we tried to implement Moment.js to manipulate the display format of dates. Given more time, this could have been implemented, but the clock ran out. Luckily, the data science-y default date/time fit into the theme of the app, so a user wouldn't necessarily notice.













