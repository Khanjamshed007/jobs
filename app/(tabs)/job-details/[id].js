import React, { useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, SIZES } from '../../../constants';
import useFetch from '../../../Hook/useFetch';
import { useRoute } from '@react-navigation/native'; // Make sure this path is correct
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../../components';
import { useState } from 'react';


const tabs = ["About", "Qualifications", "Responsibilities"]
const JobDetails = () => {
    const route = useRoute();
    const { id } = route.params;
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false)
    const [activeTabs, setActiveTabs] = useState(tabs[0])
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch();
        setRefreshing(false)
    })
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: id,
    });

    const displayTabContent = () => {
        switch (activeTabs) {
            case "About": {
                <JobAbout
                    info={data[0]?.job_description ?? "No Data Provided"}
                />
            }
            case "Qualifications": {
                <Specifics
                    title="Qualifications"
                    point={data[0].job_highlights?.Qualifications ?? ["No Data Found"]}
                />
            }
            case "Responsibilities": {
                <Specifics
                    title="Responsibilities"
                    point={data[0].job_highlights?.Responsibilities ?? ["No Data Found"]}
                />
            }
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimensions='60%'
                            onPress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimensions='60%'
                        />
                    ),
                    headerTitle: ''
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No Data</Text>
                ) : (
                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs
                            tabs={tabs}
                            activeTabs={activeTabs}
                            setActiveTabs={setActiveTabs}
                        />

                        {displayTabContent()}
                    </View>
                )}
            </ScrollView>
            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />

        </SafeAreaView>
    );
};

export default JobDetails;
