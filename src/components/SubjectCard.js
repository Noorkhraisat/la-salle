import { Box, Icon, Pressable } from '@react-native-material/core';
import React from 'react';
import { Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';

export default function SubjectCard({ subject, title, icon, onclick, color = "#184a99" }) {
    const navigate = useNavigate()

    return (
        <View
            // onPress={async () => {
            //     // navigate("/AddUser")
            // }}
            style={{
                padding: 16,
                flex: 1,
                width: "100%",
                height: 100,
                margin: 8,
                backgroundColor: color,
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'space-around',
                // flexDirection: "row",
                alignItems: 'start'
            }}>


            {/* <Icon name={icon} style={{ fontSize: 50, color: 'white' }} /> */}
            <Box style={{ flexDirection: 'row' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>subject: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{subject?.name}</Text>
            </Box>
            <Box style={{ flexDirection: 'row' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Teacher: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{subject?.teacher_r?.name}</Text>
            </Box>

        </View >
    )
}
