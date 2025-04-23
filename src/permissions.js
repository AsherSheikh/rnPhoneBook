import { PermissionsAndroid } from 'react-native';

export function permissionsContact() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
    })
        .then((res) => {
            console.log('permissionsContact: ', res);
        })
        .catch((error) => {
            console.error('permissionsContact error: ', error);
        });
}
export function permissionsAddContact() {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to add your contacts.',
        buttonPositive: 'Please accept bare mortal',
    })
        .then((res) => {
            console.log('permissionsAddContact res: ', res);
            return res;
        })
        .catch((error) => {
            console.error('permissionsAddContact error: ', error);
        });
}