import { Box, Icon, Pressable } from '@react-native-material/core';
import React from 'react';
import { Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';

export default function TeacherSubjectCard({ subject, title, icon, onclick, color = "#184a99" }) {
    const navigate = useNavigate()

    return (
        <View
            // onPress={async () => {
            //     // navigate("/AddUser")
            // }}
            style={{
                flex: 1,
                width: "50%",
                height: 100,
                margin: 8,
                backgroundColor: '#17386a',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: "row",
                alignItems: 'center'
            }}>
            <Box>
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    paddingBottom:8
                }}>subject: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{subject?.name}</Text>
            </Box>


        </View >
    )
}
