import ROSLIB from "roslib";
import { Topics, MessageTypes } from "../../constants";

/// 
export class RosConnection {
    constructor (url, onconnect) {
        this.#ros = new ROSLIB.Ros({
            url: url,
        });

        if (onconnect) {
            this.#ros.on('connection', onconnect);
        }
    }

    #ros;

    getTopic(name, type) {
        return new ROSLIB.Topic({
            ros : this.#ros,
            name : name,
            messageType : type
        });
    }

    getCostCloudTopic = () => this.getTopic(Topics.COST_CLOUD, MessageTypes.POINT_CLOUD);
    getScanTopic = () => this.getTopic(Topics.SCAN, MessageTypes.LASER_SCAN);
    getMapTopic = () => this.getTopic(Topics.MAP, MessageTypes.OCCUPANCY_GRID);

    disconnect() {
        this.#ros.close()
    }
}
