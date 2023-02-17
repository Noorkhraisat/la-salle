import { Box, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import SelectDropdown from 'react-native-select-dropdown'
import { useLocation, useNavigate } from 'react-router-native'
import StudentCard from '../../components/StudentCard'
import { grades } from '../../mocks/mocks'
import { getStudentsByRole, getUserFromLocalStorage, getUsersByRoleAndSection } from '../../utils/usersServices'
import StudentsDetails from '../director/StudentsDetails'

export default function AllStudentsOfSection() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [grade, setGrade] = useState('')
    const [openModal, setopenModal] = useState(false)
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const [loading, setLoading] = useState(true)

    const getStudents = async () => {
        setLoading(true)
        console.log("subjectDatasubjectData::", subjectData);
        const user = await getUserFromLocalStorage()
        console.log("subjectDatasubjectData::", user);

        const subjectsRes = await getUsersByRoleAndSection('1', user?.section)
        console.log("subjectDatasubjectData33::", subjectsRes);

        if (!subjectsRes?.success) {
            setLoading(false)
            return
        }
        setAllsubjects(subjectsRes?.data?.users)
        setFilteredStudents(subjectsRes?.data?.users)
        setLoading(false)
    }
    const filiterStudents = (searchTerm, grade) => {
        // if (!searchTerm) { setFilteredStudents(allSubjects); return }
        let filtered = allSubjects;
        if (!!searchTerm) {
            filtered = allSubjects?.filter(item => (
                ((item?.name?.includes(searchTerm)
                    || item?.specialNumber?.includes(searchTerm))
                ))
            )
        }
        if (!!grade) {
            filtered = filtered.filter((item) => {
                return item.grade == grade
            })
        }
        setFilteredStudents(filtered)
    }
    useEffect(() => {
        getStudents()
    }, [])
    return (
        <KeyboardAwareScrollView>
            {loading
                ? <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />

                : <View
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
                    <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>All Students</Text>

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
                            onChangeText={(e) => { filiterStudents(e, grade), setSearchTerm(e) }}
                            color='#184a99'
                            style={{ width: '90%', margin: 3 }}
                        />
                        <SelectDropdown
                            buttonStyle={{
                                width: '90%',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '1px',
                                borderColor: "white",
                                borderBottomColor: "red",
                                margin: 8,

                            }}
                            buttonTextStyle={{
                                textAlign: 'start',
                                fontSize: 15,
                            }}
                            defaultButtonText='Select Grade'
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem);
                                setGrade(selectedItem?.value)
                                filiterStudents(searchTerm, selectedItem?.value)

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.label
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.label
                            }}
                            data={[{
                                label: "Select Grade",
                                value: ""
                            }, ...grades]}
                        />
                        {filteredStudents?.length == 0
                            ? <Text>no Students :(</Text>

                            : <FlatList
                                style={{ marginBottom: 0, width: '100%' }}
                                data={filteredStudents}
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
                </View>}
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
