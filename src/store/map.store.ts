import { observable, action, makeObservable } from "mobx"

class MapsStore {
  @observable currentLocation = {
    city: "",
    district: "",
    streetNumber: "",
    street: "",
    postalCode: "",
    region: "",
  }

  @observable abstractLocation = {
    altitude: "",
    latitude: "",
  }

  constructor() {
    makeObservable(this)
  }

  @action updateLocation(currentLocationBody: {
    city: string
    district: string
    streetNumber: string
    street: string
    postalCode: string
    region: string
  }) {
    this.currentLocation = {
      ...this.currentLocation,
      ...currentLocationBody,
    }
  }

  @action updateAbstractLocation(abstractLocationBody: { altitude: ""; latitude: "" }) {
    this.abstractLocation = {
      ...this.abstractLocation,
      ...abstractLocationBody,
    }
  }
}

export const mapStore = new MapsStore()
