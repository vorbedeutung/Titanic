import React, { useCallback, useEffect, useState } from 'react';
import { Passenger } from '../../model/Passenger';
import { usePassengersStore } from '../../store/PassengersStore';
import './Table.scss';
import TableRow from './TableRow';

const chunkSize = 25;

function Table() {
    const [displayedPassengers, setDisplayedPassengers] = useState<Passenger[]>([]);
    const allPassengers = usePassengersStore((state) => state.allPassengers);
    const [displayCount, setDisplayCount] = useState(chunkSize);

    useEffect(() => {
        if (allPassengers.length > 0) {
            setDisplayedPassengers(allPassengers.slice(0, displayCount));
        }
    }, [displayCount, allPassengers]);

    const incrementDisplayCount = useCallback(() => {
        setDisplayCount((prev) => prev + chunkSize);
    }, []);

    return (
        <div className="table-wrapper">
            <table className="passengers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Survived</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedPassengers.map((passenger, i) => (
                        <TableRow
                            key={passenger.id}
                            passenger={passenger}
                            loadOnScroll={!(i % chunkSize)}
                            loadAction={incrementDisplayCount}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
