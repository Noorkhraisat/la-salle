import { Banner, Box, Button, HStack, Icon, Text, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AsyncStorage, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import firebase from '../database/firebaseConfig';
import { getUserBySpecialNumberAndPassword, getUserFromLocalStorage, setUserToLocalStorage } from '../utils/usersServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LoginForm() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrmessage] = useState('')

    const navigate = useNavigate()
    const dbRef = firebase.firestore().collection('users');
    const loginFunc = async () => {
        console.log("start::");
        setErrmessage("")
        const loginRes = await getUserBySpecialNumberAndPassword({ email: userName, password: password })
        if (!loginRes?.success) {
            console.log("fail::", loginRes);
            setErrmessage(loginRes?.errMessage)
            return
        }
        try {

            await setUserToLocalStorage(loginRes?.data?.users?.[0])
            navigate('/Dashboard')

        } catch (e) { }
        console.log("DashboardDashboardDashboard::", loginRes?.data?.users?.[0]);
        navigate('/Dashboard')

    }
    const getUserData = async () => {
        const user = await getUserFromLocalStorage()
        if (!!user?.email || !!user?.specialNumber) {
            navigate('/Dashboard')
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (

        <KeyboardAwareScrollView
            style={{
                minHeight: "100%"

            }}
        >
            <View style={
                {

                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 0,
                    marginTop: 100
                }
            }
            >
                <Image
                    style={{
                        width: '100%',
                    }}
                    source={require('../../assets/backgroundLogo.png')}
                />

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
                        label='Special Number'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={userName}
                        onChangeText={(e) => {
                            setUserName(e)
                        }}
                    />
                    <TextInput
                        color='#184a99'
                        label='password'
                        value={password}
                        secureTextEntry={true}
                        style={{ width: '100%', margin: 3 }}
                        onChangeText={(e) => {
                            setPassword(e)

                        }}
                    />
                    <Button
                        title="Login"
                        onPress={() => {
                            loginFunc()
                        }}
                        style={{
                            margin: 24,
                            padding: 8,
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: "#193c71"
                        }}
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
