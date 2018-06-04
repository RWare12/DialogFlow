
let firebase = require("firebase");
let request = require('request');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
// let firestore = admin.firestore();


// // Create and Deploy Your First Cloud Functions

 // Initialize Firebase
  let config = {
    apiKey: "AIzaSyBcEalVGXZLsZqqgWcVSLNuqIzQk71y21U",
    authDomain: "calculator-a3477.firebaseapp.com",
    databaseURL: "https://calculator-a3477.firebaseio.com",
    projectId: "calculator-a3477",
    storageBucket: "calculator-a3477.appspot.com",
    messagingSenderId: "1042922692923"
  };
  firebase.initializeApp(config);


// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {


    console.log("request.body.queryResult: ", request.body.queryResult);


    /*let query = request.body.queryResult.parameters;
    let numList = query.numbers;
    let uid = firebase.database().ref().child('convo').push().key;

    let bodyData = request.body.queryResult;
    let result;
    
    let ctr = 0;
    let firstNumberTemp = query.firstNumber;
    let secondNumberTemp = query.secondNumber;

    //picking the structure of JSON
    let user_message = request.body.originalDetectIntentRequest.payload.data.message.text;
    let user_id = request.body.originalDetectIntentRequest.payload.data.sender.id;
    let timestamp = request.body.originalDetectIntentRequest.payload.data.timestamp;
    let userChatBot_id = request.body.originalDetectIntentRequest.payload.data.recipient.id;
    let source = request.body.originalDetectIntentRequest.payload.source;
    let fulfillmentText = request.body.queryResult.fulfillmentText;

    //for storing the JSON above
    let data = {};
    //finalize JSON before pushing to realtime database
    let updates = {};
    


    switch(request.body.queryResult.action){
        
        case 'Add':
            ctr = 0;
            result = 0;
            while (ctr < numList.length){
                result += numList[ctr];
                ctr++;
            }

            response.send({

                fulfillmentText: `and this is what we got, ${result}.`

            });
            
            //JSON that will be passed in realtime database
            data = {
                    user_id: user_id,
                    user_message: user_message,
                    timestamp: String(timestamp),
                    userChatBot_id: userChatBot_id,
                    chatBot_message: fulfillmentText,
                    source: source
            }

            updates['/convo/' + uid] = data;
            firebase.database().ref().update(updates);

            break;

        case 'Subtract':
            ctr = 1;
            result = numList[0];
            while (ctr < numList.length){
                result -= numList[ctr];
                ctr++;
            }

             response.send({

                fulfillmentText: `and this is what we got, ${result}.`

            });

             //JSON that will be passed in realtime database
            data = {
                    user_id: user_id,
                    user_message: user_message,
                    timestamp: timestamp,
                    userChatBot_id: userChatBot_id,
                    chatBot_message: fulfillmentText,
                    source: source
            }

            updates['/convo/' + uid] = data;
            firebase.database().ref().update(updates);

            break;

        case 'Multiply':
            ctr = 0;
            result = 1;
            while (ctr < numList.length){
                result *= numList[ctr];
                ctr++;
            }

            response.send({

                fulfillmentText: `and this is what we got, ${result}.`

            });
            
            //JSON that will be passed in realtime database
            data = {
                    user_id: user_id,
                    user_message: user_message,
                    timestamp: timestamp,
                    userChatBot_id: userChatBot_id,
                    chatBot_message: fulfillmentText,
                    source: source
            }

            updates['/convo/' + uid] = data;
            firebase.database().ref().update(updates);

            break;

        case 'Divide':
            let firstNumberTemp = query.firstNumber;
            let secondNumberTemp = query.secondNumber;
            result = 0;
            result = firstNumberTemp / secondNumberTemp;

            response.send({

                fulfillmentText: `and this is what we got, ${result}.`

            });
            
            //JSON that will be passed in realtime database
            data = {
                    user_id: user_id,
                    user_message: user_message,
                    timestamp: timestamp,
                    userChatBot_id: userChatBot_id,
                    chatBot_message: fulfillmentText,
                    source: source
            }

            updates['/convo/' + uid] = data;
            firebase.database().ref().update(updates);

            break;

        case 'input.unknown':
            data = {
                    user_id: user_id,
                    user_message: user_message,
                    timestamp: timestamp,
                    userChatBot_id: userChatBot_id,
                    chatBot_message: fulfillmentText,
                    source: source
            }

            updates['/convo/' + uid] = data;
            firebase.database().ref().update(updates);
            
            break;

        case 'showInfo':
            // firestore.collection('rawData').get()
            //     .then((querySnapShot) => {

            //         let showInfoFB = [];
            //         querySnapShot.forEach((doc) => { doc.push(doc.data()) });

            //         let fulfillmentText = `you have ${showInfoFB.length} data \n`;


            //         showInfoFB.forEach((eachInfo, index) => {

            //             fulfillmentText += `index: ${index}, numList: ${eachInfo.numbers}`
            //         })

            //         response.send({

            //                 fulfillmentText: fulfillmentText
            //         })

            //     })
            //     .catch((err) => {

            //         console.log('An error has occured: ' , err);

            //         response.send({

            //             fulfillmentText: `something went wrong reading database`
            //         })

            //     })

            break;

    }*/

});

exports.insertIntoDB = functions.https.onRequest((request, response) => {
    const text = request.query.text;
    admin.database().ref('/test').push({text: text}).then(snapshot => {

        response.redirect(303, snapshot.ref);

    })
});

exports.convertToUppercase = functions.database.ref('/test/{pushID}/text').onWrite((change, context) => {

    console.log('UpperCase function triggered');
    const text = change.after.val();
    console.log('text values: ', text);
    const uppercaseText = text.toUpperCase();
    return change.after.ref.parent.child('uppercaseText').set(uppercaseText);

});
