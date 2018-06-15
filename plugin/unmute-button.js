videojs.registerPlugin('unmuteButton', function() {
  var myPlayer = this,
    volumeLevel = .5;

  // +++ Wait for loadedmetadata then try to play video +++
  myPlayer.on('loadedmetadata', function() {
    // Play video which returns a promise
    var promise = myPlayer.play();

    // +++ Use promise to see if video is playing or not +++
    if (promise !== undefined) {
      promise.then(function() {
        // Autoplay started!
        // If video playing unmute and set the volume
        myPlayer.muted(false);
        myPlayer.volume(volumeLevel);
      }).catch(function(error) {
        // Autoplay was prevented.
        // // +++ If autoplay prevented mute the video, play video and display unmute button +++
        myPlayer.muted(true);
        myPlayer.play();

        var button = document.createElement("button");

        // +++ Add button's event listener +++
        button.addEventListener("click", function() {
          myPlayer.muted(false);
          myPlayer.volume(volumeLevel);
          playerContainer.removeChild(button);
        });

        // +++ Configure the button +++
        button.textContent = "Unmute";
        button.classList.add('inner');
        button.setAttribute("style", "color:black; background-color:red; width:100px; height:50px; opacity: .4;");

        // +++ Add the button to the container +++
        playerContainer.appendChild(button);

      });
    }
  });
});
