<template>
  <div class="virtual-factory-container min-h-screen w-full relative overflow-hidden bg-[#1a1c20]">
    
    <div class="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none flex justify-between items-center text-[#fcfaf5]">
      <div>
        <h1 class="text-2xl font-serif tracking-widest">考工台 · 营造工坊 <span class="text-palace-red text-sm ml-2 border border-palace-red px-2 rounded">绝对网格引擎版</span></h1>
        <p class="text-[11px] opacity-80 mt-2 tracking-widest bg-black/40 px-3 py-1 rounded inline-block backdrop-blur-sm border border-white/10">
          <strong class="text-palace-red">左键拖拽</strong> 旋转视角 (选中墙/地/梁时为拉伸建造) ｜ <strong class="text-palace-red">右键</strong> 拆除 ｜ <strong class="text-palace-red">WASD + Space/Shift</strong> 漫游<br/>
          已开启绝对网格对齐与智能榫卯穿插 ｜ 按 <strong class="text-palace-red">1~8</strong> 切换构件 ｜ <strong class="text-palace-red">R</strong> 旋转
        </p>
      </div>
      <button @click="$router.back()" class="pointer-events-auto border border-white/20 px-4 py-2 text-sm hover:bg-palace-red transition-colors backdrop-blur-md">
        归卷退出
      </button>
    </div>

    <div class="absolute left-6 top-24 bottom-24 z-10 w-24 overflow-y-auto hidden-scrollbar flex flex-col gap-3 pointer-events-auto pr-2">
      <div 
        v-for="(part, index) in partsList" 
        :key="part.id"
        @click="selectPart(index)"
        class="part-btn w-full flex-shrink-0 aspect-square bg-[#2c2825]/80 backdrop-blur-md border-2 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-300 relative"
        :class="activePart.id === part.id ? 'border-palace-red text-palace-red scale-105 shadow-[0_0_20px_rgba(155,46,46,0.4)]' : 'border-white/10 text-white/50 hover:border-white/30'"
      >
        <span class="absolute top-1 left-2 text-[9px] opacity-50 font-sans">{{ index + 1 }}</span>
        <span class="text-2xl font-serif">{{ part.icon }}</span>
        <span class="text-[10px] tracking-widest">{{ part.name }}</span>
        <div v-if="part.draw.includes('drag')" class="absolute bottom-0 right-0 bg-palace-red text-white text-[8px] px-1 scale-75 origin-bottom-right">拉伸</div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-6">
      <button @click="clearScene" class="bg-palace-red/80 hover:bg-palace-red border border-palace-red text-[#fcfaf5] backdrop-blur-md px-8 py-3 text-sm tracking-[0.3em] font-serif transition-all shadow-lg pointer-events-auto">
        清空全景重建
      </button>
    </div>

    <div ref="threeContainer" class="w-full h-screen cursor-crosshair" @contextmenu.prevent></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

const threeContainer = ref(null);

// ================== 🚨 绝对模数化尺寸 (严丝合缝的核心) ==================
const partsList = [
  { id: 'base', name: '柱础', icon: '础', type: 'box', size: [0.8, 0.2, 0.8], color: 0xD3CFC8, roughness: 0.9, draw: 'click' },
  { id: 'pillar', name: '立柱', icon: '柱', type: 'cylinder', size: [0.5, 4, 0.5], color: 0x8B3A2B, roughness: 0.7, draw: 'click' }, 
  { id: 'beam', name: '横梁', icon: '梁', type: 'box', size: [0.5, 0.4, 0.5], color: 0x5C3A21, roughness: 0.8, draw: 'drag-wall' }, 
  { id: 'wall', name: '白粉墙', icon: '墙', type: 'box', size: [0.3, 4, 0.3], color: 0xE8E6E1, roughness: 0.9, draw: 'drag-wall' },
  { id: 'floor', name: '青砖地', icon: '地', type: 'box', size: [1, 0.2, 1], color: 0x8A8D8F, roughness: 0.9, draw: 'drag-floor' },
  { id: 'dougong', name: '斗拱', icon: '拱', type: 'box', size: [1.0, 0.6, 1.0], color: 0x9B2E2E, roughness: 0.8, draw: 'click' },
  { id: 'sunmao', name: '榫头', icon: '榫', type: 'box', size: [0.8, 0.3, 0.8], color: 0x4A2F1D, roughness: 0.8, draw: 'click' },
  { id: 'roof', name: '攒尖顶', icon: '顶', type: 'pyramid', size: [6, 3, 6], color: 0x333A42, roughness: 0.6, draw: 'click' }
];

