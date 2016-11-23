# changewheels

[![Build Status](https://travis-ci.org/logan12358/gearboxer.svg?branch=master)](https://travis-ci.org/logan12358/gearboxer)
[![Code Climate](https://codeclimate.com/github/logan12358/gearboxer/badges/gpa.svg)](https://codeclimate.com/github/logan12358/gearboxer)

Calculates parameters for gearboxes.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Model (yet to be properly implemented)

A system is composed of nodes connected by links.
A link constrains the ratio between two nodes.
A link may offer several values to be chosen between...

(gear links may have combined pools of gears to choose from)

## Example Configuration

We have the Norton gearbox levers with ratios:
* A: 1
* B: 2
* C: 4
* D: 8

And the Norton gearbox slide with ratios:
* 1: 3.75
* 2: 3.5
* 3: 3.25
* 4: 3
* 5: 2.75
* 6: 2.5
* 7: 2.375
* 8: 2.25
* 9: 2

And a pool of gears: 40, 50, 50, 50, 53, 59, 60, 63, 66, 73, 81, 100, 100, 127

