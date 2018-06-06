
let firebase = require("firebase");
let test = require('./test.js');
const login = require("facebook-chat-api");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

 // Initialize Firebase
 // ...

 
exports.webhook = functions.https.onRequest((request, response) => {

    console.log("request.body.queryResult: ", request.body.queryResult);

    let query = request.body.queryResult.parameters;
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

    }

});

exports.insertIntoDB = functions.https.onRequest((request, response) => {
    const text = request.query.text;
    admin.database().ref('/test').push({text: text}).then(snapshot => {

        response.redirect(303, snapshot.ref);

    })

});

exports.convertToUppercase = functions.database.ref('/test/{pushID}/text').onWrite((change, context) => {

    console.log('request function triggered');
    const text = change.after.val();
    test();//module from test.js
    console.log('text values: ', text);
    const uppercaseText = text.toUpperCase();
    return change.after.ref.parent.child('uppercaseText').set(uppercaseText);

    //broadcastMessage(text);



});

function broadcastMessage(message){

    let FBMessenger = require('fb-messenger');
    let messenger = new FBMessenger("EAAFQIPkB2ZCYBAGtSIppR978xPAgktw85w29nZC7xvX9UW599iebSjV0bmCN6JIz4GkVyQ8Hqnn5snqnvzgdiB6zgAR6ylciDQYAVvVrz3S3R4CMe1l1fKFiXcXExf0K169dC0DI3qVvl88lOVz6imaXoE3UrSyB4yxVxf3gZDZD");
 
    messenger.sendTextMessage("1721885347926612", 'Hello', function (err, body) {
        if(err) return console.error(err)
        console.log(body);
    })

}
