import { Icon, Pressable } from '@react-native-material/core';
import React from 'react';
import { Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import { getUserBySpecialNumberAndPassword } from '../utils/usersServices';

export default function Card({ title, icon, onclick, color = "#184a99" }) {
    const navigate = useNavigate()
    return (
        <Pressable
            onPress={async () => {
                navigate("/AddUser")
            }}
            style={{
                flex: 1,
                width: "50%",
                height: 150,
                margin: 8,
                backgroundColor: color,
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>


            <Icon name={icon} style={{ fontSize: 50, color: 'white' }} />
            <Text style={{
                color: 'white',
                fontSize: 16
            }}>{title}</Text>
        </Pressable >
    )
}
