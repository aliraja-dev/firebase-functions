# Firebase Functions

## Project details

This repository holds multiple examples for firebase functions using Typescript i have used google firebase docs heavily in this repo to keep as a reference.

## Installation instructions

Run npm install in functions folder
To test the http-functions, there is an auth middleware that requires an Authorizaton header of 'secret-key' either add that in postman request or comment the middleware.

### Project Backlog

Add more examples and maintain it as a reference for firebase functions

## Cautions

It's important to manage the lifecycle of a function to ensure that it resolves properly. By terminating functions correctly, you can avoid excessive charges from functions that run for too long or loop infinitely. Also, you can make sure that the Cloud Functions instance running your function does not shut down before your function successfully reaches its terminating condition or state.

Use these recommended approaches to manage the lifecycle of your functions:

Resolve functions that perform asynchronous processing (also known as "background functions") by returning a JavaScript promise.
Terminate HTTP functions with res.redirect(), res.send(), or res.end().
Terminate a synchronous function with a return; statement.

## Terminate functions properly examples

https://firebase.google.com/docs/functions/terminate-functions

### Important links

Intro to Functions https://firebase.google.com/docs/functions
Github function samples https://github.com/firebase/functions-samples
API Reference for everything firebase https://firebase.google.com/docs/reference
eg: API reference for firestore functions https://firebase.google.com/docs/reference/functions/providers_firestore

Google APIS for further learning reference
https://googleapis.dev/nodejs/firestore/latest/DocumentSnapshot.html

https://firebase.google.com/docs/reference/js/app.md#app_package
