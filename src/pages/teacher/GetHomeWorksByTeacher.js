import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useLocation, useNavigate } from 'react-router-native'
import TeacherHomeworkCard from '../../components/TeacherHomeworkCard'
import { getHomeworksByTeacherRef } from '../../utils/homewrokServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import AddHomework from './AddHomework'

export default function GetHomeWorksByTeacher() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const [loading, setLoading] = useState(true)

    const getSubjects = async () => {
        setLoading(true);
        const userData = await getUserFromLocalStorage()
        const subjectsRes = await getHomeworksByTeacherRef(userData?.id)
        if (!subjectsRes?.success) {
            setLoading(false);
            return
        }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.homeworks)
        setLoading(false);

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
                    <Modal
                        animationType="slide"
                        visible={openModal}
                        onRequestClose={() => {
                            setOpenModal(!openModal);
                        }}>
                        <AddHomework
                            subjectData={subjectData}
                            studentData={selectedStudent}
                            setOpenModal={setOpenModal}
                        />
                    </Modal>
                    <Box
                        style={{
                            display: 'flex',
                            marginTop: 50,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Button
                            title="add homework"
                            style={{
                                backgroundColor: '#17386a',
                                padding: 8,
                                width: '90%'
                            }}
                            onPress={() => { setOpenModal(true) }}
                        />
                        {allSubjects?.length == 0
                            ? <Text>no home works added :(</Text>

                            : <FlatList
                                style={{ marginBottom: 0, width: '100%' }}
                                data={allSubjects}
                                renderItem={({ item, idx }) => (
                                    <TeacherHomeworkCard
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
            }

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: 'center',
        display: "flex",
        width: "100%",
    },
});
