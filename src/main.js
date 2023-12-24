// const fs = require('fs');

// Specify the path to your JSON file
const dialoguePath = 'path/to/your/file.json';
let dialogueData = { };

// Fetch the JSON file
fetch("res/dialogues.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
    dialogueData = jsonData;
    // Now you can work with the JSON data
    // console.log(jsonData);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });


document.addEventListener('DOMContentLoaded', function () {
    // fs.readFile(dialoguePath, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error reading JSON file:', err);
    //       return;
    //     }

    //     dialogueData = JSON.parse(data);
    //     console.log(jsonData);
    // });

    var contentBox = document.getElementById('contentBox');
    var maxElements = 25;
    var isAddingText = false;

    function addText(element, text, index) {
      if (index < text.length) {
        element.textContent += text.charAt(index);

        // var audio = new Audio('res/audio/err.wav'); // Replace 'path/to/sound.mp3' with the actual path to your sound file
        // audio.play();

        setTimeout(function () {
          addText(element, text, index + 1);
        }, 25); // Adjust the delay between characters
      } else {
        isAddingText = false;
      }
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !isAddingText) {
        var textElements = contentBox.getElementsByTagName('p');

        if (textElements.length >= maxElements) {
          // Remove the oldest element
          contentBox.removeChild(textElements[0]);
        }

        var newTextElement = document.createElement('p');
        newTextElement.textContent = '';
        contentBox.appendChild(newTextElement);

        isAddingText = true;
        addText(newTextElement, 'New text element added!', 0);
      }
    });
  });