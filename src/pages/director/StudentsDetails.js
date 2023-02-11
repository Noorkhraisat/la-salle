import { Box, Button, Icon, IconButton, Text } from '@react-native-material/core';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Profile from '../Profile';
import StudentHomeworks from '../student/StudentHomeworks';
import StudentMarks from '../student/StudentMarks';
import WorkOfTheMonth from '../teacher/WorkOfTheMonth';
import AllTeachers from './AllTeachers';

export default function StudentsDetails({ setOpenModal, studentData }) {

    const [selectedTab, setSelectedTab] = useState(1)
    useEffect(() => {
        // getUserData()
        console.log("studentDatastudentData::", studentData);
    }, [])
    return (

        <View>
            <Box
                style={{
                    paddingTop: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: "center"

                }}>
                <Button
                    variant='text'
                    title='Student Details'
                    width={"30%"}

                    color={selectedTab == 1 ? 'blue' : 'black'}
                    onPress={() => {
                        setSelectedTab(1)
                    }}

                />
                <Button
                    color={selectedTab == 2 ? 'blue' : 'black'}
                    variant='text'
                    width={"30%"}
                    title='Marks'
                    onPress={() => {
                        setSelectedTab(2)
                    }}
                />
                <Button
                    width={"30%"}

                    color={selectedTab == 3 ? 'blue' : 'black'}
                    variant='text'
                    title='homewroks'
                    fontSize={1}
                    onPress={() => {
                        setSelectedTab(3)
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
                {selectedTab == 1 && <Profile userDetails={studentData} />}
                {selectedTab == 2 && <StudentMarks studentId={studentData.id} />}
                {selectedTab == 3 && <StudentHomeworks studentDetails={studentData} />}

            </View>
        </View>
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
