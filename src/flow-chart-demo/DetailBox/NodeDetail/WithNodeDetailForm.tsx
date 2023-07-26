// 节点详情的公用表单
// 利用HOC特性 将节点详情表单一样的部分抽离出来
import { useEffect } from 'react'
import { findNodeProp } from '../../config/basic-node-config'
import OperationManager from '../../config/operationManager'
import type { FunctionComponent } from 'react'
import { Form, Divider, Typography, Input, Space, Button } from 'antd'

const { Title } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const WithNodeDetailForm = (WrappedComponent: FunctionComponent, detail: any) => {
  const [form] = Form.useForm()
  const { nodeType } = detail

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({label: detail.label})
    }
  }, [detail])

  // 提交
  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      const { label } = values
      OperationManager.graph?.updateItem(detail.id, { label })
    })
  }

  return (
    <div className="p-5">
      <Title level={3}>{findNodeProp(+nodeType, 'name')}</Title>
      <Divider />
      <Form
        {...layout}
        size="small"
        form={form}
        labelWrap={true}
        initialValues={{}}
        onFinish={handleFormSubmit}
      >
        <Form.Item noStyle>
          <div>
            <Form.Item
              label='节点名称'
              name="label"
              rules={[{ required: true, message: '请输入节点名称' }]}
            >
              <Input placeholder='请输入节点名称' />
            </Form.Item>
            <WrappedComponent />
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

export default WithNodeDetailForm
