import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { UPDATE_PERSON } from '../../graphql/queries'

const UpdatePerson = props => {
  const { id, firstName, lastName, onButtonClick } = props

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updatePerson] = useMutation(UPDATE_PERSON)

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    updatePerson({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    onButtonClick()
  }

  return (
    <Form
      name='update-contact-form'
      layout='inline'
      form={form}
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item name='firstName' rules={[{ required: true, message: 'Enter a first name' }]}>
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Enter a last name' }]}>
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdatePerson
