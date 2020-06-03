var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyAYu...'
});
var base = Airtable.base('appOlJ...');