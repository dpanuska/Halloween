const mockDir = 'someDir/';
jest.mock('expo-file-system', () => ({
    documentDirectory: mockDir,
    makeDirectoryAsync: jest.fn(),
    copyAsync: jest.fn(),
}));

import {saveImageFile, PICTURE_FOLDER} from 'src/services/FileService';
import * as FileSystem from 'expo-file-system';
import {mocked} from 'ts-jest/utils';

describe('FileService', () => {
    let realDateNow: () => number;
    let dateNowStub: () => number;
    const mockDate = new Date(Date.UTC(2021, 1, 22)).valueOf();
    beforeEach(() => {
        jest.resetAllMocks();

        realDateNow = Date.now.bind(global.Date);
        dateNowStub = jest.fn(() => mockDate);
        global.Date.now = dateNowStub;
    });

    afterEach(() => {
        global.Date.now = realDateNow;
    });

    it('should copy an image from one location to documents', async () => {
        let mockUri = 'image uri';
        let mockFilePath = mockDir + PICTURE_FOLDER + mockDate.toString();
        await saveImageFile(mockUri);
        expect(mocked(FileSystem.copyAsync)).toHaveBeenCalledWith({
            from: mockUri,
            to: mockFilePath,
        });
    });

    it('should fail saveImageFile if FileSytem throws errors', async () => {
        let mockUri = 'image uri';
        let mockError = new Error('error');
        mocked(FileSystem.copyAsync).mockRejectedValue(mockError);
        await expect(saveImageFile(mockUri)).rejects.toThrow(mockError);

        mocked(FileSystem.copyAsync).mockReset();
        mocked(FileSystem.makeDirectoryAsync).mockRejectedValue(mockError);
        await expect(saveImageFile(mockUri)).rejects.toThrow(mockError);
    });
});
