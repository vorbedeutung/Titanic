import React, { useState } from 'react';
import './SearchForm.scss';
import { usePassengersStore } from '../../store/PassengersStore';

function SearchForm() {
    // Локальное состояние фильтров
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [minAge, setMinAge] = useState<number | ''>('');
    const [maxAge, setMaxAge] = useState<number | ''>('');
    const [survivedOnly, setSurvivedOnly] = useState<boolean>(false);

    const filterPassengers = usePassengersStore((state) => state.filterPassengers);

    // Установка фильтров из локального в глобальное состояние
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        filterPassengers({
            name,
            gender: gender || undefined,
            minAge: minAge === '' ? undefined : Number(minAge),
            maxAge: maxAge === '' ? undefined : Number(maxAge),
            survivedOnly,
        });
    };
    // Сброс фильтров
    const handleReset = () => {
        setName('');
        setGender('');
        setMinAge('');
        setMaxAge('');
        setSurvivedOnly(false);
        filterPassengers({});
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="searchName" className="groupLabel">
                    Name:
                    <input
                        type="text"
                        id="searchName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Search by name..."
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="anyGenderButton" className="groupLabel">
                    Gender:
                    <div className="radio-group">
                        <label htmlFor="anyGenderButton">
                            <input
                                id="anyGenderButton"
                                type="radio"
                                name="gender"
                                checked={gender === ''}
                                onChange={() => setGender('')}
                            />
                            Any
                        </label>
                        <label htmlFor="maleGenderButton">
                            <input
                                id="maleGenderButton"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                        <label htmlFor="femaleGenderButton">
                            <input
                                id="femaleGenderButton"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                    </div>
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="minAgeInput" className="groupLabel">
                    Age Range:
                    <div className="age-range">
                        <input
                            id="minAgeInput"
                            type="number"
                            placeholder="Min"
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value === '' ? '' : Number(e.target.value))}
                            min="0"
                            max="100"
                        />
                        <span>to</span>
                        <input
                            id="maxAgeInput"
                            type="number"
                            placeholder="Max"
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value === '' ? '' : Number(e.target.value))}
                            min="0"
                            max="100"
                        />
                    </div>
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="survivedCheckbox" className="checkboxLabel">
                    <input
                        id="survivedCheckbox"
                        type="checkbox"
                        checked={survivedOnly}
                        onChange={(e) => setSurvivedOnly(e.target.checked)}
                    />
                    Survived Only
                </label>
            </div>

            <div className="form-actions">
                <button type="submit">Search</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </div>
        </form>
    );
}

export default SearchForm;
