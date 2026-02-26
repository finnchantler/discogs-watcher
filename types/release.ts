export interface Release {
    id: number
    title: string
    uri: string

    artists: {
        id: number
        name: string
        anv: string
    }[]

    num_for_sale: number
    lowest_price: number | null

    images: {
        uri: string
        uri150: string
        type: string
    }[]
}