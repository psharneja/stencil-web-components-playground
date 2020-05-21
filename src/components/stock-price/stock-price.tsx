import { Component, h, State, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from "./../../global/global";
@Component({
  tag: "the-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;
  // @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch("stockSymbol")
  stockSymbolChanged(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      this.stockInputValid = true;
      this.stockUserInput = this.stockSymbol.toUpperCase();

      this.fetchStockPrice(newVal);
    }
  }

  onUserInput(ev: Event) {
    this.stockUserInput = (ev.target as HTMLInputElement).value;

    if (this.stockUserInput.trim() !== "") {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  componentWillLoad() {
    console.log("will load");
  }
  componentDidLoad() {
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol.toUpperCase();
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log("will update");
  }

  componentDidUpdate() {
    console.log("did update");
    // if(this.stockSymbol !== this.initialStockSymbol) {
    //     this.initialStockSymbol = this.stockSymbol;
    //     this.stockUserInput = this.stockSymbol.toUpperCase();
    //     this.fetchStockPrice(this.stockSymbol);

    // }
  }

  componentDidUnload() {
    console.log("did unload");
  }

  @Listen("thisSymbolSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid request.");
        }
        return res.json();
      })
      .then((parsedRes) => {
        this.loading = false;

        if (
          !parsedRes["Global Quote"] ||
          !parsedRes["Global Quote"]["05. price"]
        ) {
          throw new Error("Invalid request.");
        }
        this.error = null;
        this.fetchedPrice = +parsedRes["Global Quote"]["05. price"];
      })
      .catch((err) => {
        this.error = err.message;
        this.fetchedPrice = null;
        this.loading = false;
      });
  }

  hostData() {
    return { class: this.error ? "error" : "" };
  }

  onFetchStockPrice(ev: Event) {
    ev.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
    this.fetchStockPrice(this.stockSymbol);
  }
  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: $ {this.fetchedPrice}</p>;
    }
    if (this.loading) {
      dataContent = <the-spinner />
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
       
        <input
          id="stock-symbol"
          ref={(el) => (this.stockInput = el)}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.stockInputValid}>
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}
