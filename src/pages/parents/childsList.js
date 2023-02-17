import { Box, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectDropdown from 'react-native-select-dropdown'
import { useLocation, useNavigate } from 'react-router-native'
import StudentCard from '../../components/StudentCard'
import { grades } from '../../mocks/mocks'
import { getStudentsByRole, getUserFromLocalStorage } from '../../utils/usersServices'
import StudentsDetails from '../director/StudentsDetails'

export default function AllStudents() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [grade, setGrade] = useState('')
    const [openModal, setopenModal] = useState(false)
    const subjectData = location?.state?.subjectData
    const [filteredStudents, setFilteredStudents] = useState([])
    const [childs, setChilds] = useState([])

    const getChild = async () => {
        const user = await getUserFromLocalStorage()
        setChilds([].concat(user.child))
    }
    useEffect(() => {
        getChild()
    }, [])
    return (
        <KeyboardAwareScrollView>
            <View
                style={styles.container}
            >
                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={openModal}
                >
                    <StudentsDetails
                        studentData={selectedStudent}
                        setOpenModal={setopenModal}
                    />
                </Modal>
                <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>My Childs</Text>

                <Box
                    style={{
                        display: 'flex',
                        marginTop: 50,
                        justifyContent: 'space-around',
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                 
                    {childs?.length == 0
                        ? <Text>no childs :(</Text>

                        : <FlatList
                            style={{ marginBottom: 0, width: '100%' }}
                            data={childs}
                            renderItem={({ item, idx }) => (
                                <Pressable
                                    onPress={() => {

                                        setSelectedStudent(item)
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
