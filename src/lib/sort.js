/**
 *
 * @param {string} field - Имя поля, по которому производится сортировка
 * @returns {Function} - Функция сравнения для метода sort
 */
const sortUp = field => (a, b) => {
    if (a[field] > b[field]) {
        return 1;  
    }
    if (a[field] < b[field]) {
        return -1; 
    }
    return 0;
}

/**
 * @param {string} field - Имя поля, по которому производится сортировка
 * @returns {Function} - Функция сравнения для метода sort
 */
const sortDown = field => (a, b) => {
    if (a[field] < b[field]) {
        return 1; 
    }
    if (a[field] > b[field]) {
        return -1;
    }
    return 0;
}


const sortFn = {
    up: sortUp,    
    down: sortDown
};

export const sortMap = {
    'none': 'up',   
    'up': 'down',    
    'down': 'none' 
}

/**
 * @param {Array} arr - Исходный массив объектов для сортировки
 * @param {string | null} field - Поле объекта, по которому производится сортировка
 * @param {string | null} order - Направление сортировки: 'none', 'up' или 'down'
 * @returns {Array} - Отсортированный массив или исходный массив, если сортировка не требуется
 */
export function sortCollection(arr, field, order) {
    if (field && order !== 'none' && sortMap[order])
        return arr.toSorted(sortFn[order](field));
    else
        return arr;  
}