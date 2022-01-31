const create = (harvest,token) => {
    return fetch('/api/harvest/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        body: JSON.stringify(harvest)
    })
        .then((response) => {
            return response.json()
        }).catch((err) => console.log(err))

}

const list = (credentials) => {
    return fetch('/api/harvest/', {
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+credentials.t
        }
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const read = (harvestID, token) => {
    return fetch('/api/harvest/' + harvestID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}
//todo harvest id error
const update = (harvestID, harvest,token) => {
    return fetch('/api/harvest/' + harvestID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        body: JSON.stringify(harvest)
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}

const remove = async (harvestID, credentials) => {
    try{
        let response = await fetch('/api/harvest/' + harvestID, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }})
        return await response.json()
    }
    catch(err) {
        console.log(err)
    }
}

export { create, list, read, update, remove }