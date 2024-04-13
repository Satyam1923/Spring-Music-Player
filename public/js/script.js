      
      const audio = document.getElementById("music");
      const playPauseBtn = document.getElementById("playPauseBtn");
      const seekSlider = document.getElementById("seekSlider");
      const currentTime = document.getElementById("currentTime");
      const duration = document.getElementById("duration");
      const icon = document.getElementById("buttonicon");
      const seekfwd = document.getElementById("seekForward");
      const seekBck = document.getElementById("seekBackward");

      function togglePlayPause() {
        if (audio.paused) {
          audio.play();
          icon.setAttribute("src", "images/pause.png");
        } else {
          audio.pause();
          icon.setAttribute("src", "images/play.png");
        }
      }

      function updateProgress() {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekSlider.value = progress;
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        currentTime.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }

      function seek(e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      }

      function seekforward() {
        audio.currentTime += 10;
      }

      function seekbackward() {
        audio.currentTime -= 10;
      }
      audio.addEventListener("loadedmetadata", () => {
        const mins = Math.floor(audio.duration / 60);
        const secs = Math.floor(audio.duration % 60);
        duration.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      });
      
      document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('click-animation'); 
            setTimeout(() => {
                item.classList.remove('click-animation'); 
            }, 300);
    
            const imgElement = document.querySelector('.imgBx img');
            const nameElement = document.querySelector('.details .name');
            const authorElement = document.querySelector('.details .author');
    
            const imgSrc = item.querySelector('img').src;
            const name = item.querySelector('h4').textContent;
            const authorYear = item.querySelector('p').textContent;
            const [artist, year] = authorYear.split(' - ');
    
            imgElement.src = imgSrc;
            nameElement.textContent = name;
            authorElement.textContent = `${artist} - ${year}`;
    
            const url = item.getAttribute('data-url'); 
    
            const audio = document.getElementById("music");
            audio.src = url;
    
            if (audio.paused) {
                audio.play();
                icon.setAttribute("src", "images/pause.png");
            }
        });
    });
    
    


      playPauseBtn.addEventListener("click", togglePlayPause);
      audio.addEventListener("timeupdate", updateProgress);
      seekSlider.addEventListener("input", seek);
      seekfwd.addEventListener("click", seekforward);
      seekBck.addEventListener("click", seekbackward);
      