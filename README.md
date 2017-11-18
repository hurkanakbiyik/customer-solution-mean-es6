# AngularJS - Angular Material - Webpack - ES6 - MongoDB - Express.js

> The de facto starter repo for building scalable apps with [Angular](https://angularjs.org), [ES6](https://git.io/es6features), and [Webpack](http://webpack.github.io/)

This project includes Angular Material structure with an example of customer CRUD.

# Table of Contents
* [Walkthrough](#walkthrough)
    * [Build System](#build-system)
    * [File Structure](#file-structure)
    * [Testing Setup](#testing-setup)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the App](#running-the-app)
        * [Gulp Tasks](#tasks)
        * [Testing](#testing)

# Walkthrough
## Build System
NG6 uses NPM scripts, Gulp, and Webpack together for its build system. Yes, you don't need Gulp if you're using Webpack. This is true if your build system is only responsible for file manipulation. However, ours is not.

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Gulp` is the orchestrator:
* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)
* Generating boilerplate for the Angular app

**Check out the [JSPM version](https://github.com/angularclass/NG6-starter/tree/jspm)--an alternative to Webpack as an ES6 build system.**

## File Structure
We use a componentized approach with NG6. This will be the eventual standard (and particularly helpful, if using 
Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe. 
Everything--or mostly everything, as we'll explore (below)--is a component. A component is a self-contained 
concern--may it be a feature or strictly-defined, ever-present element of the UI (such as a header, sidebar, or 
footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes, 
services, and specs. This encapsulation allows us the comfort of isolation and structural locality. Here's how it 
looks:
```
client
⋅⋅app/
⋅⋅⋅⋅app.js * app entry file
⋅⋅⋅⋅app.html * app template
⋅⋅⋅⋅common/ * functionality pertinent to several components propagate into this directory
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅customer/ * customer component
⋅⋅⋅⋅⋅⋅⋅⋅customer.js * customer entry file (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅customer.component.js * customer "directive"
⋅⋅⋅⋅⋅⋅⋅⋅customer.controller.js * customer controller
⋅⋅⋅⋅⋅⋅⋅⋅customer.scss * customer styles
⋅⋅⋅⋅⋅⋅⋅⋅customer.html * customer template
⋅⋅⋅⋅⋅⋅⋅⋅customer.spec.js * customer specs (for entry, component, and controller)
```

Backend Side:
```
server.js * server
config.js * configs for backend
/routes * routes for CRUD examples
/databases * mongoose models and services

```

## Testing Setup
All tests are also written in ES6. We use Webpack to take care of the logistics of getting those files to run in the various browsers, just like with our client files. This is our testing stack:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run tests, type `npm test` in the terminal. Read more about testing [below](#testing).

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`
* Install Node.js (6.10.3)
* Install MongoDB
* Create database folder for MongoDB to this location : "C:/data/db"

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies


## Running the App
NG6 uses Gulp to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.
 
### Tasks

Start MongoDB

`"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"`

Start Server Side

`npm run prod`

> Server is running on http://localhost:8080

Start Client Side

`npm start`

> Client server is running on http://localhost:3000

### Testing
To run the tests, run `npm test`.

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows us to keep test files local to the component--which keeps us in good faith with continuing to build our app modularly. The file `spec.bundle.js` is the bundle file for **all** our spec files that Karma will run.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite and `Chai` is the assertion library. If you would like to change this, see `karma.conf.js`.
