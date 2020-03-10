import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUser = functions.auth.user().onCreate((user) => {
  return admin
  .firestore()
  .collection(`users`)
  .doc(user.uid)
  .set({
    email: user.email,
    firstname: '',
    lastname: '',
    role: 'user',
    photo: '',
    equipe: '',
    numero: '',
  });
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
  return admin
  .firestore()
  .collection(`users`)
  .doc(user.uid)
  .delete();
});
