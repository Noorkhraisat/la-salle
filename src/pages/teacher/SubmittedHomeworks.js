import { Box, Button, Divider, Icon, IconButton } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocation, useNavigate } from 'react-router-native'
import { getHomeworksByTeacherRef, getSubmittedHomeWroksByHomewrokRef } from '../../utils/homewrokServices'
import { getStudentsByGrade, getUserFromLocalStorage } from '../../utils/usersServices'
import AddMark from './addMark'
import HomeWorkCard from '../../components/HomeWorkCard'
import AddHomework from './AddHomework'

export default function SubmittedHomeworks({ homewrokId, setOpenModal }) {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getSubjects = async () => {
        console.log("subjectDatasubjectData::", homewrokId);
        const subjectsRes = await getSubmittedHomeWroksByHomewrokRef(homewrokId)
        if (!subjectsRes?.success) { return }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.homeworks)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <View
            style={styles.container}
        >
            {/* <Modal
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
            </Modal> */}
            <Box
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'space-around'
                }}
            >

                <Box
                    style={{
                        display: 'flex',
                        flexDirection: "row",
                        paddingLeft: 16,
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>submitted homeworks</Text>

                    <IconButton
                        style={{
                            marginLeft: "auto",
                            marginRight: 2
                        }}
                        onPress={() => setOpenModal(false)}
                        icon={(props) => <Icon name={"close"} style={{ fontSize: 30, color: 'black' }} {...props} />}
                    ></IconButton>

                </Box>
                {allSubjects?.length == 0
                    ? <Text>no submitted homeworks :(</Text>

                    : <FlatList
                        style={{ marginBottom: 0 }}
                        data={allSubjects}
                        renderItem={({ item, idx }) => (
                            <View
                                elevation={5}
                                style={{
                                    marginTop: 16,
                                    padding: 24,
                                    backgroundColor: "white",
                                    flex: 1,
                                    width: "100%",
                                    minHeight: 200,
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'start',
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    borderRadius: 8

                                }}>


                                <Box>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: "bold"
                                    }}>{item?.student_r?.name}</Text>
                                </Box>
                                <Divider style={{ margin: 6, width: "100%" }} />
                                <Box>
                                    <Text style={{
                                        color: 'grey',
                                        fontSize: 16
                                    }}>{item?.description}</Text>
                                </Box>
                                <Box>
                                    <Button
                                        title="download file"
                                        onPress={async () => {
                                            await Linking.openURL(item.uploadedFile)
                                        }}
                                        style={{
                                            backgroundColor: 'grey',
                                            fontSize: 12
                                        }}></Button>
                                </Box>
                            </View >
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
