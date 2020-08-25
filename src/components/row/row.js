import React from 'react';
import './row.css'

const Row = ({leftItem, rightItem}) => {
    return(
        <div className="row mb2">
            <div className="col-md-6">
                {leftItem}
            </div>

            <div className="col-md-6">
                {rightItem}
            </div>

        </div>
    )
}

export default Row;