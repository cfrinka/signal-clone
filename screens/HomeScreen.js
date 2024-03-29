import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

// import { Container } from './styles';

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const signOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={signOut}
                    >
                        <Avatar
                            source={{ uri: auth?.currentUser?.photoURL }}
                            rounded
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 80,
                        marginRight: 20
                    }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])


    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem 
                        key={id} 
                        id={id} 
                        chatName={chatName} 
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})