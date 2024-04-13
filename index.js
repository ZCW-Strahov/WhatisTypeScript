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
    fetch(apiURL).then(function (response) { return console.log(response.json()); }).catch(function (error) { return console.log(error); });
    return false; // prevent reload
};
