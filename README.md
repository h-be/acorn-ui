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

For documentation on the `src` code, check out the [README there](./src/README.md)

#### Nix option

Use the nix shell to have npm installed and run npm install and start.

```shell
nix-shell --run acorn-ui
```

#### Building For Release

Use the nix shell.

```shell
nix-shell --run acorn-build
```

Pass a version of acorn-hc release to build for that specific one (there is a default fallback)

```shell
nix-shell --run 'acorn-build 0.3.3'
```

This will produce a file under `dist/acorn-ui.zip` with all the assets

#### UI Dev Resources

- [redux](https://redux.js.org/introduction/getting-started)
- [react](https://reactjs.org/docs/getting-started.html)
- [react-redux](https://react-redux.js.org/introduction/quick-start)
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [redux + canvas](https://medium.com/@peterxjang/a-functional-canvas-approach-with-redux-ce59a369241b)
- [webpack](https://webpack.js.org/guides/getting-started/)
