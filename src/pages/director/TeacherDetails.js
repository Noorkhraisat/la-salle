import { Box, Button, Icon, IconButton, Text } from '@react-native-material/core';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Profile from '../Profile';
import WorkOfTheMonth from '../teacher/WorkOfTheMonth';
import AllTeachers from './AllTeachers';

export default function TeacherDetails({ setOpenModal, teacherData }) {

    const [selectedTab, setSelectedTab] = useState(1)
    useEffect(() => {
        // getUserData()
        console.log(teacherData);
    }, [])
    return (

        <KeyboardAwareScrollView
            style={{
                minHeight: "100%"

            }}
        >
            <Box
                style={{
                    paddingTop: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems:"center"

                }}>
                <Button
                    variant='text'
                    title='Teacher Details'
                    color={selectedTab == 1 ? 'blue' : 'black'}
                    onPress={() => {
                        setSelectedTab(1)
                    }}

                />
                <Button
                    color={selectedTab == 2 ? 'blue' : 'black'}
                    variant='text'
                    title='Teacher works'
                    onPress={() => {
                        setSelectedTab(2)
                    }}
                />
                <IconButton
                    style={{
                        marginLeft: "auto",
                        marginRight: 2
                    }}
                    onPress={() => setOpenModal(false)}
                    icon={(props) => <Icon name={"close"} style={{ fontSize: 30, color: 'black' }} {...props} />}
                ></IconButton>
            </Box>
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
                {selectedTab == 1
                    ? <Profile userDetails={teacherData}/>
                    : <WorkOfTheMonth teacherId={teacherData.id} />

                }
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
