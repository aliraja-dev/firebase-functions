import * as functions from 'firebase-functions';

import { firestore } from 'firebase-admin';
import { QueryDocumentSnapshot } from 'firebase-functions/v1/firestore';
import { Change, EventContext } from 'firebase-functions';

const db = firestore();

export const onNewNote = functions.firestore.document('notes/{noteId}').onCreate(
    async (snap: QueryDocumentSnapshot, context: EventContext) => {
        const data = snap.data();
        const userRef = db.collection('users').doc(data.uid);
        const userSnap = await userRef.get();
        const userData = userSnap.data();
        if (!userData) { return false; }
        return userRef.update({ notesCount: userData.notesCount + 1 });
    }
);

export const updateUser = functions.firestore.document('users/{userId}').onUpdate(
    (change: Change<QueryDocumentSnapshot>, context: EventContext) => {
        //TODO send an email to old email address about change of the fields on user profile. Preferably for change of email address we should send an email to the old email address as security measure. But as we can not trigger update function on a single field we might need to have a separate collection with emails of users. 
        const data = change.before.data();
        const afterData = change.after.data();
        if (data.email !== afterData.email) {
            //TODO implement email sending
        }
        else {
            //TODO update sensitive profile user info in another collection
            const secretUser = db.collection('secretUsers').doc(data.uid);
            return secretUser.update(afterData);
        }
    }
);

/**
 ** Event Type	Trigger
**onCreate	Triggered when a document is written to for the first time.
**onUpdate	Triggered when a document already exists and has any value changed.
**onDelete	Triggered when a document with data is deleted.
**onWrite	Triggered when onCreate, onUpdate or onDelete is triggered.
 */

//* Document paths can reference either a specific document or a wildcard pattern.

// Listen for any change on document `marie` in collection `users`
export const myFunctionName = functions.firestore
    .document('users/marie').onWrite((change, context) => {
        // ... Your code here
    });

// Listen for changes in all documents in the 'users' collection
export const useWildcard = functions.firestore
    .document('users/{userId}')
    .onWrite((change, context) => {
        // If we set `/users/marie` to {name: "Marie"} then
        // context.params.userId == "marie"
        // ... and ...
        // change.after.data() == {name: "Marie"}
    });

/**
 ** In this example, when any field on any document in users is changed, it matches a wildcard called userId.If a document in users has subcollections, and a field in one of those subcollections' documents is changed, the userId wildcard is not triggered.
 ** Wildcard matches are extracted from the document path and stored into context.params. You may define as many wildcards as you like to substitute explicit collection or document IDs, for example:
 */

// Listen for changes in all documents in the 'users' collection and all subcollections
export const useMultipleWildcards = functions.firestore
    .document('users/{userId}/{messageCollectionId}/{messageId}')
    .onWrite((change, context) => {
        // If we set `/users/marie/incoming_messages/134` to {body: "Hello"} then
        // context.params.userId == "marie";
        // context.params.messageCollectionId == "incoming_messages";
        // context.params.messageId == "134";
        // ... and ...
        // change.after.data() == {body: "Hello"}
    });

/**
 * For more information https://firebase.google.com/docs/functions/firestore-events
 */