import { useEffect, useMemo, useState } from 'react'
import { Form, Typography, Divider, Input, Space, Button, Select, Card } from 'antd'
import useFlow from '../model/useFlow'
import { WithNodeDetailForm, NodeType1, NodeType2, NodeType3 } from './NodeDetail'
import OperationManager from '../config/operationManager'
import ReactJson from 'react-json-view'

import type { EdgeConfig } from '@antv/g6'

const { Title } = Typography

const PanelNodeDetail = ({detail}: {detail: any}) => {

  // 存放节点相对应要渲染的组件
  const _NODE_DICT: any = {
    3: NodeType1,
    4: NodeType2,
    5: NodeType3
  }

  const { nodeType } = detail

  const Empty = () => <></>

  return WithNodeDetailForm(_NODE_DICT[nodeType] ?? Empty, detail)
}

const PanelEdgeDetail = ({detail}: {detail: any}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (detail) {
      const {label, source, target} = detail
      form.setFieldsValue({label, source, target})
    }
  }, [detail])

  // 获取画布当前所有的数据项
  const allItems = useMemo<any>(() => {
    return OperationManager.graph?.save()
  }, [])

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      const { label, source, target } = values
      OperationManager.graph?.updateItem(detail.id, { label, source, target })
      handleClickEdge(detail.id)
    })
  }

  // 点击连线列表
  const handleClickEdge = (id:string|undefined) => {
    if (!id) return
    const target = OperationManager.graph?.findById(id)
    if (target) {
      OperationManager.graph?.emit('click', {
        item: target,
      })
      OperationManager.graph?.emit('edge:click', {
        item: target,
      })
      OperationManager.graph?.focusItem(target, true, {
        easing: 'easeCubic',
        duration: 400,
      })
    }
  }

  return (
    <div className="p-5">
      <Title level={3}>连线列表</Title>
      <Divider />
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        size="small"
        form={form}
        labelWrap={true}
        initialValues={{}}
        onFinish={handleFormSubmit}
      >
        <Form.Item noStyle>
          <div>
            <Form.Item
              label='连线名称'
              name="label"
              rules={[{ required: true, message: '请输入连线名称' }]}
            >
              <Input placeholder='请输入连线名称' />
            </Form.Item>
            <Form.Item
              label='连线起点'
              name="source"
              required
            >
              <Select
                showSearch
                options={allItems.nodes}
                fieldNames={{label: 'label', value: 'id'}}
                filterOption={(input, option) =>
                  ((option?.label ?? '') as String).toLowerCase().includes(input.toLowerCase())
                }>
              </Select>
            </Form.Item>
            <Form.Item
              label='连线终点'
              name="target"
              required
            >
              <Select
                showSearch
                options={allItems.nodes} 
                fieldNames={{label: 'label', value: 'id'}}
                filterOption={(input, option) =>
                  ((option?.label ?? '') as String).toLowerCase().includes(input.toLowerCase())
                }>
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space wrap>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div>
        <ul className="list-none p-0">
        {
          allItems.edges.map((item: EdgeConfig, idx:number) => (
            <li onClick={() => handleClickEdge(item.id)} className={`h-[38px] leading-[38px] px-2 border-dashed border-0 border-b-[1px] border-[#ddd] cursor-pointer hover:bg-[#e6f4ff] transition-all ${detail.id === item.id ? 'bg-[#e6f4ff]' : ''}`} key={item.id}>
              {idx+1}: {item.label ?? ''}
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

const PanelFlowDetail = () => {
  const datas = OperationManager.graph?.save()
  return <div className="p-3"><ReactJson
    name={false}
    displayDataTypes={false}
    collapsed={1}
    src={datas ?? {}}
  /></div>
}

function DetailBox() {
  const [useFlowStore] = useFlow
  const [type, setType] = useState('canvas') // 判断当前鼠标点击的是 线、节点、或者是图表空白处
  const [detail, setDetail] = useState<any>() // 详情信息

  const { currentItem } = useFlowStore()

  useEffect(() => {
    const { targetType = 'canvas', ...detail }: any = currentItem
    setType(targetType)
    setDetail(detail)
  }, [currentItem])

  return <section>
    { type === 'canvas' && <PanelFlowDetail /> }
    { type === 'node' && <PanelNodeDetail detail={detail} /> }
    { type === 'edge' && <PanelEdgeDetail detail={detail} /> }
  </section>
}

export default DetailBox
