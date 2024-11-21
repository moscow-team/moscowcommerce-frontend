export function DateFormatter(date:Date){
    const objetcDate = new Date(date);
    const formatted = objetcDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    return formatted;
}

export function DateFormatterWithHour(date:Date){
    const objetcDate = new Date(date);
    const formatted = objetcDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    const hour = objetcDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${formatted} ${hour}`;
}