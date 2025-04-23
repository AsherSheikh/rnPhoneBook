import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import { permissionsAddContact } from './permissions';

const AddContactModal = ({ visible, onSuccess, onClose, }) => {
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const handleAddContact = async () => {
        try {


            const addPermission = await permissionsAddContact();
            if (addPermission !== 'granted') {
                Alert.alert('Error', 'Permission Needed!');
                return
            }

            if (!contactName || !contactPhone) {
                Alert.alert('Error', 'Please enter both a name and phone number.');
                return;
            }

            // Split name into givenName and familyName
            const names = contactName.split(' ');
            const givenName = names[0] || ''; // Default to empty string if no first name
            const familyName = names[1] || ''; // Default to empty string if no last name

            // Create the new contact object
            var newPerson = {
                emailAddresses: [{
                    label: "",
                    email: "",
                }],
                givenName,
                familyName,
                phoneNumbers: [{ number: contactPhone, label: 'phone' }],
            }
            // Add new contact using `Contacts.addContact`
            await Contacts.addContact(newPerson)
                .then(() => {
                    onSuccess()
                    onClose()
                    setContactPhone('');
                    setContactName('');
                    Alert.alert('Success', 'Contact added successfully!');
                })
                .catch((err) => {
                    onClose()
                    console.error('Error adding contact:', err);
                    Alert.alert('Error', 'Failed to add contact');
                });
        } catch (error) {
            console.log('handleAddContact catch :', error)

        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Contact</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        value={contactName}
                        onChangeText={setContactName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone Number"
                        value={contactPhone}
                        onChangeText={setContactPhone}
                        keyboardType="phone-pad"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleAddContact}>
                            <Text style={styles.buttonText}>Save Contact</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#FF9800',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default AddContactModal;
