<template>
  <div class="app" @contextmenu.prevent>
    <canvas ref="canvas" class="canvas" />

    <!-- 顶部标题 -->
    <div class="hud-top">
      <div class="title-block">
        <span class="title-zh">考工台 · 营造工坊</span>
        <span class="title-en">CHINESE ARCHITECTURE BUILDER</span>
      </div>
      <div class="hint-bar">
        <span><b>左键</b> 放置 / 拖拽建造</span>
        <span><b>右键</b> 拆除构件</span>
        <span><b>中键</b> 平移视角</span>
        <span><b>滚轮</b> 缩放</span>
        <span><b>WASD</b> 漫游</span>
        <span><b>R</b> 旋转构件</span>
        <span><b>Ctrl+Z</b> 撤销</span>
      </div>
    </div>

    <!-- 左侧构件面板 -->
    <div class="parts-panel">
      <div class="panel-title">构件库</div>
      <div
        v-for="(part, i) in PARTS"
        :key="part.id"
        class="part-item"
        :class="{ active: activeId === part.id }"
        @mouseenter="isOverUI = true"
        @mouseleave="isOverUI = false"
        @click="setActive(i)"
      >
        <span class="part-key">{{ i + 1 }}</span>
        <span class="part-glyph">{{ part.glyph }}</span>
        <span class="part-label">{{ part.name }}</span>
        <span v-if="part.drag" class="part-drag">拉</span>
      </div>
    </div>

    <!-- 右侧信息面板 -->
    <div
      class="info-panel"
      @mouseenter="isOverUI = true"
      @mouseleave="isOverUI = false"
    >
      <div class="info-row">
        <span class="info-k">当前构件</span>
        <span class="info-v accent">{{ activePart.name }}</span>
      </div>
      <div class="info-row">
        <span class="info-k">已建数量</span>
        <span class="info-v">{{ builtCount }}</span>
      </div>
      <div class="info-row">
        <span class="info-k">吸附高度</span>
        <span class="info-v">Y {{ snapY.toFixed(2) }}</span>
      </div>
      <div class="info-row">
        <span class="info-k">网格坐标</span>
        <span class="info-v">{{ snapX }}, {{ snapZ }}</span>
      </div>
      <div class="divider" />
      <div class="info-row">
        <span class="info-k">旋转角</span>
        <span class="info-v">{{ rotDeg }}°</span>
      </div>
      <div class="info-row">
        <span class="info-k">模式</span>
        <span class="info-v" :class="{ 'accent-blue': activePart.drag }">
          {{ activePart.drag ? '拖拽建造' : '点击放置' }}
        </span>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div
      class="btns"
      @mouseenter="isOverUI = true"
      @mouseleave="isOverUI = false"
    >
      <button class="btn" @click="undo">↩ 撤销上步</button>
      <button class="btn btn-danger" @click="clearAll">◎ 清空重建</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

/* ═══════════════════════════════════════════════════
   构件定义
═══════════════════════════════════════════════════ */
const PARTS = [
  { id: 'base',    name: '柱础', glyph: '础', color: 0xCDC8BE, rough: 0.95, metal: 0.05,
    size: [0.9, 0.18, 0.9],   drag: false, anchor: 'stack',     type: 'box' },
  { id: 'pillar',  name: '朱柱', glyph: '柱', color: 0x7A2A18, rough: 0.6,  metal: 0.1,
    size: [0.38, 4.2, 0.38],  drag: false, anchor: 'stack',     type: 'cylinder8' },
  { id: 'dougong', name: '斗拱', glyph: '拱', color: 0x8B2020, rough: 0.7,  metal: 0.05,
    size: [1.1, 0.6, 1.1],   drag: false, anchor: 'pillarTop',  type: 'dougong' },
  { id: 'beam',    name: '横梁', glyph: '梁', color: 0x4A2610, rough: 0.75, metal: 0.0,
    size: [1.0, 0.32, 0.32],  drag: true,  anchor: 'pillarTop', type: 'box' },
  { id: 'wall',    name: '粉墙', glyph: '墙', color: 0xEAE6DC, rough: 0.9,  metal: 0.0,
    size: [0.18, 3.8, 1.0],   drag: true,  anchor: 'stack',     type: 'box' },
  { id: 'floor',   name: '青砖', glyph: '地', color: 0x6A7475, rough: 0.95, metal: 0.0,
    size: [1.0, 0.14, 1.0],   drag: true,  anchor: 'stack',     type: 'box' },
  { id: 'sunmao',  name: '榫卯', glyph: '榫', color: 0x3A2010, rough: 0.85, metal: 0.0,
    size: [0.7, 0.22, 0.36],  drag: false, anchor: 'stack',     type: 'sunmao' },
  { id: 'roof',    name: '攒顶', glyph: '顶', color: 0x272F3C, rough: 0.55, metal: 0.15,
    size: [5.0, 2.8, 5.0],   drag: false, anchor: 'stack',     type: 'cone4' },
]

