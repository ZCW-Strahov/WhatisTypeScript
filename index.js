"use strict";
// Import stylesheets
//import './style.css';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchBtn');
    const wordInput = document.getElementById('wordInput');
    const resultContainer = document.getElementById('result');
    searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const word = wordInput.value.trim();
        if (!word) {
            resultContainer.innerHTML = `<p class="text-red-500">Please enter a word to look up.</p>`;
            return;
        }
        resultContainer.innerHTML = `<p>Loading...</p>`;
        try {
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch definitions');
            }
            const entries = yield response.json();
            displayDefinitions(entries, resultContainer);
        }
        catch (error) {
            console.error('Fetch error:', error);
            resultContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
        }
    }));
});
function displayDefinitions(entries, container) {
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
