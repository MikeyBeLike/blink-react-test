# Blink React Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

---

### Thoughts

Due to limited time I was not able to give this application the full consideration of best practices, here are some recommendations I would make if I were to expand upon it:

- Better error handling, this could be displayed more in the UI, rather than `console.error()` & `alert()`
- Write more than the basic tests
- As this application is quite UI intensive, I would implement e2e tests to interact with different scenarios of interactions
- UI/UX improvements, the chat has no branding, we could implement more brand colours to the UI to make it more unique
