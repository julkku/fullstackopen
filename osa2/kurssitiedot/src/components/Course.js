import React from 'react'

const Course = ({ courses }) => {
  const listCourses = () => courses.map(course => 
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    </>
    )

  return (
    listCourses()
  )
}

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({ parts }) => {
  console.log(parts[0].exercises);

  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return <p><b>total of {total} tehtävää</b></p>
}


const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>


const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part part={part} key={part.id} />)}

    <Total parts={parts} />
  </div>
)


export default Course


