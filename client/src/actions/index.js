export const increment = (list) => {
    return {
        type: 'INCREMENT',
        payload: list
    }
}
export const decrement = () =>
{
    return {
        type: 'DECREMENT'
    }
}