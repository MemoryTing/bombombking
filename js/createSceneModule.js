//001215003571707_063634300410000_002125033573737_363634300421212_121215003573737_262624330012121_454545003545454_121210300416161_838385033521212_212124300436363_808385003512120_001214330436360_808185003521200
const valley = "001215003571707063634300410000002125033573737363634300421212121215003573737262624330012121454545003545454121210300416161838385033521212212124300436363808385003512120001214330436360808185003521200"


const textureLoader = new THREE.TextureLoader()
//LEGO
let legoGeo
let boxShape_lego
//HOUSE
let boxGeo_house
let roofGeo_house
let headMaterials_house
let boxShape_house
//wooden
let boxGeo_wooden
let headMaterials_wooden
let boxShape_wooden
//tree
let branchGeo
let leafGeo
const branchMat = new THREE.MeshPhongMaterial({ color: 0xC77D33 })
const creeperMat_tree = new THREE.MeshPhongMaterial({ color: 0x00B500 })
let boxShape_tree
//bush
let boxGeo_bush
const creeperMat_bush = new THREE.MeshPhongMaterial({ color: 0x00B500 })

function initTexture() {
  //LEGO
  legoGeo = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  const upGeo_lego = new THREE.CylinderGeometry(0.15*scale, 0.15*scale, 0.3*scale)
  boxShape_lego = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.495 * scale, 0.45 * scale)
  )
  let up1 = new THREE.Mesh(upGeo_lego, branchMat)
  up1.position.set(0.25*scale, 0.5*scale, 0.25*scale)
  let up2 = up1.clone()
  up2.position.set(0.25*scale, 0.5*scale, -0.25*scale)
  let up3 = up1.clone()
  up3.position.set(-0.25*scale, 0.5*scale, 0.25*scale)
  let up4 = up1.clone()
  up4.position.set(-0.25*scale, 0.5*scale, -0.25*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  legoGeo.merge(up1.geometry, up1.matrix)
  legoGeo.merge(up2.geometry, up2.matrix)
  legoGeo.merge(up3.geometry, up3.matrix)
  legoGeo.merge(up4.geometry, up4.matrix)
  //HOUSE
  boxGeo_house = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  roofGeo_house = new THREE.BoxGeometry(1*scale, 0.4*scale, 1*scale)
  const upGeo_house = new THREE.BoxGeometry(0.25*scale, 0.3*scale, 0.25*scale)
  let smoke = new THREE.Mesh(upGeo_house, branchMat)
  smoke.position.set(0.25*scale, 0.2*scale, 0)
  smoke.updateMatrix()
  roofGeo_house.merge(smoke.geometry, smoke.matrix)

  const winsowMap = textureLoader.load('./img/window.png')
  const otherMap = textureLoader.load('./img/window_other.png')
  headMaterials_house = []
  for (let i = 0; i < 6; i++) {
    let map
    if (i === 4) map = winsowMap
    else map = otherMap
    headMaterials_house.push(new THREE.MeshPhongMaterial({ map: map }))
  }
  boxShape_house = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.65 * scale, 0.45 * scale)
  )
  //wooden
  boxGeo_wooden = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  const headMap_wooden = textureLoader.load('./img/box_up.png')
  const skinMap_wooden = textureLoader.load('./img/box_other.png')
  headMaterials_wooden = []
  for (let i = 0; i < 6; i++) {
    let map
    if (i === 2 | i === 3) map = headMap_wooden
    else map = skinMap_wooden
    headMaterials_wooden.push(new THREE.MeshPhongMaterial({ map: map }))
  } 
  boxShape_wooden = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.5 * scale, 0.45 * scale)
  )
  //tree
  branchGeo = new THREE.CylinderGeometry(0.15*scale, 0.1*scale, 2*scale)
  const leaf2Geo = new THREE.CylinderGeometry(0.35*scale, 0.4*scale, 0.375*scale)
  const leaf3Geo = new THREE.CylinderGeometry(0.25*scale, 0.3*scale, 0.375*scale)
  const leaf4Geo = new THREE.CylinderGeometry(0.15*scale, 0.2*scale, 0.38*scale)
  leafGeo = new THREE.CylinderGeometry(0.45*scale, 0.5*scale, 0.375*scale)
  let leaf2 = new THREE.Mesh(leaf2Geo, branchMat)
  leaf2.position.set(0, (0.0625+0.3125)*scale, 0)
  let leaf3 = new THREE.Mesh(leaf3Geo, branchMat)
  leaf3.position.set(0, (0.4375+0.3125)*scale, 0)
  let leaf4 = new THREE.Mesh(leaf4Geo, branchMat)
  leaf4.position.set(0, (0.8125+0.3125)*scale, 0)
  leaf2.updateMatrix()
  leaf3.updateMatrix()
  leaf4.updateMatrix()
  leafGeo.merge(leaf2.geometry, leaf2.matrix)
  leafGeo.merge(leaf3.geometry, leaf3.matrix)
  leafGeo.merge(leaf4.geometry, leaf4.matrix)
  boxShape_tree = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 1 * scale, 0.45 * scale)
  )
  //bush
  boxGeo_bush = new THREE.BoxGeometry(0.2*scale, 0.2*scale, 0.2*scale)
  const zboxGeo_bush = new THREE.BoxGeometry(0.2*scale, 0.2*scale, 0.2*scale)
  const bigGeo_bush = new THREE.BoxGeometry(0.3*scale, 0.3*scale, 0.3*scale)
  const crueGeo_bush = new THREE.BoxGeometry(0.5*scale, 0.5*scale, 0.5*scale)
  
  let bup1 = new THREE.Mesh(zboxGeo_bush, branchMat)
  bup1.position.set(0.35*scale, 0.6*scale, 0.35*scale)
  let bup2 = bup1.clone()
  bup2.position.set(-0.3*scale, 0.5*scale, 0.3*scale)
  let bup3 = bup1.clone()
  bup3.position.set(-0.35*scale, 0.4*scale, 0.25*scale)
  let bup4 = bup1.clone()
  bup4.position.set(0, 0, -0.25*scale)
  let bup5 = bup1.clone()
  bup5.position.set(-0.25*scale, 0.45*scale, -0.25*scale)

  let big1 = new THREE.Mesh(bigGeo_bush, branchMat)
  big1.position.set(0.2*scale, 0.1*scale, 0.2*scale)
  let big2 = big1.clone()
  big2.position.set(-0.2*scale, 0.5*scale, -0.15*scale)
  let big3 = big1.clone()
  big3.position.set(-0.15*scale, -0.1*scale, 0.2*scale)
  let big4 = big1.clone()
  big4.position.set(0.2*scale, 0.2*scale, -0.2*scale)
  let big5 = big1.clone()
  big5.position.set(0.3*scale, 0.15*scale, -0.2*scale)
  let big6 = big1.clone()
  big6.position.set(-0.25*scale, -0.25*scale, 0.25*scale)

  let crue1 = new THREE.Mesh(crueGeo_bush, branchMat)
  crue1.position.set(0, 0, 0)
  let crue2 = crue1.clone()
  crue2.position.set(0.1*scale, 0.4*scale, 0.15*scale)
  let crue3 = crue1.clone()
  crue3.position.set(-0.15*scale, 0.2*scale, 0.1*scale)
  let crue4 = crue1.clone()
  crue4.position.set(-0.1*scale, -0.25*scale, -0.1*scale)
  
  bup1.updateMatrix()
  bup2.updateMatrix()
  bup3.updateMatrix()
  bup4.updateMatrix()
  bup5.updateMatrix()
  boxGeo_bush.merge(bup1.geometry, bup1.matrix)
  boxGeo_bush.merge(bup2.geometry, bup2.matrix)
  boxGeo_bush.merge(bup3.geometry, bup3.matrix)
  boxGeo_bush.merge(bup4.geometry, bup4.matrix)
  boxGeo_bush.merge(bup5.geometry, bup5.matrix)
  big1.updateMatrix()
  big2.updateMatrix()
  big3.updateMatrix()
  big4.updateMatrix()
  big5.updateMatrix()
  big6.updateMatrix()
  boxGeo_bush.merge(big1.geometry, big1.matrix)
  boxGeo_bush.merge(big2.geometry, big2.matrix)
  boxGeo_bush.merge(big3.geometry, big3.matrix)
  boxGeo_bush.merge(big4.geometry, big4.matrix)
  boxGeo_bush.merge(big5.geometry, big5.matrix)
  boxGeo_bush.merge(big6.geometry, big6.matrix)
  crue1.updateMatrix()
  crue2.updateMatrix()
  crue3.updateMatrix()
  crue4.updateMatrix()
  boxGeo_bush.merge(crue1.geometry, crue1.matrix)
  boxGeo_bush.merge(crue2.geometry, crue2.matrix)
  boxGeo_bush.merge(crue3.geometry, crue3.matrix)
  boxGeo_bush.merge(crue4.geometry, crue4.matrix)
}
function createLego(x, y, z, color, scale) {
  const creeperMat_lego = new THREE.MeshPhongMaterial({ color: color })
  legoObj = new Lego(legoGeo, boxShape_lego, creeperMat_lego)
  world.addBody(legoObj.boxBody)
  scene.add(legoObj.lego)
  legoObj.lego.position.set(x*scale, y*scale, z*scale)
  legoObj.boxBody.position.set(x*scale, y*scale, z*scale)
}
function createHouse(x, z, color, scale) {
  const creeperMat_house = new THREE.MeshPhongMaterial({ color: color })
  houseObj = new House(scale, boxGeo_house, roofGeo_house, creeperMat_house, headMaterials_house, boxShape_house)
  world.addBody(houseObj.boxBody)
  scene.add(houseObj.House)
  houseObj.House.position.set(x*scale, 0.705*scale, z*scale)
  houseObj.boxBody.position.set(x*scale, 0.705*scale, z*scale)
}
function createWooden(x ,z, scale) {
  woodenObj = new Wooden(scale, boxGeo_wooden, headMaterials_wooden, boxShape_wooden)
  world.addBody(woodenObj.boxBody)
  scene.add(woodenObj.Wooden)
  woodenObj.Wooden.position.set(x*scale, 0.5*scale, z*scale)
  woodenObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  boxes.push(woodenObj.boxBody)
  boxMeshes.push(woodenObj.Wooden)
}
function createTree(x ,z, scale) {
  treeObj = new Tree(scale, branchGeo, leafGeo, branchMat, creeperMat_tree, boxShape_tree)
  world.addBody(treeObj.boxBody)
  scene.add(treeObj.Tree)
  treeObj.Tree.position.set(x*scale, 1*scale, z*scale)
  treeObj.boxBody.position.set(x*scale, 1*scale, z*scale)
}
function createBush(x ,z, scale) {
  bushObj = new Bush(boxGeo_bush, creeperMat_bush)
  scene.add(bushObj.Bush)
  bushObj.Bush.position.set(x*scale, 0.5*scale, z*scale)
}

