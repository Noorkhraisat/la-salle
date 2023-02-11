import { Box, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectDropdown from 'react-native-select-dropdown'
import { useLocation, useNavigate } from 'react-router-native'
import StudentCard from '../../components/StudentCard'
import { grades } from '../../mocks/mocks'
import { getStudentsByRole, getUserFromLocalStorage, getUsersByRoleAndSection } from '../../utils/usersServices'

export default function childsList() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [grade, setGrade] = useState('')


    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])

    const getSubjects = async () => {
        console.log("subjectDatasubjectData::", subjectData);
        const subjectsRes = await getUsersByRoleAndSection({ ID: "" })
        if (!subjectsRes?.success) { return }
        setAllsubjects(subjectsRes?.data?.users)
        setFilteredStudents(subjectsRes?.data?.users)
    }
    const filiterStudents = (searchTerm, grade) => {
        // if (!searchTerm) { setFilteredStudents(allSubjects); return }
        const filtered = allSubjects?.filter(item => (
            ((item?.name?.includes(searchTerm)
                || item?.specialNumber?.includes(searchTerm))
                && !grade ? true : item?.grade == grade

            ))
        )
        setFilteredStudents(filtered)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <KeyboardAwareScrollView>
            <View
                style={styles.container}
            >
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
                            width: '100%',
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
                        data={grades}
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