/* ═══════════════════════════════════════════════════
   几何体工厂
═══════════════════════════════════════════════════ */
function makeGeo(type, s) {
  switch (type) {
    case 'cylinder8':
      return new THREE.CylinderGeometry(s[0]/2, s[0]/2 * 1.06, s[1], 8)
    case 'cone4': {
      const g = new THREE.ConeGeometry(s[0] * 0.75, s[1], 4)
      g.rotateY(Math.PI / 4)
      return g
    }
    case 'dougong': {
      // 手工合并：坐斗 + 横拱 + 纵拱
      const parts = [
        { g: new THREE.BoxGeometry(s[0]*0.48, s[1]*0.55, s[2]*0.48), dy: -s[1]*0.22 },
        { g: new THREE.BoxGeometry(s[0],      s[1]*0.28, s[2]*0.22), dy:  s[1]*0.12 },
        { g: new THREE.BoxGeometry(s[0]*0.22, s[1]*0.28, s[2]),      dy:  s[1]*0.12 },
      ]
      return mergeGeos(parts)
    }
    case 'sunmao': {
      const parts = [
        { g: new THREE.BoxGeometry(s[0],      s[1],      s[2]),      dy: 0 },
        { g: new THREE.BoxGeometry(s[0]*0.35, s[1]*0.6,  s[2]*0.35), dy: s[1]*0.3 },
      ]
      return mergeGeos(parts)
    }
    default:
      return new THREE.BoxGeometry(s[0], s[1], s[2])
  }
}

function mergeGeos(pieces) {
  const pos = [], nor = [], uv = []
  for (const { g, dy } of pieces) {
    const p = g.attributes.position
    const n = g.attributes.normal
    const u = g.attributes.uv
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i) + dy, p.getZ(i))
      nor.push(n.getX(i), n.getY(i), n.getZ(i))
      if (u) uv.push(u.getX(i), u.getY(i))
    }
    g.dispose()
  }
  const merged = new THREE.BufferGeometry()
  merged.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  merged.setAttribute('normal',   new THREE.Float32BufferAttribute(nor, 3))
  if (uv.length) merged.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  return merged
}

/* ═══════════════════════════════════════════════════
   Vue 响应式
═══════════════════════════════════════════════════ */
const canvas     = ref(null)
const activeId   = ref('base')
const builtCount = ref(0)
const snapX      = ref(0)
const snapZ      = ref(0)
const snapY      = ref(0)
const rotRad     = ref(0)
const isOverUI   = ref(false)

const activePart = computed(() => PARTS.find(p => p.id === activeId.value) || PARTS[0])
const rotDeg     = computed(() => Math.round(rotRad.value * 180 / Math.PI))

/* ═══════════════════════════════════════════════════
   Three.js 变量（非响应式）
═══════════════════════════════════════════════════ */
let scene, camera, renderer, controls, raycaster
let groundMesh
let ghostGroup = null
let dragPreviewGroup = null
let builtObjs = []           // { mesh, partId }

let isDragging    = false
let dragStart     = null     // THREE.Vector3
let mouseDownAt   = { x: 0, y: 0 }

const keys = { w:0, s:0, a:0, d:0, space:0, shift:0 }

// 预建实心材质
const mats = {}

