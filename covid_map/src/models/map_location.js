export default class MapLocation {
  constructor(data) {
    if (data != null || data !== undefined) {
      this.iso3 = data["countryInfo"]["iso3"];
      this.lat = data["countryInfo"]["lat"];
      this.long = data["countryInfo"]["long"];
      this.country = data["country"];
      this.continent = data["continent"];
      this.updated = new Date(data["updated"]);
      this.flag = data["countryInfo"]["flag"];
      this.population = data["population"];
      this.cases = data["cases"];
      this.todayCases = data["todayCases"];
      this.deaths = data["deaths"];
      this.todayDeaths = data["todayDeaths"];
      this.recovered = data["recovered"];
      this.todayRecovered = data["todayRecovered"];
      this.tests = data["tests"];
    }
  }
}
