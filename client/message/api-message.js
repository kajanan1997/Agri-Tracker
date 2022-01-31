const create = async (sendData,token) => {
    try {
        let response = await fetch('/api/message/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+token
            },
            body: JSON.stringify(sendData)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
const list = async (signal,token) => {
    try {
        let response = await fetch('/api/message/', {
            method: 'GET',
            signal: signal,
            headers:{
                "Authorization":"Bearer "+token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
const remove = async (id, token) => {
    try {
        let response = await fetch('/api/message/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
export  {
    create,
    list,
    remove
}