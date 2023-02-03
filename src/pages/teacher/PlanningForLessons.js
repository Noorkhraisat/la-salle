import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import AnnouncmentCard from '../../components/AnnouncmentCard'
import PlanCard from '../../components/PlanCard'
import { getPlansByTeacher } from '../../utils/lessonsPlanning'
import { getAnnouncmentsFromDb } from '../../utils/remindersServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import AddNewPlan from './AddNewPlan'

export default function Announcments() {
    const [announcemnts, setAnnouncemnts] = useState([])
    const [openModal, setopenModal] = useState(false)

    const getAnnouncemnts = async () => {
        const teacherData = await getUserFromLocalStorage()
        const announcmentRes = await getPlansByTeacher(teacherData.id)

        if (!announcmentRes?.success) { return }
        setAnnouncemnts(announcmentRes?.data?.plans)
    }
    useEffect(() => {
        getAnnouncemnts()
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
                <Button
                    title="Add Plan"
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
                />

                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={openModal}
                >
                    <AddNewPlan
                        setOpenModal={setopenModal}
                    />
                </Modal>

                {announcemnts?.length == 0
                    ? <Text>no Plans :(</Text>

                    : <FlatList
                        style={{ marginBottom: 20,marginTop:20,width:"95%" }}
                        data={announcemnts}
                        renderItem={({ item, idx }) => (
                            <View style={{ display: "flex", alignItems: "center" }}>

                                <PlanCard
                                    plan={item}
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
