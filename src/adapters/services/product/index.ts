import { gql } from "@apollo/client"

const FETCH_PRODUCT = gql`
  query getProducts($condition: ProductFilterInput, $skip: Int, $take: Int) {
    productsWithPagination(where: $condition, skip: $skip, take: $take) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        name
        description
        price
        discount
        ingredient
        uses
        preservation
        expiryDate
        totalRatings
        totalViews
        totalPurchases
        mass
        origin
        createdAt
        updatedAt
        category {
          name
        }
        owner {
          fullName
        }
        featuredImage
        maxQuantity
        ratingAvg
      }
    }
  }
`

const ProductService = {
  FETCH_PRODUCT,
}

export default ProductService
