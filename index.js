// Import stylesheets
//import'./style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    console.log(formData);
    var text = formData.get('defineword');
    console.log(text);
    var apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
    console.log(apiURL);
    return false; // prevent reload
};
