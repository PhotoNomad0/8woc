/**
 * Utility functions
 */

module.exports = {

    // Returns a deep clone of an object
    cloneObject: function(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        // give temp the original obj's constructor
        var temp = obj.constructor();
        for (var key in obj) {
            temp[key] = this.cloneObject(obj[key]);
        }
        return temp;
    },
    ajaxGet: function(url, isJSON = false) {
      return new Promise(function(resolve, reject) {
        if (url === undefined) {
          reject(new Error("URL is undefined"));
        }
        let request = new XMLHttpRequest();
        request.onload = function() {
          if (isJSON) {
            let res;
            try {
              res = JSON.parse(this.response);
            }
            catch(err) {
              reject(err);
            }
            resolve(res);
          }
          else {
            resolve(this.response);
          }
        };

        request.onerror = function(err) {
          reject(err);
        }
        request.open("GET", url, true);
        request.send();

      });
    }
};
