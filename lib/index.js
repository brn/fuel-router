/**
 * @fileoverview
 * @author Taketoshi Aono
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fueldom_1 = require("fueldom");
var PATH_REGEXP = /^\:(.+)$/;
function parseURL(url) {
    var path = url || location.hash.slice(1);
    if (!path) {
        path = '/';
    }
    if (path.charAt(0) !== '/') {
        path = "/" + path;
    }
    if (path.length > 1 && path.charAt(path.length - 1) === '/') {
        path = path.slice(0, path.length - 1);
    }
    return path;
}
var Router = (function (_super) {
    tslib_1.__extends(Router, _super);
    function Router(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.state = { url: parseURL() };
        window.addEventListener('hashchange', function (event) {
            var url = event.newURL.match(/#(.+)/);
            _this.setState({ url: parseURL(url ? url[1] : '/') });
        }, false);
        return _this;
    }
    Router.prototype.render = function () {
        var _this = this;
        return fueldom_1.React.createElement("div", null, fueldom_1.Fuel.Children.map(this.props.children, function (child) { return fueldom_1.Fuel.cloneElement(child, { location: _this.state.url }); }));
    };
    return Router;
}(fueldom_1.Fuel.Component));
exports.Router = Router;
var Route = (function (_super) {
    tslib_1.__extends(Route, _super);
    function Route() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.params = {};
        return _this;
    }
    Route.prototype.render = function () {
        var _this = this;
        var Component = this.props.component;
        var location = this.props.location;
        var parent = this.parent;
        if (this.matchs && this.matchs.length > 0) {
            var children = fueldom_1.Fuel.Children.map(this.props.children, function (child) { return fueldom_1.Fuel.cloneElement(child, { location: location, parent: parent, params: _this.params }); });
            if (Component) {
                return fueldom_1.React.createElement(Component, { params: this.params }, children);
            }
            return fueldom_1.React.createElement("div", null, children);
        }
        else if (fueldom_1.Fuel.Children.toArray(this.props.children).filter(function (child) { return child.type === Route; }).length) {
            return fueldom_1.React.createElement("div", null, fueldom_1.Fuel.Children.map(this.props.children, function (child) { return fueldom_1.Fuel.cloneElement(child, { location: location, parent: parent }); }));
        }
        return null;
    };
    Route.prototype.componentWillMount = function () {
        var _this = this;
        var location = this.props.location;
        this.parent = "" + (this.props.parent ? this.props.parent : '') + parseURL(this.props.path);
        var match;
        var ids = [];
        var replaced = this.parent.replace(/\:[^\/]+/g, function (id) {
            ids.push(id.slice(1));
            return '([^/]+)';
        });
        var regexp = new RegExp("^" + replaced + "$");
        this.matchs = location.match(regexp);
        if (this.matchs && this.matchs.length > 0) {
            this.matchs.slice(1).forEach(function (match, index) { return _this.params[ids[index]] = match; });
        }
    };
    return Route;
}(fueldom_1.Fuel.Component));
exports.Route = Route;
