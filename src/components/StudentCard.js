import { Box, Icon, Pressable } from '@react-native-material/core';
import React from 'react';
import { Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';

export default function StudentCard({ studentData }) {
    const navigate = useNavigate()

    return (
        <View
            // onPress={async () => {
            //     // navigate("/AddUser")
            // }}
            style={{
                flex: 1,
                width: 180,
                margin: 8,
                backgroundColor: '#17386a',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'start',
                padding:8
            }}>


            {/* <Icon name={icon} style={{ fontSize: 50, color: 'white' }} /> */}
            <Box
            style={{
                display:"flex",
                flexDirection:'row'
            }}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                   
                }}>Name: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{studentData?.name}</Text>
            </Box>
            <Box
            style={{
                display:"flex",
                flexDirection:'row'
            }}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Student Number: </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{studentData?.specialNumber}</Text>
            </Box>
         
        </View >
    )
}
