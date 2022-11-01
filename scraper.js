const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.amazon.co.uk/Samsung-OLED-Built-LaserSlim-Ultrawide/dp/B09YMFT5MQ';

async function scrape() {
    //Fetching the data
    const { data } = await axios.get(url);
    console.log(data);
}

scrape()