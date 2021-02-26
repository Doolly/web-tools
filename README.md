
## Overview

This repo contains some examples regarding web-based tools for controlling a robot.

* integration: navigation map, james_face control panel, joystick, teleop, camera
* pC2nlaser: 3d map, laser scan, teleopbutton, robot marker,view( laser, map_) on off button

## Robot-Side Setup

This guide assumes that you're using Kobuki with Orbbec Astra RGBD camera.

0. Install dependencies
```bash
sudo apt install ros-[version_name]-rosbridge-suite
sudo apt install ros-[version_name]-web-video-server
sudo apt install ros-[version_name]-tf2-web-republisher   //(for pC2nlaser.html)
```

1. Run roscore

```bash
roslaunch kobuki_metapackage kobuki_navigation.launch
```

2. Run the rosbridge server

```bash
roslaunch rosbridge_server rosbridge_websocket.launch
```

3. Run the video streaming server

```bash
roslaunch astra_camera astra.launch
rosrun web_video_server web_video_server
```

4. TF Publisher (for pC2nlaser.html)

```bash
rosrun tf2_web_republisher tf2_web_republisher 
```
### Using electron view(james_face)

0. install

```bash
sudo apt update
# nodejs install
sudo apt-get install nodejs
# install check
node -v
npm -v

# option - yarn install 
npm install --global yarn
# install check
yarn --version

sudo apt-get install ros-melodic-rosbridge-server
cd webtool_example/face_screen
yarn install
```

2. Run rosbridge server & electron page

```bash
# terminal 1
roslaunch robot_gui_bridge websocket.launch
# terminal 2
cd <your-workspace>/webtool_example/face_screen
yarn start
```

3. Run html
* integration.html
* pC2nlaser.html





## How to Use Tools

Press the link below or open the corresponding html file (except rosweb) in your web browser.

* [navtest](https://github.com/3watt/webtool-examples/raw/master/navtest.html) ([wiki](https://wiki.ros.org/nav2djs/))
* [teleop_test](https://github.com/3watt/webtool-examples/raw/master/teleop_test.html) ([wiki](https://wiki.ros.org/keyboardteleopjs/))
* [rosweb](http://labrom.eesc.usp.br/rosweb/) ([repo](https://github.com/EESC-LabRoM/rosweb))
