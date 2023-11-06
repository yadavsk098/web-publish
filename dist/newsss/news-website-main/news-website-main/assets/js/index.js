"Use Strict"

const apiData = {

  apiKey: 'xackVAOA4jtfwNEwdsEOBPex22JSKesB ',
  apiPath: 'https://api.nytimes.com/svc/topstories/v2/',

};

// getting headlines

const headlineNewsFetchURL = `${apiData.apiPath}world.json?api-key=${apiData.apiKey}`;

async function headlineNewsFetchData(apiURL) {

  const res = await fetch(apiURL);
  const data = await res.json();

  showHeadlineNews(data);

}

headlineNewsFetchData(headlineNewsFetchURL);

function showHeadlineNews(newsData) {

  const headlineNewsElement = document.getElementById('headlineNews');

  // spreading the data gotten from the headlineNewsAPI
  const spreadHeadlineData = [...newsData.results]

  // looping through the spreadHeadlineData

  spreadHeadlineData.forEach((data) => {

    const spanElementsForHeadlineNewsElement = document.createElement('span');

    spanElementsForHeadlineNewsElement.classList.add('me-2');

    spanElementsForHeadlineNewsElement.innerHTML = `${data.title}.`;

    headlineNewsElement.appendChild(spanElementsForHeadlineNewsElement);

  });

}

// get world news

const worldNewsURL = `${apiData.apiPath}world.json?api-key=${apiData.apiKey}`;

async function getWorldNewsFetchData(apiURL) {

  const res = await fetch(apiURL);
  const data = await res.json();

  showWorldNews(data);

}

getWorldNewsFetchData(worldNewsURL);

function showWorldNews(newsData) {

  const worldNewsData = [...newsData.results];

  // const randomDataFromArray = Math.floor(Math.random() * worldNewsData.length);

  const worldNewsUpdateElement = document.getElementById('worldNewsUpdate');

  // console.log(worldNewsData);

  worldNewsUpdateElement.innerHTML = `
  
    <a href=${worldNewsData[1].url} class="text-decoration-none" target="_blank">
      <div class="img_box">
        <img src=${worldNewsData[1].multimedia[0].url} width="100%" alt=${worldNewsData[1].multimedia[0].caption} />

        <div class="tag text-danger bg-white shadow">
          Breaking News
        </div>
      </div>

      <div class="title_box text-dark ps-md-3 pe-md-3 pt-4 pb-md-4">
        <h2>
          ${worldNewsData[1].title}
        </h2>

        <div class="mt-3">
          <p class="text-muted">
            ${worldNewsData[1].abstract}
          </p>

          <div class="mt-2 text-muted">
            - ${worldNewsData[1].byline === "" ? 'Null' : worldNewsData[1].byline}
          </div>
        </div>
      </div>
    </a>

  `;

}

// get poltics news to display in landing page

const politicalNewsURL = `${apiData.apiPath}politics.json?api-key=${apiData.apiKey}`;

async function getPoliticsNewsFetchData(apiURL) {

  const res = await fetch(apiURL);
  const data = await res.json();

  showPoliticalNewsData(data);

}

getPoliticsNewsFetchData(politicalNewsURL);

function showPoliticalNewsData(newsData) {

  console.log(newsData.results);

  const PoliticsElementFromHTML = document.getElementById('PoliticsElement');
  const currentNewsFeedElement = document.getElementById('currentNewsFeed');

  const colElmentForImage = document.createElement('div');
  const colElementForContent = document.createElement('div');

  colElmentForImage.classList.add('col-md-6');
  colElementForContent.classList.add('col-md-6');

  const randomNumber = Math.floor(Math.random() * newsData.results.length);

  colElmentForImage.innerHTML = `
  
    <div class="img_box">
      <img src=${newsData.results[1].multimedia[0].url} width="100%" alt=${newsData.results[1].multimedia[0].caption} />
    </div>

  `;

  colElementForContent.innerHTML = `
  
    <div class="mt-2">
      <a href=${newsData.results[1].url} class="text-decoration-none text-dark" target="_blank">
        <h5 class="text-dark">
          ${newsData.results[1].title}
        </h5>
      </a>
      
      <div class="text-muted mt-2" style="font-size: .8rem;">
        ${newsData.results[1].abstract}
      </div>
    </div>

  `;

  PoliticsElementFromHTML.append(colElmentForImage, colElementForContent);

  currentNewsFeedElement.innerHTML = `
  
    <a class="text-decoration-none" href=${newsData.results[randomNumber].url} target="_blank">
      <div class="img_box">
        <img src=${newsData.results[randomNumber].multimedia[0].url} width="100%" alt=${newsData.results[randomNumber].multimedia[0].caption} />
      </div>

      <div class="mt-2">
        <h3 class="text-dark">
          ${newsData.results[randomNumber].title}
        </h3>
      </div>
    </a>

  `;

}

const NewsFeedURL = `${apiData.apiPath}business.json?api-key=${apiData.apiKey}`;

async function getNewsFeedFromAPI(fetchNewsFeed) {

  const res = await fetch(fetchNewsFeed);
  const data = await res.json();

  showNewsFeed(data);

}

getNewsFeedFromAPI(NewsFeedURL);

function showNewsFeed(newsFeedData) {

  const newsData = [...newsFeedData.results];

  const mainFeedElement = document.getElementById('mainFeed');

  newsData.forEach((data) => {

    const dataInArray = [data];

    const subElement = document.createElement('div');

    subElement.classList.add('col-md-3', 'mt-3');

    dataInArray.forEach((item) => {

      subElement.innerHTML = `
      
        <a href=${item.url} class="text-decoration-none" target="_blank">

          <div class="img_box">
            <img src=${item.multimedia[0].url} width="100%" alt=${item.multimedia[0].caption} />
          </div>

          <div class="mt-2">
            <h6 class="text-dark">
              ${item.title}
            </h6>

            <div class="mt-2 text-muted small">
              ${item.abstract}
            </div>
          </div>

        </a>

      `;

    });

    mainFeedElement.appendChild(subElement);

  });

}

// speech script
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// speech script
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

function speakElementDescription(element) {
  const description = element.getAttribute("aria-label");
  const content = element.textContent;
  speak(`${content}`);
  // Add an event listener to stop speaking when the cursor leaves the element
  element.addEventListener("mouseout", stopSpeaking);
}


// Function to add hover speech functionality to an element
function addHoverSpeech(element) {
  element.addEventListener("mouseenter", () => {
    speakElementDescription(element);
  });

  element.addEventListener("mouseleave", stopSpeaking);
}

// Usage of addHoverSpeech function after fetching data
const headlineNewsElements = document.querySelectorAll("#headlineNews span");
const worldNewsUpdateElement = document.getElementById("worldNewsUpdate");
const PoliticsElementFromHTML = document.getElementById("PoliticsElement");

headlineNewsElements.forEach((element) => {
  addHoverSpeech(element);
});

addHoverSpeech(worldNewsUpdateElement);
addHoverSpeech(PoliticsElementFromHTML);



// Function to add hover speech functionality to a parent element
function addHoverSpeechToParent(parentElement) {
  parentElement.addEventListener("mouseenter", (event) => {
    const targetElement = event.target;
    // if (targetElement.getAttribute("aria-label")) {
    //   speakElementDescription(targetElement);
    // }
  });

  parentElement.addEventListener("mouseleave", stopSpeaking);
}

// Usage of addHoverSpeechToParent function after fetching data
const mainContentElement = document.getElementById("mainContent");

addHoverSpeechToParent(mainContentElement);