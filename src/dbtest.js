const axios = require('axios');

// JSON-Daten, die du senden möchtest
const data = {
  name: 'Entwickler Nr.22',
  dampft: true
};

// URL, an die der POST-Request gesendet werden soll
const url = 'http://localhost:3000/angestellte';

// Führe den POST-Request mit axios aus
axios.post(url, data)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
