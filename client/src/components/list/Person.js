import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_PERSONS } from '../../graphql/queries'
import PersonCard from '../listItem/PersonCard'

const Person = () => {

  const { loading, error, data } = useQuery(GET_PERSONS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
      <h1>Records</h1>
      <List>
        {data.persons.map(({ id, firstName, lastName,cars }) => (
          <List.Item key={id}>
            <PersonCard id={id} firstName={firstName} lastName={lastName} cars={cars} allUsers={data}/>
          </List.Item>
        ))}
      </List>
    </>
  )
}

export default Person
