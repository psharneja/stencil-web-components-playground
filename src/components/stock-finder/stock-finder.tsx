import { Component, h,Event, State, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from "./../../global/global";
@Component({
  tag: "the-stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true,
})
export class StockFinder {
  stockNameinput: HTMLInputElement;
  @State()loading = false;
  @Event({ bubbles: true, composed: true }) thisSymbolSelected: EventEmitter<
    string
  >;
  @State() searchResults: { symbol: string; name: string }[] = [];

  onFindstocks(ev: Event) {
    ev.preventDefault();
    const stockName = this.stockNameinput.value;
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`
    )
      .then((res) => res.json())
      .then((parsedRes) => {
    this.loading = false;

        this.searchResults = parsedRes["bestMatches"].map((match) => {
          return { name: match["2. name"], symbol: match["1. symbol"] };
        });
      })
      .catch((err) => {
    this.loading = false;

        console.log(err);
      });
  }

  onSelectSymbol(symbol: string) {
      this.thisSymbolSelected.emit(symbol);
  }
  render() {
    let content = <ul>{this.searchResults.map((result) => (
      <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
        <strong>{result.symbol} </strong>
        {result.name}
      </li>
    ))}</ul>
          if(this.loading) {
            content = <the-spinner />
          }
    return [
      <form onSubmit={this.onFindstocks.bind(this)}>
        <input id="stock-symbol" ref={(el) => (this.stockNameinput = el)} />
        <button type="submit">Find</button>
      </form>,
      
        content
      ,
    ];
  }
}
