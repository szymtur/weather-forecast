import React from 'react';

class CurrentDate extends React.Component {
    render(){
        let date = new Date();
        let day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : `${date.getDate()}`;
        let month = date.getMonth().toString().length == 1 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
        let year = date.getFullYear();

        return(
            <div className={"current-date"}>
                <h4>{day}-{month}-{year}</h4>
            </div>
        )
    }
}

export default CurrentDate;
