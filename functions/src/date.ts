import * as functions from 'firebase-functions';
import * as moment from 'moment';

//* sends the date as a response to the request <functionsURL>/date
export const date = functions.https.onRequest((request, response) => {
    response.send(`The date for today is ${moment().format("MMM Do YY")}`);
});

//*  send date and time of the server <functionsURL>/formattedDate
export const formattedDate = functions.https.onRequest((request, response) => {
    if (request.method === 'PUT') {
        response.status(403).send('Forbidden');
        return;
    }

    let format = request.query.format;
    if (!format) {
        format = 'MMMM Do YYYY, h:mm:ss a';
    }
    const formattedDate = moment().format(`${format}`);
    functions.logger.log('sending formatted date:', formattedDate);
    response.status(200).send(formattedDate);
});