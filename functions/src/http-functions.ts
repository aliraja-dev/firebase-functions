import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';

//TODO learn and add here more samples from firebase functions samples project on github to https

//*middleware for checking authorization header -- use postman or curl to test 
const auth = (req: functions.Request, res: express.Response, next: any) => {
    if (req.headers.authorization === 'secret-key') {
        next();
    } else {
        res.status(401).send('Not authorized');
    }
};
//*middleware for returning a response if user authorized
const checkAuthFunction = (request: functions.Request, response: express.Response) => {
    response.send(`Authorized ${request.headers.authorization}`);
}

//* sends the date as a response to the request <functionsURL>/date
const date = (request: functions.Request, response: express.Response) => {
    response.send(`The date for today is ${moment().format("MMM Do YY")}`);
};

//*  send date and time of the server <functionsURL>/formattedDate
const fullDate = (request: functions.Request, response: express.Response) => {
    if (request.method === 'PUT') {
        response.status(403).send('Forbidden');
        return;
    }

    const format = 'MMMM Do YYYY, h:mm:ss a';

    const formattedDate = moment().format(`${format}`);
    functions.logger.log('sending formatted date:', formattedDate);
    response.status(200).send(formattedDate);
};


const app = express();
//* to allow cross origin requests for functions
app.use(cors({ origin: true }));

//* when using middleware auth, use authorization headers with value 'secret-key' in request curl or postman
app.use(auth);

//* accessible at <functionsURL>/api/<route>
app.use('/checkAuth', checkAuthFunction);
app.use('/fulldate', fullDate);
app.use('/date', date);


//* Expose express API as a single Cloud Function: & export it from index.ts
export const api = functions.https.onRequest(app);


//*standalone functions accessible at <functionsURL>/http-functions
export const httpFunction = functions.https.onRequest((request: functions.Request, response: express.Response) => {
    response.send("Hello from Firebase!");
});


