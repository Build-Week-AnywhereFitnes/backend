# backend
## All server-side routing and api

## **AUTH ENDPOINTS**

### [POST] Create a new user
/api/auth/register
* USERNAME - STRING - REQUIRED
* PASSWORD - STRING - REQUIRED
* Returns the newly added user

***will have another field for authorization code for instructors***

### [POST] Login existing user
/api/auth/login
* USERNAME - STRING - REQUIRED
* PASSWORD - STRING - REQUIRED
* Returns message: `${dbUser.username} login successful at ${currentTime} and user info { username }

## **USER ENDPOINTS**

### [GET] List of all users
/api/users
* Returns all users

### [GET] User by ID
/api/users/:id
* USER_ID - INT - REQUIRED
* Returns message: `Get /api/users/:id running at ${currentTime}`

### [GET] Classes registered by user
/api/users/:id/classes
* USER_ID - INT - REQUIRED
* Returns message: `Retrieved user ${id} classes`
* Returns class id, name, type

### [DELETE] User by ID
/api/users/:id
* USER_ID - INT - REQUIRED
* Returns message: `Successfully deleted ${username}`

## **CLASS ENDPOINTS**

### [GET] List of all classes
/api/classes
* Returns all classes

### [GET] Classes by ID
/api/classes/:id
* CLASS_ID - INT - REQUIRED
* Returns class data

### [GET] Users taking a class
/api/classes/:id/roster
* CLASS_ID - INT - REQUIRED
* Returns message: `Retrieved users in class with id ${id}` and list of users in class

### [GET] Classes by type
/api/classes/search/:type
* TYPE - STRING - REQUIRED
* *There are only a few types right now but I can add more classes for more data if needed.*
* Returns all classes with matching type

### [GET] Count of open spots in a class
/api/classes/register/:id
* CLASS_ID - INT - REQUIRED
* Returns message: `There are ${openSpots} out of ${maxSpots[0].classMax} available for ${theClass[0].className}`

### [POST] Join a class
/api/classes/register/:id
* CLASS_ID - INT - REQUIRED
* Returns confirmation: `You are signed up for ${theClass[0].className}!` and message: `There are now ${openSpots} out of ${maxSpots[0].classMax} available for ${theClass[0].className}`

### [DELETE] Leave a class
/api/classes/register/:id
* CLASS_ID - INT - REQUIRED
* Returns message: `${theClass} was successfully cancelled for ${theUser}`

### [POST] Add class
**Instructors only**
/api/classes/
* Properties on Notion
* Returns newly added class

### [PUT] Update class info
**Instructors only**
/api/classes/:id
* CLASS ID REQUIRED
* Properties on Notion
* Returns edited class

### [DELETE] Delete class
**Instructors only**
/api/classes/:id
* CLASS ID REQUIRED
* Properties on Notion
* Returns message with id of deleted class