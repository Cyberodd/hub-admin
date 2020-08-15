import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchAnimals} from "../api"
import {CircularProgress} from "material-ui-core"
import AnimalDialog from "./AnimalDialog"

function Animal({fetchAnimals, animalData: {animals, loading, errors}}) {

    useEffect(() => {
        fetchAnimals()
    }, [fetchAnimals])

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div className='text-center'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input type='text' className='form-control search-input custom-input' placeholder='Search'/>
                            <button type='button' className='btn btn-primary search-button custom-button'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {loading && <CircularProgress size={50} style={{marginTop: 10}} color='primary'/>}
            {animals.length > 0 ? (
                <table className='table bg-light text-center mt-2'>
                    <thead>
                    <tr className='text-muted'>
                        <th>#</th>
                        <th>Animal ID</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {animals.map((animal, index) => (
                        <tbody key={animal["animalId"]}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{animal["animalId"]}</td>
                            <td>{animal["animalName"]}</td>
                            <td>{animal["animalBreed"]}</td>
                            <td>{animal.category}</td>
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
            ) : (
                <p style={{color: 'red'}}>No Animals found</p>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    animalData: state.animalData
})

const mapActionsToProps = dispatch => ({
    fetchAnimals: () => dispatch(fetchAnimals())
})

export default connect(mapStateToProps, mapActionsToProps)(Animal)
