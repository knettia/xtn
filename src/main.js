let dialogueData = [];
let dataReady = false;

fetch("res/dialogues.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
    dialogueData = jsonData;
    dataReady = true;
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

function waitForData(callback) {
  if (!dataReady) {
    console.log('Data is not ready. Waiting...');
    setTimeout(() => waitForData(callback), 100);
  } else {
    callback();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var contentBox = document.getElementById('contentBox');
  var buttonBox = document.getElementById('buttonBox');
  var maxElements = 25;

  var dialogueID = 1;
  var sentenceId = 0;

  var choosingOptions = false;
  var drawingSentence = false;

  waitForData(() => {
    dialogueExecuter();

    function dialogueExecuter() {
      let dialogueElement = dialogueData[dialogueID - 1];

      if (sentenceId >= dialogueElement.sentences.length) {
        sentenceId = 0;
        choosingOptions = true;

        dialogueElement.options.forEach(option => {
          addButton(option.text, option.endID);
        });
      } else {
        drawingSentence = true;

        var textElements = contentBox.getElementsByTagName('p');

        if (textElements.length >= maxElements) {
          contentBox.removeChild(textElements[0]);
        }

        var newTextElement = document.createElement('p');
        newTextElement.textContent = '';
        contentBox.appendChild(newTextElement);

        addText(newTextElement, dialogueElement.sentences[sentenceId].text, 0, dialogueElement.sentences[sentenceId].speaker);

        sentenceId++;
      }
    }

    function optionsExecuter(index) {
      choosingOptions = false;
      dialogueID = index;
      dialogueExecuter();
      for (var i = 0; i < buttonBox.children.length + 1; i++) {
        buttonBox.removeChild(buttonBox.children[0]);
      }
    }

    function addButton(label, index) {
      const button = document.createElement('button');
      button.textContent = label;
      button.addEventListener('click', function() {
        optionsExecuter(index);
      });
      document.querySelector('.button-box').appendChild(button);
    }

    const speakers = {
      1: new Audio('res/audio/snd_wngdng7.wav'),
      2: new Audio('res/audio/snd_floweytalk1.wav'),
      3: new Audio('res/audio/err.wav'),
      4: new Audio('res/audio/snd_txtpap.wav'),
      5: new Audio('res/audio/snd_mtt1.wav'),
      6: new Audio('res/audio/snd_floweytalk2.wav'),
      0: new Audio('res/audio/snd_tem5.wav'),
    };

    function addText(element, text, index, speaker) {
      if (index < text.length) {
        element.textContent += text.charAt(index);

        var audio;
        switch(speaker) {
          case 1:
            audio = new Audio('res/audio/snd_wngdng7.wav');
            break;
          case 2:
            audio = new Audio('res/audio/snd_floweytalk1.wav');
            break;
          case 3:
            audio = new Audio('res/audio/err.wav');
            break;
          case 4:
            audio = new Audio('res/audio/snd_txtpap.wav');
            break;
          case 5:
            audio = new Audio('res/audio/snd_mtt1.wav');
            break;
          case 6:
            audio = new Audio('res/audio/snd_floweytalk2.wav');
            break;
          case 0:
            audio = new Audio('res/audio/snd_tem5.wav');
            break;
        } 

        audio.play();

        setTimeout(function () {
          addText(element, text, index + 1, speaker);
        }, 150);
      } else {
        drawingSentence = false;
      }
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !choosingOptions && !drawingSentence) {
        dialogueExecuter();
      }
    });
  });
});
