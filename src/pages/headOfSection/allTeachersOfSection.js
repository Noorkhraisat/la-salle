import { Box, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useLocation, useNavigate } from 'react-router-native'
import StudentCard from '../../components/StudentCard'
import { getStudentsByRole, getUserFromLocalStorage, getUsersByRoleAndSection } from '../../utils/usersServices'
import TeacherDetails from './TeacherDetails'

export default function AllTeachers() {
    const location = useLocation()
    const [selectedTeacher, setSelctedTeacher] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [grade, setGrade] = useState('')
    const subjectData = location?.state?.subjectData
    const [allTeachers, setAllTeachers] = useState([])
    const [filteredTeachers, setFilteredTeachers] = useState([])
    const [openModal, setopenModal] = useState(false)

    const getTeachers = async () => {
        console.log("subjectDatasubjectData::", subjectData);
        const user = await getUserFromLocalStorage()
        const teacherRes = await getUsersByRoleAndSection('2', user?.section)
        if (!teacherRes?.success) { return }
        setAllTeachers(teacherRes?.data?.users)
        setFilteredTeachers(teacherRes?.data?.users)
    }
    const filiterTeachers = (searchTerm, grade) => {
        if (!searchTerm) { setFilteredTeachers(allTeachers); return }
        const filtered = allTeachers?.filter(item => (
            ((item?.name?.includes(searchTerm)
                || item?.specialNumber?.includes(searchTerm))
                && !grade ? true : item?.grade == grade

            ))
        )
        setFilteredTeachers(filtered)
    }
    useEffect(() => {
        getTeachers()
    }, [])
    return (
        <KeyboardAwareScrollView>
            <View
                style={styles.container}
            >
                <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>All Teachers</Text>
                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={openModal}
                >
                    <TeacherDetails
                        teacherData={selectedTeacher}
                        setOpenModal={setopenModal}
                    />
                </Modal>
                <Box
                    style={{
                        display: 'flex',
                        marginTop: 50,
                        justifyContent: 'space-around',
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <TextInput
                        label='Search'
                        value={searchTerm}
                        onChangeText={(e) => { filiterTeachers(e, grade), setSearchTerm(e) }}
                        color='#184a99'
                        style={{ width: '90%', margin: 3 }}
                    />
                    {filteredTeachers?.length == 0
                        ? <Text>no Teachers :(</Text>

                        : <FlatList
                            style={{ marginBottom: 0, width: '100%' }}
                            data={filteredTeachers}
                            renderItem={({ item, idx }) => (
                                <Pressable
                                    onPress={() => {
                                        setSelctedTeacher(item)
                                        setopenModal(true)
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: 'center',
                                    }}
                                >
                                    <StudentCard
                                        studentData={item}
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
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
