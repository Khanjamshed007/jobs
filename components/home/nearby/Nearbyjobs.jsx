import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants';
import styles from './nearbyjobs.style';
import PopularCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../Hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';


const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  })

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
        data.map((job) => (
          <NearbyJobCard
            job={job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
          />
        ))
      )}
    </View>
  );
};

export default Popularjobs;
