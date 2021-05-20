# MWS: Multimodal Web Scraping

![Alt text](./cover.png?raw=true "Overview of MWS")

*Overview of how MWS can be used to scrape data from a website: 1) Highlighted website data corresponding to the scraped data table, 2) red circle which represents the user’s detected  gaze, 3) webcam feed showing how user’s gaze is being detected, 4) MWS feedback dialog (also uttered via speech synthesis) used to respond to user commands and guide user actions, 5) user feedback dialog used to display what voice command was detected by the system* 

## Abstract

MWS is a Chrome browser extension that enables web scraping via gaze detection and voice commands in a few simple steps. Once initiated on a website, MWS detects the point on the website where the user is looking, through their webcam feed, and continuously determines and highlights the data table that that point belongs to. When the desired data table is highlighted, a user can use voice commands to stop the gaze detection and save the highlighted data table, filter which of the data table’s columns to keep or remove and download the data table as a JSON file.


Team Members: Kapaya Katongo

Paper: https://github.com/Kapaya/multimodal-web-scraping/blob/main/paper.pdf

Demo: https://youtu.be/Ee34bGjcYgU

Code: https://github.com/Kapaya/multimodal-web-scraping

## Setup

I've mostly tested MWS on Google Scholar because its CSS definitions to do not interfere with MWS's interface unlike most other websites. Here are the steps required to run it:

1. Clone the Github repository or downloaded the provided zip
2. Open Chrome and load its browser extensions page by pasting "chrome://extensions" into the search bar
3. Once on the browser extensions page, make sure "Developer mode", in the top right, is toggled on
4. Click "Load unpacked" and select the root of the cloned repository folder or unzipped folder
5. Navigate to https://scholar.google.com/citations?user=G-HM2ikAAAAJ&hl=en, right click to open the browser context menu and click on MWS
6. You will be prompted to give access to your camera and microphone. Please allow access to both
7. The MWS interface will appear in the bottom right of the page. WebGazer.js sometimes takes about a minute to initialize the first time it is run on a browser. Please wait until you see the webcam feed appear in the interface. If a minute passes without the webcam feed appearing, please refresh the page and retry.
8. Run through the tasks shown in the demo video and described in the User Study section of the paper. The available voice commands can be viewed by saying "help" or referencing the table in the paper.

## Code Layout

MWS's code is laid out as follows:

1. modules/boostrap: contains boostrap code used for styling
2. modules/underscore: contains underscore library which is used to debounce the voice recognition event listener
3. modules/webgazer: contains WebGazer.js source files and dependencies
4. modules/calibration.js: contains code for the in-website calibration mechanism
5. modules/constants.js: central definition of variables used across modules
6. modules/controls.js: contains code that render's MWS interface and implements its functionality
7. modules/dom-helpers.js: contains DOM-related helper methods used across modules
8. modules/gaze-recognition.js: contains code that implements the gaze detection using WebGazer.js
9. modules/gaze-utils.js: contains code that contains gaze-related helper methods used across modules
10. modules/scraper.js: contains code that implements the web scraping after the web scraping programming is generated
11. modules/visual-feedback.js: contains code that implements visual feedback such is highlighting of row and column DOM elements
12. modules/voice-recognition.js: contains code that implements voice recognition using the Web Speech API
13. modules/voice-synthesis.js: contains code that implements speech synthesis using the Web Speech API
14. modules/wrapper-induction.js: contains code that implements the wrapper induction algorithm to generate a web scraping program
15. background.js: contains code that initiates MWS from the browser context menu
16. index.css: contains CSS that styles various parts of MWS's interface
17. index.js: entry point of MWS
18. manifest.json: contains configuration for defining MWS's behavior as a Chrome extension