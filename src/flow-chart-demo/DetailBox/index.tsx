import { useEffect, useMemo, useState } from 'react'
import { Form, Typography, Divider, Input, Space, Button, Select } from 'antd'
import useFlow from '../model/useFlow'
import { WithNodeDetailForm, NodeType1, NodeType2, NodeType3 } from './NodeDetail'
import OperationManager from '../config/operationManager'

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

  // 获取画布当前所有节点
  const allNodes = useMemo<any>(() => {
    const data = OperationManager.graph?.save()
    return data?.nodes
  }, [])

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      const { label, source, target } = values
      OperationManager.graph?.updateItem(detail.id, { label, source, target })
    })
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

            >
              <Select options={allNodes} fieldNames={{label: 'label', value: 'id'}}></Select>
            </Form.Item>
            <Form.Item
              label='连线终点'
              name="target"
  
            >
              <Select options={allNodes} fieldNames={{label: 'label', value: 'id'}}></Select>
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
    </div>
  )
}

const PanelFlowDetail = () => {
  return '这是面板详情信息'
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