/* ═══════════════════════════════════════════════════
   初始化
═══════════════════════════════════════════════════ */
function init() {
  const el = canvas.value
  const W = el.clientWidth, H = el.clientHeight

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap
  renderer.outputColorSpace  = THREE.SRGBColorSpace
  renderer.toneMapping       = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x070910)
  scene.fog = new THREE.FogExp2(0x070910, 0.007)

  // Camera
  camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 600)
  camera.position.set(20, 16, 26)

  // Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.07
  controls.maxPolarAngle = Math.PI / 2 - 0.02
  controls.minDistance   = 2
  controls.maxDistance   = 150
  controls.mouseButtons  = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: null }

  // Lights
  scene.add(new THREE.AmbientLight(0xBBA882, 0.55))

  const sun = new THREE.DirectionalLight(0xFFF2D8, 2.2)
  sun.position.set(25, 40, 30)
  sun.castShadow = true
  sun.shadow.mapSize.set(4096, 4096)
  sun.shadow.camera.near   = 0.5;  sun.shadow.camera.far  = 200
  sun.shadow.camera.left   = -50;  sun.shadow.camera.right = 50
  sun.shadow.camera.bottom = -50;  sun.shadow.camera.top   = 50
  sun.shadow.bias = -0.0004
  scene.add(sun)

  const fillLight = new THREE.DirectionalLight(0x8AACCC, 0.5);
  fillLight.position.set(-15, 12, -20);
  scene.add(fillLight);

  // Ground
  groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x0C0F16, roughness: 1 })
  )
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.receiveShadow = true
  scene.add(groundMesh)

  // Grid
  const grid = new THREE.GridHelper(100, 100, 0x1A2533, 0x111820)
  grid.position.y = 0.001
  scene.add(grid)

  // Raycaster
  raycaster = new THREE.Raycaster()

  // 预建材质
  for (const p of PARTS) {
    mats[p.id] = new THREE.MeshStandardMaterial({
      color: p.color, roughness: p.rough, metalness: p.metal
    })
  }

  rebuildGhost()

  // 事件
  el.addEventListener('mousemove', onMouseMove)
  el.addEventListener('mousedown', onMouseDown)
  el.addEventListener('mouseup',   onMouseUp)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup',   onKeyUp)
  window.addEventListener('resize',  onResize)

  loop()
}

/* ═══════════════════════════════════════════════════
   主循环
═══════════════════════════════════════════════════ */
function loop() {
  requestAnimationFrame(loop)
  const spd = 0.28
  const fwd = new THREE.Vector3(); camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize()
  const rgt = new THREE.Vector3().crossVectors(fwd, camera.up).normalize()
  if (keys.w) { camera.position.addScaledVector(fwd,  spd); controls.target.addScaledVector(fwd,  spd) }
  if (keys.s) { camera.position.addScaledVector(fwd, -spd); controls.target.addScaledVector(fwd, -spd) }
  if (keys.a) { camera.position.addScaledVector(rgt, -spd); controls.target.addScaledVector(rgt, -spd) }
  if (keys.d) { camera.position.addScaledVector(rgt,  spd); controls.target.addScaledVector(rgt,  spd) }
  if (keys.space) { camera.position.y += spd; controls.target.y += spd }
  if (keys.shift && camera.position.y > 0.5) { camera.position.y -= spd; controls.target.y -= spd }
  controls.update()
  renderer.render(scene, camera)
}

/* ═══════════════════════════════════════════════════
   Ghost（预览）管理
═══════════════════════════════════════════════════ */
function rebuildGhost() {
  if (ghostGroup) { scene.remove(ghostGroup); ghostGroup = null }
  const p   = activePart.value
  const geo = makeGeo(p.type, [...p.size])

  ghostGroup = new THREE.Group()

  // 半透明体
  ghostGroup.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: 0xC8A040, transparent: true, opacity: 0.42,
    emissive: 0x6A4A10, emissiveIntensity: 0.4, depthWrite: false, side: THREE.DoubleSide
  })))

  // 轮廓线
  ghostGroup.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 5),
    new THREE.LineBasicMaterial({ color: 0xFFCC44, transparent: true, opacity: 0.9 })
  ))

  // 底部吸附环
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.68, 32),
    new THREE.MeshBasicMaterial({ color: 0xFFCC44, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
  )
  ring.rotation.x = -Math.PI / 2
  ring.position.y = -p.size[1] / 2 + 0.01
  ghostGroup.add(ring)

  ghostGroup.rotation.y = rotRad.value
  ghostGroup.visible    = false
  ghostGroup.renderOrder = 999
  scene.add(ghostGroup)
}

function clearDragPreview() {
  if (!dragPreviewGroup) return
  dragPreviewGroup.traverse(o => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose() } })
  scene.remove(dragPreviewGroup)
  dragPreviewGroup = null
}

