const {uniqueNamesGenerator, countries, starWars, names} = require("unique-names-generator");
const fs = require("fs");

const streetTypes = ["road", "street", "boulevard", "lane", "drive", "way", "court", "plaza", "terrace", "run", "place", "bay", "crescent", "trail", "mews", "highway", "freeway", "parkway", "causeway", "circuit", "view", "byway", "cove", "row", "beltway", "quay", "crossing", "point", "pike", "square", "landing", "walk", "grove", "copse", "driveway", "trace", "circle", "channel", "grange", "park"];

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

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
}

function randomBoolean() {
    return Math.random() < 0.5;
}

function generateLoungeData(template, count) {
    const generateLoungeName = () => {
        const randomName = uniqueNamesGenerator({dictionaries: [countries]});
        return "Lounge " + randomName.charAt(0).toUpperCase() + randomName.slice(1);
    }

    const generateAddress = () => {
        const randomNumber = randomInt(1, 2000);
        const randomStreetName = uniqueNamesGenerator({dictionaries: [names]});
        const randomStreetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
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
        item["name"] = generateLoungeName();
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

function main() {
    fs.writeFile("lounge.json", JSON.stringify(generateLoungeData(templateLoungeJSON, 10)), (e) => {
        if (e) {
            throw e;
        } else {
            console.log("Finished")
        }
    });
}

main();
