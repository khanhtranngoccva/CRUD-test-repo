const deleteAllQuotes = document.querySelector("#deleteAll");
deleteAllQuotes.addEventListener("click",async function(e) {
    e.preventDefault();
    const response = await fetch("/deleteAllQuotes", {
        method: "DELETE",
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