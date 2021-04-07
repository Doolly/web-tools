import React, { 
    useState, 
    useEffect,
    useRef 
} from 'react';

import ROSLIB from 'roslib';

import { connectROS } from './utils/ros';
import Switch from './components/Switch';
import { 
    drawConveyor, 
    drawDestinationBox,
    drawIrSensor,
    drawLift,
    drawLiftStatus,
    drawElevatorBox,
    drawJames
} from './utils/draw';

import { 
    Button, 
    ButtonGroup,
    CustomInput
} from 'reactstrap';

import { 
    AppContainer, 
    CanvasContainer, 
    ContentsContainer, 
    Canvas, 
    CameraImage,
    Contents,
    CameraContainer,
    ButtonContainer,
    ButtonTitle,
    Title,
    TitleContainer,
    CustomButtonGroup
} from './utils/styles';
import { manual } from 'mkdirp';

// get video from this address
const CAMERA_ADDRESS = "http://0.0.0.0:8080/stream?topic=/usb_cam/image_raw&quality=70";

const CANVAS_WIDTH = 900
const CANVAS_HEIGHT = 600

// canvas lift starting point (left, bottom)
const startPoint = {
    x: 130,
    y: 500
} 

function App() {
    // ROSLIB Object
    let rosWS = useRef(null);

    // Canvas Ref
    const canvasRef = useRef(null);

    const [itemStatus, setItemStatus] = useState([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]);
    const [liftDestinationFloor, setLiftDestinationFloor] = useState(-1);
    const [liftCurrentFloor, setLiftCurrentFloor] = useState(2);
    const [pushItemToLift, setPushItemToLift] = useState(false);
    const [liftState, setLiftState] = useState("arrived");
    const [liftItemState, setLiftItemState] = useState(false);
    const [liftItemSize, setLiftItemSize] = useState("none");
    const [sendToDestination, setSendToDestination] = useState("none");
    const [james, setJames] = useState(true);
    const [irSensor, setIrSensor] = useState(false);
    const [emergencyStatus, setEmergencyStatus] = useState(false);
    const [manualStatus, setManualStatus] = useState(false);

    const [width, setWidth] = useState(900);
    const [height, setHeight] = useState(600);

    useEffect(async () => {
        // Connect ros websocket
        const rosObj = await connectROS(rosWS);
        rosObj.EmergencyTopic.subscribe(function(message) { 
            console.log(message.data);
            setEmergencyStatus(message.data);
        })
        rosObj.SendToDestinationTopic.subscribe(function(message) {
            setSendToDestination(message.data);
        });
        rosObj.liftItemSizeTopic.subscribe(function(message) {
            setLiftItemSize(message.data);
        });
        rosObj.liftItemStatusTopic.subscribe(function(message) {
            setLiftItemState(message.data);
        });
        rosObj.liftStatusTopic.subscribe(function(message) {
            setLiftState(message.data);
        });
        rosObj.pushItemToLiftTopic.subscribe(function(message) {
            setPushItemToLift(message.data);
        });
        rosObj.liftCurrentFloorTopic.subscribe(function(message) {
            setLiftCurrentFloor(message.data);
        });
        rosObj.liftDestinationFloorTopic.subscribe(function(message) {
            if(message.data !== liftDestinationFloor) setLiftDestinationFloor(message.data);
        });
        rosObj.itemStatus.subscribe(function(message) {
            setItemStatus(message.data.division(5));
        });
        rosObj.manualTopic.subscribe(function(message) {
            setManualStatus(message.data);
        })
        rosObj.liftirTopic.subscribe(function(message){
            setIrSensor(message.data);
        })
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
    
        // initializing canvas when draw, redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw Canvas
        drawCanvas(ctx);
    }, []);

    // Redraw when states changed
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawCanvas(ctx);
    }, [liftCurrentFloor, liftDestinationFloor, liftItemSize, itemStatus, liftState, liftItemSize, irSensor]);

    // Publish when Button onClick
    const sendMessage = async (data, name, type) => {
        let pr = new Promise((resolve, reject) => {
            let topic = new ROSLIB.Topic({
                ros: rosWS.current,
                name: name,
                messageType: type
            })
            resolve(topic);
        })
        let topic = await pr;
        let message_status = new ROSLIB.Message({
            data: data
        });
        topic.publish(message_status);
    }
    const sendMessageThree = async (data1, name1, type1, data2, name2, type2, data3, name3, type3) => {
        let pr1 = new Promise((resolve, reject) => {
            let topic1 = new ROSLIB.Topic({
                ros: rosWS.current,
                name: name1,
                messageType: type1
            })
            resolve(topic1);
        })
        let topic1 = await pr1;
        let message_status1 = new ROSLIB.Message({
            data: data1
        });
        topic1.publish(message_status1);
        let pr2 = new Promise((resolve, reject) => {
            let topic2 = new ROSLIB.Topic({
                ros: rosWS.current,
                name: name2,
                messageType: type2
            })
            resolve(topic2);
        })
        let topic2 = await pr2;
        let message_status2 = new ROSLIB.Message({
            data: data2
        });
        topic2.publish(message_status2);
        let pr3 = new Promise((resolve, reject) => {
            let topic3 = new ROSLIB.Topic({
                ros: rosWS.current,
                name: name3,
                messageType: type3
            })
            resolve(topic3);
        })
        let topic3 = await pr3;
        let message_status3 = new ROSLIB.Message({
            data: data3
        });
        topic3.publish(message_status3);
    }

    const drawCanvas = (ctx) => {
        ctx.clearRect(0, 0, width, height);
        drawConveyor(ctx, startPoint, itemStatus);
        drawElevatorBox(ctx, startPoint);
        drawDestinationBox(ctx, startPoint, liftDestinationFloor);
        drawIrSensor(ctx, startPoint, liftCurrentFloor, irSensor);
        drawLiftStatus(ctx, startPoint, liftCurrentFloor, liftState);
        drawLift(ctx, startPoint, liftCurrentFloor, liftItemState);
        drawJames(ctx, startPoint);
    }

    // Render
    return (
        <AppContainer>
            <CanvasContainer>
                <Canvas 
                    ref={canvasRef} 
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                />
            </CanvasContainer>
            <ContentsContainer>
                <Contents>
                    <CameraContainer>
                        <TitleContainer>
                            <Title>Camera | ItemSize : {liftItemSize.toString()}</Title>
                        </TitleContainer>
                        <CameraImage src={CAMERA_ADDRESS}/>
                    </CameraContainer>
                    <ButtonContainer>
                        <TitleContainer>
                            <Title>Buttons {emergencyStatus.toString()}</Title>
                        </TitleContainer>
                        <ButtonGroup>
                            <CustomButtonGroup>
                                <ButtonTitle>Emergency Switch</ButtonTitle>
                                <ButtonGroup>
                                    <Switch keyname="em" isOn={emergencyStatus} handleToggle={() => sendMessage(!emergencyStatus, '/wstation/emergency', 'std_msgs/Bool')}/>
                                </ButtonGroup>
                            </CustomButtonGroup>
                                
                            <CustomButtonGroup>
                                <ButtonTitle>Manual Switch</ButtonTitle>
                                <ButtonGroup>
                                    <Switch keyname="mn" isOn={manualStatus} handleToggle={() => sendMessage(!manualStatus, '/wstation/manual', 'std_msgs/Bool')} disabled={!emergencyStatus}/>
                                </ButtonGroup>
                            </CustomButtonGroup>
                        </ButtonGroup>
                        <ButtonTitle>Lift Destination Floor</ButtonTitle>
                        <ButtonGroup>
                            <Button onClick={() => sendMessageThree(1, '/wstation/lift_destination_floor', 'std_msgs/Int8',
                                                                    "none", '/wstation/send_to_destination', 'std_msgs/String',
                                                                    false, '/wstation/push_item', 'std_msgs/Bool')} 
                                                                    disabled={!manualStatus}>1F</Button>
                            <Button onClick={() => sendMessageThree(2, '/wstation/lift_destination_floor', 'std_msgs/Int8',
                                                                    "none", '/wstation/send_to_destination', 'std_msgs/String',
                                                                    false, '/wstation/push_item', 'std_msgs/Bool')} 
                                                                    disabled={!manualStatus}>2F</Button>
                            <Button onClick={() => sendMessageThree(3, '/wstation/lift_destination_floor', 'std_msgs/Int8',
                                                                    "none", '/wstation/send_to_destination', 'std_msgs/String',
                                                                    false, '/wstation/push_item', 'std_msgs/Bool')} 
                                                                    disabled={!manualStatus}>3F</Button>
                        </ButtonGroup>
                        <ButtonTitle>Send to Destination</ButtonTitle>
                        <ButtonGroup>
                            <Button onClick={() => sendMessageThree("james", '/wstation/send_to_destination', 'std_msgs/String', 
                                                                    -1, '/wstation/lift_destination_floor', 'std_msgs/Int8',
                                                                    false, '/wstation/push_item', 'std_msgs/Bool')} 
                                                                    disabled={!manualStatus}>James</Button>
                            <Button onClick={() => sendMessageThree("tray", '/wstation/send_to_destination', 'std_msgs/String', 
                                                                    -1, '/wstation/lift_destination_floor', 'std_msgs/Int8',
                                                                    false, '/wstation/push_item', 'std_msgs/Bool')} 
                                                                    disabled={!manualStatus}>Tray</Button>
                        </ButtonGroup>
                        <ButtonTitle>Push Item to Lift</ButtonTitle>
                        <ButtonGroup>
                            <Button onClick={() => sendMessageThree(true, '/wstation/push_item', 'std_msgs/Bool',
                                                                    "none", '/wstation/send_to_destination', 'std_msgs/String', 
                                                                    -1, '/wstation/lift_destination_floor', 'std_msgs/Int8',)} 
                                                                    disabled={!manualStatus}>True</Button>
                            <Button onClick={() => sendMessageThree(false, '/wstation/push_item', 'std_msgs/Bool',
                                                                    "none", '/wstation/send_to_destination', 'std_msgs/String', 
                                                                    -1, '/wstation/lift_destination_floor', 'std_msgs/Int8',)} 
                                                                    disabled={!manualStatus}>False</Button>
                        </ButtonGroup>
                    </ButtonContainer>
                </Contents>
            </ContentsContainer>
        </AppContainer>
    );
}

export default App;
