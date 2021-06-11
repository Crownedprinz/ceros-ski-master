# Ceros Ski Code Challenge - Jayden

Ski till you fly. This is an amazing challenging application where clean coding, unit testing and reusability is key. I have to admit, it took a bit to figure out how the whole game works, and it definitely activated some thinking process and coordinates study.
You can check out my version at https://cerosja.herokuapp.com
Implementations:

- BugFixes

  - When you press the right arrow key or left arrow key, skier keeps moving right or left respectively
  - When you hit an obstacle and press the left key the game does not crash and the skier continue moving

- Additional Features
  - Re-implemented the codebase with Typescript
  - Added Dependency injection with typedi framework
  - Added unit test for rhino and skier services
  - The skier can jump by either the up key and the skier can jump over a rock while in air.
  - A Rhino will appear after an amount of time and chase the skier
  - If the rhino catches the skier, it's game over and the rhino will eat the skier.
  - You can pause the game with the spacebar
  - Added reset feature that can be invoked at any point in the game. 
  - continuous integration and continuous deployment with github workflows
  - Added Score Text to get the total score at the end of the game
  - Added Sound when Rhino eats up skier
  - Added Background music

- Known issue: 
  - if skier hits rock and game is paused. if game is resumed, skier moves instead of stucked to the tree
  - Known issue
  - Music does not stop when game is paused
  - Music does not reset when game has reset
  - Music does not continue after it has finished
  - when game is over, the reset button has to be pressed twice
  - when game is reset, score timer does not work
  - Rhino comes out and eats you (regardless of your skiing skills!) once a certain score is reached
  - Speed is dynamically increased based on time

- Structure Used:
  I used the Bulletproof structure which will avoid duplication of code, will improve stability, and 
  potentially. The idea is to use the principle of separation of concerns to move the logic away from the game 
  controller. Reusability is of great benefit here


- Lessons learnt
  Setting up webpack as a whole was a new experience for me and using Typescript to set up webpack was educative.
  It was a steep learning curve, and threw a lot of issues my way. The same can be said for
  I ran into a lot of issues setting up the webpack with typescript/ The collisions system is still something I need to 
  familiarize with even though I get the concept. 
  Another Interesting thing I learnt was using canvas to build games and It exposed me to the power of DOM manipulation

- Music
  Main Theme (Overture) | The Grand Score by Alexander Nakarada | https://www.serpentsoundstudios.com
  Music promoted by https://www.chosic.com/
  Attribution 4.0 International (CC BY 4.0)
  https://creativecommons.org/licenses/by/4.0/


# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here:
http://ceros-ski.herokuapp.com/

Or deploy it locally by running:

```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please
look through the requirements below and let us know when you will have something for us to look at. If anything is
unclear, don't hesitate to reach out.

**Requirements**

- **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.

  - Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  - Expected Result: The skier gets up and is facing to the left
  - Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)

- **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.

- **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump
  trick assets if you wanted to get really fancy!

  - Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  - The skier should be able to jump over some obstacles while in the air.
    - Rocks can be jumped over
    - Trees can NOT be jumped over
  - Anything else you'd like to add to the skier's jumping ability, go for it!

- **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long,
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier,
  catch him and eat him.

  - The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  - If the rhino catches the skier, it's game over and the rhino should eat the skier.

- **Documentation:**

  - Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  - Provide a way for us to view the completed code and run it, either locally or through a cloud provider

- **Be original:**
  - This should go without saying but don’t copy someone else’s game implementation!

**Grading**

Your challenge will be graded based upon the following:

- How well you've followed the instructions. Did you do everything we said you should do?
- The quality of your code. We have a high standard for code quality and we expect all code to be up to production
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
- The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
- The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
- How well you document your solution. We want to know what you did and why you did it.

**Bonus**

_Note: You won’t be marked down for excluding any of this, it’s purely bonus. If you’re really up against the clock,
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented
code before taking on any of the bonus._

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing
how creative candidates get with this.

- Provide a way to reset the game once it's over🥇
- Provide a way to pause and resume the game 🥇
- Add a score that increments as the skier skis further
- Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
- Deploy the game to a server so that we can play it without having to install it locally🥇
- Write more unit tests for your code

We are looking forward to see what you come up with!


