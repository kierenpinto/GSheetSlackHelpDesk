module.exports = (req, res) => {
    const payloadStr = req.body;
    console.log(payloadStr);
    const payload = JSON.parse(payloadStr.payload);
    // const id = payload.user.name;
    
    
    res.status(200).send('Success')
  }