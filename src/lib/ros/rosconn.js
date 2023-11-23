import ROSLIB from "roslib";
import { Topics, MessageTypes, Services } from "../../constants";

/// Establishes connection to Rover over websockets served by ROS bridge server. 
/// RosConnection object is used to call services or subscribe to topics.
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

    #cost_cloud_topic;
    getCostCloudTopic = function() {
        if (!this.#cost_cloud_topic) {
            this.#cost_cloud_topic = this.getTopic(Topics.COST_CLOUD, MessageTypes.POINT_CLOUD);
        }
        return this.#cost_cloud_topic;
    }

    #scan_topic;
    getScanTopic = function() { 
        if (!this.#scan_topic) {
            this.#scan_topic = this.getTopic(Topics.SCAN, MessageTypes.LASER_SCAN); 
        }
        return this.#scan_topic;
    }

    #map_topic;
    getMapTopic = function() { 
        if (!this.#map_topic) {
            this.#map_topic = this.getTopic(Topics.MAP, MessageTypes.OCCUPANCY_GRID); 
        }
        return this.#map_topic;
    }


    callService(name, type, request, callback) {
        const service = new ROSLIB.Service({
            ros: this.#ros,
            name: name, 
            serviceType: type
        });

        const serviceRequest = new ROSLIB.ServiceRequest(request);
        service.callService(serviceRequest, callback)
    }

    saveMap() {
        this.callService(Services.SLAM_TOOLBOX.SAVE_MAP, "todo", {/* todo */}, (response) => {/* todo */});
    }

    disconnect() {
        this.#ros.close()
    }
}
