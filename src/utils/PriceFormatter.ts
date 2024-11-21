export function PriceFormatter(price:number){
    return `$${price.toLocaleString("es")}`;
}