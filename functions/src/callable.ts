import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';

/**
 ** The major difference between the https onREquest functions and these OnCAll functions is that these functions are callable only using the client side firebase SDK and that adds the AUTH, FCM and app tokens automatically. And are available in the context object.
 ** secondly, automatically deserializes the request body into a JavaScript object. and validates auth tokens.
 ** for more information https://firebase.google.com/docs/functions/callable
 */

export const addMessage = functions.https.onCall((data: any, context: CallableContext): any | Promise<any> => {
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

    //* return the message to the client Or we can return as a promise too
    return { uid, name, picture, email, text };

    //* for more details https://firebase.google.com/docs/functions/callable
});

