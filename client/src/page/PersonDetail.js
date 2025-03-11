import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PERSON, GET_PERSONS } from '../graphql/queries'
import PersonCard from '../components/listItem/PersonCard'
import { Button } from 'antd'

export default function PersonDetail() {
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id }, 
  })

  const { loading: loadingPersons, error: errorPersons, data: allPersonData } = useQuery (GET_PERSONS)
  if (loading || loadingPersons) return <div>Loading...</div>
  if (error || errorPersons) return <div>Error: {error.message}</div>

  const { person } = data

  return (
    <>
      <Link to={`/`}>
        <Button type="primary">
          Go Back Home
        </Button>
      </Link>
      <PersonCard
        id={id}
        firstName={person.firstName}
        lastName={person.lastName}
        cars={person.cars}
        allUsers={{ persons: allPersonData.persons }}
      />
    </>
  )
}
