import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { permissionsContact } from './src/permissions'
import ContactsList from './src/ContactsList'
import Dialer from './src/Dialer'

const App = () => {
  const [findContact, setFindContact] = useState('')
  const [refetchContact, setRefetchContact] = useState(false)
  useEffect(() => { permissionsContact() }, [])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Phone Book</Text>
      <View style={{ flex: 1 }}>
        <ContactsList findContact={findContact} refetchContact={refetchContact} />
      </View>
      <Dialer checkNumber={number => setFindContact(number)} refetchContact={() => setRefetchContact(!refetchContact)} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: { flex: 1, },
  title: { fontSize: 20, alignSelf: "center", color: '#000', fontWeight: '700', marginVertical: 10 }
})