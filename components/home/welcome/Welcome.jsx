import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'

import styles from './welcome.style'
import { icons, SIZES } from '@/constants'
import { useRouter } from 'expo-router'

const jobTypes = ["Full-Time", "Part-Time", "Contractor"]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobTypes, setActiveJobTypes] = useState(jobTypes[0])
  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello Jamshed</Text>
          <Text style={styles.welcomeMessage}>Find your perfect job</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              placeholder='What are you looking for?'
            />
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              source={icons.search}
              resizeMode='contain'
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={jobTypes}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(item, activeJobTypes)}
                onPress={() => {
                  setActiveJobTypes(item)
                  router.push(`/search/${item}`)
                }}>
                <Text style={styles.tabText(item, activeJobTypes)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Welcome