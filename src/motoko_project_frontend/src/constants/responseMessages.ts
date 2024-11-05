// constants.ts

export const Messages = {
    PRODUCT_ADDED: (productId: number) => `Ürün başarıyla eklendi, ID: ${productId}`,
    ERROR_ADDING_PRODUCT: (errorMessage: string) => `Ürün eklenirken hata oluştu: ${errorMessage}`,
    UNKNOWN_ERROR_ADDING_PRODUCT: (error: unknown) => `Ürün eklenirken bilinmeyen bir hata oluştu: ${String(error)}`,
    ERROR_FETCHING_PRODUCTS: (errorMessage: string) => `Ürünleri alırken hata oluştu: ${errorMessage}`,
    UNKNOWN_ERROR_FETCHING_PRODUCTS: (error: unknown) => `Ürünleri alırken bilinmeyen bir hata oluştu: ${String(error)}`,
    ERROR_FETCHING_PRODUCT: (errorMessage: string) => `Ürün alınırken hata oluştu: ${errorMessage}`,
    UNKNOWN_ERROR_FETCHING_PRODUCT: (error: unknown) => `Ürün alınırken bilinmeyen bir hata oluştu: ${String(error)}`,
    ERROR_UPDATING_STOCK: (errorMessage: string) => `Stok durumu güncellenirken hata oluştu: ${errorMessage}`,
    UNKNOWN_ERROR_UPDATING_STOCK: (error: unknown) => `Stok durumu güncellenirken bilinmeyen bir hata oluştu: ${String(error)}`,
};