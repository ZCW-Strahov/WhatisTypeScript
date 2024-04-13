// Import stylesheets
//import'./style.css';


const form: HTMLFormElement | null = document.querySelector('#defineform') as HTMLFormElement
form.onsubmit = () => {
  const formData = new FormData(form);

  
  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);
  const apiURL: string = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
  console.log(apiURL);

  fetch(apiURL)
  .then(response => console.log(response.json()))
  .catch(error => console.log(error));

  return false; // prevent reload
} 