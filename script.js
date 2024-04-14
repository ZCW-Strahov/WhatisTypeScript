//searchinput
//searchbtn




const dictionary = (word) => {
    const options = {
        method: 'GET'
    };

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();

        })
        .then(data => {
            // Assuming the response is an array, we take the first item
            const entry = data[0];
            if (!entry) {
                throw new Error('No definition found');

            }
            const wordElement = document.getElementById('word');
            const definitionElement = document.getElementById('definition');

            // Update the content of the word and definition elements
           wordElement.textContent = entry.word;
           definitionElement.textContent = entry.meanings[0].definitions[0].definition



        })
        .catch(err => {
            console.error(err);
        });
}


    const searchbtn = document.getElementById('searchbtn');
    const searchinput = document.getElementById('searchinput');


    searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    dictionary(searchinput.value);
    });

