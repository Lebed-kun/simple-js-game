export const cleanArray = arr => {
    return arr.filter(el => el !== undefined);
}

export const generateArray = (func, count, initialValue = 0) => {
    let result = [];
    
    for (let n = 0, arg = initialValue; n < count; n++, arg++) {
        result.push(func(arg, n));
    }

    return result;
}