# cipher-guess

This is the source code for a tutorial I am writing about using algebraic data types and functional programming in javascript. It is a number guessing game! Exciting!

**_NOTE:_** This is a copy of [evilsoft's playground](https://github.com/evilsoft/evil-playground), with `daggy` and `readline-sync` added for our project. Thanks, @evilsoft!

**_NOTE:_** This codebase has removed babel and as such requires the latest stable version of nodejs. (6.x or higher).

### Install

Clone this repo onto your local system, navigate to the folder and run:

```
$ npm install
```

This will install the dependencies for this project. After that finishes, you should be good to go.

#### Run some code

To get started running the code, just run the following in the project root:

```
$ npm start
```

#### Test some code

Testing is set up with tape.
Specs live in the `test` directory and can be run in one of two ways, each with it's own command.

**_NOTE:_** Tests will be added in a future post, so, for now, it's empty. I know, I know...

##### One shot

To run all of your specs and exit at the end with the results, all you need to do is run:

```
$ npm test
```

##### Watch and run

If you would like to run the specs every time you make a change to the specs or your units under test, just run:

```
$ npm run test:watch
```
