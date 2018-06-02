const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {


    console.log("request.body.queryResult.Addition: ", request.body.queryResult.Addition);


    let query = request.body.queryResult.parameters;
    let numList = query.numbers;
    
    let bodyData = request.body;
    let result;
    
    let ctr = 0;
    let firstNumberTemp = query.firstNumber;
    let secondNumberTemp = query.secondNumber;


    switch(request.body.queryResult.action){
        
        case 'Add':
            
            ctr = 0;
            result = 0;
            while (ctr < numList.length){
                result += numList[ctr];
                ctr++;
            }
            

            firestore.collection('rawData')
            .add(bodyData)
            .then(() => {

            response.send({
                fulfillmentText:
                    `and this is what we got, ${result}.`
                });

        
            })
            .catch((e => {

                console.log("error: ", e);

                response.send({
                    fulfillmentText:
                        `something went wrong`
                });

            }))

            break;

        case 'Subtract':
            ctr = 1;
            result = numList[0];
            while (ctr < numList.length){
                result -= numList[ctr];
                ctr++;
            }

            firestore.collection('rawData')
            .add(bodyData)
            .then(() => {

            response.send({
                fulfillmentText:
                    `and this is what we got, ${result}.`
                });
            })
            .catch((e => {

                console.log("error: ", e);

                response.send({
                    fulfillmentText:
                        `something went wrong`
                });

            }))
            break;

        case 'Multiply':
            ctr = 0;
            result = 1;
            while (ctr < numList.length){
                result *= numList[ctr];
                ctr++;
            }

            firestore.collection('rawData')
            .add(bodyData)
            .then(() => {

            response.send({
                fulfillmentText:
                    `and this is what we got, ${result}.`
                });
            })
            .catch((e => {

                console.log("error: ", e);

                response.send({
                    fulfillmentText:
                        `something went wrong`
                });

            }))
            break;

        case 'Divide':
            let firstNumberTemp = query.firstNumber;
            let secondNumberTemp = query.secondNumber;
            result = 0;
            result = firstNumberTemp / secondNumberTemp;

            
            firestore.collection('rawData')
            .add(bodyData)
            .then(() => {

            response.send({
                fulfillmentText:
                    `and this is what we got, ${result}.`
                });
            })
            .catch((e => {

                console.log("error: ", e);

                response.send({
                    fulfillmentText:
                        `something went wrong`
                });

            }))
            break;

        case 'showInfo':
            firestore.collection('rawData').get()
                .then((querySnapShot) => {

                    let showInfoFB = [];
                    querySnapShot.forEach((doc) => { doc.push(doc.data()) });

                    let fulfillmentText = `you have ${showInfoFB.length} data \n`;


                    showInfoFB.forEach((eachInfo, index) => {

                        fulfillmentText += `index: ${index}, numList: ${eachInfo.numbers}`
                    })

                    response.send({

                            fulfillmentText: fulfillmentText
                    })

                })
                .catch((err) => {

                    console.log('An error has occured: ' , err);

                    response.send({

                        fulfillmentText: `something went wrong reading database`
                    })

                })


            break;

        default:
                response.send({

                    fulfillmentText: "something went wrong in reading database"
                })


    }

    

});
