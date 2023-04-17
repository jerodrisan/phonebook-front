//import axios from 'axios'
import ServiceContacts from '../services/phone'


const Persons = (props) =>{

    const {personas,updateContacts} = props 
    
    const OnDeleteContact =(person) =>{
        
        let confirmar = window.confirm(`Delete ${person.name}?`)
        if (confirmar){
            const promise = ServiceContacts.deleteContact(person.id)
            promise.then((data)=>{    
                //console.log(data)            
                 updateContacts()
            }).catch(error=>{
                console.log(error)
            })                         
        } 
    }

    return (
        <div>           
             {personas.map((person)=>{             
                return (
                    <div  key={person.id}>
                        <div>{person.name} {person.number}</div> 
                        <button onClick={()=>OnDeleteContact(person)}>delete</button>
                    </div>
                )
             }             
             )}             
        </div>
    )
}

export default Persons