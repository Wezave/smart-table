/**
 * @param {string} templateId - ID элемента шаблона, существующего в документе 
 * @returns {{container: Node, elements: unknown}} - Объект, содержащий контейнер и именованные элементы

 */
export function cloneTemplate(templateId) {
    const template = document.getElementById(templateId);

    const clone = template.content.firstElementChild.cloneNode(true);

    const elements = Array.from(clone.querySelectorAll('[data-name]')).reduce((acc, el) => {
        acc[el.dataset.name] = el;
        return acc;
    }, {});

    return {
        container: clone,
        elements: elements
    };
}

/**
 * @param {FormData} formData - Объект FormData для преобразования
 * @returns {Object} - Обычный объект со значениями формы
 */
export function processFormData(formData) {
    return Array.from(formData.entries()).reduce((result, [key, value]) => {
        result[key] = value;
        return result;
    }, {});
}

/**
 * @param {Array} arr - Исходная коллекция объектов
 * @param {string} field - Должно быть уникальным!
 * @param {(Object) => any} val - Функция преобразования значений
 * @returns {Object} - Объект, индексированный по указанному полю
 */
export const makeIndex = (arr, field, val) => arr.reduce((acc, cur) => ({
    ...acc,  
    [cur[field]]: val(cur) 
}), {});

/**
 * @param {number} currentPage - Текущая активная страница
 * @param {number} maxPage - Максимальный доступный номер страницы
 * @param {number} limit - Максимальное количество отображаемых страниц
 * @returns {number[]} Массив номеров страниц
 */
export function getPages(currentPage, maxPage, limit) {
    currentPage = Math.max(1, Math.min(maxPage, currentPage)); 
    limit = Math.min(maxPage, limit);  

    let start = Math.max(1, currentPage - Math.floor(limit / 2));  
    let end = start + limit - 1;
    if (end > maxPage) {
        end = maxPage;
        start = Math.max(1, end - limit + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
}