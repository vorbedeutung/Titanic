// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
import { Passenger } from '../model/Passenger';

interface PassengersState {
  allPassengers: Passenger[],
  setAllPassengers: (newPassenegers: Passenger[]) => void
}
// TODO: Сделать алиасы
// Поменять названия полей хранилища
// Добавить типизацию для компонентов
export const usePassengersStore = create<PassengersState>()((set) => ({
    allPassengers: [],
    setAllPassengers: (newArr) => set({ allPassengers: newArr }),
}));
