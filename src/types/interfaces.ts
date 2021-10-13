export interface IGeolocation {
  coordinates: number[];
  type: string;
}

export interface IMeteor {
  fall: string;
  geolocation: IGeolocation;
  id: string;
  mass: string;
  name: string;
  nametype: string;
  recclass: string;
  reclat: string;
  reclong: string;
  year: string;
}
