// drawing conveyor status (3 * 5)
export const drawConveyor = (ctx, startPoint, itemStatus) => {
    ctx.beginPath();
    itemStatus.map((floor, i) => {
        floor.map((item, j) => {
            item === 0 ? ctx.fillStyle = "#666666" : ctx.fillStyle = "#30A840";
            const path = new Path2D();
            ctx.fillRect(startPoint.x+150+j*85, startPoint.y-50-i*100, 85, 50);
            path.moveTo(startPoint.x+150+j*85, startPoint.y-i*100);
            path.lineTo(startPoint.x+235+j*85, startPoint.y-i*100);
            path.lineTo(startPoint.x+235+j*85, startPoint.y-50-i*100);
            path.lineTo(startPoint.x+150+j*85, startPoint.y-50-i*100);
            path.lineTo(startPoint.x+150+j*85, startPoint.y-i*100);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#cccccc";
            path.closePath();
            ctx.stroke(path);
        }); 
    })
}

// drawing elevator box
export const drawElevatorBox = (ctx, startPoint) => {
    ctx.beginPath();
    const path = new Path2D();
    path.moveTo(startPoint.x, startPoint.y);
    path.lineTo(startPoint.x+140, startPoint.y);
    path.lineTo(startPoint.x+140, startPoint.y-300);
    path.lineTo(startPoint.x, startPoint.y-300);
    ctx.strokeStyle = "#cccccc";
    path.closePath();
    ctx.stroke(path);
}
    
// drawing lift 
export const drawLift = (ctx, startPoint, liftCurrentFloor, liftItemState) => {
    const path = new Path2D();
    path.moveTo(startPoint.x+20, startPoint.y-((liftCurrentFloor-1)*100));
    path.lineTo(startPoint.x+120, startPoint.y-((liftCurrentFloor-1)*100));
    path.lineTo(startPoint.x+120, startPoint.y-50-((liftCurrentFloor-1)*100));
    path.lineTo(startPoint.x+20, startPoint.y-50-((liftCurrentFloor-1)*100));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#cccccc";
    console.log(liftItemState)
    liftItemState ? ctx.fillStyle = "#30A840" : ctx.fillStyle = "#666666";
    ctx.fillRect(startPoint.x+20, startPoint.y-50-((liftCurrentFloor-1)*100), 100, 50);
    path.closePath();
    ctx.stroke(path);
}

// drawing irSensor
export const drawIrSensor = (ctx, startPoint, liftCurrentFloor, irSensor) => {
    const path = new Path2D();
    path.moveTo(startPoint.x+120, startPoint.y-((liftCurrentFloor-1)*100));
    path.lineTo(startPoint.x+140, startPoint.y-((liftCurrentFloor-1)*100));
    path.lineTo(startPoint.x+140, startPoint.y-50-((liftCurrentFloor-1)*100));
    path.lineTo(startPoint.x+120, startPoint.y-50-((liftCurrentFloor-1)*100));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#cccccc";
    irSensor ? ctx.fillStyle = "#30A840" : ctx.fillStyle = "#666666";
    ctx.fillRect(startPoint.x+120, startPoint.y-50-((liftCurrentFloor-1)*100), 20, 50);
    path.closePath();
    ctx.stroke(path);
}

// drawing liftStatus (arrow up, down)
export const drawLiftStatus = (ctx, startPoint, liftCurrentFloor, liftState) => {
    const path = new Path2D();    
    if(liftState === "up") {
        path.moveTo(startPoint.x+50, startPoint.y-((liftCurrentFloor-1)*100)-50);
        path.lineTo(startPoint.x+70, startPoint.y-((liftCurrentFloor-1)*100)-75);
        path.lineTo(startPoint.x+90, startPoint.y-((liftCurrentFloor-1)*100)-50);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#cccccc";
        ctx.fillStyle = "#C22400";
        ctx.fill(path);
        ctx.stroke(path);
    } else if(liftState === "down") {
        path.moveTo(startPoint.x+50, startPoint.y-((liftCurrentFloor-1)*100));
        path.lineTo(startPoint.x+70, startPoint.y-((liftCurrentFloor-1)*100)+25);
        path.lineTo(startPoint.x+90, startPoint.y-((liftCurrentFloor-1)*100));
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#cccccc";
        ctx.fillStyle = "#250899";
        ctx.fill(path);
        ctx.stroke(path);
    } 
}

// drawing destination box & text
export const drawDestinationBox = (ctx, startPoint, liftDestinationFloor) => {
    const path = new Path2D();
    path.moveTo(startPoint.x, startPoint.y-300);
    path.lineTo(startPoint.x+140, startPoint.y-300);
    path.lineTo(startPoint.x+140, startPoint.y-350);
    path.lineTo(startPoint.x, startPoint.y-350);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#cccccc";
    path.closePath();
    ctx.font = "16px Arial"
    ctx.fillStyle = "#888888";
    ctx.fillText(`Destination: ${liftDestinationFloor}`, startPoint.x+17, startPoint.y-319);
    ctx.stroke(path);

}

// drawing james
export const drawJames = (ctx, startPoint) => {
    const path = new Path2D();
    path.moveTo(startPoint.x-96, startPoint.y);
    path.lineTo(startPoint.x-20, startPoint.y);
    path.lineTo(startPoint.x-20, startPoint.y-70);
    path.lineTo(startPoint.x-96, startPoint.y-70);
    path.closePath();
    ctx.font = "16px Arial"
    ctx.fillStyle = "#888888";
    ctx.stroke(path);
    ctx.fillText(`James`, startPoint.x-85, startPoint.y+20);
}
