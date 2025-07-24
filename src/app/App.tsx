import React, {
    useEffect, useRef, useState,
} from 'react';
import './App.scss';
import { usePassengersStore } from './store/PassengersStore';
import Table from './components/Table/Table';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);

    const setAllPassengers = usePassengersStore((state) => state.setAllPassengers);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json')
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                setAllPassengers(data);
            });
    }, [setAllPassengers]);

    return (
        <div className="container" ref={containerRef}>
            <h1>Titanic Passengers</h1>
            {isLoading ? (
                <div className="loading">Loading passenger data...</div>
            ) : (
                <Table />
            )}
        </div>
    );
}

export default App;
