import { Box, Divider, Icon, Pressable } from '@react-native-material/core';
import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import HomeworkSubmission from '../pages/student/HomeworkSubmission';
import SubmittedHomeworks from '../pages/teacher/SubmittedHomeworks';

export default function TeacherHomeworkCard({ homework }) {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    return (
        <Pressable
            onPress={() => { setOpenModal(true) }}
            elevation={5}
            style={{
                marginLeft:"auto",
                marginRight:'auto',
                padding: 24,
                backgroundColor: "white",
                flex: 1,
                width: "90%",
                minHeight: 120,
                margin: 8,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'start',
                shadowOpacity: 0.2,
                shadowRadius: 2,
                borderRadius: 8

            }}>
            <Modal
                visible={openModal}
            >
                <SubmittedHomeworks

                    setOpenModal={setOpenModal}
                    homewrokId ={homework.id}
                />
            </Modal>


            <Box>

                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: "bold"
                }}>{homework?.title}</Text>
            </Box>
            <Divider style={{ margin: 6, width: "100%" }} />
            <Box>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{homework?.description}</Text>
            </Box>

            <Box style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
                <Text style={{
                    color: 'grey',
                    fontSize: 12
                }}>Due Date:{homework?.dueDate}</Text>
                {/* <Text style={{
                    color: 'grey',
                    fontSize: 12
                }}>{homework?.submitted ? "submitted" : "not submitted"}</Text> */}
            </Box>
        </Pressable >
    )
}
