import { observable, action, makeObservable } from "mobx"

class RegistriesStore {
  @observable registries: {
    id: number
    date: string
    hours: string
    local: string
    justify: string
  }[] = []

  constructor() {
    makeObservable(this)
  }

  @action insertRegistries(registry: {
    id: number
    date: string
    hours: string
    local: string
    justify: string
  }) {
    this.registries.push(registry)
  }
}

export const registriesStore = new RegistriesStore()
