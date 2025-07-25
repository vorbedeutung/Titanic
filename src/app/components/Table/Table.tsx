import React, { useCallback, useEffect, useState } from 'react';
import { Passenger } from '../../model/Passenger';
import { usePassengersStore } from '../../store/PassengersStore';
import './Table.scss';
import TableRow from './TableRow';

// Количество строк в одном фрагменте таблицы
const chunkSize = 25;

function Table() {
    // Отображаемые пользователи
    const [displayedPassengers, setDisplayedPassengers] = useState<Passenger[]>([]);
    // Все пользователи, подходящие под критерии поиска
    const filteredPassengers = usePassengersStore((state) => state.filteredPassengers);
    // Количество отображаемых фрагментов таблицы
    const [displayCount, setDisplayCount] = useState(chunkSize);

    // Сброс счётчика фрагментов при фильтрации
    useEffect(() => {
        setDisplayCount(chunkSize);
    }, [filteredPassengers]);

    // Установка списка отображаемых пассажиров
    useEffect(() => {
        setDisplayedPassengers(filteredPassengers.slice(0, displayCount));
    }, [displayCount, filteredPassengers]);

    // Увеличение счётчика отображаемых фрагментов при скролле в конец страницы
    const incrementDisplayCount = useCallback(() => {
        setDisplayCount((prev) => prev + chunkSize);
    }, []);

    return (
        <>
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
                            loadOnScroll={i === displayedPassengers.length - 1}
                            loadAction={incrementDisplayCount}
                        />
                    ))}
                </tbody>
            </table>
            {filteredPassengers.length === 0 && (
                <div className="no-results">No passengers found matching your criteria</div>
            )}
        </>
    );
}

export default Table;
