import { Component, State, h, Prop, Watch, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'meteo-station',
  styleUrl: './meteo-station.css',
  shadow: true
})
export class MeteoStation {
  @State() meteoTemp: number;

  @State() cityValue: string;

  @Event() citySelected: EventEmitter<string>;

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
    this.cityValue = (ev.target as HTMLInputElement).value;
  }

  onFetchMeteo(event: Event) {
    event.preventDefault();
    this.city = this.cityValue;
  }


  @Listen('citySelected', {target: 'body'})
  citySelectedListen(event: CustomEvent) {
    if (event.detail && event.detail !== this.city) {
      this.city = event.detail;
    }
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
    if (this.city) {
      this.cityValue = this.city;
      this.fetchMeteo(this.city);
    }
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
