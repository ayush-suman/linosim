import ROSLIB from "roslib";
import { Topics, MessageTypes } from "../../constants";

export class RosConnection {
    constructor (ros) {
        this.#ros = ros
    }

    #ros;

    getTopic(name, type) {
        return new ROSLIB.Topic({
            ros : this.#ros,
            name : name,
            messageType : type
        });
    }

    getScanTopic() {
        return this.getTopic(Topics.SCAN, MessageTypes.LASER_SCAN);
    }
}

export const connectToRover = function(url, onconnect) { 
    var ros = new ROSLIB.Ros({
        url: 'ws://192.168.7.253:9090'
    });

    if (onconnect) {
        ros.on('connection', onconnect);
    }
    
    return new RosConnection(ros);
}





