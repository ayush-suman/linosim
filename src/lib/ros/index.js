import {RosConnection} from './rosconn';

let conn;

export function subscribe(onPointData, onMapData, onCostData) {
    // IDEA: Service for finding the IP of the rover. 
    // Could be a server that uses auth to find registered Rovers and their recent known IP addresses.
    
    conn = new RosConnection("ws://192.168.7.253:9090", function() {
        console.log("Connected to rover successfully");
    });
  
    const cost_cloud_topic = conn.getCostCloudTopic();
    cost_cloud_topic.subscribe(function(message) {
        console.log(message);
        cost_cloud_topic.unsubscribe();
    });

    const scan_topic = conn.getScanTopic();
    scan_topic.subscribe(function(message) {
        let points = message.ranges.map((range, index) => { if (range) {
            return [range, index/180.0*Math.PI];
        } else {
            return null;
        }});
        onPointData(points);
    });

    const map_topic = conn.getMapTopic();
    map_topic.subscribe(function(message) {
        const map_data = [];
        for (let i = 0; i < message.info.height; i++) {
            map_data.push(message.data.slice(i * message.info.width, (i + 1) * message.info.width));
        }
        console.log(map_data);
        onMapData(map_data);
    });
}

export function saveMap() {
    conn.saveMap();
}

export function moveRover(mark) {
    // TODO
}
