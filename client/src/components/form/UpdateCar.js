import React from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button, Select } from 'antd'
import { ADD_CAR, GET_PERSONS, REMOVE_CAR, UPDATE_CAR } from '../../graphql/queries'

const UpdateCar = ({ car, allUsers, onButtonClick, id }) => {
  const [form] = Form.useForm()
  const persons = allUsers?.persons || []
  
  const [updateCar] = useMutation(UPDATE_CAR)

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { persons } = cache.readQuery({ query: GET_PERSONS })
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: persons.map(person =>
            person.id === removeCar.personId
              ? { ...person, cars: person.cars.filter(car => car.id !== removeCar.id) }
              : person
          )
        }
      })
    }
  })

  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PERSONS }] 
  })

  const handleFinish = (values) => {
    if (id !== values.personId) {
      removeCar({
        variables: { id: car.id },
        update: (cache, { data: { removeCar } }) => {
          const existingPersons = cache.readQuery({ query: GET_PERSONS })
          if (existingPersons) {
            cache.writeQuery({
              query: GET_PERSONS,
              data: {
                ...existingPersons,
                persons: existingPersons.persons.map(person =>
                  person.id === id
                    ? { ...person, cars: person.cars.filter(c => c.id !== removeCar.id) }
                    : person
                )
              }
            })
          }
        }
      })
  
      addCar({
        variables: {
          id: car.id,
          year: parseInt(values.year),
          make: values.make,
          model: values.model,
          price: parseFloat(values.price),
          personId: values.personId
        },
        update: (cache, { data: { addCar } }) => {
          const existingPersons = cache.readQuery({ query: GET_PERSONS })
          if (existingPersons) {
            cache.writeQuery({
              query: GET_PERSONS,
              data: {
                ...existingPersons,
                persons: existingPersons.persons.map(person =>
                  person.id === values.personId
                    ? { ...person, cars: [...(person.cars || []), addCar] }
                    : person
                )
              }
            })
          }
        }
      })
    } else {
      updateCar({
        variables: {
          id: car.id,
          year: parseInt(values.year),
          make: values.make,
          model: values.model,
          price: parseFloat(values.price),
          personId: values.personId
        }
      })
    }
    onButtonClick()

  }


  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        year: car.year,
        make: car.make,
        model: car.model,
        price: car.price,
        personId: id, 
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Make"
        name="make"
        rules={[{ required: true, message: 'Please input the make of the car!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: 'Please input the model of the car!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: 'Please input the year of the car!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the price of the car!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Associated User"
        name="personId"
        rules={[{ required: true, message: 'Please select an associated user!' }]}
      >
        <Select placeholder="Select a user">
          {persons.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Car
        </Button>
        <Button onClick={onButtonClick}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdateCar
