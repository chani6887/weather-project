import { Temperature } from "./temperature.model";

export type CurrentWeather = {
  LocalObservationDateTime: string,
  EpochTime: Number,
  WeatherText: string,
  WeatherIcon: Number,
  HasPrecipitation: boolean,
  PrecipitationType?: string,
  PrecipitationIntensity?: string,
  IsDayTime: boolean,
  Temperature: {
    Metric: Temperature,
    Imperial: Temperature,
  },
  MobileLink: string,
  Link: string,
};