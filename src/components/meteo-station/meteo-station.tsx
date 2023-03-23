import { Component, State, Element, h } from '@stencil/core';

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

  onInpuCity(ev: Event) {
    this.cityValue = (ev.target as HTMLInputElement).value;
  }

  onFetchMeteo(event: Event) {

    event.preventDefault();
    fetch(
      'https://angular-initiation-default-rtdb.firebaseio.com/meteo.json'
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (!parsedRes[this.cityValue]) {
          throw new Error('Aucune ville trouvée');
        }
        this.meteoTemp = +parsedRes[this.cityValue];
        this.error = null;
      })
      .catch(err => {
        console.log(err);
        this.error = err.message;
      });
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
