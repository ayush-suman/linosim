import {connectToRover} from './rosconn';

let scan_topic;

export function subscribe(onPointData) {
    // Service for finding the IP of the rover. Could be a server that uses auth to find registered Rovers and their recent known IP addresses.
    const conn = connectToRover("ws://192.168.7.253/9090", function () {
        console.log("Connected to rover successfully");
    });
  
    scan_topic = conn.getTopic('/scan', 'sensor_msgs/msg/LaserScan');
    scan_topic.subscribe(function(message) {
        let points = message.ranges.map((range, index) => { if (range) {
            return [range * 30, index/180.0*Math.PI];
        } else {
            return null;
        }});
        onPointData(points);
        // console.log(points);
    })
}

