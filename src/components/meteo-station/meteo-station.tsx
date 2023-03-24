import { Component, State, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'meteo-station',
  styleUrl: './meteo-station.css',
  shadow: true
})
export class MeteoStation {
  @State() meteoTemp: number;

  @State() cityValue: string;

  cityInput: HTMLInputElement;
  
  @State() error: string;

  @Prop({mutable: true, reflect: true}) city: string;

  @Watch('city')
  cityChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.cityValue = newValue;
      this.fetchMeteo(newValue);
    }
  }

  onInpuCity(ev: Event) {
    console.log('onInpuCity');
    this.cityValue = (ev.target as HTMLInputElement).value;
  }

  onFetchMeteo(event: Event) {
    console.log('onFetchMeteo');
    event.preventDefault();
    this.city = this.cityValue;
  }

  fetchMeteo(cityParam: string) {
    fetch(
      'https://angular-initiation-default-rtdb.firebaseio.com/meteo.json'
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (!parsedRes[cityParam]) {
          throw new Error('Aucune ville trouvée');
        }
        this.meteoTemp = +parsedRes[cityParam];
        this.error = null;
      })
      .catch(err => {
        console.log(err);
        this.error = err.message;
      });
  }

  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.city) {
      this.cityValue = this.city;
      this.fetchMeteo(this.city);
    }
  }

  componentWillLoad() {
    console.log('componentWillLoad');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentDidRender() {
    console.log('componentDidRender');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  render() {

    let dataContent = <p>Cherchez une ville</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.meteoTemp && this.error === null) {
      dataContent = <p>Température: {this.meteoTemp}°</p>;
    }

    return [
      <form onSubmit={this.onFetchMeteo.bind(this)}>
        <input 
          id="city"
          value={this.cityValue}
          onInput={this.onInpuCity.bind(this)}
          ref={el => this.cityInput = el}>
        </input>
        <button type='submit'>Rafraichir</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ];
  }
}
