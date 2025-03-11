import { useState } from "react"
import RemoveButton from "../button/RemoveButton"
import UpdatePerson from "../form/UpdatePerson"
import UpdateCar from "../form/UpdateCar"
import { Link } from "react-router-dom"
import { Card } from "antd"
import { EditOutlined } from "@ant-design/icons"

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [editCarId, setEditCarId] = useState(null)
  const { id, firstName, lastName, cars, allUsers } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const handleCarEditClick = (carId) => {
    setEditCarId(editCarId === carId ? null : carId)
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={{ width: "1300px" }}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveButton id={id} type="person" />,
          ]}
        >
          <h3>
            {firstName} {lastName}
          </h3>
          {cars && cars.length > 0 ? (
            <div>
              <h4>Cars:</h4>
              {cars.map((car) => (
                <Card
                  key={car.id}
                  type="inner"
                  title={`${car.year} ${car.make} ${car.model} -> $${car.price}`}
                  actions={[
                    <EditOutlined key="edit" onClick={() => handleCarEditClick(car.id)} />,
                    <RemoveButton id={car.id} personId={id} type="car" />,
                  ]}
                >
                  {editCarId === car.id && (
                    <UpdateCar
                      car={car}
                      onButtonClick={() => setEditCarId(null)}
                      allUsers={allUsers}
                      id={id}
                    />
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p>No cars available</p>
          )}
          <Link to={`/person/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  )
}

export default PersonCard
