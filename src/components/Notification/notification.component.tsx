import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { useEffect, useRef, useState } from "react"
import { View, Text, Platform, Button } from "react-native"

const renderNotification = async () => {
  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false) as any
  const notificationListener: any = useRef()
  const responseListener: any = useRef()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token as string))

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification as any)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
}

export async function schedulePushNotification(seconds: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Olá Colaborador(a) Futuro! 📬",
      body: "Você deixou um alarme ativo para a batida do seu ponto.",
      data: { data: "clique aqui para bater o ponto" },
      priority: "max",
      sticky: true,
      sound: true,
    },
    trigger: { seconds: 2 },
  }).then((res) => {
    console.log(res)
  })
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "79180748-604e-440f-a3b0-bb1968084de3",
      })
    ).data
    console.log(token)
  } else {
    alert("Must use physical device for Push Notifications")
  }

  return token
}
