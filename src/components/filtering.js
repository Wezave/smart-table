import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => { 
                    const option = document.createElement('option'); 
                    option.value = name; 
                    option.textContent = name; 
                    return option;
                })
        );
    });
    
    return (data, state, action) => {
        if (action && action.type === 'clear') {
            const button = action.target;
            if (button.name === 'clear') {
                const parent = button.closest('.filter-field') || button.parentElement;
                const input = parent.querySelector('input');
                
                if (input) {
                    input.value = '';
                    const field = button.dataset.field;
                    if (state && field in state) {
                        state[field] = '';
                    }
                }
            }
        }
        
        return data.filter(row => compare(row, state));
    };
}