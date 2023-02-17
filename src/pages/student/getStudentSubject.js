import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import SubjectCard from '../../components/SubjectCard'
import { getSubjectsByGrade } from '../../utils/subjectsServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import StudentHomeworks from './StudentHomeworks'
import Spinner from 'react-native-loading-spinner-overlay';

export default function GetStudentSubject() {
    const [allSubjects, setAllsubjects] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [subjectId, setSubjectId] = useState("")
    const [loading, setLoading] = useState("")
    const getSubjects = async () => {
        setLoading(true)
        const studentData = await getUserFromLocalStorage()
        const subjectsRes = await getSubjectsByGrade(studentData?.grade)
        if (!subjectsRes?.success) {
            setLoading(false)
            return
        }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.subjects)
        setLoading(false)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (<>
        {loading ? <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
            :
            <View
                style={styles.container}
            >
                <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>Subjects</Text>
                <Modal
                    visible={openModal}
                >
                    {/* <StudentMarks
                    setOpenModal={setOpenModal}
                    subjectId={subjectId}
                /> */}
                    <StudentHomeworks
                        setOpenModal={setOpenModal}
                        subjectId={subjectId}
                    />
                </Modal>
                <Box
                    style={{
                        display: 'flex',
                        marginTop: 50,
                        width: '100%',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}
                >
                    {allSubjects?.length == 0
                        ? <Text>no Subjects :(</Text>

                        : <FlatList
                            style={{ marginBottom: 0, alignSelf: 'center', width: '100%' }}
                            data={allSubjects}
                            renderItem={({ item, idx }) => (

                                <SubjectCard
                                    subject={item}
                                    color={"#193c71"}
                                    icon={"exponent"}
                                />
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
