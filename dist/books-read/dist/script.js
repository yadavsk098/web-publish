// Inside script.js

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const pdfInput = document.getElementById('pdfInput');
const readButton = document.getElementById('readButton');
const pdfViewer = document.getElementById('pdfViewer');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageCount = document.getElementById('pageCount');
const speakButton = document.getElementById('speakButton'); // New button

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;

// Variables for text-to-speech
const synth = window.speechSynthesis;
let utterance = null;

// Function to initialize text-to-speech
function initTextToSpeech(text) {
    if (synth.speaking) {
        synth.cancel();
    }

    utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

function displayPDF(file) {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        pdfDoc = await pdfjsLib.getDocument(typedArray).promise;
        pageNum = 1;
        renderPage();
    };

    fileReader.readAsArrayBuffer(file);
}

async function renderPage() {
    if (pageRendering) {
        pageNumPending = pageNum;
        return;
    }

    pageRendering = true;
    const page = await pdfDoc.getPage(pageNum);

    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    pdfViewer.height = viewport.height;
    pdfViewer.width = viewport.width;

    const renderContext = {
        canvasContext: pdfViewer.getContext('2d'),
        viewport: viewport,
    };

    const renderTask = page.render(renderContext);

    renderTask.promise.then(function () {
        pageRendering = false;
        if (pageNumPending !== null) {
            pageNum = pageNumPending;
            pageNumPending = null;
            renderPage();
        }
    });

    // Extract text from the page and initialize text-to-speech
    page.getTextContent().then(function (textContent) {
        const pageText = textContent.items.map(function (item) {
            return item.str;
        }).join(' ');
        initTextToSpeech(pageText);
    });
}

pdfInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        readButton.disabled = false;
        speakButton.disabled = false; // Enable the "Speak Page" button
        await displayPDF(file);
        pageCount.textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
        prevPageButton.disabled = true;
        nextPageButton.disabled = pdfDoc.numPages <= 1;
    }
});

readButton.addEventListener('click', renderPage);

prevPageButton.addEventListener('click', showPrevPage);
nextPageButton.addEventListener('click', showNextPage);

speakButton.addEventListener('click', () => {
    const page = pdfDoc ? pdfDoc.pageNum : 1;
    utterance = new SpeechSynthesisUtterance(`Page ${page}`);
    synth.speak(utterance);
});

function showPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    renderPage();
}

function showNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    renderPage();
}
