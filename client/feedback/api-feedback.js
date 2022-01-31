const create = async (feedback) => {
    try {
        let response = await fetch('/api/feedback/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
const list = async (signal) => {
    try {
        let response = await fetch('/api/feedback/', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
const remove = async (id, token) => {
    try {
        let response = await fetch('/api/feedback/' + id, {
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