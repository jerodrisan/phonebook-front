
const PersonForm = (props) =>{

    const {OnSubmitForm,onHandleStateChangeName,newName,onHandleStateChangeNumber,newNumber} = props    

    return (
        <div>       
            <form onSubmit={OnSubmitForm}>
            <div>
                name: <input name="name" type="text" onChange={onHandleStateChangeName} value={newName}/>  
            </div>
            <div>
                number: <input name="number" type="number"  onChange= {onHandleStateChangeNumber} value={newNumber}/>  
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>     
        </div>
    )

}
export default PersonForm;