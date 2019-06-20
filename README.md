# **Azuchi Notes**

## About

Azuchi Notes is a simple application written in React Native for Android device. Its goal is to assist people training [Kyudo](https://en.wikipedia.org/wiki/Ky%C5%ABd%C5%8D) (traditional Japanese archery) in monitoring their training sessions. It will also give the user some feedback on how to improve his/her accuracy.

## Requirements

[React Native](https://facebook.github.io/react-native/docs/getting-started) installed.

## Installation

Using console clone repository and run npm install

```
git clone https://github.com/m-zaremba/Azuchi-Notes.git
cd Azuchi-Notes
npm install
```

## Starting the app

After installation start the app with:

```
react-native run-android
```

In case of any errors try:

```
npm start
```
and

```
react-native run-android
```
in two separate terminal windows.

## Preview

Register/login to the application using the email address.

![Sign/Login](markdown_gifs/login.gif?raw=true "App sign/login.gif")

Add a series of shots in 6 clicks. You can also add a note to any series of shots. In the main window you can preview or delete each series.

![Add shots](markdown_gifs/add_shots.gif?raw=true "Add shots gif")

You can check your stats at any time, but only after a certain number of shots the module will give you feedback info.

![Stats](markdown_gifs/stats.gif?raw=true "Statistics screen gif")

### Note

This app is still under development. Functionalities to be added:
* filter data by date range UPDATE: in progress
* restructure feedback messages on shots accuracy UPDATE: 75% done
* ~~change in the firestore database structure~~ Done.
* login with google account (?)
