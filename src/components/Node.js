import React from 'react'
import { Group, Rect } from 'react-konva'

export default function Node({x, y, width, height, color}) {
  return (
      <Group x={x} y={y} scaleX={width*0.7071} scaleY={height*0.7071}>
          <Rect x={0} y={0} width={1} height={1} fill={color} rotation={45} />
      </Group>
  )
}

// 100w, 100h
// 10px padding
// x0=10 y0=10
// x1=90 y1=90
// w=80  h=80
// scale = 0.8
