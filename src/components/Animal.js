import React from 'react'
import {connect} from 'react-redux'
import {CircularProgress} from "material-ui-core"
import AnimalDialog from "./AnimalDialog"

function Animal({animalData: {animals, loading, error}}) {

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div className='text-center'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input type='text' className='form-control search-input custom-input'
                                   placeholder='Search animals'/>
                            <button type='button' className='btn btn-primary search-button custom-button'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {loading ? <CircularProgress size={50} style={{marginTop: 10}} color='primary'/> : (
                error !== '' ? (
                    <p style={{color: 'red'}} className='p-4'>
                        Failed to load Animals. Refresh to retry
                    </p>
                ) : (
                    animals.length > 0 ? (
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
                                    <td>{animal["animalName"]}</td>
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
                    ) : (
                        <p style={{color: 'red'}}>No Animals found</p>
                    )
                )
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    animalData: state.animalData
})

export default connect(mapStateToProps)(Animal)
