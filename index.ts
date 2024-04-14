interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Entry {
  word: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
}

function fetchDefinition(): void {
  const wordInput = document.getElementById('wordInput') as HTMLInputElement;
  const word = wordInput.value.trim().toLowerCase();
  if (!word) {
      displayError('Please enter a word.');
      return;
  }

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(apiUrl)
      .then(response => response.json())
      .then((entries: Entry[]) => displayResults(entries))
      .catch(err => {
          console.error('Fetch error:', err);
          displayError("Failed to fetch definition. Please try again.");
      });
}

function displayResults(entries: Entry[]): void {
  const container = document.getElementById('resultsContainer');
  if (!container) return;

  container.innerHTML = ''; // Clear previous results

  if (!entries.length) {
      displayError('No definitions found.');
      return;
  }

  entries.forEach(entry => {
      const phoneticsText = entry.phonetics.map(ph => ph.text).join(', ');
      const phoneticsAudio = entry.phonetics.filter(ph => ph.audio).map(ph => `<audio controls src="${ph.audio}"></audio>`).join(' ');

      let htmlContent = `<div class="mb-6">
          <h2 class="text-lg font-semibold">${entry.word} [${phoneticsText}]</h2>
          ${phoneticsAudio}
          <p><em>Origin:</em> ${entry.origin || 'No origin information available.'}</p>
      `;

      entry.meanings.forEach(meaning => {
          htmlContent += `<div class="mt-4">
              <h3 class="font-bold">${meaning.partOfSpeech}</h3>
              ${meaning.definitions.map(def => `<p><strong>Definition:</strong> ${def.definition}<br>
              <strong>Example:</strong> ${def.example || 'No example available.'}</p>`).join('')}
          </div>`;
      });

      htmlContent += '</div>';
      container.innerHTML += htmlContent;
  });
}

function displayError(message: string): void {
  const container = document.getElementById('resultsContainer');
  if (container) {
      container.innerHTML = `<p class="text-red-500">${message}</p>`;
  }
}
