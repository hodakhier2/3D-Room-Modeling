import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Bed(props) {
  const { nodes, materials } = useGLTF('/3dModels/Bed/bed.gltf')
  return (
    <group {...props} dispose={null} position={[0,1.1,0]} scale={[0.0013, 0.0013,  0.0013]}>
      <group position={[-363.11, -816.184, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
        <group rotation={[-Math.PI, 0, 0]}>
          <group position={[-181.458, 1168.383, 158.028]} rotation={[0, 0, -Math.PI]}>
            <mesh geometry={nodes.Osnovanie_Dub_sonoma_0.geometry} material={materials.Dub_sonoma} position={[50914.766, 854.331, 1096.68]} />
          </group>
          <group position={[-181.458, 1168.383, 158.028]} rotation={[0, 0, -Math.PI]}>
            <mesh geometry={nodes.Osnovanie003_VENGE_0.geometry} material={materials.VENGE} position={[50914.766, 854.331, 1096.68]} />
          </group>
          <group position={[-166.515, 2847.116, 536.854]} scale={[0.967, 1.015, 1]}>
            <mesh geometry={nodes['Podushki004_Material_#2144543642_0'].geometry} material={materials.Material_2144543642} position={[-0.065, 0, 0.474]} />
          </group>
          <group position={[-173.28, 2203.758, 324.266]} scale={[0.967, 1.015, 1]}>
            <mesh geometry={nodes.Matras_Carpet_Low_Beige0_0.geometry} material={materials.Carpet_Low_Beige0} position={[0, 14.078, 0]} />
          </group>
          <group position={[-166.515, 2847.116, 536.854]} scale={[0.967, 1.015, 1]}>
            <mesh geometry={nodes['Podushki_������334243432_0'].geometry} material={materials['334243432']} position={[-0.065, 0, 0.474]} />
          </group>
          <group position={[-167.346, 1867.725, 301.955]} scale={[0.967, 1.015, 1]}>
            <mesh geometry={nodes['Odeyalo_Material_#215465473585_0'].geometry} material={materials.Material_215465473585} position={[0, -228.914, 0]} />
          </group>
          <mesh geometry={nodes.Spinka_fasad_LDSP_Gray_0.geometry} material={materials.LDSP_Gray} position={[-1382.625, 3222.188, 689.82]} rotation={[-Math.PI / 2, 0, Math.PI]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3dModels/Bed/bed.gltf')
