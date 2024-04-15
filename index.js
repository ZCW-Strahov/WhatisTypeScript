document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById('startBtn');
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // We want to process speech once the button is clicked


    //this method will get transcript of voice and put it in the function of fetch api
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const word = transcript.trim().toLowerCase(); // Prepare the word for the API call
        fetchDictionaryData(word);
    };


    //if error occur in voice recognition
    recognition.onerror = function(event) {
        displayError("Voice recognition error. Please try again.");
    };


    //event when button is clicked
    startBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent any default button click behavior
        recognition.start(); // Start listening to speech
    });


    //Fetch from API
    function fetchDictionaryData(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => displayError("Error fetching data. Please try again later."));
    }
    //a




















    function displayResults(data) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        data.forEach(entry => {
            const word = entry.word;
            const phonetics = entry.phonetics;
            const meanings = entry.meanings;

            const entryDiv = document.createElement('div');
            entryDiv.classList.add('meaning');

            const wordHeading = document.createElement('h2');
            wordHeading.textContent = word;
            wordHeading.classList.add('text-2xl', 'font-bold', 'mb-2');
            entryDiv.appendChild(wordHeading);



            phonetics.forEach(phonetic => {
                if (phonetic.text) {
                    const phoneticSpan = document.createElement('span');
                    phoneticSpan.textContent = ` [${phonetic.text}]`;
                    entryDiv.appendChild(phoneticSpan);

                    if (phonetic.audio) {
                        const audio = document.createElement('audio');
                        audio.setAttribute('controls', '');
                        audio.classList.add('audio-controls');
                        const source = document.createElement('source');
                        source.setAttribute('src', phonetic.audio);
                        source.setAttribute('type', 'audio/mpeg');
                        audio.appendChild(source);
                        entryDiv.appendChild(audio);
                    }
                }
            });

            meanings.forEach(meaning => {
                const partOfSpeech = meaning.partOfSpeech;
                const definitions = meaning.definitions;

                const partOfSpeechPara = document.createElement('p');
                partOfSpeechPara.textContent = `(${partOfSpeech})`;
                partOfSpeechPara.classList.add('font-semibold', 'mb-1');
                entryDiv.appendChild(partOfSpeechPara);

                definitions.forEach(definition => {
                    const definitionPara = document.createElement('p');
                    definitionPara.textContent = `${definition.definition}`;
                    definitionPara.classList.add('mb-1');
                    entryDiv.appendChild(definitionPara);

                    if (definition.example) {
                        const examplePara = document.createElement('p');
                        examplePara.textContent = `Example: ${definition.example}`;
                        examplePara.classList.add('italic', 'text-gray-600');
                        entryDiv.appendChild(examplePara);
                    }
                });
            });





            resultsDiv.appendChild(entryDiv);
        });
    }

    function displayError(message) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        const errorPara = document.createElement('p');
        errorPara.textContent = message;
        errorPara.classList.add('text-red-500');
        resultsDiv.appendChild(errorPara);
    }
});