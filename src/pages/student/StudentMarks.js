import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { getMarksByStudent } from '../../utils/marksServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import Spinner from 'react-native-loading-spinner-overlay';

export default function StudentMarks({ studentId }) {
    const [allMarks, setAllMarks] = useState([])
    const [loading, setLoading] = useState(true)
    const getMarks = async () => {
        setLoading(true)
        const studentData = await getUserFromLocalStorage()
        const marksRes = await getMarksByStudent(studentId || studentData?.id)
        console.log("marksRes::", marksRes);
        if (!marksRes?.success) {
            setLoading(false)
            return
        }

        setAllMarks(marksRes?.data?.marks)
        setLoading(false)

    }
    useEffect(() => {
        getMarks()
    }, [])
    return (
        <>{
            <View
                style={styles.container}
            >
                {!studentId && <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>Reports</Text>}

                <Box
                    style={{
                        display: 'flex',
                        marginTop: 30,
                        justifyContent: 'space-around'
                    }}
                >

                    {allMarks?.length == 0
                        ? <Text>no Marks :(</Text>

                        : <FlatList
                            style={{ marginBottom: 0 }}
                            data={allMarks}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        height: 90,
                                        borderBottomColor: 'black',
                                        backgroundColor: '#193c71',
                                        margin: 8,
                                        width: '45%',
                                        borderRadius: 8,
                                        display: 'flex',
                                        // padding:24,
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                        padding: 16
                                    }}
                                >
                                    <Text style={{ color: 'white', padding: 4 }}>Subject : {item?.subject_r?.name} </Text>

                                    <Text style={{ color: 'white', padding: 4 }}>Exam Type: {item?.examType} </Text>

                                    <Text style={{ color: 'white', padding: 4 }}>Mark : {item?.mark}</Text>
                                </View>
                            )}
                            //Setting the number of column
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </Box>
            </View>
        }
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
