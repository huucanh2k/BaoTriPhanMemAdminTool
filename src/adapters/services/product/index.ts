import { gql } from "@apollo/client"

const FETCH_PRODUCT = gql`
  query getProducts($condition: ProductFilterInput, $skip: Int, $take: Int) {
    productsWithPagination(where: $condition, skip: $skip, take: $take) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
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

const FETCH_PRODUCT_CATEGORY = gql`
  query getProductCategories(
    $condition: ProductCategoryFilterInput
    $skip: Int
    $take: Int
  ) {
    productCategoriesWithPagination(
      where: $condition
      skip: $skip
      take: $take
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        name
      }
    }
  }
`

const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      string
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      string
    }
  }
`

const FETCH_PRODUCT_BY_ID = gql`
  query getProduct($condition: ProductFilterInput) {
    products(where: $condition) {
      id
      totalRatings
      totalViews
      totalPurchases
      price
      discount
      ingredient
      mass
      uses
      preservation
      expiryDate
      name
      origin
      ratingStat
      createdAt
      updatedAt
      description
      category {
        id
        name
      }
      owner {
        id
        fullName
      }
      featuredImage
      maxQuantity
      ratingAvg
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation deleteProduct($input: DeletProductInput!) {
    deletProduct(input: $input) {
      string
    }
  }
`

const FETCH_ORDERS = gql`
  query getOrders($condition: OrderFilterInput, $skip: Int, $take: Int) {
    ordersWithPagination(where: $condition, skip: $skip, take: $take) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
      items {
        id
      }
    }
  }
`

const ProductService = {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCT_CATEGORY,
  FETCH_PRODUCT_BY_ID,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,

  FETCH_ORDERS,
}

export default ProductService
