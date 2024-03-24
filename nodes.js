import { Vector3 } from "three";

export class Node {
    constructor(x, y, z) {
        this.position = new Vector3(x, y, z)
    }
}