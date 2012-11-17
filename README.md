Dice
====

Dice is a Chrome extension that provides a set of dice that can be thrown.

It allows well known dice notation like `1d6+3` and `50*2d10+5` to be
used to specify the required roll of the dice.

Frameworks
----------

* [Backbone][1] as MVC-framework.
* [pegjs][2] as parser generator framework.
* [grunt][3] as build tool.
* [npm][4] as a dependency managment system.

Getting started
---------------

In order to download all the dependencies execute

    npm install

If the `die.peg` grammar has changed the following command
creates `grammar/Parser.js`.

    ./node_modules/.bin/grunt generate

The next commands concatenated and minifies source files

    ./node_modules/.bin/grunt concat
    ./node_modules/.bin/grunt min

The default grunt task performs these tasks in one go.

    ./node_modules/.bin/grunt

Packaging
---------

    zip -r ~/Desktop/dice.zip index.html js/* lib/* css/* image/* manifest.json

creates a package that can be uploaded to the Chrome Developer
Dashboard.

[1]: http://backbonejs.org/
[2]: http://pegjs.majda.cz/
[3]: http://gruntjs.com/
[4]: https://npmjs.org/