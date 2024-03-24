import * as THREE from 'three'


export function createLineGeometry(startNode, endNode) {
    const lineGeometry = new THREE.BufferGeometry();
    const postions = []
    postions.push(startNode.position.x, startNode.position.y, startNode.position.z)
    postions.push(endNode.position.x, endNode.position.y, endNode.position.z)
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(postions, 3))
    console.log('This is how the line geometry looks', postions);
    return lineGeometry;
}

export function createLine(startNode, endNode) {
    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 20
    })
    const geometry = createLineGeometry(startNode, endNode)
    const line = new THREE.Line(geometry, material)
    return line;
}