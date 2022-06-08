$(document).ready(() => {
    const listContainer = $("#list-container");
    const listItemPrototype = $("#lounge-list-prototype");
    const sortBarSelect = $("#sort-bar-select");
    const sortBarSelectOrder = $("#sort-bar-select-order");

    const bookButtonAction = (json) => {
        return (event) => {
            // TODO
            console.log("Book button");
            console.log(json);
            console.log(event);
        };
    };
    const viewMapButtonAction = (json) => {
        return () => {
            window.open("https://www.google.com/maps/search/" + json["address"]);
        };
    };

    const sortItem = (itemList, comparator) => {
        const itemArray = itemList.children();
        const newItemArray = itemArray.sort(comparator);
        itemList.append(newItemArray);
    };

    const sortAction = () => {
        const sortBy = sortBarSelect.val();
        const order = sortBarSelectOrder.val();

        switch (sortBy) {
            case "suggested":
                sortItem(listContainer, (itemA, itemB) => {
                    const scoring = (rating, comment, distance, price) => {
                        // Extremely simple suggestion algorithm...
                        return rating * 100 + comment * 0.01 - distance * 0.5 + price * 2;
                    };
                    const scoreA = scoring(
                        Number($(itemA).find(".lounge-list-item-rating-text").text()),
                        Number($(itemA).find(".lounge-list-item-rating-comment-count").text()),
                        Number($(itemA).find(".lounge-list-item-description-info-distance-quantity").text()),
                        Number($(itemA).find(".lounge-list-item-description-pricing-quantity").text())
                    );

                    const scoreB = scoring(
                        Number($(itemB).find(".lounge-list-item-rating-text").text()),
                        Number($(itemB).find(".lounge-list-item-rating-comment-count").text()),
                        Number($(itemB).find(".lounge-list-item-description-info-distance-quantity").text()),
                        Number($(itemB).find(".lounge-list-item-description-pricing-quantity").text())
                    );

                    return Number(order) * (scoreA - scoreB);
                });
                break;
            case "rating":
                sortItem(listContainer, (itemA, itemB) => {
                    return Number(order)
                        * (Number($(itemA).find(".lounge-list-item-rating-text").text())
                            - Number($(itemB).find(".lounge-list-item-rating-text").text()));
                });
                break;
            case "price":
                sortItem(listContainer, (itemA, itemB) => {
                    return Number(order)
                        * (Number($(itemA).find(".lounge-list-item-description-pricing-quantity").text())
                            - Number($(itemB).find(".lounge-list-item-description-pricing-quantity").text()));
                });
                break;
            case "distance":
                sortItem(listContainer, (itemA, itemB) => {
                    return Number(order)
                        * (Number($(itemA).find(".lounge-list-item-description-info-distance-quantity").text())
                            - Number($(itemB).find(".lounge-list-item-description-info-distance-quantity").text()));
                });
                break;
            case "alphabetical":
                sortItem(listContainer, (itemA, itemB) => {
                    const textA = $(itemA).find(".lounge-list-item-description-name").text();
                    const textB = $(itemB).find(".lounge-list-item-description-name").text();
                    if (textA === textB) {
                        return 0;
                    } else if (textA < textB) {
                        return -Number(order);
                    } else {
                        return Number(order);
                    }
                });
                break;
            case "comment":
                sortItem(listContainer, (itemA, itemB) => {
                    return Number(order)
                        * (Number($(itemA).find(".lounge-list-item-rating-comment-count").text())
                            - Number($(itemB).find(".lounge-list-item-rating-comment-count").text()));
                });
                break;
            default:
                console.error("Unknown sorting criteria " + sortBy);
        }
    };

    fetch("data/data-generator.js/lounge.json")
        .then(response => response.json())
        .then(json => {
            json.forEach((currentValue) => {
                let listItem = listItemPrototype.clone();

                // Set item ID
                listItem.attr("id", "lounge-list-" + currentValue["id"]);

                // Set lounge name
                listItem.find(".lounge-list-item-description-name").text(currentValue["name"]);

                // Set lounge description
                listItem.find(".lounge-list-item-description-paragraph").text(currentValue["description"]);

                // Set lounge thumbnail
                listItem.find(".lounge-thumbnail").attr("src", currentValue["thumbnail"]);

                // Set lounge pricing
                listItem.find(".lounge-list-item-description-pricing-quantity").text(currentValue["pricing"]["quantity"]);
                listItem.find(".lounge-list-item-description-pricing-currency").text(currentValue["pricing"]["currency"]);
                listItem.find(".lounge-list-item-description-pricing-unit").text(currentValue["pricing"]["unit"]);

                // Set closed status
                const closedMessage = listItem.find(".lounge-list-item-description-info-closed-message");
                closedMessage.text(currentValue["closed"]["message"]);
                if (currentValue["closed"]["status"]) {
                    closedMessage.css("color", "red");
                } else {
                    closedMessage.text("Open");
                }

                // Set business time
                listItem.find(".lounge-list-item-description-info-start-day").text(currentValue["businessTime"]["startDay"]);
                listItem.find(".lounge-list-item-description-info-end-day").text(currentValue["businessTime"]["endDay"]);
                listItem.find(".lounge-list-item-description-info-start-time").text(currentValue["businessTime"]["startTime"]);
                listItem.find(".lounge-list-item-description-info-end-time").text(currentValue["businessTime"]["endTime"]);

                // Set distance
                listItem.find(".lounge-list-item-description-info-distance-quantity").text(currentValue["distance"]["quantity"]);
                listItem.find(".lounge-list-item-description-info-distance-unit").text(currentValue["distance"]["unit"]);

                // Set book button action
                listItem.find(".lounge-list-item-button-book").click(bookButtonAction(currentValue));

                // Set view map button action
                listItem.find(".lounge-list-item-button-view-map").click(viewMapButtonAction(currentValue));

                // Set rating
                listItem.find(".lounge-list-item-rating-text").text(currentValue["comment"]["rating"]);

                // Set comment count
                listItem.find(".lounge-list-item-rating-comment-count").text(currentValue["comment"]["commentCount"]);

                // Show item
                listItem.css("display", "flex");

                // Insert item into list
                listContainer.append(listItem);
            });

            const selectPreferredOrderAction = () => {
                const map = new Map([
                    ["suggested", "-1"],
                    ["rating", "-1"],
                    ["price", "1"],
                    ["distance", "1"],
                    ["alphabetical", "1"],
                    ["comment", "-1"],
                ]);
                sortBarSelectOrder.val(map.get(sortBarSelect.val()));
                sortAction();
            }

            // Sort by default option first
            selectPreferredOrderAction();
            sortBarSelect.change(selectPreferredOrderAction);
            sortBarSelectOrder.change(sortAction);
        });
});
