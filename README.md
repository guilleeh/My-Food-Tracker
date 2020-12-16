# My Food Tracker
[![Netlify Status](https://api.netlify.com/api/v1/badges/a476d24e-76ec-49c8-bdc9-3788fb13013c/deploy-status)](https://app.netlify.com/sites/clever-joliot-8051fe/deploys)

This is my Capstone project for the Udacity Cloud Developer Nanodegree. My Food Tracker lets you log the food you eat throughout the day. You can add calories and a picture of your food to to see just exactly all you eat.

![Image of app](https://i.ibb.co/R6JhTQ4/Screen-Shot-2020-12-16-at-1-42-00-PM.png)

## Demo
Live site : [https://5fda7c6853f3f00008fd0a03--clever-joliot-8051fe.netlify.app/](https://5fda7c6853f3f00008fd0a03--clever-joliot-8051fe.netlify.app/)

## Technologies
- Backend
  - Serverless Framework
  - Node.js
  - AWS Cognito
- Frontend
  - Next.js
  - React Bootstrap
  - React Icons
  - Axios
  - AWS Amplify
- Deployment
  - Netlify

## Future Plans
  - [ ] Forgot Password Flow
  - [ ] Analytics for specified time frame
  - [ ] Delete image on food log remove
  - [ ] Add Google Recaptcha on Sign Up
  - [ ] Better support for mobile
  - [ ] Image search
  - [ ] Admin Dashboard(App health & monitor)


## Git Commit Syntax
According to Semantic-Release, we need to follow some commit message guidelines in order for automatic versioning to work.   
  ##### Semantic Release Commit Message Format:
  - ```<type>(<scope>): <message>```
  - <strong>Type</strong> can be one of the following:
    - feat: A new feature
    - fix: A bug fix
    - docs: Documentation only changes
    - style: Changes that don't affect meaning of code (space, format, missing semi-colons, etc)
    - refactor: A code change that neither fixes a bug nor adds a feature
    - perf: A code change that improves performance
    - test: Adding missing or correcting existing tests
    - chore: Changes to build process or auxiliary tools and libraries
  - <strong>Scope</strong> is the feature of the code (subscriptions, objects, sharing, teams, etc) being affected
  - <strong>Message</strong> is a regular commit message describing the changes
