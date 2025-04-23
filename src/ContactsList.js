import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Text, StyleSheet, AppState, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';
import Contact from './Contact';
const ContactsList = ({ findContact, refetchContact }) => {
    const [contacts, setContacts] = useState([]);
    const appState = useRef(AppState.currentState);
    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
    };
    const renderItem = ({ item, index }) => {
        return <Contact contact={item} />;
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.phoneNumbers.some((p) =>
            p.number.replace(/\s+/g, '').includes(findContact)
        )
    );

    useEffect(() => {
        const fetchContacts = () => {
            Contacts.getAll().then((contacts) => {
                setContacts(contacts);
                console.log('Fetched contacts:', contacts);
            });
        };

        fetchContacts(); // Initial fetch

        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground! Fetching contacts...');
                fetchContacts();
            }
            appState.current = nextAppState;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [refetchContact]);

    return (
        <View style={{ flex: 1, }}>
            {filteredContacts?.length === 0 && (
                <View style={styles.button}>
                    <Text style={styles.buttonText}>No contact found. Add New Contact</Text>
                </View>
            )}
            <FlatList
                data={filteredContacts}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    }, button: {
        backgroundColor: '#D7AEFB',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        marginHorizontal: 25,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
    },
});
export default ContactsList;