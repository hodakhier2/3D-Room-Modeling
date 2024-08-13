const db = require('./db');

function getForm(formId){
  return new Promise((resolve, reject) => 
  {
    const query = `
    SELECT forms.formId, forms.pageId, forms.formContent, forms.formName,
           inputs.type, inputs.name, inputs.className, inputs.placeholder, inputs.value, inputs.inputId
    FROM forms 
    INNER JOIN inputs ON forms.formId = inputs.formId 
    WHERE forms.formId = ?;
  `;

  db.query(query, [formId], (err, results) => {
    if (err) {
      console.error("Error", err);
      reject(err);
    }
    else{
      if (results.length > 0) {
        const form = {
          formId: results[0].formId,
          pageId: results[0].pageId,
          formContent: results[0].formContent,
          formName: results[0].formName,
          inputs: results.map(row => ({
            type: row.type,
            name: row.name,
            className: row.className,
            placeholder: row.placeholder,
            value: row.value
          }))
        }
        console.log("Success",results);
        resolve(form);
        //return form;
    }}
  });})}

 
module.exports = {getForm};

  