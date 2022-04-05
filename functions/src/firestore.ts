import * as functions from 'firebase-functions';

import { firestore } from 'firebase-admin';
import { QueryDocumentSnapshot } from 'firebase-functions/v1/firestore';
import { EventContext } from 'firebase-functions';

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