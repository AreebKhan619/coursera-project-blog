const idMapping = {

}

const getUsernameFromId = (id, userArray) => {
    if (idMapping[id]) return idMapping[id]
    const { name, username } = userArray.find(el => el.id === id)
    idMapping[id] = { name, username }
    return {name, username}
}
export default getUsernameFromId