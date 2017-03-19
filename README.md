<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/6275540/24081675/b6a5e1ac-0cc0-11e7-938f-0b85ddd3e233.png"/>
</div>
<br>

## Intro

IF you are using Windows OS and you are changing your timezone frequently then doing 
it is a bit annoying, you will you have to go each time to data and time settings and search
for the timezone you want from a big list then hit save.

This app make this process easier by allowing you to add the list of timezones you usally switch between
to the app tray menu, and with a single quick you can easily switch between any timezone.

This app is only tested on windows 10 home edition.

## Download links

You will always find the latest release at this URL : https://github.com/omarabuhussein/windows-timezone-switcher/releases


## Demonstration

![42](https://cloud.githubusercontent.com/assets/6275540/24081553/c0ad9e9e-0cbe-11e7-86fb-bf18585843df.gif)

## Development notes

- This app is created using [Electron platform](https://electron.atom.io/).
- It use [Electron json storage](https://github.com/jviotti/electron-json-storage) to store user data.
- It use [Electron builder](https://github.com/electron-userland/electron-builder) to generate windows installers
- It use [Tzutil](https://technet.microsoft.com/en-us/library/hh875624(v=ws.11).aspx) command line tool to control timezones

### For local development

```javascript
git clone https://github.com/omarabuhussein/windows-timezone-switcher.git 
```

```javascript
cd windows-timezone-switcher/
```

```javascript
npm install
```
To run the app : 

```javascript
npm start
```

### To generate windows installer

```javascript
npm run dist
```



