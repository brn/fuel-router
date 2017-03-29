# What's this?

**NOW THIS PRODUCT IS BETA**

Router library for [Fuel](https://github.com/brn/fuel) vdom library.

## Installation

```
npm install fuel-router --save
```

## Usage

```javascript
import {
  Router
  Route
} from 'fuel-router';
import {
  FuelDOM,
  Fuel
} from 'fueldom';

class Page1 extends Fuel.Component {
  ...
}


class Page2 extends Fuel.Component {
  ...
}


FuelDOM.render(
  <Router>
    <Route path="page1" component={Page1}/>
    <Route path="page2">
      <Route path=":pageId">
        <Route path="path" component={Page2}>
      </Route>
    </Route>
  </Rouer>
)
```

## Parameters

You can receive parameter inside path like ':pageId' by `this.props.params.pageId`.

## Contribute

Fork!
Write Code!

```
yarn run ut+ct
```
Send PR!
