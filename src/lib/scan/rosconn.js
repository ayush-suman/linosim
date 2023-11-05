import ROSLIB from "roslib";

export class RosConnection {
    constructor (ros) {
        this.#ros = ros
    }

    #ros;

    getTopic(name, type) {
        return new ROSLIB.Topic({
            ros : this.#ros,
            name : name, //'/scan',
            messageType : type //'sensor_msgs/msg/LaserScan'
        });
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





