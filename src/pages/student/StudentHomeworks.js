import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useLocation } from 'react-router-native'
import HomeWorkCard from '../../components/HomeWorkCard'
import { getHomeworksByGrade, getHomeworksBySubjectId, getSubmittedHomeWroksByStudentRef } from '../../utils/homewrokServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'

export default function StudentHomeworks({ subjectId }) {
    const location = useLocation()
    const [allSubjects, setAllsubjects] = useState([])
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getSubjects = async () => {
        try {
            const studentData = await getUserFromLocalStorage()
            const homeworksRes = await getHomeworksByGrade(studentData?.grade)
            const submittedHomeWroks = await getSubmittedHomeWroksByStudentRef(studentData?.id)

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
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <View
            style={styles.container}
        >


            <Box
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'space-around'
                }}
            >
                {allSubjects?.length == 0
                    ? <Text>no Homewroks :(</Text>

                    : <FlatList
                        style={{ marginBottom: 50 }}
                        data={allSubjects}
                        renderItem={({ item, idx }) => (
                            <HomeWorkCard
                                homework={item}
                            />
                        )}
                        //Setting the number of column
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </Box>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