/* ─── 计算拖拽尺寸 & 中心 ─────────────────────────── */
function calcDrag(start, end, p) {
  const s  = [...p.size]
  let cx = start.x, cy = start.y, cz = start.z

  if (p.id === 'floor') {
    const [minX, maxX] = [Math.min(start.x, end.x), Math.max(start.x, end.x)]
    const [minZ, maxZ] = [Math.min(start.z, end.z), Math.max(start.z, end.z)]
    s[0] = maxX - minX + p.size[0]
    s[2] = maxZ - minZ + p.size[2]
    cx   = (minX + maxX) / 2
    cz   = (minZ + maxZ) / 2
  } else {
    const dx = Math.abs(end.x - start.x)
    const dz = Math.abs(end.z - start.z)
    if (dx >= dz) {
      s[0] = Math.max(dx + p.size[0], p.size[0])
      s[2] = p.size[2]
      cx   = (start.x + end.x) / 2
      cz   = start.z
    } else {
      s[0] = p.size[2]
      s[2] = Math.max(dz + p.size[2], p.size[2])
      cx   = start.x
      cz   = (start.z + end.z) / 2
    }
  }
  return { s, cx, cy, cz }
}

function refreshDragPreview(start, end) {
  clearDragPreview()
  const p = activePart.value
  const { s, cx, cy, cz } = calcDrag(start, end, p)

  dragPreviewGroup = new THREE.Group()
  const geo = makeGeo(p.type, s)
  dragPreviewGroup.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: 0xC8A040, transparent: true, opacity: 0.42,
    emissive: 0x6A4A10, emissiveIntensity: 0.4, depthWrite: false, side: THREE.DoubleSide
  })))
  dragPreviewGroup.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 5),
    new THREE.LineBasicMaterial({ color: 0x88DDFF, transparent: true, opacity: 0.9 })
  ))
  dragPreviewGroup.position.set(cx, cy, cz)
  dragPreviewGroup.rotation.y = rotRad.value
  dragPreviewGroup.renderOrder = 999
  scene.add(dragPreviewGroup)
  return { s, cx, cy, cz }
}

/* ═══════════════════════════════════════════════════
   吸附 & 高度检测
═══════════════════════════════════════════════════ */
const SNAP_SIZE = 1.0
const snap = v => Math.round(v / SNAP_SIZE) * SNAP_SIZE

function topYAt(sx, sz, tol = 0.46) {
  let best = 0
  for (const { mesh } of builtObjs) {
    const b = new THREE.Box3().setFromObject(mesh)
    if (sx > b.min.x - tol && sx < b.max.x + tol &&
        sz > b.min.z - tol && sz < b.max.z + tol) {
      best = Math.max(best, b.max.y)
    }
  }
  return best
}

function nearPillarTop(sx, sz, r = 1.3) {
  let best = null, bestD = Infinity
  for (const { mesh, partId } of builtObjs) {
    if (!['pillar', 'base', 'dougong'].includes(partId)) continue
    const b  = new THREE.Box3().setFromObject(mesh)
    const cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2
    const d  = Math.hypot(sx - cx, sz - cz)
    if (d < r && d < bestD) { bestD = d; best = b.max.y }
  }
  return best
}

function calcY(part, sx, sz) {
  if (part.anchor === 'pillarTop') {
    const py = nearPillarTop(sx, sz)
    if (py !== null) return py + part.size[1] / 2
  }
  return topYAt(sx, sz) + part.size[1] / 2
}

function getSnap(e) {
  const rect = canvas.value.getBoundingClientRect()
  const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1
  const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera)
  const hits = raycaster.intersectObjects([groundMesh, ...builtObjs.map(o => o.mesh)], false)
  if (!hits.length) return null
  const pt = hits[0].point
  const sx = snap(pt.x), sz = snap(pt.z)
  return new THREE.Vector3(sx, calcY(activePart.value, sx, sz), sz)
}

/* ═══════════════════════════════════════════════════
   放置 & 拆除
═══════════════════════════════════════════════════ */
function place(pos, dynSize = null) {
  const p    = activePart.value
  const geo  = makeGeo(p.type, dynSize || [...p.size])
  const mesh = new THREE.Mesh(geo, mats[p.id].clone())
  mesh.castShadow    = true
  mesh.receiveShadow = true
  mesh.position.copy(pos)
  mesh.rotation.y = rotRad.value
  mesh.scale.setScalar(0.01)
  scene.add(mesh)
  builtObjs.push({ mesh, partId: p.id })
  builtCount.value = builtObjs.length
  gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.22, ease: 'back.out(1.8)' })
}

function demolish(mesh) {
  const idx = builtObjs.findIndex(o => o.mesh === mesh)
  if (idx < 0) return
  builtObjs.splice(idx, 1)
  builtCount.value = builtObjs.length
  gsap.to(mesh.scale, {
    x: 0, y: 0, z: 0, duration: 0.18, ease: 'back.in(2.5)',
    onComplete: () => { scene.remove(mesh); mesh.geometry.dispose(); mesh.material.dispose() }
  })
}

