const deleteOneQuote = document.querySelector("#deleteOne");
deleteOneQuote.addEventListener("click",async function(e) {
    e.preventDefault();
    const response = await fetch("/deleteOneQuote", {
        method: "DELETE",
        body: JSON.stringify({name: "Darth Vader"}),
        headers: {"Content-Type": "application/json"},
    });
    const json = await response.json();
    if (json.success) {
        const deletedCount = json.deletedCount;
        console.log("Deleted quotes:", json.deletedCount);
        location.reload();
    } else {
        console.error(json.message);
    }
})