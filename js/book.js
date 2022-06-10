$(document).ready(() => {
    const bookingTitle = $("#booking-title");
    const bookingDateInput = $("#booking-date-input");
    const bookingTimeInputStart = $("#booking-time-input-start");
    const bookingTimeInputEnd = $("#booking-time-input-end");
    const bookingNextStepButton = $("#booking-next-step-button");
    const bookingPreviousStepButton = $("#booking-previous-step-button");
    const bookingCostTableBody = $("#booking-input-fragment-step-2-cost-table > tbody:last-child");

    // Verify if there are parameters
    let type = getQueryVariable("type");
    let data = getQueryVariable("data");
    if (type === false || data === false) {
        console.error("Invalid parameters: type = " + type + ", data = " + data);
        location.replace("index.html");
    }
    type = decodeURI(type);
    data = JSON.parse(decodeURI(data));

    // Set title
    if (type === "lounge") {
        bookingTitle.text("Booking  " + data["name"]);
    } else if (type === "private") {
        bookingTitle.text("Booking a Private Room in " + data["lounge"]["name"] + " with " + data["name"]);
    }

    class Progress {
        constructor(jQProgressStepUL, jQProgressBar, stepCount) {
            this.progressStepUL = jQProgressStepUL;
            this.progressBar = jQProgressBar;
            this.stepCount = stepCount;

            // Initialize DOM
            for (let i = 1; i <= stepCount; ++i) {
                jQProgressStepUL.append("<li class='progress-step'>" + i + "</li>");
            }

            if (stepCount < 2) {
                jQProgressBar.parent().css("display", "none");
                jQProgressStepUL.parent().css("width", "inherit");
            }

            // Show progress
            jQProgressStepUL.parent().parent().css("visibility", "visible");
        }

        clearProgress() {
            this.progressStepUL.children().each((_, element) => {
                $(element).removeClass("active");
            });

            this.progressBar.css("width", "0");
            this.progressBar.attr("aria-valuenow", "0");
        }

        setStep(step) {
            this.step = step;

            let progressBarValue;
            try {
                progressBarValue = (step - 1) / (this.stepCount - 1) * 100;
            } catch (_) {
                progressBarValue = 0;
            }

            this.progressBar.css("width", parseFloat(progressBarValue) + "%");
            this.progressBar.attr("aria-valuenow", parseFloat(progressBarValue));
            this.progressStepUL.children().each((index, element) => {
                if (index < step) {
                    $(element).addClass("active");
                } else {
                    $(element).removeClass("active");
                }
            });
        }

        reset() {
            // Hide progress
            this.progressStepUL.parent().parent().css("visibility", "hidden");

            // In case there is the special case
            this.progressBar.parent().css("display", "block");
            this.progressStepUL.parent().css("width", "100%");

            // Clear Progress
            this.clearProgress();

            // Remove all steps
            this.progressStepUL.empty();
        }
    }

    let progress = new Progress($("#progress-step-ul"), $("#progress-bar"), 3);
    let currentStep = 0;
    const updateButtonAction = () => {
        if (currentStep <= 1) {
            bookingPreviousStepButton.prop("disabled", true);
        } else {
            bookingPreviousStepButton.prop("disabled", false);
        }

        if (currentStep === 2) {
            bookingNextStepButton.text("Pay with Credit Card >");
        } else {
            bookingNextStepButton.text("Continue to the Next Step >");
        }

        if (currentStep >= progress.stepCount) {
            bookingPreviousStepButton.prop("disabled", true);
            bookingNextStepButton.prop("disabled", true);
            bookingNextStepButton.text("Finished!");
        }
    };
    const updateFragmentAction = () => {
        $("#booking-input-fragment-container").children().each((_, element) => {
            try {
                const step = Number($(element).attr("id").match(/^.*-(\d+)$/)[1]);
                if (currentStep === step) {
                    $(element).css("display", "flex")
                } else {
                    $(element).css("display", "none");
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
    const nextPageAction = () => {
        if (currentStep < progress.stepCount) {
            ++currentStep;
            progress.setStep(currentStep);
            updateFragmentAction()
            updateButtonAction();
            if (currentStep === progress.stepCount) {
                window.onbeforeunload = () => {};
            }
        }
    };
    const previousPageAction = () => {
        if (currentStep > 1) {
            --currentStep;
            progress.setStep(currentStep);
            updateFragmentAction()
            updateButtonAction();
        }
    };
    const updateCostTableAction = () => {
        bookingCostTableBody.empty();

        let serviceName;
        if (type === "lounge") {
            serviceName = data["name"];
        } else {
            serviceName = "Private Room in " + data["lounge"]["name"] + " with " + data["name"];
        }

        let t = bookingTimeInputStart.val().split(":");
        let timeStart = Number(t[0]) * 60 + Number(t[1]);

        t = bookingTimeInputEnd.val().split(":");
        let timeEnd = Number(t[0]) * 60 + Number(t[1]);

        let hours = Math.abs(timeEnd - timeStart) / 60.0;
        let serviceCost = hours * Number(data["pricing"]["quantity"]);
        let unit = data["pricing"]["currency"];
        let hst = serviceCost * 0.13;

        bookingCostTableBody.append(
            "<tr>"
            + "<td>" + serviceName + " (" + hours.toFixed(2) + " hours" + ")" + "</td>"
            + "<td>" + unit + serviceCost.toFixed(2) + "</td>"
            + "</tr>"
        );
        bookingCostTableBody.append(
            "<tr>"
            + "<td>HST</td>"
            + "<td>" + unit + hst.toFixed(2) + "</td>"
            + "</tr>"
        );
        bookingCostTableBody.append(
            "<tr>"
            + "<td>Total</td>"
            + "<td>" + unit + (serviceCost + hst).toFixed(2) + "</td>"
            + "</tr>"
        );
    }

    nextPageAction();
    bookingNextStepButton.click(nextPageAction);
    bookingPreviousStepButton.click(previousPageAction);

    $(".booking-payment-platform-link").each((_, element) => {
        $(element).click(nextPageAction);
    });

    bookingTimeInputStart.change(updateCostTableAction);
    bookingTimeInputEnd.change(updateCostTableAction);

    // Date selector default to today
    const today = new Date().toISOString().substring(0, 10);
    bookingDateInput.attr("min", today);
    bookingDateInput.val(today);
    
    $("#main").css("visibility", "visible");
});

// Add a warning when leaving the page
window.onbeforeunload = () => {
    return true;
};
