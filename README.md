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
creates `js/die.js`.

    ./node_modules/.bin/pegjs -e GURPS.Parser grammar/die.peg src/Parser.js 

The next commands concatenated and minifies source files

    ./node_modules/.bin/grunt concat
    ./node_modules/.bin/grunt min

[1]: http://backbonejs.org/
[2]: http://pegjs.majda.cz/
[3]: http://gruntjs.com/