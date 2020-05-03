import React, { useState, useEffect, useRef } from 'react'
import { Stage, Layer } from 'react-konva'
import useDimensions from 'react-use-dimensions'
import { useWheel, useDrag } from 'react-use-gesture'
import Node from './Node'

export default function TechTree() {
  const [treeRef, {width, height}] = useDimensions()
  const [scale, setScale] = useState(1)
  const [offsetX, setOffsetX] = useState(200)
  const [offsetY, setOffsetY] = useState(200)
  const stageRef = useRef()

  
  const wheelBind = useWheel(
    ({ xy: [, y] }) => setScale(1+-y/1000),
    { domTarget: stageRef,
      eventOptions: { passive: false }
     }
  )

  const dragBind = useDrag(
    ({down, delta: [mx, my] }) => {
      setOffsetX(offsetX + mx)
      setOffsetY(offsetY + my)
    }, {
      domTarget: stageRef,
      eventOptions: { passive: false }
    }
  )

  useEffect(wheelBind, [wheelBind])
  useEffect(dragBind, [dragBind])


  return (
    <div ref={treeRef} style={{height: '80vh', width: '50%', border: '1px solid black', margin: '0 auto'}} >
      <Stage ref={stageRef} width={width} height={height} scaleX={scale} scaleY={scale} x={offsetX} y={offsetY} >
        <Layer>
          {[{row: 0, col: 0, color: '#000011'},
            {row: 0, col: 1.5, color: '#000033'},
            {row: -1, col: 3, color: '#000055'},
            {row: -1, col: 6, color: '#000077'},
            {row: 1, col: 3, color: '#000099'},
            {row: 0, col: 4.5, color: '#0000bb'},
            {row: 1, col: 4.5, color: '#0000bb'},
            {row: 1, col: 9, color: '#0000dd'},
            {row: 2, col: 6, color: '#0000ee'},
            {row: 2, col: 7.5, color: '#0000ff'}].map(
            (item, index) => getNode(item.row, item.col, item.color, `node-${index}`)
          )}
        </Layer>
      </Stage>
    </div>
  )
}

function getNode(row, col, color, key) {
  const ROW_PADDING = 4
  const COL_PADDING = 0
  const NODE_SIZE =  100
  const ROW_SIZE = 100
  const COL_SIZE = 100

  return (
    <Node key={key} x={col * COL_SIZE + col * COL_PADDING * 2} y={row * ROW_SIZE + row * ROW_PADDING * 2} width={NODE_SIZE} height={NODE_SIZE} color={color}/>
  )
}
