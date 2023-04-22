export interface Window {
    // pick one
    ethereum: EthereumProvider
    // ethereum: ExternalProvider
    // ethereum: AbstractProvider
}

export interface PostListType {
    data: [{
        id: string
        name: string
    }]
}