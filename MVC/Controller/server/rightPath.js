const path = require('path');

function getRightPath(pageName){
var filePath ="";
if(pageName === "")
    {
      filePath = path.join(__dirname, 'Model', '404.json');
    }
    else if (pageName === "Service")
      {
       filePath = path.join(__dirname, 'Model', 'Service.json');
      }
    else if (pageName === "Register" || pageName === "ContactUs" || pageName === "Login")
      {
       filePath = path.join(__dirname, 'Model', 'forms.json');
      }
    else
      {
      filePath = path.join(__dirname, 'Model', 'pages.json');
    }

    return filePath;
}
module.exports = getRightPath;