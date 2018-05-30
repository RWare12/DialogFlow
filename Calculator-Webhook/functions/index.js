const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {


    console.log("request.body.queryResult.Addition: ", request.body.queryResult.Addition);
    
    let query = request.body.queryResult.parameters;  
    let result;

    let add = query.Addition;
    let subtract = query.Subtraction;
    let multiply = query.Multiplication;
    let divide = query.Division;
    let numList = query.numbers;

    if (add === `Addition`){
            
        let ctr = 0;
        result = 0;
        while (ctr < numList.length){
            result += numList[ctr];
            ctr++;
        }
        
    }else if (subtract === `Subtraction`){
        
        let ctr = 1;
        result = numList[0];
        while (ctr < numList.length){
            result -= numList[ctr];
            ctr++;
        }
        
    }else if (multiply === `Multiplication`){
        
        let ctr = 0;
        result = 1;
        while (ctr < numList.length){
            result *= numList[ctr];
            ctr++;
        }
        
    }else if (divide === `Quotient`){
        result = 0;
        result = firstNumberTemp / secondNumberTemp;
    }

    response.send({

        fulfillmentText:
            `and this is what we gotasdjadsjksadada, ${result}.`
    });


});
