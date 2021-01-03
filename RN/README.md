# Halloween
In Progress...

"Porting" the Android version of the app to react-native. Since the original requires many device capabilites, this could be an interesting comparion development wise.

See root README for overall application description.

## Building
See [React-Native Environment Setup Docs](https://reactnative.dev/docs/environment-setup) for more details.

Needs Firebase for FaceDetector for now. So you will need to create a firebase app and generate and add config files for it follow [This](https://rnfirebase.io). Likely need to change project id's as well (from com.dpanuska.halloween) - inconvenient but may go away if I have time to make a custom "PoseDetector." 

...obviously added these to .gitignore
### React Native Package:

```
cd /<Project_Root>
npm install 
npm start //or npx react-native start etc.
```
### iOS
Requires CocoaPods
``` 
cd /<Project_Root>/ios
pod install
cd ../
npx react-native run-ios
```

## Android
Download required Android SDK, build tools, gradle, etc. (Open project in Android Studio)
```
cd /<Project_Root>
npx react-native run-android
```



