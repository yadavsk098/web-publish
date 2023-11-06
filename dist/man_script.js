document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
      if (event.key === 'x') {
        readText();
      }
    });
  
    function readText() {
      var textContainer = document.getElementById('text-container');
      var text = textContainer.textContent || textContainer.innerText;
      var utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  });
  