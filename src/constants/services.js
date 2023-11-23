const BT_NAV = '/bt_navigator';
const BT_NAV_THROUGH_POSES_RCLCPP = '/bt_navigatornavigate_through_poses_rclcpp_node';
const BT_NAV_TO_POSE_RCLCPP = '/bt_navigatornavigate_to_pose_rclcpp_node';
const CONTROLLER_SERVER = '/controller_server';
const CONTROLLER_SERVER_RCLCPP = '/controller_server_rclcpp_node';
const EKF_FILTER = '/ekf_filter_node';
const GLOBAL_COSTMAP = '/global_costmap';
const JOINT_STATE = '/joint_state_publisher';
const LIFECYCLE_MANAGER_NAV = '/lifecycle_manager_navigation';
const LOCAL_COSTMAP = '/local_costmap';
const PLANNER_SERVER = '/planner_server';
const RECOVERIES_SERVER = '/recoveries_server';
const ROBOT_STATE = '/robot_state_publisher';
const RPLIDAR_COMP = '/rplidar_composition';
const SLAM_TOOLBOX = '/slam_toolbox';
const WAYPOINT_FOLLOWER = '/waypoint_follower';

const paramServices = function(BASE) {
        return {
            DESCRIBE_PARAMS:        BASE + '/describe_parameters',
            GET_PARAMS:             BASE +  '/get_parameters',
            GET_PARAM_TYPES:        BASE + '/get_parameter_types',
            LIST_PARAMS:            BASE + '/list_parameters',
            SET_PARAMS:             BASE + '/set_parameters',
            SET_PARAMS_ATOMICALLY:  BASE + '/set_parameters_atomically',
        }
};

const stateServices = function(BASE) {
    return {
        CHANGE_STATE: BASE + '/change_state',
        GET_STATE: BASE + '/get_state',
        GET_AVAILABLE_STATES: BASE + '/get_available_states',
        GET_AVAILABLE_TRANSITIONS: BASE + '/get_available_transitions',
        GET_TRANSITION_GRAPH: BASE + '/get_transition_graph',
    }
}

export const Services = Object.freeze({
    BT_NAV: Object.freeze({
        ...paramServices(BT_NAV),
        ...stateServices(BT_NAV),
    }),
    BT_NAV_THROUGH_POSES_RCLCPP: Object.freeze({
        ...paramServices(BT_NAV_THROUGH_POSES_RCLCPP),
    }),
    BT_NAV_TO_POSE_RCLCPP: Object.freeze({
        ...paramServices(BT_NAV_TO_POSE_RCLCPP),
    }),
    CONTROLLER_SERVER: Object.freeze({
        ...paramServices(CONTROLLER_SERVER),
        ...stateServices(CONTROLLER_SERVER),
    }),
    EKF_FILTER: Object.freeze({
        ...paramServices(EKF_FILTER),
    }),
    ENABLE: '/enable',
    SET_POSE: '/set_pose',
    SLAM_TOOLBOX: Object.freeze({
        ...paramServices(SLAM_TOOLBOX),
        CLEAR:                  SLAM_TOOLBOX + '/clear_changes',
        DESERIALIZE_MAP:        SLAM_TOOLBOX + '/deserialize_map',
        DYNAMIC_MAP:            SLAM_TOOLBOX + '/dynamic_map',
        GET_MARKERS:            SLAM_TOOLBOX + '/get_interactive_markers',
        MANUAL_LOOP_CLOSURE:    SLAM_TOOLBOX + '/manual_loop_closuer',
        PAUSE:                  SLAM_TOOLBOX + '/pause_new_measurements',
        SAVE_MAP:               SLAM_TOOLBOX + '/save_map',
        SERIALIZE_MAP:          SLAM_TOOLBOX + '/serialize_map',
        TOGGLE_INTERACTIVE:     SLAM_TOOLBOX + '/toggle_interactive_mode',

    }),
    START_MOTOR: '/start_motor',
    STOP_MOTOR: '/stop_motor',
    TOGGLE: '/toggle',
});


export const ServiceTypes = Object.freeze({

});