/*
 * Helpers for various tasks
 *
 */

// Dependencies
const path = require('path');
const fs = require('fs');

// Container for all the helpers
const helpers = {};

// Get the string content of a template, and use provided data for string interpolation
helpers.getTemplate = function(templateName,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  if(templateName){
    const templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err,str){
      if(!err && str && str.length > 0){
        callback(false,str);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helpers.addUniversalTemplates = function(str,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  // Get the header
  helpers.getTemplate('_header',function(err,headerString){
    if(!err && headerString){
      // Get the footer
      helpers.getTemplate('_footer',function(err,footerString){
        if(!err && footerString){
          // Add them all together
          const fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};



// Export the module
module.exports = helpers;