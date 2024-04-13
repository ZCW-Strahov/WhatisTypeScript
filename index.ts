// Import stylesheets
//import'./style.css';


const form: HTMLFormElement | null = document.querySelector('#defineform') as HTMLFormElement
form.onsubmit = () => {
  const formData = new FormData(form);

  
  const text = formData.get('defineword') as string;
  console.log(text);
  const apiURL: string = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
  console.log(apiURL);

  fetch(apiURL)
      .then(response => response.json()) // Convert the response to JSON
      .then(data => {
        const resultsContainer = document.getElementById('results'); // Get the container for displaying results
        if (!resultsContainer) {
          console.error('Results container not found.');
          return;
        }

        resultsContainer.innerHTML = '';

        if (Array.isArray(data) && data.length > 0) {

          const wordElement = document.createElement('h2'); // Creates h2
          wordElement.textContent = `${data[0].word} ${data[0].phonetic ? '(' + data[0].phonetic + ')' : ''}`; // Adds the text
          resultsContainer.appendChild(wordElement); // adds the h2 to the result container
          
          // Iterate through the meanings in the JSON response
          data[0].meanings.forEach((meaning: any) => {
            const partOfSpeechElement = document.createElement('h3'); // Create a h3 to hold the PoS
            partOfSpeechElement.textContent = meaning.partOfSpeech; // Adds the PoS text
            resultsContainer.appendChild(partOfSpeechElement); // Add to results container
            
            const list = document.createElement('ul'); // Creates an unordered list
            meaning.definitions.forEach((def: any) => { // Iterated of definitions
              const defItem = document.createElement('li'); // Create a list item
              defItem.textContent = def.definition; // Add the definition text
              list.appendChild(defItem); // Add to the list
              
              if (def.example) { // If there is an example
                const example = document.createElement('p'); // Create a paragraph tag
                example.style.fontStyle = 'italic'; // Change the font to italic
                example.textContent = `Example: ${def.example}`; // set the text example to 'Example: <Example>'
                defItem.appendChild(example); // Append the example
              }
            }); // End of ForEach
            resultsContainer.appendChild(list); // Append the entire list to the results container
          });
        } else {
          resultsContainer.textContent = 'No results found.'; 
        }
      })
      // Error handling
      .catch(error => {
        console.error("Error fetching data:", error);
        const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
          resultsContainer.textContent = 'Failed to fetch data.';
        }
      });

    return false; // Prevent form reload
  };