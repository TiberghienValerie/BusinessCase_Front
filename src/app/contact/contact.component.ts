import { Component, OnInit } from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public email!: string;
  public message!: string;

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution:
      '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution:
      '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
  });

  // Marker for the top of Mt. Ranier
  summit = marker([45.45699, 4.39232], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/img/marker-location.png',
      popupAnchor: [0, -35],
    }),
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
    },
    overlays: {},
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [this.streetMaps, /*this.route, */ this.summit /*, this.paradise*/],
    zoom: 18,
    minZoom: 13,
    maxZoom: 18,
    center: latLng([45.45699, 4.39232]),
  };

  onMapReady(map: Map) {
    this.summit.bindPopup(
      '<p>Centre’Auto’Ccas</p><p>Technopôle</p><p>42000 Saint Etienne</p>'
    );
  }

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    window.location.href =
      'mailto:contact@centreautoccas.fr?cc=' +
      this.email +
      '&subject=' +
      this.message;

    this.message = '';
    this.email = '';
  }
}
