document.getElementById('generate-button').addEventListener('click', function() {
    const subject = document.getElementById('subject').value;
    const scene = document.getElementById('scene').value;
    const camera = document.getElementById('camera').value;
    const lens = document.getElementById('lens').value;
    const lighting = document.getElementById('lighting').value;
  
    const prompt = `${scene} ${subject}, ${camera}로 촬영, ${lens}, ${lighting} --ar 16:9`;
  
    document.getElementById('prompt-text').textContent = prompt;
  });