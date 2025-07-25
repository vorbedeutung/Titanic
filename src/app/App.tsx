import React, {
    useEffect, useState,
} from 'react';
import './App.scss';
import { usePassengersStore } from './store/PassengersStore';
import { Table } from './components/Table';
import { SearchForm } from './components/SearchForm';

// Адрес источника данных, видоизменённый для обхода CORS
const SRC_URL = 'https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const setAllPassengers = usePassengersStore((state) => state.setAllPassengers);

    // Запрос и установка данных пассажиров
    useEffect(() => {
        fetch(SRC_URL)
            .then((res) => res.json())
            .then((data) => {
                setAllPassengers(data);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [setAllPassengers]);

    return (
        <div className="container">
            <h1>Titanic Passengers</h1>
            {isError && <div className="status">Couldn&apos;t load the passengers data</div>}
            {isLoading && (
                <div className="status">Loading passengers data...</div>
            )}
            {!isError && !isLoading && (
                <div className="wrapper">
                    <SearchForm />
                    <Table />
                </div>
            )}
        </div>
    );
}

export default App;
