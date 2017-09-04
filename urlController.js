const urlModel = require('./urlModel');

const urlController = {
  
  generateRandomKey() {
    return Math.floor(100000 + Math.random() * 9000);
  },
  
  shortenUrl(request, response) {
    const uri = request.params['0'] || request.body.url;
    const url = uri.split('//')[1];
    const urlArray = Object.values(request.params);
    let original_url = `${urlArray[1]}${urlArray[0]}`;
    if (request.body.url) {
     original_url = request.body.url;
    }
    
    if (url) {
      // that means you want to shorten it, then shorten and save
      const urlKey = urlController.generateRandomKey();
      const short_url = `http://${request.hostname}/${urlKey}`;
      const newData = new urlModel({
        urlKey,
        url: original_url
      });
      newData.save((error, data) => {
        return response.send({
          original_url,
          short_url
        });
      });
    } else {
      return response.status(404).send({
          error: 'This url is not valid'
        });
    }
  },
  
  fetchResult(request, response) {
      const { value } = request.params;
      let urlKey = value;
      urlModel.find({
        urlKey
      }).then((result) => {
        if (!result.length) {
          return response.status(404).send({
            error: 'This url does not exist in the database'
          });
        }
        return response.redirect(`${result[0].url}`);
      });
  }
}

module.exports = urlController;