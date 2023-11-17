// import {shaders} from './shaders';

export class Renderer {
    constructor(context) {
        this.#ctx = context;
        
        this.#mark_img = new Image();
        this.#mark_img.src = 'src/assets/cancel.png';
        this.#img_load_promise = new Promise((resolve, reject) => {
            this.#mark_img.onload = (event) => {
                console.log("Image loaded");
                resolve();
            }
        });
        
        // this.#vertex_buffer = this.#ctx.createBuffer();
        // this.#ctx.bindBuffer(this.#ctx.ARRAY_BUFFER, this.#vertex_buffer);

        // var vertShader = this.#ctx.createShader(this.#ctx.VERTEX_SHADER);
        // this.#ctx.shaderSource(vertShader, shaders.vs);
        // this.#ctx.compileShader(vertShader);

        // var fragShader = this.#ctx.createShader(this.#ctx.FRAGMENT_SHADER);
        // this.#ctx.shaderSource(fragShader, shaders.fs);
        // this.#ctx.compileShader(fragShader);

        // var shaderProgram = this.#ctx.createProgram();
        // this.#ctx.attachShader(shaderProgram, vertShader); 
        // this.#ctx.attachShader(shaderProgram, fragShader);

        // this.#ctx.linkProgram(shaderProgram);
        // this.#ctx.useProgram(shaderProgram);

        // var coord = this.#ctx.getAttribLocation(shaderProgram, "coordinates");
        // this.#ctx.vertexAttribPointer(coord, 2, this.#ctx.FLOAT, false, 0, 0);
        // this.#ctx.enableVertexAttribArray(coord);

        // this.#translate_location = this.#ctx.getUniformLocation(shaderProgram, "translate")
        // this.#ctx.uniform2fv(this.#translate_location, [0, 0]);

        // this.#ctx.clearColor(1.0, 1.0, 1.0, 1.0);
        // this.#ctx.clear(this.#ctx.COLOR_BUFFER_BIT);
    }

    #ctx;
    // #vertex_buffer;
    // #translate_location;
    #width;
    #height;
    #x = 0;
    #y = 0;

    #mark;
    #mark_img;
    #img_load_promise;

    resize(width, height) {
        this.#width = width;
        this.#height = height;
        //this.#ctx.viewport(0, 0, width, height);
    }

    drawPoints(points) {
        //this.#ctx.bufferData(this.#ctx.ARRAY_BUFFER, new Float32Array(points), this.#ctx.STATIC_DRAW);
        //this.#ctx.drawArrays(this.#ctx.POINTS, 0, 2);

        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        // let data = this.#ctx.getImageData(0, 0, this.#width, this.#height);

        if (this.#mark) {
            this.#ctx.drawImage(this.#mark_img, this.#mark.x, this.#mark.y, 50, 50);
        }
        
        points.forEach(element => {
            if (element) {
                let radius = element[0];
                let angle = element[1];
                this.#ctx.fillStyle = 'red';
                this.#ctx.fillRect(radius * Math.cos(angle) + this.#width / 2, radius * Math.sin(angle) + this.#height / 2, 1.3, 1.3);
            }
        });
        // this.#ctx.putImageData(data, this.#x, this.#y);
    }

    async markWithCross(x, y) {
        await this.#img_load_promise;
        this.#mark = {x: x, y: y};
        console.log("Location marked at " + x + ", " + y);
    }

    clearMark() {
        this.#mark = undefined;
        console.log("Mark cleared");
    }

    translate(x, y) {
        //this.#ctx.uniform2fv(this.#translate_location, [x, y]);
        this.#ctx.translate(x - this.#x, y - this.#y);
        this.#x = x;
        this.#y = y;
    }

    scale(s, x, y) {
        this.#ctx.scale(s, s);
        this.#ctx.translate((s - 1) * (x - this.#width / 2), (s - 1) * (y - this.#height / 2));
    }
}