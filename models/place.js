export class Place {
  constructor(title, description, imageUri, location) {
    this.id = new Date().toString + Math.random().toString();
    this.title = title;
    this.description = description;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
  }
}
