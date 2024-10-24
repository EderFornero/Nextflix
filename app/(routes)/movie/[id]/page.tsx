import React from 'react'

function MovieId({ params }: { params: { id: string } }) {
    console.log(params.id)
    return (
        <div>id page</div>
    )
}

export default MovieId