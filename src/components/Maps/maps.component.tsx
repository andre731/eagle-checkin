import React, { useEffect, useRef, useState } from "react"
import { View, StyleProp, ViewStyle } from "react-native"
import MapView, { MapViewProps, Marker } from "react-native-maps"
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
  reverseGeocodeAsync,
} from "expo-location"

import { Styles } from "./maps.style"
import { mapStore } from "@/store/map.store"
import { observer } from "mobx-react-lite"

interface MapBody extends MapViewProps {
  mapStyle?: StyleProp<ViewStyle>
  teste?: any
}

const MapComponent: React.FC<MapBody> = ({ mapStyle, teste }) => {
  const [location, setLocation] = useState<LocationObject | null>()

  let latitude = "-30.027316193960445"
  let altitude = "-51.182624941893074"

  const mapRef = useRef<MapView>(null)

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()

      setLocation(currentPosition)
      getStreetName()
    }
  }

  const vefifyLocation = () => {
    if (mapStore.abstractLocation.altitude != null && mapStore.abstractLocation.latitude != null) {
      if (location?.coords) {
        location.coords.latitude = +mapStore.abstractLocation.latitude
        location.coords.altitude = +mapStore.abstractLocation.altitude
      }
    }
  }

  async function getStreetName() {
    const params = {
      latitude: location?.coords.latitude ?? 0,
      longitude: location?.coords.longitude ?? 0,
    }

    await reverseGeocodeAsync(params).then((res) => {
      const updatedInfos = {
        city: res[0].city ?? "",
        district: res[0].district ?? "",
        street: res[0].street ?? "",
        streetNumber: res[0].streetNumber ?? "",
        postalCode: res[0].postalCode ?? "",
        region: res[0].region ?? "",
      }

      mapStore.updateLocation(updatedInfos)
    })
  }

  setTimeout(() => {
    getStreetName()
    vefifyLocation()
  }, 800)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      () => (location: LocationObject) => {
        setLocation(location)
        vefifyLocation()
        getStreetName()
        mapRef.current?.animateCamera({
          pitch: 70,
          center: location.coords,
        })
      },
    )
  }, [])

  return (
    <View style={Styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={[mapStyle]}
          initialRegion={{
            latitude: +latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: +latitude,
              longitude: location.coords.longitude,
            }}
            title="Usuário"
            description="sua localização atual"
          />
        </MapView>
      )}
    </View>
  )
}

export default observer(MapComponent)
