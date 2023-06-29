export interface Weather {
  id: number;
  name: string;
  timezone: number;
  main: Main;
  wind: Wind;
  clouds: Clouds;
}

interface Main {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface Wind {
  speed: number;
}

interface Clouds {
  all: number;
}
