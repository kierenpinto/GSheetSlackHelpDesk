/* Configure These */

const token = "" 
const channelID = ""

/* End Configure  */

function onFormSub(e){
  // Get the values from the form response.
  const room = e.values[1];
  const question = e.values[2];
  
  // Configure the URL for the Slack Webhook
  var url = "https://slack.com/api/chat.postMessage";
  
  // Setup the Javascript template string for the message to be displayed in Slack.
  let message = `Student from room ${room} asked ${question}`
  
  // Do not configure from here onward:
  var data = JSON.stringify({
    "channel":channelID,
    "text": message
  });
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : data,
    'headers': {
      'Authorization': token,
    }
  };
  var response = UrlFetchApp.fetch(url,options);
  const res = JSON.parse(response.getContentText());
  const ts = res.message.ts;
  const lastRow = e.range.getLastRow()
  const sheet = e.range.getSheet();
  sheet.getRange('d'+lastRow).setValue(ts);
}

function doPost(e){
  const body = e.postData.contents;
  const payload = JSON.parse(body);
  console.log(body);
  console.log(payload);
  const id = payload.message.ts;
  const userName = payload.user.name;
  const ss = SpreadsheetApp.getActiveSheet();
  const id_column = 4;
  const targetValues = ss.getRange(1,id_column,ss.getMaxRows()).getValues();
  const findRow = targetValues.findIndex( (val) => val[0] == Number(id) ) + 1;
  ss.getRange(findRow,5).setValue(userName);
  return ContentService.createTextOutput(findRow).setMimeType(ContentService.MimeType.TEXT);
}