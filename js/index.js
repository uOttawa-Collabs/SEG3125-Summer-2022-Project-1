$(document).ready(() => {
    const geoApifyKey = "f5c6d8ecbd04483d8a60c8140b9d583b";
    const searchFormInputRegion = $("input#search-form-input-region");
    const searchFormInputAddress = $("input#search-form-input-address");
    const searchFormInputDate = $("input#search-form-input-date");
    const searchFormButton = $("button#search-form-button");
    const searchFormLinkDetectLocation = $("a#search-form-link-detect-location");

    searchFormInputRegion.autocomplete({
        source: ["British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "New Brunswick", "Nova Scotia", "Prince Edward Island", "Newfoundland and Labrador", "Yukon", "Northwest Territories", "Nunavut"]
    });

    searchFormInputAddress.autocomplete({
        source: (request, response) => {
            fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=" + request.term + "&apiKey=" + geoApifyKey, {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => {
                    let result = [];
                    json["features"].forEach((currentValue) => {
                        result.push(currentValue["properties"]["formatted"]);
                    });
                    response(result);
                });
        }
    })

    searchFormButton.click(() => {
        window.location.href = "visit-a-lounge.html";
    });

    searchFormLinkDetectLocation.click(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetch("https://api.geoapify.com/v1/geocode/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&apiKey=" + geoApifyKey)
                    .then(response => response.json())
                    .then(json => {
                        searchFormInputRegion.val(json["features"][0]["properties"]["state"]);
                        searchFormInputAddress.val(json["features"][0]["properties"]["formatted"]);
                    });
            });
        } else {
            searchFormLinkDetectLocation.text("Sorry, your browser does not support this feature.");
        }
    });
});
