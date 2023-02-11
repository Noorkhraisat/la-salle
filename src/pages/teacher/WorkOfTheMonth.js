import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import WorkCard from '../../components/WorkCard'
import { getworksByTeacher } from '../../utils/monthWork'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import AddNewWork from './AddNewWork'

export default function WorkOfTheMonth({ teacherId }) {
    const [works, setWork] = useState([])
    const [openModal, setopenModal] = useState(false)

    const getWorks = async () => {

        const teacherData = await getUserFromLocalStorage()
        const workRes = await getworksByTeacher(!!teacherId ? teacherId : teacherData.id)

        if (!workRes?.success) { return }
        setWork(workRes?.data?.works)
    }
    useEffect(() => {
        getWorks()
    }, [])
    return (
        <View
            style={styles.container}
        >


            <Box
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'space-around',
                    alignItems: "center"
                }}
            >

                {!teacherId
                    && <Text style={{ fontSize: 22, fontWeight: 'bold', paddingBottom: 24 }}>Work of the month</Text>}
                {!teacherId
                    && <Button
                        title="Add"
                        onPress={() => {
                            setopenModal(true)
                        }}
                        style={{
                            padding: 8,
                            display: 'flex',
                            alignItems: 'center',
                            width: '95%',
                            backgroundColor: "#193c71"
                        }}
                    />}

                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={openModal}
                >
                    <AddNewWork
                        setOpenModal={setopenModal}
                    />
                </Modal>

                {works?.length == 0
                    ? <Text>no works added :(</Text>

                    : <FlatList
                        style={{ marginBottom: 20, marginTop: 20, width: "95%" }}
                        data={works}
                        renderItem={({ item, idx }) => (
                            <View style={{ display: "flex", alignItems: "center", }}>
                                <WorkCard
                                    work={item}
                                />

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
