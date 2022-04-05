import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions';
import { UserRecord } from 'firebase-functions/v1/auth';

import { firestore } from 'firebase-admin';

const db = firestore();
/**
 * *You can trigger Cloud Functions in response to the creation and deletion of Firebase user accounts. For example, you could send a welcome email to a user who has just created an account in your app. Examples on this page are based on a sample that does exactly this—sends welcome and farewell emails upon account creation and deletion. 
 * * for more information https://firebase.google.com/docs/functions/auth-events
 */

/**
 * *Firebase accounts will trigger user creation events for Cloud Functions when:
**A user creates an email account and password.
**A user signs in for the first time using a federated identity provider.
**The developer creates an account using the Firebase Admin SDK.
**A user signs in to a new anonymous auth session for the first time.
**A Cloud Functions event is not triggered when a user signs in for the first time using a custom token.
 */


export const onCreateUser = functions.auth.user().onCreate(async (user: UserRecord, ctx: EventContext) => {
    //.. created user email, displayname, uid, photoURL etc are available in user object
    // and we can use it to create a document in another collection or send them welcome email

    const userRef = db.collection('users').doc(user.uid);
    return userRef.set({
        name: user.displayName,
        createdAt: ctx.timestamp,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
    })
});

export const onDeleteUser = functions.auth.user().onDelete(async (user: UserRecord, ctx: EventContext) => {
    // .. deleted user email, displayname, uid, photoURL etc are available in user object
});

//!Caution: Deleting multiple users at once using the Firebase Admin SDK (for example, admin.auth().deleteUsers([uid1, uid2]) in Node.js) does not fire user deletion events, so event handlers set up using functions.auth.user().onDelete() will not be triggered. Delete users one at a time if you want user deletion events to fire for each deleted user.