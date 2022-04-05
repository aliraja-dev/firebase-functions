import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

//TODO learn and add here more samples from firebase functions samples project on github to https

//*middleware for checking authorization header
const auth = (req: functions.Request, res: functions.Response, next: any) => {
    if (req.headers.authorization === 'secret-key') {
        next();
    } else {
        res.status(401).send('Not authorized');
    }
};
//*middleware for returning a response if user authorized
const checkAuthFunction = (req: functions.Request, res: functions.Response) => {
    res.send(`Authorized ${req.header('Authorization')}`);
}
const app = express();
//* to allow cross origin requests for functions
app.use(cors({ origin: true }));
app.use(auth);

//* accessible at <functionsURL>/api/checkAuth
app.use('/checkAuth', checkAuthFunction);


//* Expose express API as a single Cloud Function: & export it from index.ts
export const api = functions.https.onRequest(app);


//*standalone functions accessible at <functionsURL>/http-functions
export const httpFunction = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


