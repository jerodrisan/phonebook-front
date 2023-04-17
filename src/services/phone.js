import axios from 'axios'
//Usaremos servidor expres, arrancariamos el servidor en el otro proyecto back de phonebook con npm run dev
const baseUrl = 'http://localhost:3001/api/persons'

const getAllContacts = () =>{    
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)   

}

const postContact =(contact) =>{ 
    const promise = axios.post(baseUrl,contact)
    return promise.then (response=>response.data)
}

//El servidor no devuelve ningun dato ya que se produce un 204 por el delete
const deleteContact = (id) =>{ 
    const promise = axios.delete(`${baseUrl}/${id}`) 
    return promise.then((response) =>{     
        console.log(response)
        return response

        }     
    )  
}


const updateContact = (id,contact) =>{    
   const promise= axios.put(`${baseUrl}/${id}`, contact)
    return promise.then(response => response)
}

export default {getAllContacts, postContact, deleteContact ,updateContact};