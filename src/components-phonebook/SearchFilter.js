const Filter =({handleSearch}) => {

    return <div>
                   
            filter shown with: <input type="text" name="search" onChange={handleSearch}/>
        </div>
}

export default Filter;