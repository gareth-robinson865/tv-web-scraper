const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.amazon.co.uk/Samsung-OLED-Built-LaserSlim-Ultrawide/dp/B09YMFT5MQ';

//create an object to hold the product information
const product = {name: '', price: '', link: ''}

async function scrape() {
    //Fetching the data
    const { data } = await axios.get(url);
    console.log(data);

    //use cheerio to load up the specific html information that we are looking for
    const $ = cheerio.load(data) //passing the huge wad of information that is extracted from the url to cheerio

    //how to extract the specific information that we want

}

scrape()