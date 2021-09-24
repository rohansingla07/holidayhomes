const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});// it will delete everything 
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60dca3ea509174473c6b8cff',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry : { 
                          type : "Point", 
                          coordinates : [ cities[random1000].longitude,
                                          cities[random1000].latitude 
                        ] },
            images : [
                {
                
                    url: 'https://res.cloudinary.com/dh9wkxpcy/image/upload/v1625114020/YelpCamp/jydaun54l8fdqkwvnfhv.jpg',
                    filename: 'YelpCamp/jydaun54l8fdqkwvnfhv'
                  },
                  {
                    url: 'https://res.cloudinary.com/dh9wkxpcy/image/upload/v1625114020/YelpCamp/edi5bhxwxsivm90swqxz.jpg',
                    filename: 'YelpCamp/edi5bhxwxsivm90swqxz'
                  },
                  {

                    url: 'https://res.cloudinary.com/dh9wkxpcy/image/upload/v1625114019/YelpCamp/dnlfro2e5k5tc9nnjp0h.jpg',
                    filename: 'YelpCamp/dnlfro2e5k5tc9nnjp0h'
                  },
                  {
                    url: 'https://res.cloudinary.com/dh9wkxpcy/image/upload/v1625114019/YelpCamp/vzs7b22bn29xcgebv7sw.jpg',
                    filename: 'YelpCamp/vzs7b22bn29xcgebv7sw'
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})