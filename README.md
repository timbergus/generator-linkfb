# Generator-LinkFB [![Build Status](https://secure.travis-ci.org/timbergus/generator-linkfb.png?branch=master)](https://travis-ci.org/timbergus/generator-linkfb) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Generator for [Yeoman](http://yeoman.io) for Angular.js to create a module to configure an interfaz for the client with an API REST

## What have we here?

Well, basically the missing link between the frontend generator and the backend generator. It creates two functions that allow different parameters to use the backend API REST. What they return is the `$http` Angular.js promiss or just the `response.data`, depends whether we need to manage errors or not (for example in login or signup processes).