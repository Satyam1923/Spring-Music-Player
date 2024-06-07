# Spring-Music-Player

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
    </li>
    <li>
      <a href="#tech-stacks">Tech Stacks</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#snap">Snap</a>
    </li>
    <li>
      <a href="#learning-outcomes">Learning Outcomes</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#conclusion">Conclusion</a>
    </li>
  </ol>
</details>

# <a id="introduction">Introduction</a>

The Spring Music Player web application is a simple yet functional platform for playing a list of songs. Developed using HTML, CSS, and JavaScript, it provides a user-friendly interface to control playback, adjust volume, and navigate through the playlist. The project is built using HTML for structure, CSS for styling, and JavaScript for functionality.

# <a id="tech-stacks">Tech Stacks</a>

- **HTML:** Provides the structural foundation for the Music Player. Key elements include:

  1. Details section for displaying current track information.
  2. Slider containers for time and volume controls.
  3. Buttons for random track, previous track, play/pause, next track, and repeat track.

- **CSS:** Handled by an external CSS file:

  1. Layout adjustments for responsiveness.
  2. Stylized buttons, sliders, and track information display.
  3. Dynamic background color changes for a visually engaging experience.

- **JavaScript:** Logic for various functionalities:
  - Various DOM elements are selected using document.querySelector.
  - The audio element (curr_track) is created dynamically to load and play songs.
  - Track index, play state, and random play state are managed using variables.

# <a id="features">Features</a>

1. Play, pause, and control the playback of songs.
2. Navigate to the next and previous tracks in the playlist.
3. Adjust the volume using a slider.
4. Display real-time information such as current time and total duration.
5. Random track functionality for a dynamic listening experience.
6. Repeat track option for continuous playback.

# <a id="snap">Snap</a>
![Screenshot 2024-06-07 011315](https://github.com/Satyam1923/Spring-Music-Player/assets/104068640/574d157e-f2b7-4329-9e90-65383a2bdb75)

Check the design in [Figma](https://www.figma.com/design/WQnt0qRFSdaV3jW5XF8NSc/Spring-Music-player-new-design?node-id=0-1&t=Q8iDfJsPXtkoDLTG-1)

# <a id="learning-outcomes">Learning Outcomes</a>

- **Client-Side Development:** Understanding how to build a user-friendly interface using React and TailwindCSS.
- **Server-Side Development:** Utilizing Node.js and Express for server-side logic and API integrations.
- **Firebase Integration:** Learning to integrate Firebase for user authentication and data storage.
- **Git Workflow:** Understanding the Git workflow for contributing to open-source projects, including forking, branching, committing, and creating pull requests.
- **Contribution:** Feel free to explore and contribute to the Spring Music Player project to make it even better!

# <a id="getting-started">Getting Started</a>

    Clone the repo:

    git clone https://github.com/Satyam1923/Spring.git

Install npm packages:

    npm install .

Start it on local host:

    node index.js

    Visit local host:
    http://localhost:3030/

Contributing:

     Contributions to the project are welcomed and appreciated. If you have any suggestions, bug reports, UI improvements, or enhancements, feel free to open an issue to discuss or directly create a pull request with the necessary changes. Please ensure to check spelling, grammar, and create individual pull requests for each suggestion.

Creating Pull Request:

    Fork the Project
    Clone your forked repositor

     git clone https://github.com/Satyam1923/Spring.git

Create a new branch and switch to it:
git checkout -b fix-issue-<ISSUE-NUMBER>

Add your changes:

    git add .

Commit your changes:

    git commit -m "<EXPLAIN-YOUR_CHANGES>"

Push your changes:
git push origin fix-issue-<ISSUE-NUMBER>

    Open a Pull Request

# <a id="conclusion">Conclusion:</a>

Building a music player using HTML CSS and JavaScript is a fun and educational project for web developers. It allows to combine these three essential web technologies to create an interactive and visually appealing music player.
