$(document).ready(() => {
    const listContainer = $("#list-container");
    const listItemPrototype = $("#star-list-item-prototype");
    const searchBarInput = $("#search-bar-input");

    const bookButtonAction = (json) => {
        return () => {
            window.open("book.html?type=private&data=" + JSON.stringify(json));
        };
    };

    const viewLoungeDetailsActions = (json) => {
        return () => {
            window.open("visit-a-lounge.html?search=" + json["lounge"]["name"]);
        };
    };

    const searchAction = () => {
        const target = searchBarInput.val().trim().toLowerCase();
        const itemArray = listContainer.children();

        if (target === "") {
            itemArray.each((_, element) => {
                $(element).css("display", "flex");
            });
            return;
        }

        itemArray.each((_, element) => {
            const currentItem = $(element);
            const name = currentItem.find(".star-list-item-description-name").text().toLowerCase();
            if (name.includes(target)) {
                currentItem.css("display", "flex");
            } else {
                currentItem.css("display", "none");
            }
        });
    };

    fetch("data/data-generator.js/star.json")
        .then(response => response.json())
        .then(json => {
            json.forEach((currentValue) => {
                let listItem = listItemPrototype.clone();

                // Set item ID
                listItem.attr("id", "star-list-item-" + currentValue["id"]);

                // Set name
                listItem.find(".star-list-item-description-name").text(currentValue["name"]);

                // Set description
                listItem.find(".star-list-item-description-paragraph").text(currentValue["description"]);

                // Set lounge thumbnail
                listItem.find(".star-thumbnail").attr("src", currentValue["thumbnail"]);

                // Set pricing
                listItem.find(".star-list-item-description-pricing-quantity").text(currentValue["pricing"]["quantity"]);
                listItem.find(".star-list-item-description-pricing-currency").text(currentValue["pricing"]["currency"]);
                listItem.find(".stars-list-item-description-pricing-unit").text(currentValue["pricing"]["unit"]);

                // Set species
                listItem.find(".star-list-item-description-info-species").text(currentValue["species"]);

                // Set age
                listItem.find(".star-list-item-description-info-age").text(currentValue["age"]);

                // Set characteristic
                listItem.find(".star-list-item-description-info-characteristic").text(currentValue["characteristic"]);

                // Set lounge
                listItem.find(".star-list-item-button-book-text-lounge").text(currentValue["lounge"]["name"]);

                // Show item
                listItem.css("display", "flex");

                // Set book button action
                listItem.find(".star-list-item-button-book").click(bookButtonAction(currentValue));

                // Set view lounge details button action
                listItem.find(".star-list-item-button-view-lounge-details").click(viewLoungeDetailsActions(currentValue));

                // Insert item into list
                listContainer.append(listItem);
            });

            searchBarInput.keyup(searchAction);
        });
});
