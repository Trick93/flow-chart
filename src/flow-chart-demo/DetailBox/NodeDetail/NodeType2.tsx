import { Form, Input } from 'antd'

const NodeType2 = () => {
  return (
    <>
      <Form.Item label="运算类型1" name="calType1">
        <Input />
      </Form.Item>
      <Form.Item label="运算类型2" name="calType2">
        <Input />
      </Form.Item>
    </>
  )
}

export default NodeType2
