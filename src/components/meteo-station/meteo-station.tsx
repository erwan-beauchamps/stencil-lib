import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'meteo-station',
  styleUrl: './meteo-station.css',
  shadow: true
})
export class MeteoStation {
  @State() meteoTemp: number;

  onFetchMeteo(event: Event) {
    event.preventDefault();

    fetch(
      'https://angular-initiation-default-rtdb.firebaseio.com/meteo.json'
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.meteoTemp = +parsedRes['temp'];
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return [
      <form onSubmit={this.onFetchMeteo.bind(this)}>
        <button type='submit'>Rafraichir</button>
      </form>,
      <div>
        <p>Température: {this.meteoTemp}°C</p>
      </div>
    ];
  }
}
