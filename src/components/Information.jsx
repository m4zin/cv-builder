import { useState } from "react"
import CV from "./CV"

let nextExperienceId = 0

function General({ handleInput }) {
    return (
        <form>
            <label>
                Name:
                <input id="name" type="text" name="name" onChange={handleInput} required />
            </label>
            <label>
                Email:
                <input id="email" type="email" name="email" onChange={handleInput} required />
            </label>
            <label>
                Phone:
                <input id="phone" type="number" name="phone" onChange={handleInput} required />
            </label>
        </form>
    )
}

function Experience({handleInput}) {
    return (
        <form id="experienceForm" onSubmit={handleInput}>
            <label>
                Job Title:
                <input id="jobTitle" type="text" name="jobTitle" required />
            </label>
            <label>
                Years Worked:
                <input id="yearsWorked" type="number" name="yearsWorked" required />
            </label>
            <label>
                Summary:
                <input id="summary" type="text" name="summary" required />
            </label>
            <input type="submit" value='add'/>
        </form>
    )
}

// Information() makes use of a navbar that switches between different forms used to fill CV content.
// It also returns the main CV content.
export default function Information() {
    const [general, setGeneral] = useState({ name: '', email: '', phone: '' })
    const [experiences, setExperiences] = useState([])
    const [editExperienceStatus, setEditExperienceStatus] = useState(false)
    const [editExperienceIndex, setEditExperienceIndex] = useState(null)
    // State used to keep track of which form is currently active. 
    const [content, setContent] = useState('General')

    function handleGeneral(event) {
        const input = event.target.value
        let newGeneral = general

        if (event.target.id === 'name') {
            setGeneral({ ...newGeneral, name: input })
        } else if (event.target.id === 'email') {
            setGeneral({ ...newGeneral, email: input })
        } else if (event.target.id === 'phone') {
            setGeneral({ ...newGeneral, phone: input })
        }
    }

    function handleExperience(event) {
        event.preventDefault()

        const jobTitle = event.target[0].value
        const yearsWorked = event.target[1].value
        const summary = event.target[2].value

        // Resetting form?
        document.getElementById('experienceForm').reset()

        let newExperiences = experiences

        if (editExperienceStatus === true) {
            newExperiences.map(experience => {
                if (experience.id === editExperienceIndex) {
                    experience.jobTitle = jobTitle
                    experience.yearsWorked = yearsWorked
                    experience.summary = summary                 
                }
            })

            setExperiences(newExperiences)
            setEditExperienceStatus(false)
        } else {
            setExperiences([...newExperiences, {id: nextExperienceId++, jobTitle: jobTitle, yearsWorked: yearsWorked, summary: summary}])
        }
    }
    
    function editExperience(index) {
        let experience = experiences[index]

        // Filling experience form values with selected experience to be edited.
        document.getElementById('jobTitle').value = experience.jobTitle
        document.getElementById('yearsWorked').value = experience.yearsWorked
        document.getElementById('summary').value = experience.summary

        setEditExperienceIndex(index)
        setEditExperienceStatus(true)
    }

    function switchForm() {
        switch(content) {
            case 'General': 
                return <General handleInput={handleGeneral}></General>
            case 'Education':
                return 
            case 'Experience':
                return <Experience handleInput={handleExperience}></Experience>
            default:
                return
        }
    }

    return (
        <>
            <nav>
                <button onClick={() => setContent('General')}>General</button>
                <button onClick={() => setContent('Education')}>Education</button>
                <button onClick={() => setContent('Experience')}>Experience</button>
            </nav>
            <div>
                {switchForm()}
            </div>
            {/* Display CV below */}
            <CV general={general} experiences={experiences} editExperience={editExperience}></CV>
        </>
    )
}