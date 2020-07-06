let scene,renderer,rootCircle;
let childCircles = [];

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    const mainContent = document.getElementById("main_content");
    mainContent.appendChild(renderer.domElement);

    const rootGeometry = new THREE.CircleGeometry(28,6);
    const rootMaterial = new THREE.MeshBasicMaterial({color:0x272727,transparent:true,opacity:0.0});
    rootCircle = new THREE.Mesh(rootGeometry,rootMaterial);
    rootCircle.geometry.verticesNeedUpdate = true;
    scene.add(rootCircle);

    camera.position.z = 18;
    camera.rotation.x += 1.3;
    camera.position.y += -80;

    const childGeometries = [];
    const childMaterials = [];

    for (var i = 1;i<rootCircle.geometry.vertices.length;i++){
        console.log(rootCircle.geometry.vertices[i].x);
        console.log(rootCircle.geometry.vertices[i].y);

        childGeometries[i] = new THREE.CircleGeometry(8,64);
        childMaterials[i] = new THREE.MeshBasicMaterial({color:0x272727});
        childCircles[i] = new THREE.Mesh(childGeometries[i],childMaterials[i]);
        childCircles[i].position.x = rootCircle.geometry.vertices[i].x;
        childCircles[i].position.y = rootCircle.geometry.vertices[i].y;
        childCircles[i].rotation.x += 241/Math.PI;
        scene.add(childCircles[i]);
    }
}

function animate(){
    requestAnimationFrame(animate);

    rootCircle.rotation.z += -0.03;

    for(var i = 1 ; i<rootCircle.geometry.vertices.length;i++){
        var testVector = rootCircle.geometry.vertices[i].clone();
        testVector.applyMatrix4(rootCircle.matrixWorld);
        childCircles[i].position.x = testVector.x;
        childCircles[i].position.y = testVector.y;
    }

    renderer.render(scene,camera);
}
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

init();
animate();

window.addEventListener('resize',onWindowResize);