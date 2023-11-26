# Web Chat App

Web Chat App by [Dhiya Ulhaq Dewangga](https://github.com/dhiyaud)

## Development

### Prerequisite

- Node 16+, Yarn 1, NPM 8+
- This project using Typescript
- Use whatever ECMAScript (ESNext) you want, this will be compiled to ECMAScript 2017 (ES8) later on

### Steps

- Install all dependencies with command `yarn install` (**Don't use another package manager like Yarn 2 or NPM**)
- Create `.env` and follow the `.env.example`
- Run development environment by running command `yarn dev`
- Happy Coding :smiley:

## Submissions Test

- Date of submission
  - Sunday, 26th November 2023.


- Instructions to run assignment locally
  - Please read the Development section.


- Time spent
  - Around 25 hours.


- Assumptions made
  - Web-based application only.
  - Limited to Google Chrome and Firefox browsers.
  - Using the ReactJS framework.
  - Using MongoDB Cloud.
  - No restrictions on the use of the library.
  - Based on UI design and requirements.
  - Not include testing.


- What would be your approach to ensuring the application is ready for production (testing)?
  - Perform unit testing (Jest, React-test)
  - Conduct testing when accessed by users on a large scale.
  - Evaluate the performance, usability, and security using browser developer tools.
  - Check cross-browser compatibility.
  - Implement CI/CD pipelines.
  - Write documentation, from manuals to technical.
  - Supports PWA.


- How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
  - Uses cloud deployment and provides auto-scaling.
  - Implement caching mechanisms or Content Delivery Network (CDN).
  - Optimizing the code, so the code and build results are well compressed.
  - Continue to develop and improve gradually.
  - More user-friendly of interface and experience.


- What key steps would you take to ensure application security?
  - Using HTTPS protocol.
  - Implement strong authentication and authorization.
  - Encryption and decryption mechanisms for data consumption.
  - API security headers and protection.
  - Backup database.


- What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
  - I don't separate backend and frontend, and instead I use a framework that covers both using Next.js. I choose Next.js because it's built on ReactJS and has its own built-in server packaged with Node.js.
  - Moreover, the application built is not too complex so Next.js can handle most use cases. Even so, in the future it would be better to separate the frontend and backend for better scalability and more maintainability.
  - I use MongoDB Cloud because it is easier to use and can be accessed from anywhere. And it's free.


- Other information about your submission that you feel it's important that we know if applicable.
  - Regarding websocket connections, maybe you can give a little explanation in the guidelines, considering that the websocket in live chat has an important role.


- Your feedback on this technical challenge
  - The technical challenge process, from email notice to guidelines, is very well and clear. 
  - A little feedback regarding guidelines about frameworks and libraries that can be used can be added for code exploration and uniformity.
