import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { getMarkByStudentAndSubject, getMarksByStudent } from '../../utils/marksServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'

export default function StudentMarks({ subjectId,setOpenModal }) {
    const [allMarks, setAllMarks] = useState([])
    // const [whereTogo, setWhereToGo] = useState("homeworks")
    const getMarks = async () => {
        const studentData = await getUserFromLocalStorage()
        const marksRes = await getMarkByStudentAndSubject(studentData?.id, subjectId)
        if (!marksRes?.success) { return }
        setAllMarks(marksRes?.data?.marks)
    }
    useEffect(() => {
        getMarks()
    }, [])
    return (
        <View
            style={styles.container}
        >
<Button
style={{
    marginTop:40
}}
onPress={()=>{
    setOpenModal(false)
}}
title="ssssssssss"
></Button>

            <Box
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'space-around'
                }}
            >
                {allMarks?.length == 0
                    ? <Text>no Subjects :(</Text>

                    : <FlatList
                        style={{ marginBottom: 0 }}
                        data={allMarks}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item?.mark}</Text>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </Box>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
