import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '@/constants';
import styles from './popularjobs.style';
import PopularCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../Hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  })

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = () => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item?.job_id)

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={() => router.push('/all-jobs')}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <PopularCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />}
          keyExtractor={(item) => item?.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal

        />
      )}
    </View>
  );
};

export default Popularjobs;
