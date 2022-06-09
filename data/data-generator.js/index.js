const {uniqueNamesGenerator, colors, starWars, names} = require("unique-names-generator");
const fs = require("fs");

const streetTypes = ["road", "street", "boulevard", "lane", "drive", "way", "court", "plaza", "terrace", "run", "place", "bay", "crescent", "trail", "mews", "highway", "freeway", "parkway", "causeway", "circuit", "view", "byway", "cove", "row", "beltway", "quay", "crossing", "point", "pike", "square", "landing", "walk", "grove", "copse", "driveway", "trace", "circle", "channel", "grange", "park"];
const catBreeds = ["Abyssinian cat", "Aegean cat", "American Bobtail", "American Curl", "American Ringtail", "American Shorthair", "American Wirehair", "Cyprus cat", "Arabian Mau", "Asian cat", "Asian Semi-longhair", "Australian Mist", "Balinese cat", "Bambino cat", "Bengal cat", "Birman", "Bombay cat", "Brazilian Shorthair", "British Longhair", "British Shorthair", "Burmese cat", "Burmilla", "California Spangled", "Chantilly-Tiffany", "Chartreux", "Chausie", "Colorpoint Shorthair", "Cornish Rex", "Cymric cat", "Cyprus cat", "Devon Rex", "Donskoy cat", "Dragon Li", "Egyptian Mau", "European Shorthair", "Exotic Shorthair", "Foldex cat", "German Rex", "Havana Brown", "Highlander cata", "Himalayan cat", "Japanese Bobtail", "Javanese cat", "Kanaani cat", "Khao Manee", "Kinkalow", "Korat", "Korean Bobtail", "Kurilian Bobtail", "Lambkin", "LaPerm", "Lykoi", "Maine Coon", "Manx cat", "Mekong Bobtail", "Minskin", "Minuet cat", "Munchkin cat", "Nebelung", "Norwegian Forest cat", "Ocicat", "Ojos Azules", "Oregon Rex", "Oriental bicolour", "Oriental Longhair", "Oriental Shorthair", "Persian cat", "Traditional Persian", "Peterbald", "Pixie-bob", "Ragamuffin cat", "Ragdoll", "Raas cat", "Russian Blue", "Russian White", "Russian Black", "Russian Tabby", "Thai cat", "Savannah cat", "Scottish Fold", "Selkirk Rex", "Serengeti cat", "Serrade Petit", "Siamese cat", "Siberian cat", "Singapura cat", "Snowshoe cat", "Sokoke", "Somali cat", "Sphynx cat", "Suphalak", "Thai cat", "Korat", "Tonkinese cat", "Toybob", "Toyger", "Turkish Angora", "Turkish Van", "Van cat", "Ukrainian Levkoy", "York Chocolate"];
const catCharacteristics = ["Loving and Caring", "Curious", "Playful", "Cuddly", "Adventurous", "Silly and Goofy", "Funny", "Smart and Intelligent", "Friendly", "Affectionate", "Sleepy", "Happy", "Agile", "Stretchy", "Cute and Adorable"];

const templateLoungeJSON = {
    "id": "0", "name": "", "description": "", "address": "", "thumbnail": "asset/img/lounge-thumbnail.jpg", "pricing": {
        "quantity": 0, "currency": "CA$", "unit": "per hour"
    }, "closed": {
        "status": false, "message": "Temporary closed today"
    }, "businessTime": {
        "startDay": "Mon.", "endDay": "Fri.", "startTime": "9:30 AM", "endTime": "9:30 PM"
    }, "distance": {
        "quantity": 3, "unit": "km"
    }, "comment": {
        "rating": 0, "commentCount": 0
    }
};

const templateStarJSON = {
    "id": "0",
    "name": "",
    "description": "",
    "thumbnail": "asset/img/star-thumbnail.jpg",
    "species": "",
    "age": "",
    "characteristic": "",
    "lounge": {
        "id": "0", "name": ""
    },
    "pricing": {
        "quantity": 0, "currency": "CA$", "unit": "per hour"
    }
}

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
}

function randomBoolean() {
    return Math.random() < 0.5;
}

function randomChoose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateLoungeData(template, count) {
    const generateName = () => {
        const randomName = uniqueNamesGenerator({dictionaries: [colors]});
        return "Lounge " + capitalizeFirst(randomName);
    }

    const generateAddress = () => {
        const randomNumber = randomInt(1, 2000);
        const randomStreetName = uniqueNamesGenerator({dictionaries: [names]});
        const randomStreetType = randomChoose(streetTypes);
        return randomNumber.toString() + " " + capitalizeFirst(randomStreetName) + " " + capitalizeFirst(randomStreetType) + ", Ottawa, Ontario";
    }

    const generatePrice = () => {
        return randomInt(10, 20);
    }

    const generateDistance = () => {
        return randomInt(1, 15);
    }

    const generateRating = () => {
        return randomInt(3, 5) + randomInt(0, 10) / 10.0;
    }

    const generateCommentCount = () => {
        return randomInt(0, 5000);
    }

    let result = [];
    for (let i = 0; i < count; ++i) {
        let item = JSON.parse(JSON.stringify(template));
        item["id"] = i;

        // Make sure name is unique
        do {
            item["name"] = generateName();
        } while ((() => {
            for (let value of result) {
                if (value["name"] === item["name"]) {
                    return true;
                }
            }
            return false;
        })());

        item["description"] = "This is a short description for " + item["name"];
        item["address"] = generateAddress();
        item["pricing"]["quantity"] = generatePrice();
        item["closed"]["status"] = randomBoolean();
        item["closed"]["message"] = !item["closed"]["status"] ? "Open" : "Temporarily closed";
        item["distance"]["quantity"] = generateDistance();
        item["comment"]["rating"] = generateRating();
        item["comment"]["commentCount"] = generateCommentCount();
        result.push(item);
    }
    return result;
}

function generateStarData(template, count, lounges) {
    const generateName = () => {
        const randomName = uniqueNamesGenerator({dictionaries: [starWars]});
        return capitalizeFirst(randomName);
    }

    const generatePrice = () => {
        return randomInt(30, 50);
    }

    const generateSpecies = () => {
        return randomChoose(catBreeds);
    }

    const generateAge = () => {
        return randomInt(1, 15);
    }

    const generateCharacteristic = () => {
        return randomChoose(catCharacteristics);
    }


    let result = [];
    for (let i = 0; i < count; ++i) {
        let lounge = randomChoose(lounges);
        let item = JSON.parse(JSON.stringify(template));
        item["id"] = i;

        // Make sure name is unique
        do {
            item["name"] = generateName();
        } while ((() => {
            for (let value of result) {
                if (value["name"] === item["name"]) {
                    return true;
                }
            }
            return false;
        })());

        item["description"] = "This is a short description for " + item["name"];
        item["species"] = generateSpecies();
        item["age"] = generateAge();
        item["characteristic"] = generateCharacteristic();
        item["lounge"]["id"] = lounge["id"];
        item["lounge"]["name"] = lounge["name"];
        item["pricing"]["quantity"] = generatePrice();
        result.push(item);
    }
    return result;
}

function main() {
    const lounges = generateLoungeData(templateLoungeJSON, 10);
    fs.writeFile("lounge.json", JSON.stringify(lounges), (e) => {
        if (e) {
            throw e;
        } else {
            console.log("Finished generating lounges");
        }
    });
    const stars = generateStarData(templateStarJSON, 10, lounges);
    fs.writeFile("star.json", JSON.stringify(stars), (e) => {
        if (e) {
            throw e;
        } else {
            console.log("Finished generating stars");
        }
    });
}

main();
