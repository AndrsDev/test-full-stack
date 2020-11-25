class MapsService {

  mapsApiKey: string;

  constructor(mapsApiKey: string) {
    this.mapsApiKey = mapsApiKey;
  }

  geoCodeLocation() {
    return "Hello";
//     https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
// +Mountain+View,+CA&key=YOUR_API_KEY
  }

}

export default MapsService;