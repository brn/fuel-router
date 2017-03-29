"use strict";function parseURL(e){var t=e||location.hash.slice(1);return t||(t="/"),"/"!==t.charAt(0)&&(t="/"+t),t.length>1&&"/"===t.charAt(t.length-1)&&(t=t.slice(0,t.length-1)),t}Object.defineProperty(exports,"__esModule",{value:!0});var tslib_1=require("tslib"),fueldom_1=require("fueldom"),PATH_REGEXP=/^\:(.+)$/,Router=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.state={url:parseURL()},window.addEventListener("hashchange",function(e){var t=e.newURL.match(/#(.+)/);n.setState({url:parseURL(t?t[1]:"/")})},!1),n}return tslib_1.__extends(t,e),t.prototype.render=function(){var e=this;return fueldom_1.React.createElement("div",null,fueldom_1.Fuel.Children.map(this.props.children,function(t){return fueldom_1.Fuel.cloneElement(t,{location:e.state.url})}))},t}(fueldom_1.Fuel.Component);exports.Router=Router;var Route=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.params={},t}return tslib_1.__extends(t,e),t.prototype.render=function(){var e=this,r=this.props.component,n=this.props.location,l=this.parent;if(this.matchs&&this.matchs.length>0){var o=fueldom_1.Fuel.Children.map(this.props.children,function(t){return fueldom_1.Fuel.cloneElement(t,{location:n,parent:l,params:e.params})});return r?fueldom_1.React.createElement(r,{params:this.params},o):fueldom_1.React.createElement("div",null,o)}return fueldom_1.Fuel.Children.toArray(this.props.children).filter(function(e){return e.type===t}).length?fueldom_1.React.createElement("div",null,fueldom_1.Fuel.Children.map(this.props.children,function(e){return fueldom_1.Fuel.cloneElement(e,{location:n,parent:l})})):null},t.prototype.componentWillMount=function(){var e=this,t=this.props.location;this.parent=""+(this.props.parent?this.props.parent:"")+parseURL(this.props.path);var r=[],n=this.parent.replace(/\:[^\/]+/g,function(e){return r.push(e.slice(1)),"([^/]+)"}),l=new RegExp("^"+n+"$");this.matchs=t.match(l),this.matchs&&this.matchs.length>0&&this.matchs.slice(1).forEach(function(t,n){return e.params[r[n]]=t})},t}(fueldom_1.Fuel.Component);exports.Route=Route;