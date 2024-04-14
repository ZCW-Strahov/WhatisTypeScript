// Import stylesheets
//import './style.css';

interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryEntry {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchBtn') as HTMLButtonElement;
  const wordInput = document.getElementById('wordInput') as HTMLInputElement;
  const resultContainer = document.getElementById('result') as HTMLElement;

  searchButton.addEventListener('click', async () => {
      const word = wordInput.value.trim();

      if (!word) {
          resultContainer.innerHTML = `<p class="text-red-500">Please enter a word to look up.</p>`;
          return;
      }

      resultContainer.innerHTML = `<p>Loading...</p>`;

      try {
          const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
          const response = await fetch(apiUrl);
          if (!response.ok) {
              throw new Error('Failed to fetch definitions');
          }
          const entries: DictionaryEntry[] = await response.json();
          displayDefinitions(entries, resultContainer);
      } catch (error) {
          console.error('Fetch error:', error);
          resultContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
      }
  });
});

function displayDefinitions(entries: DictionaryEntry[], container: HTMLElement): void {
  container.innerHTML = ''; 

  entries.forEach(entry => {
      let htmlContent = `<div class="p-4 bg-gray-50 rounded-lg">
          <h2 class="text-lg font-bold">${entry.word}</h2>
          <p>Phonetic: ${entry.phonetics.map(p => p.text || '').join(', ')}</p>
          <div>`;

      entry.meanings.forEach(meaning => {
          htmlContent += `<p><strong>${meaning.partOfSpeech}:</strong> ${meaning.definitions.map(d => d.definition).join(', ')}</p>`;
      });

      htmlContent += `</div></div>`;
      container.innerHTML += htmlContent;
  });
}
