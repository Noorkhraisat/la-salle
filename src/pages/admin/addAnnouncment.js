import { Box, Button, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addAnnouncmentToDb } from '../../utils/remindersServices';

export default function AddAnnouncment() {
    const [values, setValues] = useState({})
    const addAnnouncment = async () => {
        try {
            const res = await addAnnouncmentToDb(values)
            if (!!res?.success) {
                Alert.alert('Sucess message', res?.data?.message, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        }catch(e){
            console.log("e::",e);
        }
    }
    return (
        <KeyboardAwareScrollView>

            <View style={
                {
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }
            }
            >

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


                    <TextInput
                        label='Headline'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={values?.Headline}
                        onChangeText={(e) => {
                            setValues((v) => { return { ...v, Headline: e } })
                        }}
                    />

                    <TextInput
                        label='Content'
                        color='#184a99'
                        multiline={true}
                        numberOfLines={5}
                        style={{ width: '100%', margin: 3 }}
                        value={values?.Content}
                        onChangeText={(e) =>
                            setValues((v) => { return { ...v, Content: e } })
                        }
                    />
                    <Button
                        title={'Add Announcment'}
                        onPress={() => {
                            addAnnouncment()
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
