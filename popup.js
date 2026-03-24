function calculateScore(data) {
    let score = 100;
    let suggestions = [];

    if (data.titleLength < 30 || data.titleLength > 60) {
        score -= 10;
        suggestions.push("Optimize title length (30-60 chars)");
    }

    if (!data.metaDescription) {
        score -= 15;
        suggestions.push("Add meta description");
    }

    if (data.h1Count === 0) {
        score -= 10;
        suggestions.push("Add at least one H1 tag");
    }

    if (data.imagesWithoutAlt > 0) {
        score -= 10;
        suggestions.push("Add alt text to images");
    }

    return { score, suggestions };
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "GET_SEO_DATA" },
            (data) => {
                const result = calculateScore(data);

                document.getElementById("score").innerText = "Score: " + result.score;

                document.getElementById("title").innerText = data.titleLength;
                document.getElementById("meta").innerText = data.metaDescription ? "Yes" : "No";
                document.getElementById("h1").innerText = data.h1Count;
                document.getElementById("alt").innerText = data.imagesWithoutAlt;
                document.getElementById("words").innerText = data.wordCount;

                const sugDiv = document.getElementById("suggestions");
                sugDiv.innerHTML = "<b>Suggestions:</b><br>" + result.suggestions.join("<br>");
            }
        );
    });
});
