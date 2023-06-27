export interface Weather {
  id: number;
  name: string;
  timezone: number;
  main: Main;
  wind: Wind;
}

interface Main {
  humidity: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface Wind {
  speed: number;
}
