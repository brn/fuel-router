/**
 * @fileoverview
 * @author Taketoshi Aono
 */


import {
  FuelDOM,
  Fuel,
  React,
  FuelElement,
  FuelComponentStatic
} from 'fueldom';


const PATH_REGEXP = /^\:(.+)$/;


function parseURL(url?: string) {
  let path = url || location.hash.slice(1);

  if (!path) {
    path = '/';
  }

  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }

  if (path.length > 1 && path.charAt(path.length - 1) === '/') {
    path = path.slice(0, path.length - 1);
  }

  return path;
}


export interface RouterProps {
  children: FuelElement[];
}


export class Router extends Fuel.Component<RouterProps, {url: string}> {
  public state = {url: parseURL()}

  constructor(p, c) {
    super(p, c)
    window.addEventListener('hashchange', event => {
      const url = event.newURL.match(/#(.+)/);
      this.setState({url: parseURL(url? url[1]: '/')});
    }, false);
  }

  public render() {
    return <div>{Fuel.Children.map(this.props.children, child => Fuel.cloneElement(child as any, {location: this.state.url}))}</div>
  }
}


export interface RouteProps {
  path: string;
  component?: FuelComponentStatic<any, any>;
  location: string;
  parent?: string;
  children: FuelElement[];
}


export class Route extends Fuel.Component<RouteProps, {}> {
  private matchs;

  private params = {};

  private parent;

  public render() {
    const Component = this.props.component;
    const location = this.props.location;
    const parent = this.parent;
    if (this.matchs && this.matchs.length > 0) {
      const children = Fuel.Children.map(this.props.children, child => Fuel.cloneElement(child as any, {location, parent, params: this.params}));
      if (Component) {
        return <Component params={this.params}>{children}</Component>;
      }
      return <div>{children}</div>;
    } else if (Fuel.Children.toArray(this.props.children).filter(child => child.type === Route).length) {
      return <div>{Fuel.Children.map(this.props.children, child => Fuel.cloneElement(child as any, {location, parent}))}</div>;
    }
    return null;
  }


  public componentWillMount() {
    const {location} = this.props;
    this.parent = `${this.props.parent? this.props.parent: ''}${parseURL(this.props.path)}`;
    let match
    const ids = [];
    const replaced = this.parent.replace(/\:[^\/]+/g, id => {
      ids.push(id.slice(1));
      return '([^/]+)';
    });
    const regexp = new RegExp(`^${replaced}$`);
    this.matchs = location.match(regexp);
    if (this.matchs && this.matchs.length > 0) {
      this.matchs.slice(1).forEach((match, index) => this.params[ids[index]] = match);
    }
  }
}
