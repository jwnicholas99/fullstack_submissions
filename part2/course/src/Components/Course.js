import React from 'react';
import Part from './Part.js'

const Course = ({course}) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />    
            )}
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}

export default Course;