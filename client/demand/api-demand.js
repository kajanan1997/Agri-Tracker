const create = (demand,credentials) => {
    return fetch('/api/demand/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(demand)
    })
        .then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
}

const list = (credentials) => {
    return fetch('/api/demand/', {
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+credentials.t
        }
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
    return fetch('/api/demand/' + params.demandID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}
//todo harvest id error
const update = (params, credentials, demand) => {
    return fetch('/api/demand/' + params.demandID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(demand)
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}

const remove = async (id, credentials) => {
    try{
        let response = await fetch('/api/demand/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            } })
        return await response.json()
    }
    catch (e) {
       console.log(e)
    }
}

export { create, list, read, update, remove }