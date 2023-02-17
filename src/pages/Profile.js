import { Banner, Box, Button, HStack, Icon, Text, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AsyncStorage, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import firebase from '../database/firebaseConfig';
import { getUserBySpecialNumberAndPassword, getUserFromLocalStorage, setUserToLocalStorage } from '../utils/usersServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { roles, sections } from '../mocks/mocks';

export default function Profile({ userDetails }) {
    const [errMessage, setErrmessage] = useState('')
    const [userData, setUserData] = useState()
    const navigate = useNavigate()
    const dbRef = firebase.firestore().collection('users');

    const getUserData = async () => {
        const user = await getUserFromLocalStorage()
        setUserData(userDetails || user)
        console.log(roles);
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (

        <KeyboardAwareScrollView
            style={{
                width: "100%",
                minHeight: "100%"

            }}
        >
            <View style={
                {
                    width: '100%',

                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 0,
                    marginTop: 30
                }
            }
            >
                {!userDetails && <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>User profile</Text>
                }
                <Box
                    style={{
                        alignSelf: 'center',
                        height: '60%',
                        display: 'flex',
                        padding: 16,
                        width: '100%',
                        alignItems: 'center'
                    }}
                >

                    {errMessage && <Box
                        style={{

                            width: "100%",
                            backgroundColor: "#ff8881",
                            padding: 8,
                            borderRadius: 8,
                            margin: 24,
                            alignItems: "center",
                            flexDirection: 'row'
                        }}
                    >
                        <Icon name={"exclamation-thick"} style={{ fontSize: 40, color: 'black' }} />

                        <Text >{errMessage}</Text>
                    </Box>
                    }

                    <TextInput
                        label='name'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={userData?.name}
                        editable={false}

                    />
                    {userData?.role == '1' && <TextInput
                        editable={false}
                        color='#184a99'
                        label='Grade'
                        value={"grade " + userData?.grade}
                        style={{ width: '100%', margin: 3 }}
                        readOnly={true}

                    />}
                    <TextInput
                        editable={false}
                        label='role'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={roles?.find((item) => item?.value == userData?.role)?.label}
                        readOnly={true}
                    />
                    
                    <TextInput
                        color='#184a99'
                        label='Special Number'
                        value={userData?.specialNumber}
                        editable={false}
                        style={{ width: '100%', margin: 3 }}
                    />

                </Box>

                <StatusBar style="auto" />
            </View>
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center',
        color: 'white',
        justifyContent: 'center',
    },
});
