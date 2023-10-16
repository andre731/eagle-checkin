import { observable, action, makeObservable } from "mobx"

class RegistriesStore {
  @observable
  registries: {
    id: number
    date: string
    hours: string
    local: string
    justify: string
  }[] = []

  constructor() {
    makeObservable(this)
  }

  @action
  insertRegistries(registry: {
    id: number
    date: string
    hours: string
    local: string
    justify: string
  }) {
    const existingRegistryIndex = this.registries.findIndex((r) => r.id === registry.id)

    if (existingRegistryIndex !== -1) {
      this.registries[existingRegistryIndex] = registry
    } else {
      this.registries.push(registry)
    }
  }
}

export const registriesStore = new RegistriesStore()
