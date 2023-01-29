import { Box, Divider, Icon, Pressable } from '@react-native-material/core';
import React from 'react';
import { Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';

export default function AnnouncmentCard({ announcment }) {
    const navigate = useNavigate()

    return (
        <View
            elevation={5}
            style={{
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


            <Box>
                
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight:"bold"
                }}>{announcment?.Headline}</Text>
            </Box>
            <Divider style={{ margin: 6,width:"100%" }} />
            <Box>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{announcment?.Content}</Text>
            </Box>
        </View >
    )
}
