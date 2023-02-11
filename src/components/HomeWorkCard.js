import { Box, Divider, Icon, Pressable } from '@react-native-material/core';
import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import HomeworkSubmission from '../pages/student/HomeworkSubmission';

export default function HomeWorkCard({ homework, studentDetails }) {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    return (
        <Pressable
            onPress={() => { !studentDetails?.id && setOpenModal(true) }}
            elevation={5}
            style={{
                alignSelf: 'center',
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
                <HomeworkSubmission

                    setOpenModal={setOpenModal}
                    homeworkData={homework}
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
                <Text style={{
                    color: 'grey',
                    fontSize: 12
                }}>{homework?.submitted ? "submitted" : "not submitted"}</Text>
            </Box>
        </Pressable >
    )
}
