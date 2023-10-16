import { observable, action, makeObservable } from "mobx"

class NotificationStore {
  @observable
  receiveNotification = false

  constructor() {
    makeObservable(this)
  }

  @action
  acceptNotification(accept: boolean) {
    this.receiveNotification = accept
  }
}

export const notificationStore = new NotificationStore()
