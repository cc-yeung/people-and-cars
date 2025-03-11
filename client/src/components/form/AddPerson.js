import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { ADD_PERSON, GET_PERSONS } from '../../graphql/queries'
import { v4 as uuidv4 } from 'uuid'

const AddPerson = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [addPerson] = useMutation(ADD_PERSON)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values
    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PERSONS })

        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            persons: [...data.persons, addPerson]
          }
        })
      }
    })
    form.resetFields()
  }

  return (
    <>
    <h1>Add Person</h1>
    <Form
      name='add-contact-form'
      layout='inline'
      size='large'
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="First Name" 
        name='firstName'
        rules={[{ required: true, message: 'Enter a first name' }]}
      >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name='lastName'
        rules={[{ required: true, message: 'Enter a last name' }]}
      >
        <Input placeholder='Last Name' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
    </>
  )
}

export default AddPerson
