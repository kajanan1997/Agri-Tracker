const create = (news,credentials) => {
    return fetch('/api/news/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(news)
    })
        .then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
}

const list = (credentials) => {
    return fetch('/api/news/', {
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+credentials.t
        }
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
    return fetch('/api/news/' + params.newsID, {
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
const update = (params, credentials, news) => {
    return fetch('/api/news/' + params.newsID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(news)
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}

const remove = (params, credentials) => {
    return fetch('/api/news/' + params.newsID, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}

export { create, list, read, update, remove }