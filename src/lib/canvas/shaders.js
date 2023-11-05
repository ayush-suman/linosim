const fragment_shader = `
    void main(void) {
        gl_FragColor = vec4(1, 0.5, 0.0, 1);
    } 
`;

const vertex_shader = `
    attribute vec2 coordinates;

    uniform vec2 translate;
    // uniform mat2 transformation;

    void main() {
        vec2 cartesianCoords = vec2(coordinates.x * cos(coordinates.y), coordinates.x * sin(coordinates.y));
        vec2 position = cartesianCoords + translate;
        // vec2 transformed_position = transformation * position;
        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }
`;


export const shaders = {
	fs: fragment_shader,
	vs: vertex_shader,
};
