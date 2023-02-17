import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useLocation } from 'react-router-native'
import HomeWorkCard from '../../components/HomeWorkCard'
import { getHomeworksByGrade, getHomeworksBySubjectId, getSubmittedHomeWroksByStudentRef } from '../../utils/homewrokServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import Spinner from 'react-native-loading-spinner-overlay';

export default function StudentHomeworks({ studentDetails }) {
    const location = useLocation()
    const [allSubjects, setAllsubjects] = useState([])
    const [loading, setLoading] = useState(true)

    const getSubjects = async () => {
        setLoading(true)
        try {
            const studentData = await getUserFromLocalStorage()
            const homeworksRes = await getHomeworksByGrade(studentDetails?.grade || studentData?.grade)
            const submittedHomeWroks = await getSubmittedHomeWroksByStudentRef(studentDetails?.id || studentData?.id)
            console.log("testttttttttttt::", studentDetails?.grade || studentData?.grade);

            console.log("testttttttttttt::", submittedHomeWroks?.data?.homeworks);
            if (!homeworksRes?.success) { return }
            const homewrokWithSubmittedFlag = homeworksRes?.data?.homeworks?.map((item) => {
                if (submittedHomeWroks?.data?.homeworks?.filter((item2) => item2?.homework_r?.id === item?.id).length > 0) {
                    return { ...item, submitted: true }
                }
                return { ...item, submitted: false }

            })
            setAllsubjects(homewrokWithSubmittedFlag)
        } catch (e) { }
        setLoading(false)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <>
            {loading
                ? <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />

                : <View
                    style={styles.container}
                >

                    <Text style={{ marginTop: 30, paddingLeft: 24, fontSize: 22, fontWeight: 'bold' }}>Homeworks</Text>

                    <Box
                        style={{
                            display: 'flex',
                            marginTop: 30,
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-around'
                        }}
                    >
                        {allSubjects?.length == 0
                            ? <Text>no Homewroks :(</Text>

                            : <FlatList
                                style={{ marginBottom: 50, width: '100%' }}
                                data={allSubjects}
                                renderItem={({ item, idx }) => (
                                    <HomeWorkCard
                                        studentDetails={studentDetails}
                                        homework={item}
                                    />
                                )}
                                //Setting the number of column
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </Box>
                </View>}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
