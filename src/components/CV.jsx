export default function CV({general, experiences, editExperience}) {
    return (
        <>
            <header>
                {/* General information */}
                <h3>{general.name}</h3>
                <h3>{general.email}</h3>
                <h3>{general.phone}</h3>
            </header>
            <main>
                {/* Experience information */}
                {experiences.map((experience, index) => 
                    <ul key={index}>
                        <li>
                            {experience.jobTitle}
                        </li>
                        <li>
                            {experience.yearsWorked}
                        </li>
                        <li>
                            {experience.summary}
                        </li>
                        <button onClick={() => editExperience(index)}>edit</button>
                    </ul>
                )}
            </main>
        </>
    )
}