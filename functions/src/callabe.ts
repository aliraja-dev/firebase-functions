import * as functions from 'firebase-functions';
import * as Twilio from 'twilio';
import * as admin from 'firebase-admin';
import { CallableContext } from 'firebase-functions/v1/https';


exports.addMessage = functions.https.onCall((data: any, context: CallableContext): any | Promise<any> => {
    //* Message text passed from the client.
    const text = data.text;
    // Checking attribute.
    if (!(typeof text === 'string') || text.length === 0) {
        //* Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "text" containing the message text to add.');
    }
    //* Checking that the user is authenticated.
    if (!context.auth) {
        //* Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    //* Authentication / user information is automatically added to the request in the context.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;

    //* return the message to the client
    return { uid, name, picture, email, text };

    //* for more details https://firebase.google.com/docs/functions/callable
});

