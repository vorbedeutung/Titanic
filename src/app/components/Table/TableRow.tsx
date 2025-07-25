import React, { useEffect, useRef } from 'react';
import { Passenger } from '../../model/Passenger';

const formatSurvived = (survived: boolean) => (survived ? 'Yes' : 'No');

const formatGender = (gender: string) => (gender === 'female' ? 'Female' : 'Male');

interface IProps {
    passenger: Passenger, // Данные пассажира
    loadOnScroll: boolean, // Флаг необходимости подгрузки новых данных при появлении строки в окне
    loadAction: ()=> void, // Функция подгрузки новых данных
}

function TableRow({ passenger, loadAction, loadOnScroll }: IProps) {
    const {
        id, name, gender, age, survived,
    } = passenger;

    const ref = useRef(null);
    const observer = useRef(null);

    useEffect(() => {
        if (!loadOnScroll) return undefined;
        /*
            Отслеживание положения строк таблицы.
            Если строка помечена на loadOnScroll, то при её появлении в окне более чем наполовину
            подгружаем новые данные.
        */

        const currentElement = ref.current;
        if (currentElement) {
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].intersectionRatio > 0) {
                        // Убираем дальнейшее отслеживание во избежание повторных срабатываний
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
        // При удалении со страницы (например, при смене фильтров) отслеживание убираем
        return () => {
            observer.current.unobserve(currentElement);
        };
    }, [loadAction, loadOnScroll]);

    return (
        <tr key={id} ref={ref}>
            <td>{name}</td>
            <td>{formatGender(gender)}</td>
            <td>{age.toPrecision(2) || '-'}</td>
            <td>{formatSurvived(survived)}</td>
        </tr>
    );
}

export default TableRow;
