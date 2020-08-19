import React, {useState} from 'react'
import {connect} from 'react-redux'
import {CircularProgress} from "material-ui-core"
import AnimalDialog from "./AnimalDialog"
import {searchAnimal} from "../api"

function Animal({searchAnimal, searchData, animalData: {animals, loading, error}}) {

    const [name, setName] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if (name !== '') {
            setIsSearch(true)
            searchAnimal(name.toLowerCase())
            setName('')
        } else {
            setIsSearch(false)
        }
    }

    const handleChange = e => {
        setName(e.target.value)
        if (name === '') {
            setIsSearch(false)
        }
    }

    const progressLoader = (<CircularProgress size={50} style={{marginTop: 10}} color='primary'/>)

    const renderError = (<p style={{color: 'red'}} className='p-4'>Failed to load Animals. Refresh to retry</p>)

    const renderData = animals => (
        <table className='table bg-light text-center mt-2'>
            <thead>
            <tr className='text-muted'>
                <th>#</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
            </thead>
            {animals.map((animal, index) => (
                <tbody key={animal["animalId"]}>
                <tr>
                    <td>{index + 1}</td>
                    <td style={{textTransform: 'capitalize'}}>{animal["animalName"]}</td>
                    <td>{animal["animalBreed"]}</td>
                    <td>{animal["category"]}</td>
                    <td>{animal["gender"]}</td>
                    <td>
                        <img src={animal["imageUrl"]} alt={animal["animalName"]} height='50'
                             style={{borderRadius: 50}}/>
                    </td>
                    <td>
                        <AnimalDialog animal={animal}/>
                    </td>
                </tr>
                </tbody>
            ))}
        </table>
    )

    return (
        <div className='text-center'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input type='text' className='form-control search-input custom-input'
                                   placeholder='Search animals' onChange={handleChange}/>
                            <button type='submit' className='btn btn-primary search-button custom-button'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {!isSearch ? loading ? progressLoader : (
                error !== '' ? (
                    renderError
                ) : (
                    animals.length > 0 ? (
                        renderData(animals)
                    ) : (
                        <p style={{color: 'red', margin: 20}}>No Animals found</p>
                    )
                )
            ) : (
                searchData.loading ? progressLoader : (
                    error !== '' ? (
                        renderError
                    ) : (
                        searchData.animals.length > 0 ? (
                            renderData(searchData.animals)
                        ) : (
                            <p style={{color: 'red', margin: 20}}>No animal name matched your query</p>
                        )
                    )
                )
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    animalData: state.animalData,
    searchData: state.searchData
})

const mapActionsToProps = dispatch => ({
    "searchAnimal": (name) => dispatch(searchAnimal(name))
})

export default connect(mapStateToProps, mapActionsToProps)(Animal)
