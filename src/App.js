import { useEffect, useState } from "react";
import Persons from './components-phonebook/Persons'
import Filter from './components-phonebook/SearchFilter'
import PersonForm from './components-phonebook/PersonForm'
import ServiceContacts from './services/phone'
import Notification from "./components-phonebook/Notification";



const App = () => {

  useEffect(()=>{
    //Pillando datos sin el servicio:
    // const promise = axios.get('http://localhost:3001/persons')
    // promise.then(result=>{
    //     setPersons(result.data) 
    // })
    //Pillando los datos del servicio: 
    ServiceContacts.getAllContacts()
    .then(contactos=>setPersons(contactos))
    

},[])

const [persons, setPersons] = useState([]) 
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [filteredPesons, setFilteredPesons] = useState([])
const [emptySearch, setEmptySearch] = useState(true)    //emptySearch = true (el input de busqueda esta vacio)

const [notificationContact, setNotificationContact] = useState({
    notificationSuccess:null,
    notificationError:null
})


function HandleStateChangeName(event){
    event.preventDefault()
    setNewName(event.target.value)
}

function HandleStateChangeNumber(event){
    event.preventDefault(); 
    setNewNumber(event.target.value) 

}

const GetALlContacts = () =>{        
    const promise = ServiceContacts.getAllContacts()
    promise.then(contactos=>{
        console.log(`Get all contacts ${contactos}`)
        setPersons(contactos)
    })        
}      



function OnSubmitForm(event){
    event.preventDefault()
    let newPers = {name:newName, number:newNumber}
    let person  = persons.find(person=>person.name ===newName) 
    //Si la persona existe, reemplazamos el numero
    if(Boolean(person)){
        let id = person.id
        let replace = window.confirm(`${newName} already added to phonebook, replace the old number with the new one?`)
        if(replace){
            //reemplazamos el viejo numero con el nuevo:
            ServiceContacts.updateContact(id,newPers)
            .then(contacto=>{
               //console.log(contacto)//devuelve el contacto modificado
               GetALlContacts() //actualizamos la lista
            }).catch(error=>{
                setNotificationContact({...notificationContact, notificationError:`Information of ${person.name} has already been remove from server` })
                setTimeout(()=>{
                    setNotificationContact({...notificationContact, notificationError:null })
                },2000)
                console.log(`Information of ${person.name} has already been remove from server`)
            })
        } 
    }else{            
        //añadimos tambien en el array: 
        ServiceContacts.postContact(newPers)
        .then(person =>{
            // setNotificationSuccess(`Added ${newName}`)
            // setTimeout(()=>{
            //     setNotificationSuccess(null)    //quitamos la notificacion pasado un tiempo
            // },2000)
            setNotificationContact({...notificationContact, notificationSuccess:`Added ${newName}` })
            setTimeout(()=>{
                setNotificationContact({...notificationContact, notificationSuccess:null })
            },2000)

            setPersons(persons.concat(person)) //añadimos al array lo que devuelve el servidor que es la persona añadida

        })
    } 
    setNewName('')
    setNewNumber('')        
}

function OnhandleSearch(event){
    event.preventDefault()
    setEmptySearch(false)   //el input de busqueda ya tiene alguna caracter de busqueda y por tanto es false
    let str = event.target.value      
    let filter_persons = persons.filter(person=>(person.name).toLowerCase().includes(str.toLowerCase()))        
    setFilteredPesons(filter_persons)
}   

const getPersons = () => emptySearch ? persons : filteredPesons


return(
    <div> 
        <h2>Phonebook</h2>       
        {/* <Notification message={notificationSuccess}/>             */}
        <Notification message={notificationContact}/>            
        <Filter handleSearch = {OnhandleSearch}/>
        <h2>Add a new</h2>
        <PersonForm OnSubmitForm= {OnSubmitForm} 
            onHandleStateChangeName={HandleStateChangeName} newName ={newName} 
            onHandleStateChangeNumber = {HandleStateChangeNumber} newNumber ={newNumber}
            />
        <h2>Numbers</h2>       
        <Persons personas={getPersons()} updateContacts = {GetALlContacts}/> 
    </div>
  )
 
}

export default App