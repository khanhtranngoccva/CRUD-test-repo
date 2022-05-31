const replaceButton = document.querySelector("#replace");

replaceButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const result = await fetch("/updateQuote", {
        method: "PUT",
        // Must be JSON.
        body: JSON.stringify({
            name: "Darth Vader",
            quote: "I find your lack of faith disturbing."
        }),
        // This allows body-parser to detect it's a JSON.
        headers: {
            "Content-Type": "application/json",
        }
    });
    const resultJSON = await result.json();
    if (resultJSON.success) {
        location.reload();
    } else {
        console.error("Something wrong happened");
    }
})

