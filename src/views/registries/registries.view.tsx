import React, { useState } from "react"
import { store } from "@/store"
import { observer } from "mobx-react-lite"
import { Calendar } from "react-native-calendars"
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native"

import { Styles } from "./registries.style"
import { Colors } from "@/common/enums/colors.enum"

interface Registry {
  date: string
  local: string
  hours: string
}

interface GroupedRegistries {
  [date: string]: Registry[]
}

const groupByDate = (registries: Registry[]): GroupedRegistries => {
  const grouped: GroupedRegistries = {}

  for (const registry of registries) {
    const formattedDate = registry.date
    if (grouped[formattedDate]) {
      grouped[formattedDate].push(registry)
    } else {
      grouped[formattedDate] = [registry]
    }
  }

  return grouped
}

const formatDate = (date: string) => {
  const parts = date.split("-")
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return date
}

const RegistriesView = (): JSX.Element => {
  const groupedRegistries: GroupedRegistries = groupByDate(store.registriesStore.registries)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const clearFilters = () => {
    setSelectedDate(null)
  }

  const handleDayPress = (day: any) => {
    const formattedSelectedDate = day.dateString
    setSelectedDate(formattedSelectedDate)
    toggleModal()
  }

  const renderRegistries = (registries: Registry[]) => {
    return (
      <View>
        {registries.map((registry, i) => (
          <View style={Styles.registries} key={i}>
            <Text style={Styles.text}>{formatDate(registry.date)}</Text>
            <Text style={{ textAlign: "center", ...Styles.text }}>{registry.local}</Text>
            <Text style={Styles.text}>{registry.hours}</Text>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={Styles.calendarButtonContainer}>
        <TouchableOpacity onPress={toggleModal} style={Styles.calendarButton}>
          <Text style={Styles.calendarButtonText}>Filtrar por Data</Text>
        </TouchableOpacity>
        <View style={Styles.calendarButtonContainer}>
          <TouchableOpacity onPress={toggleModal} style={Styles.calendarButton}>
            <Text style={Styles.calendarButtonText}>Filtrar por Data</Text>
          </TouchableOpacity>
          {selectedDate && (
            <TouchableOpacity onPress={clearFilters} style={Styles.calendarButton}>
              <Text style={Styles.calendarButtonText}>Limpar Filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={Styles.listRegistries}>
        {selectedDate ? (
          groupedRegistries[selectedDate] ? (
            renderRegistries(groupedRegistries[selectedDate])
          ) : (
            <Text style={Styles.noRecordsText}>Nenhum registro encontrado para esta data.</Text>
          )
        ) : (
          Object.entries(groupedRegistries).map(([date, registries], index) => (
            <View key={index} style={{ marginTop: 80 }}>
              <Text style={Styles.dateHeader}>{formatDate(date)}</Text>
              {renderRegistries(registries)}
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        style={{ alignItems: "center", flex: 1, justifyContent: "center", marginTop: 20 }}
        visible={isModalVisible}
      >
        <View style={Styles.modalContent}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate || ""]: { selected: true, selectedColor: Colors.SECONDARY },
            }}
          />
          <TouchableOpacity onPress={toggleModal} style={Styles.closeButton}>
            <Text style={Styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default observer(RegistriesView)
