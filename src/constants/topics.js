export const Topics = Object.freeze({
    SCAN: '/scan',
    MAP: '/map',
    COST_CLOUD: '/cost_cloud',
    SET_POSE: '/set_pose',
    MARKER: '/marker',
});

export const MessageTypes = Object.freeze({
    POINT_CLOUD: 'sensor_msgs/msg/PointCloud2',
    LASER_SCAN: 'sensor_msgs/msg/LaserScan',
    OCCUPANCY_GRID: 'nav_msgs/msg/OccupancyGrid',
});