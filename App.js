/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import RNFS from 'react-native-fs'

const App: () => React$Node = () => {
  const imgFilepath = RNFS.DocumentDirectoryPath + '/image.jpg'
  const imgFileURI = 'https://images.unsplash.com/photo-1547531455-c20b677ded4b?ixlib=rb-1.2.1&w=1000&q=80'
  const binFilepath = RNFS.DocumentDirectoryPath + '/test.bin'
  const binFileURI = 'https://www.ncl.ucar.edu/Applications/Data/bin/topo.bin'  
  console.log(binFilepath)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>

          <Button 
            title="DOWNLOAD IMG"
            onPress={async () => {
              RNFS.downloadFile({
                fromUrl: imgFileURI,
                toFile: imgFilepath
              }).promise
              .then(resp => Alert.alert('Download success: ' + JSON.stringify(resp)))
              .catch(err => Alert.alert('Download error: ' + err.message))
            }}/>

          <Button 
            title="UPLOAD IMG"
            onPress={() => {
              const uploadFileName = `image_${Date.now()}.jpg`
              const formData = new FormData()
              formData.append(`files`, {
                uri: 'file://' + imgFilepath,
                name: uploadFileName,
                filename: uploadFileName,
                type: 'application/octet-stream'
              })

              fetch(`http://localhost:3000/upload`, 
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data'
                },
                body: formData
              }).then(resp => {
                Alert.alert('Upload success')
              }).catch(err => {
                Alert.alert('Upload error: ' + err.message)
              })
            }}/>


            
          <Button 
            title="DOWNLOAD BIN"
            onPress={async () => {
              RNFS.downloadFile({
                fromUrl: binFileURI,
                toFile: binFilepath
              }).promise
              .then(resp => Alert.alert('Download success: ' + JSON.stringify(resp)))
              .catch(err => Alert.alert('Download error: ' + err.message))
            }}/>

          <Button 
            title="UPLOAD BIN"
            onPress={() => {
              const uploadFileName = `bin_${Date.now()}.bin`
              const formData = new FormData()
              formData.append(`files`, {
                uri: 'file://' + binFilepath,
                name: uploadFileName,
                filename: uploadFileName,
                type: 'application/octet-stream'
              })

              fetch(`http://localhost:3000/upload`, 
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data'
                },
                body: formData
              }).then(resp => {
                Alert.alert('Upload success')
              }).catch(err => {
                Alert.alert('Upload error: ' + err.message)
              })
            }}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
