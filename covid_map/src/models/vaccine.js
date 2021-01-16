export default class Vaccine {
  constructor(data) {
    if (data != null || data !== undefined) {
      this.candidate = data["candidate"];
      this.sponsors = data["sponsors"];
      this.details = data["details"];
      this.trialPhase = data["trialPhase"];
      this.institutions = data["institutions"];
    }
  }
}
