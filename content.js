function getSEOData() {
    const metaTag = document.querySelector("meta[name='description']");

    return {
        titleLength: document.title.length,
        metaDescription: metaTag ? metaTag.content : "",
        h1Count: document.querySelectorAll("h1").length,
        imagesWithoutAlt: [...document.images].filter(img => !img.alt).length,
        wordCount: document.body.innerText.split(/\s+/).length
    };
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_SEO_DATA") {
        sendResponse(getSEOData());
    }
});
