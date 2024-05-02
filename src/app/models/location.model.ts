export type Location = {
  Version: Number,
  Key: string,
  Type: string,
  Rank: Number,
  LocalizedName: string,
  Country: {
    ID: string,
    LocalizedName: string,
  },
  AdministrativeArea: {
    ID: string,
    LocalizedName: string,
  },
};