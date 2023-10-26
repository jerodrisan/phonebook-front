//import axios from 'axios'
import ServiceContacts from '../services/phone'


const Persons = (props) =>{

    const {personas,updateContacts} = props 
    
    const OnDeleteContact =(person) =>{
        
        let confirmar = window.confirm(`Delete ${person.name}?`)
        if (confirmar){
            const promise = ServiceContacts.deleteContact(person.id)
            promise.then(()=>{ 
                 //console.log('delete succesfull')              
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
                    <div  key={person.id} style={{marginBottom: "30px", borderStyle:"solid", borderWidth:"1px", backgroundColor:"rgba(0, 255, 0, 0.1)"}}>
                        <div>{person.name} {person.number}</div> 
                        <div>Aditional info from Github (if available):</div>
                            {person.githuburl &&                             
                            <div>
                                <ul>
                                    <li>Github name: {person.githubname}</li>
                                    <li>Github Url: <a href={person.githuburl}>{person.githuburl}</a></li>
                                </ul>
                                <img alt="github_image" src={person.avatarurl} width="100" height="100"/>
                            </div>
                            }                           
                        
                        <button onClick={()=>OnDeleteContact(person)}>delete</button>
                    </div>
                )
             }             
             )}             
        </div>
    )
}

export default Persons