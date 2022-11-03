const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSID, authToken);

const url = 'https://www.amazon.co.uk/Samsung-OLED-Built-LaserSlim-Ultrawide/dp/B09YMFT5MQ';

//create an object to hold the product information
const product = {name: '', price: '', link: ''}

const handle = setInterval(scrape(), 200)

async function scrape() {
    //Fetching the data
    const { data } = await axios.get(url);
    //console.log(data);

    //use cheerio to load up the specific html information that we are looking for
    const $ = cheerio.load(data) //passing the huge wad of information that is extracted from the url to cheerio
    const item =$('div#dp')
    //how to extract the specific information that we want
    
    product.name = $(item).find('h1 span#productTitle').text();
    product.link = url;
    const checkPrice = $(item).find('span .a-price-whole').first().text().replace(/[,.]/g, '');
    const price = parseInt(checkPrice);
    product.price = price;

    //sending a message
    if(product.price < 1200) {
       client.messages.create({
        body: `The price of ${product.name} has changed to ${product.price}. Click here to go buy ${product.link}`,
        from: '+15802178958',
        to: process.env.PHONE_NUMBER,
       })
       .then((message) => {
        console.log(message);
        
       });
    }
}

scrape()