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
                flex: 1,
                width: "90%",
                height: 70,
                margin: 8,
                backgroundColor: color,
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: "row",
                alignItems: 'center'
            }}>


            {/* <Icon name={icon} style={{ fontSize: 50, color: 'white' }} /> */}
            <Box>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>subject: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{subject?.name}</Text>
            </Box>
            <Box>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Teacher: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{subject?.name}</Text>
            </Box>
            <Box>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>{'Time:'}</Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{subject?.teacher_r}</Text>
            </Box>
        </View >
    )
}
