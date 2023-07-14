export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  discount: number
  ingredient: string
  uses: string
  preservation: string
  expiryDate: string
  totalRatings: number
  totalViews: number
  totalPurchases: number
  mass: string
  origin: string
  createdAt: string
  updatedAt: string
  category: null
  owner: {
    fullName: string
  }
  featuredImage: string
  maxQuantity: number
  ratingAvg: number
}

export const StatusConfig = {
  Enum: {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    DONE: "DONE",
  },
  Color: {
    PENDING: "orange",
    PROCESSING: "blue",
    DONE: "green",
  },
  Label: {
    PENDING: "Đang chờ",
    PROCESSING: "Đang xử lý",
    DONE: "Đã hoàn thành",
  },
}

export interface IProductOrder {
  id: string
  owner: {
    fullName: string
    phoneNumber: string
  }
  fullName: string
  email: string
  phoneNumber: string
  shippingAddress: string
  status: string
  createdAt: string
  updatedAt: string
  reasonsForRejection: string
  paymentMethod: string
  pushNotification: boolean
  products: any
}
