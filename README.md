# backend
## All server-side routing and api

## **AUTH ENDPOINTS**

### [POST] Create a new user
/api/auth/register
* USERNAME - STRING - REQUIRED
* PASSWORD - STRING - REQUIRED
Returns the newly added user
// will have another field for authorization code for instructors

### [POST] Login existing user
/api/auth/login
* USERNAME - STRING - REQUIRED
* PASSWORD - STRING - REQUIRED
Returns message: `${dbUser.username} login successful at ${currentTime} and user info { username }
// will return user id in addition to username

## **USER ENDPOINTS**

### [GET] List of all users
/api/users
Returns all users

### [GET] User by ID
/api/users/:id
* USER_ID - INT - REQUIRED
Returns message: `Get /api/users/:id running at ${currentTime}`

## **CLASS ENDPOINTS**

### [GET] List of all classes
/api/classes
Returns all classes

### [GET] Classes by ID
/api/classes/:id
* CLASS_ID - INT - REQUIRED
Returns class data

### [GET] Count of open spots in a class
/api/classes/register/:id
* CLASS_ID - INT - REQUIRED
Returns message: `There are ${openSpots} out of ${maxSpots[0].classMax} available for ${theClass[0].className}`

### [GET] Count of open spots in a class
/api/classes/register/:id
* CLASS_ID - INT - REQUIRED
Returns:
* confirmation: `You are signed up for ${theClass[0].className}!`
* message: `There are now ${openSpots} out of ${maxSpots[0].classMax} available for ${theClass[0].className}`

### [POST] Add class
**Instructors only**
/api/classes/
* Properties on Notion
Returns newly added class

### [PUT] Update class info
**Instructors only**
/api/classes/:id
* CLASS ID REQUIRED
* Properties on Notion
Returns edited class

### [DELETE] Delete class
**Instructors only**
/api/classes/:id
* CLASS ID REQUIRED
* Properties on Notion
Returns message with id of deleted class