# treemo-mobile

Kanban board: https://waffle.io/treemoapp/treemo-mobile

Project planning: https://drive.google.com/folderview?id=0B2Rum2zEpwhgT1NJTGlJc05LV0E&usp=sharing

## MVP mobile app

- Facebook login using oauth
- Get locations nearby (GET api + lat/lng)
- Check-in to location: logs on treemo web + posts facebook update (POST api)


## What's going to give?

|   |  LIKELY |   | MAYBE  |   | DEFINITELY NOT  |
|---|:---:|:---:|:---:|:---:|:---:|
|SCOPE  |   |   |   | X  |   |
|HOURS   |   |   | X  |   |   |
|TESTING/QUALITY   |   |   | X |  |   |
|TEAMWORK/PAIRING/COMMUNICATION   |   |   |   |   | X  |
|UX/DESIGN   |   |   |   | X |   |

## Tech stack - mobile
- ionic: http://ionicframework.com/
- Apache cordova: https://cordova.apache.org/
- ngCordova: http://ngcordova.com/

## Prerequisites

You will need the following things properly installed on your computer.

* Node.js with NPM
* Latest Cordova and Ionic CLIs (npm install -g cordova ionic)
* Android platform (ionic platform add android)
* Android Studio/Xcode for platform-specific emulators

### Project setup on local environment

`ionic state restore` (will read package.json file and update platform/plugin dependencies)

#### Serve ios & android in browser

`ionic serve --lab`

#### Run app in simulators
`ionic emulate ios`  
`ionic emulate android`


#### Tests
