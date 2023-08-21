import * as THREE from "three"

export default function customizeBoy(materials, avatar){
    materials["Hair 2"].color = new THREE.Color(avatar.hair)
    materials["Hair 1"].color = new THREE.Color(avatar.hair)
    materials["Body Skin"].color = new THREE.Color(avatar.skin)
    materials["Shirt 2"].color = new THREE.Color(avatar.shirt)
    materials.Pants.color = new THREE.Color(avatar.trousers)
    materials["Shores.002"].color = new THREE.Color(avatar.shoes)
}