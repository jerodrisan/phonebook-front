import axios from 'axios'
//Arrancamos local server con npm run server en este mismo directorio
const baseUrl = 'http://localhost:3001/persons'
//En caso de usar servidor expres, arrancariamos el servidor en el otro proyecto back de phonebook con npm run dev
//const baseUrl = 'http://localhost:3001/api/persons'

const getAllContacts = () =>{    
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)   

}

const postContact =(contact) =>{ 
    const promise = axios.post(baseUrl,contact)
    return promise.then (response=>response.data)
}


const deleteContact = (id) =>{ 
    const promise = axios.delete(`${baseUrl}/${id}`) 
    return promise.then(response =>{
        //console.log(response.data)
         return response.data
        }     
    )  
}

const updateContact = (id,contact) =>{    
   const promise= axios.put(`${baseUrl}/${id}`, contact)
    return promise.then(response => response.data)

}

export default {getAllContacts, postContact, deleteContact ,updateContact};