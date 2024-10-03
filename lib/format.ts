export const formatPrice = (price: number) => {
 return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "RWF"
 }).format(price)
}
