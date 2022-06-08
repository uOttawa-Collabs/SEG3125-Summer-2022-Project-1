$(document).ready(() => {
    const header = $("#header");
    header.load("components/nav.html", () => {
        let documentName;
        try {
            documentName = document.location.pathname.match(/[^\/]+$/)[0];
            if (!documentName.endsWith(".html")) {
                documentName += ".html";
            }
        } catch (ignored) {
            documentName = "index.html";
        }

        header.find("a[href='" + documentName + "']").addClass("active");

        switch (documentName) {
            case "index.html":
                $("#navbar").addClass("fixed-top");
                break;
            default:
                break;
        }

        const f = () => {
            alert("Sorry, this is a static serverless frontend page.\nSign up and Sign in functionality is unavailable.");
        };
        $("#navbar-button-sign-up").click(f);
        $("#navbar-button-sign-in").click(f);
    });
});
