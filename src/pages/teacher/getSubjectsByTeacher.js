import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import SubjectCard from '../../components/SubjectCard'
import { getSubjectsByGrade, getSubjectsByTeacherRef } from '../../utils/subjectsServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'

export default function GetSubjectsByTeacher() {
    const navigate = useNavigate()
    const [allSubjects, setAllsubjects] = useState([])
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getSubjects = async () => {
        const userData = await getUserFromLocalStorage()
        console.log("testtttttttttt:::", userData);
        const subjectsRes = await getSubjectsByTeacherRef(userData?.id)
        if (!subjectsRes?.success) {
            console.log("testtttttt::err::", subjectsRes);
            return
        }
        console.log("testtttttt::suc::", subjectsRes);

        setAllsubjects(subjectsRes?.data?.subjects)
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
                    ? <Text>no Subjects :(</Text>

                    : <FlatList
                        style={{ marginBottom: 0 }}
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
                            >
                                <SubjectCard
                                    subject={item}
                                    color={"#193c71"}
                                    icon={"exponent"}
                                />
                            </Pressable>
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
