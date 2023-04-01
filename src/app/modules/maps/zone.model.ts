export enum TypeZone{
  WORLD = 'WORLD',
  COUNTRY = 'COUNTRY',
  REGION = 'REGION',
}

export interface Zone{
  type: TypeZone;
  name: string;
  countries: string[];
}

export const regions: Zone[] = [
  { type:TypeZone.REGION, name: "Africa",
    countries: [
      "DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CAF", "TCD",
      "COG", "COD", "DJI", "EGY", "GNQ", "ERI", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB",
      "CIV", "KEN", "LSO", "LBR", "LBY", "MDG", "MWI", "MLI", "MRT", "MAR",
      "MOZ", "NAM", "NER", "NGA", "RWA", "SEN", "SLE", "SOM", "ZAF",
      "SSD", "SDN", "SWZ", "TZA", "TGO", "TUN", "UGA", "ZMB", "ZWE","ESH"
    ]
  },
  { type:TypeZone.REGION, name: "Americas",
    countries:[
      "ARG", "BHS", "BLZ", "BMU", "BOL", "BRA", "CAN", "CHL",
      "COL", "CRI", "CUB", "DOM", "ECU", "SLV", "GRL", "GTM",
      "GUY", "HTI", "HND", "JAM", "MEX", "NIC", "PAN", "PRY", "PER", "PRI",
      "SUR", "TTO", "USA", "URY", "VEN"
    ]
  },
  { type:TypeZone.REGION, name: "Asia",
    countries:[
      "AFG", "ARM", "AZE","BGD", "BTN", "BRN", "KHM", "CHN",
      "GEO", "IND", "IDN", "IRN", "IRQ", "ISR", "JPN", "JOR", "KAZ", "KWT", "KGZ",
      "LAO", "LBN", "MKD", "MYS", "MNG", "MMR", "NPL", "PRK", "OMN", "PAK", "PSE",
      "PHL", "QAT", "SAU", "KOR", "LKA", "SYR", "TWN", "TJK", "THA", "TUR", "TKM",
      "ARE", "UZB", "VNM", "YEM"
    ]
  },
  { type:TypeZone.REGION, name: "Europe",
    countries:[
      "ALB", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST",
      "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ITA", "KAZ", "LVA", "LTU",
      "LUX", "MKD", "MLT", "MDA", "MNE", "NLD", "POL", "PRT", "ROU",
      "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "UKR", "GBR", "NOR", "RUS"
    ]
  },
  { type:TypeZone.REGION, name: "Oceania",
    countries:[]
  },
];

export const world:Zone = { type:TypeZone.WORLD, name: "world", countries:[]};
