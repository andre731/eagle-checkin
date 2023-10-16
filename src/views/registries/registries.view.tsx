import React, { useState } from "react"
import { store } from "@/store"
import { observer } from "mobx-react-lite"
import { Calendar } from "react-native-calendars"
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native"

import { Styles } from "./registries.style"
import { Colors } from "@/common/enums/colors.enum"
import EditRegistryModal from "@/components/Modal-Registry/modal-registry.component"

interface Registry {
  id: number
  date: string
  local: string
  hours: string
  justify: string
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

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null)

  const handleEditRegistry = (registryId: number) => {
    const selectedRegistry = store.registriesStore.registries.find(
      (registry) => registry.id === registryId,
    )
    if (selectedRegistry) {
      setSelectedRegistry(selectedRegistry)
      setEditModalVisible(true)
    }
  }

  const handleCloseEditModal = () => {
    setEditModalVisible(false)
    setSelectedRegistry(null)
  }

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
          <TouchableOpacity key={i} onPress={() => handleEditRegistry(registry.id)}>
            <View style={Styles.registries}>
              <Text style={Styles.text}>{formatDate(registry.date)}</Text>
              <Text style={{ textAlign: "center", ...Styles.text }}>{registry.local}</Text>
              <Text style={Styles.text}>{registry.hours}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  const renderNoRecordsMessage = () => (
    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
      <Text style={{ textAlign: "center" }}>
        Você precisa bater o ponto para ter registros nesta página.
      </Text>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={Styles.calendarButtonContainer}>
        <TouchableOpacity onPress={toggleModal} style={Styles.calendarButton}>
          <Text style={[Styles.calendarButtonText, { width: 90 }]}>Filtrar por Data</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50 }}></View>
        {selectedDate && (
          <TouchableOpacity onPress={clearFilters} style={Styles.calendarButton}>
            <Text style={[Styles.calendarButtonText, { width: 90 }]}>Limpar Filtro</Text>
          </TouchableOpacity>
        )}
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
            <View key={index}>
              <Text style={Styles.dateHeader}>{formatDate(date)}</Text>
              {renderRegistries(registries)}
            </View>
          ))
        )}

        {Object.keys(groupedRegistries).length === 0 && !selectedDate && renderNoRecordsMessage()}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={editModalVisible}>
        <EditRegistryModal
          visible={editModalVisible}
          onClose={handleCloseEditModal}
          registry={selectedRegistry as Registry}
        />
      </Modal>

      <Modal visible={isModalVisible}>
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
