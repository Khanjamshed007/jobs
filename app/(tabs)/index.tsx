import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../../components';

const Index = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />,
          headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />,
          headerTitle: ""
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.small }}>
          <Welcome
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  headerStyle: {
    backgroundColor: COLORS.lightWhite,
    marginTop: 0,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    padding: SIZES.medium,
  },
});
