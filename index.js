// Import stylesheets
//import'./style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    var text = formData.get('defineword');
    console.log(text);
    var apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
    console.log(apiURL);
    fetch(apiURL)
        .then(function (response) { return response.json(); }) // Convert the response to JSON
        .then(function (data) {
        var resultsContainer = document.getElementById('results'); // Get the container for displaying results
        if (!resultsContainer) {
            console.error('Results container not found.');
            return;
        }
        resultsContainer.innerHTML = '';
        if (Array.isArray(data) && data.length > 0) {
            var wordElement = document.createElement('h2'); // Creates h2
            wordElement.textContent = "".concat(data[0].word, " ").concat(data[0].phonetic ? '(' + data[0].phonetic + ')' : ''); // Adds the text
            resultsContainer.appendChild(wordElement); // adds the h2 to the result container
            // Iterate through the meanings in the JSON response
            data[0].meanings.forEach(function (meaning) {
                var partOfSpeechElement = document.createElement('h3'); // Create a h3 to hold the PoS
                partOfSpeechElement.textContent = meaning.partOfSpeech; // Adds the PoS text
                resultsContainer.appendChild(partOfSpeechElement); // Add to results container
                var list = document.createElement('ul'); // Creates an unordered list
                meaning.definitions.forEach(function (def) {
                    var defItem = document.createElement('li'); // Create a list item
                    defItem.textContent = def.definition; // Add the definition text
                    list.appendChild(defItem); // Add to the list
                    if (def.example) { // If there is an example
                        var example = document.createElement('p'); // Create a paragraph tag
                        example.style.fontStyle = 'italic'; // Change the font to italic
                        example.textContent = "Example: ".concat(def.example); // set the text example to 'Example: <Example>'
                        defItem.appendChild(example); // Append the example
                    }
                }); // End of ForEach
                resultsContainer.appendChild(list); // Append the entire list to the results container
            });
        }
        else {
            resultsContainer.textContent = 'No results found.';
        }
    })
        // Error handling
        .catch(function (error) {
        console.error("Error fetching data:", error);
        var resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.textContent = 'Failed to fetch data.';
        }
    });
    return false; // Prevent form reload
};
