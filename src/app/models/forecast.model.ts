import { Temperature } from "./temperature.model";

export interface Forecast {
  Headline: {
    EffectiveDate: string,
    EffectiveEpochDate: Number,
    Severity: Number,
    Text: string,
    Category: string,
    EndDate: string,
    EndEpochDate: Number,
    MobileLink: string,
    Link: string,
  },
  DailyForecasts: DailyForecast[],
};

export interface DailyForecast {
  Date: Date,
  EpochDate: Number,
  Temperature: {
    Minimum: Temperature,
    Maximum: Temperature,
  },
  Day: WeatherDescription,
  Night: WeatherDescription,
  Sources: string[],
  MobileLink: string,
  Link: string,
};

interface WeatherDescription {
  Icon: Number,
  IconPhrase: string,
  HasPrecipitation: boolean,
  PrecipitationType?: string,
  PrecipitationIntensity?: string,
};
