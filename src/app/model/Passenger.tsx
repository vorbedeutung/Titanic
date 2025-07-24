export type Passenger = {
    id: number,
    class: string,
    survived: boolean,
    name: string,
    gender: 'female' | 'male',
    age: number,
    sibsp: string,
    parch: string,
    ticket: string,
    fare: string,
    cabin: string,
    embarked: 'S' | 'C' | 'Q',
    boat: string | null,
    body: string | null,
    'home.dest': string
}