function createScene() {
  initTexture()
  for(let now=0; now<195; now++){
    if(valley[now]==1) createLego(now%15-7, 0.5, Math.floor(now/15)-6, 0xff0000, scale)
    else if(valley[now]==2) createLego(now%15-7, 0.5, Math.floor(now/15)-6, 0xff8800, scale)
    else if(valley[now]==3) createWooden(now%15-7, Math.floor(now/15)-6, scale)
    else if(valley[now]==4) createTree(now%15-7, Math.floor(now/15)-6, scale)
    else if(valley[now]==5) createBush(now%15-7, Math.floor(now/15)-6, scale)
    else if(valley[now]==6) createHouse(now%15-7, Math.floor(now/15)-6, 0xff8800, scale)
    else if(valley[now]==7) createHouse(now%15-7, Math.floor(now/15)-6, 0xfadc2e, scale)
    else if(valley[now]==8) createHouse(now%15-7, Math.floor(now/15)-6, 0x51a7f5, scale)
}
  for(let i=-7; i<=7; i++){
    for(let j=-6; j<=6; j++){
      if(i<-1 | i>1) createLego(i, -0.495, j, 0x7Eff00, scale)
    }
  }
  createWall(0, 1)
  createWall(0, -1)
  createWall(1, 1)
  createWall(1, -1)
}

function createWall(IsRotate, x){
  let wallShape = new CANNON.Box(
    new CANNON.Vec3(7.5 * scale, 4 * scale, 0.5 * scale)
  )
  wallBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0)
  })
  wallBody.addShape(wallShape)

  // setFromAxisAngle 旋轉 y 軸 -90 度
  if(IsRotate) wallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  wallBody.position.set(x*8*IsRotate* scale, 4*scale, x*7*!IsRotate* scale)
  world.add(wallBody)
}