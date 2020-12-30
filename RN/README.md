# Halloween
In Progress...

"Porting" the Android version of the app to react-native. Since the original requires many device capabilites, this could be an interesting comparion development wise.

See root README for overall application description.

## Building
See [React-Native Environment Setup Docs](https://reactnative.dev/docs/environment-setup) for more details.
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



