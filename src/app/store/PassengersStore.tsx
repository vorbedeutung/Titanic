// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
import { Passenger } from '../model/Passenger';

interface PassengersFilter{
    name?: string;
    gender?: string;
    minAge?: number;
    maxAge?: number;
    survivedOnly?: boolean;
}

interface PassengersState {
  allPassengers: Passenger[],
  filteredPassengers: Passenger[],
  setAllPassengers: (newPassenegers: Passenger[]) => void,
  filterPassengers: (filters: PassengersFilter) => void;
}

export const usePassengersStore = create<PassengersState>()((set) => ({
    // Данные всех пассажиров
    allPassengers: [],
    // Пассажиры, подходящие под критерии поиска
    filteredPassengers: [],
    // Обновить данные всех пассажиров
    setAllPassengers: (newArr) => set({ allPassengers: newArr, filteredPassengers: newArr }),
    // Отфильтровать пассажиров
    filterPassengers: (filters) => set((state) => ({
        filteredPassengers: state.allPassengers.filter((passenger) => {
            if (filters.name && !passenger.name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false;
            }
            if (filters.gender && passenger.gender !== filters.gender) {
                return false;
            }
            if (filters.minAge !== undefined && (passenger.age === null || passenger.age < filters.minAge)) {
                return false;
            }
            if (filters.maxAge !== undefined && (passenger.age === null || passenger.age > filters.maxAge)) {
                return false;
            }
            if (filters.survivedOnly && !passenger.survived) {
                return false;
            }
            return true;
        }),
    })),
}));
