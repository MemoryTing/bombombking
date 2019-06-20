// 睏寶
class Bazzi {
  constructor(scale_) {
    this.walkOffset = 0
    const headGeo = new THREE.BoxGeometry(0.5*scale_, 0.4*scale_, 0.45*scale_)
    const earGeo = new THREE.BoxGeometry(0.2*scale_, 0.2*scale_, 0.2*scale_)
    const bodyGeo = new THREE.BoxGeometry(0.24*scale_, 0.24*scale_, 0.25*scale_)
    const handGeo = new THREE.BoxGeometry(0.1*scale_, 0.2*scale_, 0.1*scale_)
    const footGeo = new THREE.BoxGeometry(0.12*scale_, 0.15*scale_, 0.1*scale_)

    const textureLoader = new THREE.TextureLoader()
    const headMap = textureLoader.load('./img/face.png')
    const skinMap = textureLoader.load('./img/belly.png')
    const normalMap = textureLoader.load('./img/normal.png')
    const normalMat = new THREE.MeshPhongMaterial({ color: 0xD70000 })

    const headMaterials = []
    const skinMaterials = []
    for (let i = 0; i < 6; i++) {
      let map
      if (i === 4) map = headMap
      else map = normalMap
      headMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    for (let i = 0; i < 6; i++) {
      let map
      if (i === 4) map = skinMap
      else map = normalMap
      skinMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    this.head = new THREE.Mesh(headGeo, headMaterials)
    this.head.position.set(0, 0.19*scale_, 0)

    this.body = new THREE.Mesh(bodyGeo, skinMaterials)
    this.body.position.set(0, -0.13*scale_, 0)

    this.ear1 = new THREE.Mesh(earGeo, normalMat)
    this.ear1.position.set(0.25*scale_, 0.35*scale_, -0.225*scale_)
    this.ear2 = this.ear1.clone()
    this.ear2.position.set(-0.25*scale_, 0.35*scale_, -0.225*scale_)

    this.foot1 = new THREE.Mesh(handGeo, normalMat)
    this.foot1.position.set(-0.17*scale_, -0.11*scale_, 0)
    this.foot2 = this.foot1.clone()
    this.foot2.position.set(0.17*scale_, -0.11*scale_, 0)
    this.foot3 = new THREE.Mesh(footGeo, normalMat)
    this.foot3.position.set(0.055*scale_, -0.325*scale_, 0)
    this.foot4 = this.foot3.clone()
    this.foot4.position.set(-0.055*scale_, -0.325*scale_, 0)


    this.ear = new THREE.Group()
    this.ear.add(this.ear1) // 前腳左
    this.ear.add(this.ear2) // 後腳左
    this.feet = new THREE.Group()
    this.feet.add(this.foot1) // 前腳左
    this.feet.add(this.foot2) // 後腳左
    this.feet.add(this.foot3) // 前腳右
    this.feet.add(this.foot4) // 後腳右

    this.Bazzi = new THREE.Group()
    this.Bazzi.add(this.head)
    this.Bazzi.add(this.body)
    this.Bazzi.add(this.feet)
    this.Bazzi.add(this.ear)
    this.Bazzi.name = 'Bazzi'
    /*
    const bodyShape = new CANNON.Box(
      new CANNON.Vec3(0.25 * scale_, 0.4 * scale_, 0.225 * scale_)
    )*/
    const bodyShape = new CANNON.Sphere(0.4)
    this.bodyBody = new CANNON.Body({
      mass: 50,
    })
    this.bodyBody.addShape(bodyShape)
    this.bodyBody.position.set(0, 0.4*scale_, 0)

    this.Bazzi.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    this.map = []
    this.dir = 0
    this.scale = 0.4*scale_
    this.velocity = 10
    this.bodyBody.velocity.z = this.velocity
    this.positionx = 0
    this.positionz = 0
  }
  update() {

    //這段是在偵測四周哪裡可以走
    if(this.dir == 0){ //向+z方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if (Math.abs(this.bodyBody.position.z-this.positionz)>0.002 && Math.random()>0.05){
        this.bodyBody.velocity.z = this.velocity
        this.bodyBody.velocity.x = 0
        this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI*2)
        this.dir = 0
      } 
      else{
        //隨機向+x或-x方向走
        if(Math.random()>0.5){
          this.bodyBody.velocity.x = -this.velocity*2
          this.bodyBody.velocity.z = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI/2)
          this.dir = 1
        }else{
          this.bodyBody.velocity.x = this.velocity*2
          this.bodyBody.velocity.z = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI*3/2)
          this.dir = 3
        }
      }
    }else if(this.dir == 1){ //向-x方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if (Math.abs(this.bodyBody.position.x-this.positionx)>0.002 && Math.random()>0.05){
        this.bodyBody.velocity.x = -this.velocity
        this.bodyBody.velocity.z = 0
        this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI/2)
        this.dir = 1
      }
      else{
        //隨機向+z或-z方向走
        if(Math.random()>0.5){
          this.bodyBody.velocity.z = -this.velocity*2
          this.bodyBody.velocity.x = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI)
          this.dir = 2
        }
        else{
          this.bodyBody.velocity.z = this.velocity*2
          this.bodyBody.velocity.x = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI*2)
          this.dir = 0
        }
      }
    }else if(this.dir == 2){ //向-z方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if(Math.abs(this.bodyBody.position.z-this.positionz)>0.002 && Math.random()>0.05){
        this.bodyBody.velocity.z = -this.velocity
        this.bodyBody.velocity.x = 0
        this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI)
        this.dir = 2
      }
      else{
        //隨機向+x或-x方向走
        if(Math.random()>0.5){
          this.bodyBody.velocity.x = this.velocity*2
          this.bodyBody.velocity.z = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI*3/2)
          this.dir = 3
        }
        else{
          this.bodyBody.velocity.x = -this.velocity*2
          this.bodyBody.velocity.z = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI/2)
          this.dir = 1
        }
      }
    }
    else if(this.dir == 3){ //向+x方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if(Math.abs(this.bodyBody.position.x-this.positionx)>0.002 && Math.random()>0.05){
        this.bodyBody.velocity.x = this.velocity
        this.bodyBody.velocity.z = 0
        this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI*3/2)
        this.dir = 3
      }
      else{
        //隨機向+z或-z方向走
        if(Math.random()>0.5){
          this.bodyBody.velocity.z = this.velocity*2
          this.bodyBody.velocity.x = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI*2)
          this.dir = 0
        }
        else{
          this.bodyBody.velocity.z = -this.velocity*2
          this.bodyBody.velocity.x = 0
          this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI)
          this.dir = 2
        }
      }
    }
    this.positionz = this.bodyBody.position.z
    this.positionx = this.bodyBody.position.x
    this.bodyBody.position.y = this.scale //避免睏寶飛起來

    this.BazziFeetWalk()
    this.Bazzi.position.copy(this.bodyBody.position)
  }
  BazziFeetWalk() {
    this.walkOffset += 0.04
    
    this.foot1.rotation.x = Math.sin(this.walkOffset) / 2 // 右手
    this.foot2.rotation.x = -Math.sin(this.walkOffset) / 2 // 左手
    this.foot3.rotation.x = Math.sin(this.walkOffset) / 2 // 左腳
    this.foot4.rotation.x = -Math.sin(this.walkOffset) / 2 // 右腳
  }
}
