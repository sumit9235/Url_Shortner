# Url Shortener API

This API provides functionality for shortening long URLs.

## Description

This api shorten urls based on another api name 'shortLink'. When we send the long url to the api it returns the shorten url from there, its a free service so its contains some adds.


## Base URL
- Base URL: http://localhost:4000/

## Deployed URL
- Deployed URL: https://url-shortner-znbf.onrender.com/

## Authentication
For endpoints requiring authentication, include the `Authenticate` header with a valid token.

## Endpoints

### 1. User Signup

- **Endpoint:** `/users/signup`
- **Method:** `POST`
- **Description:** Create a new user account.
- **Request Body:**
  ```json
  {
    "username": "any",
    "password": "any"
  }
Responses:
200 OK: Successful operation
201 Created: User account created successfully
400 Bad Request: Invalid request
### 2. User Login
- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Description:** Log in with a registered user account.
- **Request Body:**
  ```json
  {
   "username": "any",
   "password": "any"
  }
Responses:
200 OK: Successful login
400 Bad Request: Invalid request
404 Not Found: User not found
500 Internal Server Error: Server error

### 3. URL Shorten
- **Endpoint:** `/url/shorten`
- **Method:** `POST`
- **Description:** `Shorten a long URL.`
- **Request Body:**
  ```json
  {
    "longUrl": "any"
  }

- **Request Headers:**
Authorization: Token for authentication (required)
Responses:
200 OK: URL shortened successfully
202 Accepted: Request accepted for processing
400 Bad Request: Invalid request

### 4. Swagger docs
-**Endpoint:** `/api-docs`
-**Method:** `GET`
-**Description:** `Give back the proper documentation UI of swagger documentation`