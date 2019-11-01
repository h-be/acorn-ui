# acorn-ui
the user interface for Acorn app, see [acorn-hc](https://github.com/h-be/acorn-hc) for backend

### UI

Developing the UI is simple. You will need to already be running the Holochain Conductor in
order to also develop the UI, since they are now coupled.

> **Prerequisite** have nodejs installed

Open a terminal to this folder

Run the following command
```
npm install
```

Now run
```
npm start
```

A browser window will open, displaying the UI.

Make changes to the Javascript in `src`, and save the files, and your
changes will appear with live reloading in the browser window.

The css file is `dist/styles.css`. You will need to refresh the browser page manually if you change the file.

The UI uses a combination of `canvas` and `react` for handling display and interaction.

The `canvas` related rendering details can be found under `src/drawing`.

There is a very limited amount of React code, but what there is can be found in `src/components`. The components are imported
into `src/index.js` and rendered into a container div in the `body` of the HTML page.

####  UI Dev Resources

- [redux](https://redux.js.org/introduction/getting-started)
- [react](https://reactjs.org/docs/getting-started.html)
- [react-redux](https://react-redux.js.org/introduction/quick-start)
- [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [redux + canvas](https://medium.com/@peterxjang/a-functional-canvas-approach-with-redux-ce59a369241b)
- [webpack](https://webpack.js.org/guides/getting-started/)
