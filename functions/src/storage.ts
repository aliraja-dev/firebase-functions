import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Storage from '@google-cloud/storage';
import { join, dirname } from 'path';
import { tmpdir } from 'os';

import { ObjectMetadata } from 'firebase-functions/v1/storage';
import { EventContext } from 'firebase-functions';


//**You can trigger a function in response to the uploading, updating, or deleting of files and folders in Cloud Storage.
//**functions.storage.object() to listen for object changes on the default Cloud Storage bucket.
//**functions.storage.bucket('bucketName').object() to listen for object changes on a specific bucket. */

export const generateThumbnail = functions.storage.object().onFinalize(async (object: ObjectMetadata, ctx: EventContext) => {
//Cloud Functions exposes a number of Cloud Storage object attributes such as size and contentType for the file updated. The 'metageneration' attribute is incremented whenever there's a change to the object's metadata. For new objects, the metageneration value is 1.
//     const fileBucket = object.bucket; // The Storage bucket that contains the file.
// const filePath = object.name; // File path in the bucket.
// const contentType = object.contentType; // File content type.
// const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    // ...
});


//** to prevent a continuous invocation of storage functions use checks such as 
// Exit if this is triggered on a file that is not an image.
// if (!contentType.startsWith('image/')) {
//     return functions.logger.log('This is not an image.');
//   }
  
//   // Get the file name.
//   const fileName = path.basename(filePath);
//   // Exit if the image is already a thumbnail.
//   if (fileName.startsWith('thumb_')) {
//     return functions.logger.log('Already a Thumbnail.');
//   } */