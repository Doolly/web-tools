import ROSLIB from 'roslib';

const WEBSOCKET_ADDRESS = "ws://0.0.0.0:9090";

export const connectROS = (rosWS) => {
    return new Promise(resolve => {
        if (!rosWS.current) {
            rosWS.current = new ROSLIB.Ros({
                url: WEBSOCKET_ADDRESS // socket url
            });
            rosWS.current.on('connection', function() {
                console.log('Connected successfully.');
            });
            rosWS.current.on('error', function (error) {
                console.log('Error:', error);
            });
            rosWS.current.on('close', function () {
                console.log('Connection closed.');
            });
        }
        const rosObj = {};
        // TOPIC Settings
        rosObj.itemStatus = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/item_status',
            meesageType: 'std_msgs/Int8MultiArray'
        });
        rosObj.liftDestinationFloorTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/lift_destination_floor',
            messageType: 'std_msgs/Int8'
        });
        rosObj.liftCurrentFloorTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/lift_current_floor',
            messageType: 'std_msgs/Int8' 
        });
        rosObj.pushItemToLiftTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/push_item',
            messageType: 'std_msgs/Bool' 
        });
        rosObj.liftStatusTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/lift_status',
            messageType: 'std_msgs/String' 
        });
        rosObj.liftItemStatusTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/lift_item_status',
            messageType: 'std_msgs/Bool' 
        });
        rosObj.liftItemSizeTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/lift_item_size',
            messageType: 'std_msgs/String' 
        });
        rosObj.SendToDestinationTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/send_to_destination',
            messageType: 'std_msgs/String' 
        });
        rosObj.CameraTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/usb_cam/image_raw',
            messageType: 'sensor_msgs/Image' 
        });
        rosObj.EmergencyTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/emergency',
            messageType: 'std_msgs/Bool'
        });
        rosObj.manualTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/manual',
            messageType: 'std_msgs/Bool'
        });
        rosObj.liftirTopic = new ROSLIB.Topic({
            ros: rosWS.current,
            name: '/wstation/lift_ir_status',
            messageType: 'std_msgs/Bool'
        });
        resolve(rosObj);
    })
}