import React from 'react';
import '../styling/Entries.css';
import content from '../content';
import Section from './Section';

function Coursework() {
    return (
        <Section id="coursework">
            <table className="courses" data-reveal>
                <thead>
                    <tr>
                        <th scope="col">Course</th>
                        <th scope="col">Title</th>
                        <th scope="col">Term</th>
                    </tr>
                </thead>
                <tbody>
                    {content.coursework.map((course) => (
                        <tr key={`${course.code}-${course.term}`}>
                            <td className="mono">{course.code}</td>
                            <td>
                                {course.title}
                                {course.topics?.length > 0 && <span className="courses__topics">{course.topics.join(', ')}</span>}
                            </td>
                            <td className="mono">{course.term}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Section>
    );
}

export default Coursework;
