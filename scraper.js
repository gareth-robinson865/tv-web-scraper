const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.amazon.co.uk/Samsung-OLED-Built-LaserSlim-Ultrawide/dp/B09YMFT5MQ';

//create an object to hold the product information
const product = {name: '', price: '', link: ''}

async function scrape() {
    //Fetching the data
    const { data } = await axios.get(url);
    //console.log(data);

    //use cheerio to load up the specific html information that we are looking for
    const $ = cheerio.load(data) //passing the huge wad of information that is extracted from the url to cheerio
    const item =$('div#titleSection')
    //how to extract the specific information that we want
    //!These are the elements needed to parse
    // h1 span#productTitle ---> title
    //span.a-price-whole ---> price
    //div#centerCol.centerColAlign.centerColAlign-bbcxoverride ---> main div to house the lot
    product.name = $(item).find('h1 span#productTitle').text();
    //console.log(product.name)
    product.url = url;
    //console.log(url);
    const price = $(item).find('span .a-price-whole').first().text().replace(/[,.]/g, '');
    console.log(price);
}

scrape()