/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MySideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "titled": string;
    }
    interface TheSpinner {
    }
    interface TheStockFinder {
    }
    interface TheStockPrice {
        "stockSymbol": string;
    }
}
declare global {
    interface HTMLMySideDrawerElement extends Components.MySideDrawer, HTMLStencilElement {
    }
    var HTMLMySideDrawerElement: {
        prototype: HTMLMySideDrawerElement;
        new (): HTMLMySideDrawerElement;
    };
    interface HTMLTheSpinnerElement extends Components.TheSpinner, HTMLStencilElement {
    }
    var HTMLTheSpinnerElement: {
        prototype: HTMLTheSpinnerElement;
        new (): HTMLTheSpinnerElement;
    };
    interface HTMLTheStockFinderElement extends Components.TheStockFinder, HTMLStencilElement {
    }
    var HTMLTheStockFinderElement: {
        prototype: HTMLTheStockFinderElement;
        new (): HTMLTheStockFinderElement;
    };
    interface HTMLTheStockPriceElement extends Components.TheStockPrice, HTMLStencilElement {
    }
    var HTMLTheStockPriceElement: {
        prototype: HTMLTheStockPriceElement;
        new (): HTMLTheStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "my-side-drawer": HTMLMySideDrawerElement;
        "the-spinner": HTMLTheSpinnerElement;
        "the-stock-finder": HTMLTheStockFinderElement;
        "the-stock-price": HTMLTheStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface MySideDrawer {
        "opened"?: boolean;
        "titled"?: string;
    }
    interface TheSpinner {
    }
    interface TheStockFinder {
        "onThisSymbolSelected"?: (event: CustomEvent<string>) => void;
    }
    interface TheStockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "my-side-drawer": MySideDrawer;
        "the-spinner": TheSpinner;
        "the-stock-finder": TheStockFinder;
        "the-stock-price": TheStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-side-drawer": LocalJSX.MySideDrawer & JSXBase.HTMLAttributes<HTMLMySideDrawerElement>;
            "the-spinner": LocalJSX.TheSpinner & JSXBase.HTMLAttributes<HTMLTheSpinnerElement>;
            "the-stock-finder": LocalJSX.TheStockFinder & JSXBase.HTMLAttributes<HTMLTheStockFinderElement>;
            "the-stock-price": LocalJSX.TheStockPrice & JSXBase.HTMLAttributes<HTMLTheStockPriceElement>;
        }
    }
}
