import * as FileSystem from 'expo-file-system';

export async function saveImageFile(uri: string) {
    let imageDir = getImageDirectory();
    let fileName = imageDir + Date.now().toString();
    await FileSystem.makeDirectoryAsync(imageDir, {
        intermediates: true,
    });
    await FileSystem.copyAsync({from: uri, to: fileName});
    return fileName;
}

function getImageDirectory() {
    return FileSystem.documentDirectory + 'pictures/';
}