const activePart = ref(partsList[0]); 
let currentRotation = 0; 

let isDragging = false;
let dragStartPos = null; 
let dragMesh = null; 

let scene, camera, renderer, controls;
let gridHelper, planeMesh;
let raycaster, mouse;
let ghostMesh = null; 
const builtObjects = []; 

const keys = { w: false, a: false, s: false, d: false, space: false, shift: false };
let mouseDownPos = { x: 0, y: 0 };

const ghostMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x9B2E2E, transparent: true, opacity: 0.7, emissive: 0x9B2E2E, emissiveIntensity: 0.4, depthWrite: false
});

const createGeometry = (part, dynamicSize = null) => {
  const s = dynamicSize || part.size;
  if (part.type === 'cylinder') {
    return new THREE.CylinderGeometry(s[0]/2, s[0]/2, s[1], 32); 
  } else if (part.type === 'pyramid') {
    const geo = new THREE.ConeGeometry(s[0] * 0.707, s[1], 4);
    geo.rotateY(Math.PI / 4);
    return geo;
  } else {
    return new THREE.BoxGeometry(s[0], s[1], s[2]);
  }
};

const selectPart = (index) => {
  if (partsList[index]) {
    activePart.value = partsList[index];
    updateGhostMesh();
  }
};

const rotatePart = (angle) => {
  currentRotation += angle; 
  if (ghostMesh) gsap.to(ghostMesh.rotation, { y: currentRotation, duration: 0.15, ease: "power2.out" });
};

