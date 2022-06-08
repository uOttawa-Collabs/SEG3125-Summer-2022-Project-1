$(document).ready(() => {
    const header = $("#header");
    header.load("components/nav.html", () => {
        const htmlDocument = document.location.pathname.match(/[^\/]+$/)[0];
        header.find("a[href='" + htmlDocument + "']").addClass("active");

        switch (htmlDocument) {
            case "index.html":
                $("#navbar").addClass("fixed-top");
                break;
            default:
                break;
        }
    });

    const f = () => {
        alert("Sorry, this is a static serverless frontend page.\nSign up and Sign in functionality is unavailable.");
    };
    $("#navbar-button-sign-up").click(f);
    $("#navbar-button-sign-in").click(f);
});
