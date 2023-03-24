import { Component, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'city-station',
  styleUrl: './city-station.css',
  shadow: true
})
export class CityStation {

  @State() cityList : string[] = ['Fausse ville 1', 'Fausse ville 2'];
  @Event() citySelected: EventEmitter<string>;
  

  fetchCities() {
    fetch(
      'https://angular-initiation-default-rtdb.firebaseio.com/meteo.json'
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.cityList = Object.keys(parsedRes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidLoad() {
    this.fetchCities();
  }

  cityEmit(e: string) {
    console.log('cityEmit', e);
    this.citySelected.emit(e);
  }

  render() {

    return [
      <div>
        Liste des villes
      </div>,
      <ul>
        {this.cityList.map((cityName) => 
          <div onClick={this.cityEmit.bind(this, cityName)} class="city">{cityName}</div>
        )}
      </ul>
    ];
  }
}