// ================== 初始化场景 ==================
const initThree = () => {
  const container = threeContainer.value;
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x1a1c20, 0.012);

  camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(15, 12, 20);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true; 
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2; 
  controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: null };

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
  dirLight.position.set(15, 30, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

  gridHelper = new THREE.GridHelper(80, 80, 0x3B5E6E, 0x333333);
  scene.add(gridHelper);

  const planeGeo = new THREE.PlaneGeometry(80, 80);
  const planeMat = new THREE.MeshStandardMaterial({ color: 0x1a1c20, roughness: 1 });
  planeMesh = new THREE.Mesh(planeGeo, planeMat);
  planeMesh.rotation.x = -Math.PI / 2;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  updateGhostMesh();

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mousedown', onMouseDown);
  container.addEventListener('mouseup', onMouseUp);

  const animate = () => {
    requestAnimationFrame(animate);
    
    const moveSpeed = 0.4; 
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0; forward.normalize();
    const rightVector = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

    if (keys.w) { camera.position.addScaledVector(forward, moveSpeed); controls.target.addScaledVector(forward, moveSpeed); }
    if (keys.s) { camera.position.addScaledVector(forward, -moveSpeed); controls.target.addScaledVector(forward, -moveSpeed); }
    if (keys.a) { camera.position.addScaledVector(rightVector, -moveSpeed); controls.target.addScaledVector(rightVector, -moveSpeed); }
    if (keys.d) { camera.position.addScaledVector(rightVector, moveSpeed); controls.target.addScaledVector(rightVector, moveSpeed); }
    
    if (keys.space) { camera.position.y += moveSpeed; controls.target.y += moveSpeed; }
    if (keys.shift) { 
      const MIN_HEIGHT = 1.0; 
      if (camera.position.y - moveSpeed >= MIN_HEIGHT) { camera.position.y -= moveSpeed; controls.target.y -= moveSpeed; } 
      else { const diff = camera.position.y - MIN_HEIGHT; camera.position.y = MIN_HEIGHT; controls.target.y -= diff; }
    }

    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

const updateGhostMesh = () => {
  if (ghostMesh) scene.remove(ghostMesh);
  ghostMesh = new THREE.Mesh(createGeometry(activePart.value), ghostMaterial);
  ghostMesh.rotation.y = currentRotation;
  scene.add(ghostMesh);
};

// 🚨 史诗级 Y轴 雷达：解决屋顶悬空和柱子堆叠问题
const getHighestYAt = (x, z) => {
  let maxY = 0;
  // 给一个小容差，防止查找到旁边的方块
  const TOLERANCE = 0.05; 
  for (let obj of builtObjects) {
    const box = new THREE.Box3().setFromObject(obj);
    if (x >= box.min.x - TOLERANCE && x <= box.max.x + TOLERANCE &&
        z >= box.min.z - TOLERANCE && z <= box.max.z + TOLERANCE) {
      if (box.max.y > maxY) maxY = box.max.y;
    }
  }
  return maxY;
};

// 🚨 完美拉伸算法：保证两端正好嵌入柱子中心
const updateDragMesh = (currentSnappedPos) => {
  if (!dragStartPos) return;

  let lengthX = Math.abs(currentSnappedPos.x - dragStartPos.x);
  let lengthZ = Math.abs(currentSnappedPos.z - dragStartPos.z);
  
  let dynamicSize = [...activePart.value.size];
  let centerX = dragStartPos.x;
  let centerZ = dragStartPos.z;
  let centerY = dragStartPos.y; 

  if (activePart.value.draw === 'drag-floor') {
    dynamicSize[0] = lengthX + 1; // 覆盖整个网格区块
    dynamicSize[2] = lengthZ + 1; 
    centerX = (currentSnappedPos.x + dragStartPos.x) / 2;
    centerZ = (currentSnappedPos.z + dragStartPos.z) / 2;
  } 
  else if (activePart.value.draw === 'drag-wall') {
    if (lengthX >= lengthZ) { // X 轴为主
      dynamicSize[0] = Math.max(lengthX, activePart.value.size[0]); 
      dynamicSize[2] = activePart.value.size[2]; 
      centerX = (currentSnappedPos.x + dragStartPos.x) / 2;
      centerZ = dragStartPos.z; 
    } else { // Z 轴为主
      dynamicSize[0] = activePart.value.size[0]; 
      dynamicSize[2] = Math.max(lengthZ, activePart.value.size[2]);
      centerX = dragStartPos.x;
      centerZ = (currentSnappedPos.z + dragStartPos.z) / 2; 
    }
  }

  if (dragMesh) scene.remove(dragMesh);
  dragMesh = new THREE.Mesh(createGeometry(activePart.value, dynamicSize), ghostMaterial);
  dragMesh.position.set(centerX, centerY, centerZ);
  scene.add(dragMesh);
};

// ================== 🚨 核心交互：绝对网格十字定位法 ==================
const onMouseMove = (event) => {
  const rect = threeContainer.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const targets = [planeMesh, ...builtObjects];
  const intersects = raycaster.intersectObjects(targets, false);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    
    // 🔥 最重要的一步：强制一切位置回到网格绝对十字路口！
    const snappedX = Math.round(intersect.point.x);
    const snappedZ = Math.round(intersect.point.z);

    // 调用智能雷达获取准确的地基高度
    let targetY = getHighestYAt(snappedX, snappedZ) + activePart.value.size[1] / 2;
    const currentPos = new THREE.Vector3(snappedX, targetY, snappedZ);

    if (isDragging) {
      if (ghostMesh) ghostMesh.visible = false;
      updateDragMesh(currentPos);
    } else {
      if (ghostMesh) {
        ghostMesh.visible = true;
        ghostMesh.position.copy(currentPos);
      }
    }
  } else {
    if(ghostMesh) ghostMesh.visible = false;
  }
};

const onMouseDown = (event) => {
  if (event.button !== 0) return; // 只有左键触发
  mouseDownPos = { x: event.clientX, y: event.clientY };
  
  if (ghostMesh && ghostMesh.visible && activePart.value.draw.includes('drag')) {
    isDragging = true;
    controls.enabled = false; 
    dragStartPos = ghostMesh.position.clone();
  }
};

const onMouseUp = (event) => {
  if (event.target.tagName === 'BUTTON' || event.target.closest('.part-btn')) return;

  // 1. 处理拖拽结束
  if (isDragging) {
    controls.enabled = true;
    isDragging = false;
    
    let targetMesh = dragMesh ? dragMesh : ghostMesh; // 如果没挪动鼠标，退化为点击
    
    if (targetMesh && targetMesh.visible) {
      const solidMaterial = new THREE.MeshStandardMaterial({ color: activePart.value.color, roughness: activePart.value.roughness });
      const newPart = new THREE.Mesh(targetMesh.geometry.clone(), solidMaterial);
      newPart.position.copy(targetMesh.position);
      newPart.rotation.copy(targetMesh.rotation);
      newPart.castShadow = true; newPart.receiveShadow = true;
      
      scene.add(newPart);
      builtObjects.push(newPart);
      gsap.from(newPart.position, { y: newPart.position.y + 0.5, duration: 0.3, ease: "bounce.out" });
    }
    
    if (dragMesh) { scene.remove(dragMesh); dragMesh = null; }
    return; 
  }

  // 2. 处理单次点击放置
  const dx = Math.abs(event.clientX - mouseDownPos.x);
  const dy = Math.abs(event.clientY - mouseDownPos.y);
  if (dx > 5 || dy > 5) return; 

  if (event.button === 0 && ghostMesh && ghostMesh.visible) {
    const geometry = createGeometry(activePart.value);
    const solidMaterial = new THREE.MeshStandardMaterial({ color: activePart.value.color, roughness: activePart.value.roughness });
    const newPart = new THREE.Mesh(geometry, solidMaterial);
    newPart.castShadow = true; newPart.receiveShadow = true;
    
    newPart.position.copy(ghostMesh.position);
    newPart.rotation.copy(ghostMesh.rotation);
    scene.add(newPart); builtObjects.push(newPart);
    gsap.from(newPart.position, { y: newPart.position.y + 0.5, duration: 0.3, ease: "bounce.out" });
  }
  // 3. 处理右键敲除
  else if (event.button === 2) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(builtObjects, false);
    if (intersects.length > 0) {
      const targetObj = intersects[0].object;
      const index = builtObjects.indexOf(targetObj);
      if (index > -1) builtObjects.splice(index, 1);
      gsap.to(targetObj.scale, {
        x: 0, y: 0, z: 0, duration: 0.2, ease: "back.in(2)",
        onComplete: () => { scene.remove(targetObj); targetObj.geometry.dispose(); targetObj.material.dispose(); }
      });
    }
  }
};

