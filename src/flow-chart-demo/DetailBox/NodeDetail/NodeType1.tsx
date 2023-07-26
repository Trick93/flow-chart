import { Form, Input } from 'antd'

const NodeType1 = () => {
  return (
    <>
      <Form.Item label="操作类型1" name="optType1">
        <Input />
      </Form.Item>
      <Form.Item label="操作类型2" name="optType2">
        <Input />
      </Form.Item>
    </>
  )
}

export default NodeType1
