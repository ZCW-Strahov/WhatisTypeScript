const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
let inpWord = document.getElementById("inp-word").value;
fetch(`${url}${inpWord}`)
.then((response) => response.json())
.then((data) => {
//console.log(data);
//const synonyms = [];
//for(let i= 0;i<data[0].meanings[0].synonyms.length;i++){
//synonyms[i] = data[0].meanings[0].synonyms[i];
//}

result.innerHTML = `<div class="word">
                                       <h3>${inpWord}</h3>
                                       <button onclick = "playSound()">
                                           <i class="fa-solid fa-music"></i>
                                       </button>
                                   </div>
                                   <div class="details">
                                       <p>${data[0].meanings[0].partOfSpeech}</p>
                                       <p> ${data[0].phonetics[0].text}</p>
                                   </div>

                                   <p class="word-meaning">
                                   ${data[0].meanings[0].definitions[1].definition}
                                   </p>
                                   <p class="word-example">
                                    Synonyms: ${data[0].meanings[0].synonyms.join(', ')}<br>
                                    Antonyms: ${data[0].meanings[0].antonyms.join(', ')}
                                   </p>`;
                                   sound.setAttribute("src",`https:${data[0].phonetics[0].audio}`);
});

});
function playSound(){
sound.play();
}
