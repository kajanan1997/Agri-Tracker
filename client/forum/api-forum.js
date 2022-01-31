const list = async (signal,token) => {
    try {
        let response = await fetch('/api/posts/', {
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
const read = async (id, token, signal) => {
    try {
        let response = await fetch('/api/posts/' + id, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
const create = async (post,userId,token) => {
    try {
        let response = await fetch('/api/posts/new/'+userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+token
            },
            body: JSON.stringify(post)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
const addComment = async (sendData,token)=>{
    try{
        let response = await fetch('/api/posts/comment',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+token
            },
            body:JSON.stringify(sendData)
        })
        return await response.json()
    }catch (e) {
       console.log(e)
    }

}
const removeComment = async (sendData,token)=>{
    try{
        let response = await fetch('/api/posts/remove-comment/',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+token
            },
            body:JSON.stringify(sendData)
        })
        return await response.json()
    }catch (e) {
        console.log(e)
    }

}
const remove = async (id, token) => {
    try {
        let response = await fetch('/api/posts/' + id,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

export {
    list,read,create,addComment,removeComment,remove
}