import * as FileSystem from 'expo-file-system';

export async function saveImageFile(uri: string) {
    let imageDir = getImageDirectory();
    let fileName = imageDir + Date.now().toString();

    await FileSystem.copyAsync({from: uri, to: fileName});

    return fileName;
}

async function getImageDirectory() {
    let directory = FileSystem.documentDirectory + 'pictures/';

    // Making sure directory exists
    // TODO Possilbe performance improvement - move to an init.
    await FileSystem.makeDirectoryAsync(directory, {
        intermediates: true,
    });

    return directory;
}