/* ═══════════════════════════════════════════════════
   鼠标事件
═══════════════════════════════════════════════════ */
function onMouseMove(e) {
  if (isOverUI.value) { if (ghostGroup) ghostGroup.visible = false; return }
  const sp = getSnap(e)
  if (!sp) { if (ghostGroup) ghostGroup.visible = false; return }
  snapX.value = sp.x; snapZ.value = sp.z; snapY.value = sp.y

  if (isDragging && dragStart) {
    if (ghostGroup) ghostGroup.visible = false
    refreshDragPreview(dragStart, sp)
  } else {
    clearDragPreview()
    if (ghostGroup) { ghostGroup.visible = true; ghostGroup.position.copy(sp) }
  }
}

function onMouseDown(e) {
  if (isOverUI.value || e.button !== 0) return
  mouseDownAt = { x: e.clientX, y: e.clientY }
  if (activePart.value.drag) {
    const sp = getSnap(e)
    if (sp) { isDragging = true; dragStart = sp.clone(); controls.enabled = false }
  }
}

function onMouseUp(e) {
  // 右键拆除
  if (e.button === 2) {
    const rect = canvas.value.getBoundingClientRect()
    raycaster.setFromCamera(
      new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width)  * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      ), camera
    )
    const hits = raycaster.intersectObjects(builtObjs.map(o => o.mesh), false)
    if (hits.length) demolish(hits[0].object)
    return
  }
  if (e.button !== 0) return

  const moved = Math.hypot(e.clientX - mouseDownAt.x, e.clientY - mouseDownAt.y) > 5

  // 结束拖拽
  if (isDragging) {
    controls.enabled = true; isDragging = false
    const sp = getSnap(e) || dragStart
    if (sp && dragStart) {
      const { s, cx, cy, cz } = calcDrag(dragStart, sp, activePart.value)
      place(new THREE.Vector3(cx, cy, cz), s)
    } else if (!moved && ghostGroup?.visible) {
      place(ghostGroup.position.clone())
    }
    clearDragPreview(); dragStart = null
    return
  }

  // 单击放置（非拖拽模式，且未移动鼠标）
  if (!moved && !activePart.value.drag && ghostGroup?.visible) {
    place(ghostGroup.position.clone())
  }
}

/* ═══════════════════════════════════════════════════
   键盘
═══════════════════════════════════════════════════ */
function onKeyDown(e) {
  if (e.target.tagName === 'INPUT') return
  switch (e.code) {
    case 'KeyW': keys.w = 1; break
    case 'KeyS': keys.s = 1; break
    case 'KeyA': keys.a = 1; break
    case 'KeyD': keys.d = 1; break
    case 'Space': e.preventDefault(); keys.space = 1; break
    case 'ShiftLeft': case 'ShiftRight': keys.shift = 1; break
    case 'KeyR':
      rotRad.value = (rotRad.value + Math.PI / 2) % (Math.PI * 2)
      if (ghostGroup) gsap.to(ghostGroup.rotation, { y: rotRad.value, duration: 0.14, ease: 'power2.out' })
      break
    case 'KeyZ':
      if (e.ctrlKey || e.metaKey) undo()
      break
    default:
      if (e.code.startsWith('Digit')) {
        const n = parseInt(e.key) - 1
        if (n >= 0 && n < PARTS.length) setActive(n)
      }
  }
}
function onKeyUp(e) {
  switch (e.code) {
    case 'KeyW': keys.w = 0; break; case 'KeyS': keys.s = 0; break
    case 'KeyA': keys.a = 0; break; case 'KeyD': keys.d = 0; break
    case 'Space': keys.space = 0; break
    case 'ShiftLeft': case 'ShiftRight': keys.shift = 0; break
  }
}

/* ═══════════════════════════════════════════════════
   UI Actions
═══════════════════════════════════════════════════ */
function setActive(i) {
  activeId.value = PARTS[i].id
  rotRad.value   = 0
  rebuildGhost()
}

function undo() {
  if (builtObjs.length) demolish(builtObjs[builtObjs.length - 1].mesh)
}

function clearAll() {
  const list = [...builtObjs]
  list.forEach((o, i) => setTimeout(() => demolish(o.mesh), i * 35))
}

