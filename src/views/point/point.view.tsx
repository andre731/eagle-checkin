import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native"
import Toast from "react-native-toast-message"

import { store } from "@/store"

import { Style } from "./point.style"
import MapComponent from "@/components/Maps/maps.component"
import { ButtonComponent } from "@/components/Button/button.component"
import { observer } from "mobx-react-lite"

interface PointViewProps {}

interface LocationData {
  DateNow: string
  hours: string
  minutes: string
  seconds: string
}

const formatTime = (time: number): string => (time < 10 ? `0${time}` : `${time}`)

const renderLocation = (currentTime: Date): JSX.Element => {
  const locationData: LocationData = {
    DateNow: new Date().toLocaleDateString(),
    hours: formatTime(currentTime.getHours()),
    minutes: formatTime(currentTime.getMinutes()),
    seconds: formatTime(currentTime.getSeconds()),
  }

  return (
    <View style={Style.containerLocation}>
      <Text style={Style.locationDate}>
        {`${locationData.DateNow}`} -
        {` ${locationData.hours}:${locationData.minutes}:${locationData.seconds}`}
      </Text>
      <Text style={Style.location}>
        {store.mapStore.currentLocation
          ? `
        ${store.mapStore.currentLocation.street} - ${store.mapStore.currentLocation.streetNumber}, ${store.mapStore.currentLocation.city}`
          : "Localização não informada"}
      </Text>
    </View>
  )
}

const formatDate = (date: string) => {
  const parts = date.split("-")
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return date
}

const renderRegistries = (): JSX.Element => {
  return (
    <View style={Style.containerRegistries}>
      <View style={Style.headerRegistries}>
        <Text style={Style.headerRegistriesText}>Últimos Registros</Text>
      </View>
      <ScrollView style={Style.listRegistries}>
        <View style={{ height: "80%" }}>
          {store.registriesStore.registries.slice(-5).map((r, i) => {
            return (
              <View style={Style.registries} key={i}>
                <Text>{formatDate(r.date)}</Text>
                <Text style={{ textAlign: "center" }}>{r.local}</Text>
                <Text>{r.hours}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const PointView: React.FC<PointViewProps> = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string>("")
  const [justify, setJustify] = useState<string>("")

  const handleInputChange = (e: string) => {
    setJustify(e)
  }

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Atenção!",
      text2: "Aguarde o carregamento da sua localização para o uso correto!",
      position: "top",
      topOffset: 120,
    })

    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const addRegistry = ({ justify }: { justify: string }) => {
    const lastRegistry = [...store.registriesStore.registries].pop()

    const idCounter = lastRegistry ? lastRegistry.id + 1 : 1

    store.registriesStore.insertRegistries({
      id: idCounter,
      date: formatDateToYYYYMMDD(new Date()),
      local: store.mapStore.currentLocation.street
        ? `${store.mapStore.currentLocation.street} - ${store.mapStore.currentLocation.streetNumber},
        ${store.mapStore.currentLocation.city}`
        : "Localização não informada",
      hours: formatTime(currentTime.getHours()) + ":" + formatTime(currentTime.getMinutes()),
      justify: justify,
    })

    Toast.show({
      type: "success",
      text1: "Tudo certo!",
      text2: "Batida de ponto realizada com sucesso!",
      position: "top",
      topOffset: 120,
    })

    setTimeout(() => {
      setModalVisible(!isModalVisible)
    }, 500)
  }

  const renderEmoji = (emoji: string) => (
    <TouchableOpacity
      onPress={() => setSelectedEmoji(emoji)}
      style={[selectedEmoji === emoji && Style.selectedEmoji]}
    >
      <Text style={Style.emoji}>{emoji}</Text>
    </TouchableOpacity>
  )

  const renderButton = (): JSX.Element => {
    const [enabled, setEnabled] = useState(true)

    setTimeout(() => {
      setEnabled(false)
    }, 500)

    return (
      <View style={Style.containerButton}>
        <ButtonComponent
          disabled={enabled}
          title="Registrar Batida"
          onPress={() => setModalVisible(!isModalVisible)}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false)
          }}
        >
          <View style={Style.containerModal}>
            <View style={Style.modalView}>
              <Text style={Style.modalText2}> Como você está se sentindo hoje?</Text>
              <Text style={Style.modalText}>
                {renderEmoji("🤩")}
                {renderEmoji("🙂")}
                {renderEmoji("😐")}
                {renderEmoji("😞")}
                {renderEmoji("😵")}
              </Text>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <TextInput
                  value={justify}
                  onChangeText={handleInputChange}
                  multiline
                  numberOfLines={20}
                  placeholder="Justifique aqui a sua batida."
                  style={{
                    width: 300,
                    height: 100,
                    padding: 10,
                    borderColor: "#CACACA",
                    borderRadius: 8,
                    borderWidth: 1,
                  }}
                />
              </TouchableWithoutFeedback>
              <ButtonComponent
                buttonStyle={{ width: 180, marginTop: 20 }}
                title="Concluir"
                onPress={() => addRegistry({ justify: justify })}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
                style={{
                  marginTop: 25,
                }}
              >
                <Text>Cancelar batida</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <>
      <View style={Style.container}>
        <View style={Style.containerMap}>
          <MapComponent mapStyle={Style.map} />
        </View>
        {renderLocation(currentTime)}
        {renderRegistries()}
        {renderButton()}
      </View>
    </>
  )
}

export default observer(PointView)