const clearScene = () => {
  builtObjects.forEach(obj => {
    gsap.to(obj.scale, { x: 0, y: 0, z: 0, duration: 0.3, ease: "back.in(1.7)", onComplete: () => { scene.remove(obj); obj.geometry.dispose(); obj.material.dispose(); } });
  });
  builtObjects.length = 0;
};

const onKeyDown = (e) => {
  switch (e.code) {
    case 'KeyW': keys.w = true; break; case 'KeyA': keys.a = true; break;
    case 'KeyS': keys.s = true; break; case 'KeyD': keys.d = true; break;
    case 'Space': keys.space = true; break;
    case 'ShiftLeft': case 'ShiftRight': keys.shift = true; break;
    case 'KeyR': rotatePart(Math.PI / 2); break;  
    case 'Digit1': selectPart(0); break; case 'Digit2': selectPart(1); break;
    case 'Digit3': selectPart(2); break; case 'Digit4': selectPart(3); break;
    case 'Digit5': selectPart(4); break; case 'Digit6': selectPart(5); break;
    case 'Digit7': selectPart(6); break; case 'Digit8': selectPart(7); break;
  }
};

const onKeyUp = (e) => {
  switch (e.code) {
    case 'KeyW': keys.w = false; break; case 'KeyA': keys.a = false; break;
    case 'KeyS': keys.s = false; break; case 'KeyD': keys.d = false; break;
    case 'Space': keys.space = false; break;
    case 'ShiftLeft': case 'ShiftRight': keys.shift = false; break;
  }
};

const onWindowResize = () => {
  if (!camera || !renderer || !threeContainer.value) return;
  camera.aspect = threeContainer.value.clientWidth / threeContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight);
};

onMounted(() => { initThree(); });
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('keydown', onKeyDown); window.removeEventListener('keyup', onKeyUp);
  if (threeContainer.value) {
    threeContainer.value.removeEventListener('mousemove', onMouseMove);
    threeContainer.value.removeEventListener('mousedown', onMouseDown);
    threeContainer.value.removeEventListener('mouseup', onMouseUp);
  }
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.text-palace-red { color: #9B2E2E; }
.border-palace-red { border-color: #9B2E2E; }
.hidden-scrollbar::-webkit-scrollbar { display: none; }
.hidden-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>