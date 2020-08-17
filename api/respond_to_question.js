const https = require('https')

module.exports = (req, res) => {
    const payloadStr = JSON.stringify(JSON.parse(req.body.payload));
    console.log(payloadStr);
    const options = {
        hostname: 'script.google.com',
        port: 443,
        path: '/macros/s/AKfycbyvp4iXLr3pMUNmKcI0PR79d1UKmSzExr-KnnGq4a-0cjporrc/exec',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payloadStr.length
        }
      }
    const reqB = https.request(options, resB => {
        console.log(`statusCode: ${resB.statusCode}`)
        res.status(200).send('Success')
      })
    reqB.on('error', error => {
    console.error(error)
    })
    
    reqB.write(payloadStr)
    reqB.end()
  }