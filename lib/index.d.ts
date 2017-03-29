/**
 * @fileoverview
 * @author Taketoshi Aono
 */
import { Fuel, FuelElement, FuelComponentStatic } from 'fueldom';
export interface RouterProps {
    children: FuelElement[];
}
export declare class Router extends Fuel.Component<RouterProps, {
    url: string;
}> {
    state: {
        url: string;
    };
    constructor(p: any, c: any);
    render(): JSX.Element;
}
export interface RouteProps {
    path: string;
    component?: FuelComponentStatic<any, any>;
    location: string;
    parent?: string;
    children: FuelElement[];
}
export declare class Route extends Fuel.Component<RouteProps, {}> {
    private matchs;
    private params;
    private parent;
    render(): JSX.Element;
    componentWillMount(): void;
}
