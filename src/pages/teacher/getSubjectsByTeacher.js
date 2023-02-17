import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigate } from 'react-router-native'
import TeacherSubjectCard from '../../components/TeacherSubjectCard'
import { getSubjectsByTeacherRef } from '../../utils/subjectsServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'

export default function GetSubjectsByTeacher() {
    const navigate = useNavigate()
    const [allSubjects, setAllsubjects] = useState([])
    const [loading, setLoading] = useState(true)

    const getSubjects = async () => {
        setLoading(true)

        const userData = await getUserFromLocalStorage()
        console.log("testtttttttttt:::", userData);
        const subjectsRes = await getSubjectsByTeacherRef(userData?.id)
        if (!subjectsRes?.success) {
            setLoading(false)
            return
        }
        setAllsubjects(subjectsRes?.data?.subjects)
        setLoading(false)

    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (<>
        {loading
            ? <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            :
            <View
                style={styles.container}
            >


                <Box
                    style={{
                        display: 'flex',
                        marginTop: 50,
                        justifyContent: 'center',
                        alignItems: "center"
                    }}
                >
                    {allSubjects?.length == 0
                        ? <Text>no Subjects :(</Text>

                        : <FlatList
                            style={{ marginBottom: 0, width: '100%' }}
                            data={allSubjects}
                            renderItem={({ item, idx }) => (
                                <Pressable
                                    onPress={() => {
                                        navigate("/GetStudentsBySubject", {
                                            state: {
                                                subjectData: item
                                            }
                                        })
                                    }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        width: "50%"
                                    }}
                                >
                                    <TeacherSubjectCard
                                        subject={item}
                                        color={"#193c71"}
                                        icon={"exponent"}
                                    />
                                </Pressable>
                            )}
                            //Setting the number of column
                            numColumns={2}
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
