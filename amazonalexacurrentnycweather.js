var https = require("https"); //***** for being able to fetch top-selling items, I think becoming an Amazon Advertising Associate might be required in order to be able to use Amazon's Product Advertising API, unless there is another Amazon API that's available for specifically fetching top-selling items
// I hope to still be eligible for the amazon hoodie when I publish this Alexa Skill!


exports.handler = (event, context) => {

  try{

    if (event.session.new){
    // New Session
    console.log("new session!");
}
  switch (event.request.type){

    case "LaunchRequest":
    // > Launch Request
      console.log("launch request!");
      context.succeed(
        generateResponse(
          buildSpeechletResponse("Welcome!!!!!!!! Let's make this work!", true),
          {}
          )
      )
      break;

    case "IntentRequest":
    // > Intent Request
      console.log("intent request!"); 
      console.log("come on and work!");// endpoint added here below
      switch(event.request.intent.name){
        case "getCurrentNYCWeatherIntent":
          var endpoint = "https://api.wunderground.com/api/3758d4a57136a50e/conditions/q/NY/New_York_City.json"; // *remember to have the https format * this works with this "placebo endpoint data" https://jsonplaceholder.typicode.com/posts ***** api.openweathermap.org/data/2.5/weather?zip=10005,us&APPID=08d6215ef934232110949692d5ffb8da  
          var body = ""
          https.get(endpoint, (response) => {
            response.on('data', (chunk) => {body += chunk})
            response.on('end', () => {
              var data = JSON.parse(body);
              var weatherCount = data.current_observation.temperature_string; // when accessing data, and accessing items, such as the username of the first item in an array, use syntax in this form: data[0].username
              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`current temperature in New York City is ${weatherCount}`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )
            })
          })
      
      break; // endpoint added here above

       // this section is the new experimental/trial and error section
        
        case "getResponseIntent":
          
              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`current response is this response`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )
      
      break; // also added this break statement


    } // this is the event request type end-bracket, every intent, both old and new should be contained here prior to this end-bracket

    case "SessionEndedRequest":
    // > Session Ended Request
      console.log("session ended request!");
      break; 

    default:
      context.fail("invalid request type!: {event.request.type}");
  }

  } catch(error) {context.fail("Exception: ${error}")}
  
  

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return{
    outputSpeech:{
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}