import React from 'react';
import Request from '../helpers/Request';

const NewSeason = ({seasons, incrementStateCounter}) => {


    const handleSubmitNewSeason = () => {
        const request = new Request();
        const seasonToSubmit = {
            seasonNumber: (seasons.length + 1)
            }
        request.post("https://still-scrubland-50936.herokuapp.com/api/seasons", seasonToSubmit)
        .then(() => (incrementStateCounter()));
    }

    return (
        <button onClick={handleSubmitNewSeason}>Create new season</button>
    );
}

export default NewSeason;