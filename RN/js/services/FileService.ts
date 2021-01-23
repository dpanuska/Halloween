import * as FileSystem from 'expo-file-system';

export const PICTURE_FOLDER = 'pictures/';

export async function saveImageFile(uri: string) {
    let imageDir = await getImageDirectory();
    let fileName = imageDir + Date.now().toString();

    await FileSystem.copyAsync({from: uri, to: fileName});

    return fileName;
}

async function getImageDirectory() {
    let directory = FileSystem.documentDirectory + PICTURE_FOLDER;

    // Making sure directory exists
    // TODO Possilbe performance improvement - move to an init.
    await FileSystem.makeDirectoryAsync(directory, {
        intermediates: true,
    });

    return directory;
}
