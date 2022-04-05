import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions';

/**
 * To run functions to run at specified times, we need to use functions.pubsub.schedule().onRun() This convenience method creates a Pub/Sub topic and uses Cloud Scheduler to trigger events on that topic, ensuring that your function runs on the desired schedule.
 * for more information use https://firebase.google.com/docs/functions/schedule-functions
 */
export const scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun(async (context: EventContext) => {
    console.log('This will be run every 1 minutes!');
});