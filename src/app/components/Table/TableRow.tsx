import React, { useEffect, useRef } from 'react';
import { Passenger } from '../../model/Passenger';

const formatSurvived = (survived: boolean) => (survived ? 'Yes' : 'No');

const formatGender = (gender: string) => (gender === 'female' ? 'Female' : 'Male');

interface IProps {
    passenger: Passenger,
    loadOnScroll: boolean,
    loadAction: ()=> void,
}

function TableRow({ passenger, loadAction, loadOnScroll } : IProps) {
    const {
        id, name, gender, age, survived,
    } = passenger;

    const ref = useRef(null);
    const observer = useRef(null);

    useEffect(() => {
        if (!loadOnScroll) return undefined;

        const currentElement = ref.current;
        if (currentElement) {
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].intersectionRatio > 0) {
                        observer.current.unobserve(currentElement);
                        loadAction();
                    }
                },
                {
                    threshold: 0.5,
                },
            );

            observer.current.observe(currentElement);
        }

        return () => {
            observer.current.unobserve(currentElement);
        };
    }, [loadAction, loadOnScroll]);

    return (
        <tr key={id} ref={ref}>
            <td>{name}</td>
            <td>{formatGender(gender)}</td>
            <td>{age || '-'}</td>
            <td>{formatSurvived(survived)}</td>
        </tr>
    );
}

export default TableRow;