function onResize() {
  if (!renderer || !canvas.value) return
  const W = canvas.value.clientWidth, H = canvas.value.clientHeight
  camera.aspect = W / H; camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

/* ═══════════════════════════════════════════════════
   生命周期
═══════════════════════════════════════════════════ */
onMounted(init)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('resize', onResize)
  if (canvas.value) {
    canvas.value.removeEventListener('mousemove', onMouseMove)
    canvas.value.removeEventListener('mousedown', onMouseDown)
    canvas.value.removeEventListener('mouseup', onMouseUp)
  }
  renderer?.dispose()
})
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }

.app {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #070910;
  font-family: 'Noto Serif SC', 'Source Han Serif CN', 'SimSun', Georgia, serif;
  color: #E8DFC8;
  user-select: none;
}

.canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

/* ── 顶部 ─────────────────────────────────────── */
.hud-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  padding: 14px 20px 24px;
  background: linear-gradient(to bottom, rgba(7,9,16,.95), transparent);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title-block { display: flex; align-items: baseline; gap: 14px }

.title-zh {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: .22em;
  text-shadow: 0 0 22px rgba(200,150,40,.35);
}

.title-en {
  font-size: 9px;
  letter-spacing: .35em;
  color: rgba(200,160,60,.42);
  font-family: 'Helvetica Neue', sans-serif;
}

.hint-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 3px 14px;
  font-size: 10px;
  color: rgba(232,223,200,.32);
  letter-spacing: .06em;
}
.hint-bar b { color: #C8960A; font-weight: 600 }

/* ── 左侧面板 ─────────────────────────────────── */
.parts-panel {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 10;
}

.panel-title {
  font-size: 8px;
  letter-spacing: .22em;
  color: rgba(200,160,60,.38);
  text-align: center;
  margin-bottom: 4px;
}

.part-item {
  position: relative;
  width: 72px; height: 72px;
  background: rgba(7,9,16,.82);
  border: 1px solid rgba(200,160,60,.12);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition: border-color .18s, background .18s, box-shadow .18s;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}
.part-item:hover {
  border-color: rgba(200,160,60,.36);
  background: rgba(20,14,6,.9);
}
.part-item.active {
  border-color: #C8960A;
  background: rgba(38,20,3,.92);
  box-shadow: 0 0 16px rgba(200,150,10,.28), inset 0 0 12px rgba(200,150,10,.07);
}
.part-key {
  position: absolute; top: 4px; left: 6px;
  font-size: 8px; color: rgba(232,223,200,.2); font-family: monospace;
}
.part-glyph { font-size: 23px; line-height: 1 }
.part-label { font-size: 9px; letter-spacing: .1em; color: rgba(232,223,200,.52) }
.part-item.active .part-label { color: #E8DFC8 }
.part-drag {
  position: absolute; bottom: 3px; right: 3px;
  font-size: 7px; color: #C8960A;
  background: rgba(200,150,10,.12);
  padding: 0 3px; border-radius: 2px;
}

/* ── 右侧信息 ─────────────────────────────────── */
.info-panel {
  position: absolute;
  right: 16px; top: 50%;
  transform: translateY(-50%);
  width: 146px;
  background: rgba(7,9,16,.82);
  border: 1px solid rgba(200,160,60,.11);
  backdrop-filter: blur(10px);
  padding: 13px 12px;
  z-index: 10;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
}
.info-row:last-child { margin-bottom: 0 }
.info-k { font-size: 9px; color: rgba(232,223,200,.33); letter-spacing: .08em }
.info-v { font-size: 10px; color: rgba(232,223,200,.72); font-family: monospace }
.info-v.accent { color: #C8960A }
.info-v.accent-blue { color: #88CCFF }
.divider { height: 1px; background: rgba(200,160,60,.1); margin: 8px 0 10px }

/* ── 底部按钮 ─────────────────────────────────── */
.btns {
  position: absolute;
  bottom: 20px; left: 50%;
  transform: translateX(-50%);
  display: flex; gap: 10px; z-index: 10;
}
.btn {
  background: rgba(7,9,16,.88);
  border: 1px solid rgba(200,160,60,.24);
  color: #E8DFC8;
  padding: 9px 22px;
  font-family: inherit; font-size: 11px;
  letter-spacing: .2em; cursor: pointer;
  transition: all .18s; backdrop-filter: blur(8px);
}
.btn:hover { background: rgba(200,150,10,.15); border-color: #C8960A; color: #C8960A }
.btn-danger:hover { background: rgba(155,46,46,.2); border-color: #9B2E2E; color: #E06060 }
</style>
