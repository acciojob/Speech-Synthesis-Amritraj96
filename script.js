// Your script here.
<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  //Your code goes here

  // 1. Populate voices
  function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
      .join('');
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  // 2. Set the selected voice
  function setVoice() {
    msg.voice = voices.find(v => v.name === this.value);
    restartSpeech();
  }

  // 3. Start speaking
  function speak() {
    if (!msg.text.trim()) return;  // Avoid speaking empty text
    msg.rate = document.querySelector('[name="rate"]').value;
    msg.pitch = document.querySelector('[name="pitch"]').value;
    window.speechSynthesis.speak(msg);
  }

  // 4. Stop speaking immediately
  function stop() {
    window.speechSynthesis.cancel();
  }

  // 5. Handle rate, pitch, and text changes
  function updateOption() {
    msg[this.name] = this.value;
    restartSpeech();
  }

  // Restart speech when settings change
  function restartSpeech() {
    stop();
    speak();
  }

  // Event Listeners
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(opt => opt.addEventListener('change', updateOption));
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);

</script>
