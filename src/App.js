import { useEffect, useState } from "react";
import Persons from './components-phonebook/Persons'
import Filter from './components-phonebook/SearchFilter'
import PersonForm from './components-phonebook/PersonForm'
import ServiceContacts from './services/phone'
import Notification from "./components-phonebook/Notification";



const App = () => {

const [persons, setPersons] = useState([]) 
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [filteredPesons, setFilteredPesons] = useState([])
const [emptySearch, setEmptySearch] = useState(true)    //emptySearch = true (el input de busqueda esta vacio)

const [notificationContact, setNotificationContact] = useState({
    notificationSuccess:null,
    notificationError:null
})

  useEffect(()=>{
    //Pillando datos sin el servicio:
    // const promise = axios.get('http://localhost:3001/persons')
    // promise.then(result=>{
    //     setPersons(result.data) 
    // })

    //Pillando los datos del servicio: 
    ServiceContacts.getAllContacts()
    .then(contactos=> {
        //En caso de que el nombre sea compuesto, sacamos el apellido:        
        const names = contactos.map(contacto =>{
            let apellido = contacto.name.split(' ')            
            return apellido.length > 1 ? apellido[1] : apellido[0]
        })      
        //Si queremos poner info adicional de github en el contacto (solo cuando damos actualizar)
        const url = "https://api.github.com/users/"      
        //creamos Promise.all con un fetch de urls :      
        //metodo 1:    
        // let array_promises_1 = names.map(name=>fetch(url+name).then(response=>response.json()))       
        // Promise.all(array_promises_1)
        // .then(results=>{
        //     const [result1, result2, result3, result4, result5] = results
        //     console.log('resultados ',result1.name, result2.name, result3.name, result4.name, result5.name)
        // })
        //metodo 2: 
        let array_promises_2 = names.map(name=>fetch(url+name))
        Promise.all(array_promises_2)
        .then(response=>{
            return Promise.all(response.map(res=>res.json()))
        }).then(results=>{           
            for (let i=0; i<results.length; i++) {
                if(!results[i].message){
                    if(results[i].name ){
                        contactos[i] =   {...contactos[i], githubname: results[i].name, githuburl: results[i].url , avatarurl: results[i].avatar_url}
                    } 
                }
            }           
            console.log(contactos) 
            setPersons(contactos)
        }) 
       
    })
    // prueba_Promises_2()    
    // prueba_Promises
},[])

// const prueba_Promises_2 = () => {
//     return fetch('https://dummyjson.com/users')    
//         .then(response => response.json())
//         .then(res => console.log(res))
// }


// const prueba_Promises =  () => {
//     const data = [1,2,4]
//     const func1 = (data) =>{
//         return data.map((dato)=>  dato*2)   
//     }      
//     return new Promise ( (resolve)=>{
//       setTimeout( () => resolve(func1(data)), 4000 )
//     }).then(result=>{
//         console.log('resultado1 ', result.toString())
//         return new Promise (resolve=> setTimeout(()=>resolve(result[2]), 3000))
//     }).then(result=>{
//         console.log('resultado2' , result)
//     })    
//   }



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
        <h2>Numbers: </h2>       
        <Persons personas={getPersons()} updateContacts = {GetALlContacts}/> 
    </div>
  )
 
}

export default App