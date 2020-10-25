const roomUUID = window.location.pathname;
const roomStr = roomUUID.replace("/t/"," ");
export const loadState = () => {

    try {
    const serializedState = localStorage.getItem(roomStr)
    if (serializedState == null)
    {
        return undefined
    }
    return JSON.parse(serializedState);
}
catch (err)
{
    return undefined;
}
}
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(roomStr,serializedState);

    }
    catch (err)
{
    console.log(err);
}
}