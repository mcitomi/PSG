function MemberCard({ name, birth, premium }) {
    return <div className="member">
        <h3>{name}</h3>
        <p>{birth}</p>
        <b>{premium ? "Prémium" : "Albán"}</b>
    </div>
}

export default () => {
    const members = [
        {
            name: "MM",
            birth: "2004-11-23",
            premium: true
        },
        {
            name: "B",
            birth: "2006-04-15",
            premium: false
        },
        {
            name: "S",
            birth: "2006-04-21",
            premium: true
        }
    ]

    return <>
        <h1>Felhsználók</h1>
        {
            members.map(membr => {
                return <MemberCard name={membr.name} birth={membr.birth} premium={membr.premium} />
            })
        }
    </>
}