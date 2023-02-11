import { Box, Button, Divider, Icon, Pressable } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { Linking, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';

export default function WorkCard({ work }) {
    const navigate = useNavigate()
    useEffect(() => {
        console.log("wrok::", work);
    }, [])
    return (
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
                }}>{work?.month + "-" + work.year}</Text>
            </Box>
            <Divider style={{ margin: 6, width: "100%" }} />
            <Box>
                <Text style={{
                    color: 'black',
                    fontSize: 20
                }}>{work?.description}</Text>
            </Box>
            <Box>
                <Text style={{
                    color: 'grey',
                    fontSize: 16
                }}>{work?.description}</Text>
            </Box>
            <Box>
                <Button
                    title="download file"
                    onPress={async () => {
                        await Linking.openURL(work.uploadedFile)
                    }}
                    style={{
                        backgroundColor: '#193c71',
                        fontSize: 12
                    }}></Button>
            </Box>
        </View >
    )
}
