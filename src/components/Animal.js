import React from 'react'

function Animal() {
    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <form>
                        <div className='input-group'>
                            <input type='text' className='form-control search-input custom-input' placeholder='Search'/>
                            <button type='button' className='btn btn-primary search-button custom-button'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Animal
