import G6 from '@antv/g6'
import dragAddNodeBehavior from './dragAddNode'
import hoverSelect from './hoverSelect'
import socketBehavior from './socket'

G6.registerBehavior('drag-add-node', dragAddNodeBehavior)
G6.registerBehavior('hover-select', hoverSelect)
G6.registerBehavior('socket', socketBehavior)
