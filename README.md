Dice
====

Dice is a Chrome extension that provides a set of dice that can be thrown.

It allows well known dice notation like `1d6+3` and `50*2d10+5` to be
used to specify the required roll of the dice.

Frameworks
----------

* [Backbone][] as MVC-framework.
* [pegjs][] as parser generator framework.
* [grunt][] as build tool.
* [npm][] as a dependency managment system.

Getting started
---------------

This project relies on [grunt][] to automate various tasks. It needs a
globally installed `grunt` executable which can be installed with

```shell
npm install -g grunt-cli
```

In order to download all the dependencies execute

    npm install

If the `die.peg` grammar has changed the following command
creates `grammar/Parser.js`.

```shell
grunt peg:die
```

The next commands concatenated and minifies source files

```shell
grunt concat
grunt uglify
```

Packaging
---------

```shell
grunt compress
```

creates a package that can be uploaded to the Chrome Developer
Dashboard.

Default
-------

The default grunt task performs these tasks in one go.

```shell
grunt
```

[Backbone]: http://backbonejs.org/
[pegjs]: http://pegjs.majda.cz/
[grunt]: http://gruntjs.com/
[npm]: https://npmjs.org/