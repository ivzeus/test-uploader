# How to test

## Start local node server to receive file uploads
The server sample is based on this [repository](https://github.com/Majidkn/nodejs-simple-file-upload.git)
```bash
# in project root
cd server
npm i
node ./server.js
```
It starts a server at `localhost:3000` and accepts file upload through `/upload` POST request. Uploaded files will be stored in `server/uploads` folder.

## Run ReactNative sample
This sample was created by initializing a blank React Native project
```bash
react-native init TestUploader
```
To run the demo:
```bash
# in project root
npm i
cd ios
pod install
cd ..
npm run ios
```
- First click on `DOWNLOAD IMG` and `DOWNLOAD BIN` to save an image and a binary file to app storage
- Then try clicking on `UPLOAD IMG` or `UPLOAD BIN` and observe the server console
- Notice how the image file has been changed when upload, but not the binary file