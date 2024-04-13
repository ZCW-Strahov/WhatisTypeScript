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
  return false; // prevent reload
}

