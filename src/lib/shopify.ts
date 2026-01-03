import { toast } from 'sonner';

// Shopify Configuration - Storefront API tokens are designed for client-side use
// See: https://shopify.dev/docs/api/storefront#authentication
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'artlux8-ypxf4.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
// Storefront Access Token is a publishable key meant for client-side use (read-only product data)
const SHOPIFY_STOREFRONT_TOKEN = '33e073344fd0491eb2329ec9d56269b8';

// Types
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    vendor?: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

// Use checkoutCreate mutation - returns proper /checkouts/ URLs (not /cart/c/)
const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
      }
      checkoutUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Storefront API helper
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  if (!SHOPIFY_STOREFRONT_TOKEN) {
    console.error('Shopify Storefront Token not configured');
    toast.error("Shopify not configured", {
      description: "Please configure VITE_SHOPIFY_STOREFRONT_TOKEN environment variable.",
    });
    return null;
  }

  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch all products
export async function fetchProducts(limit: number = 50, query?: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit, query });
    if (!data) return [];
    return data.data.products.edges || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    if (!data) return null;
    return data.data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Create checkout using checkoutCreate mutation - returns proper /checkouts/ URLs
export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  console.log('=== CHECKOUT DEBUG START ===');
  console.log('Items received:', JSON.stringify(items, null, 2));
  
  // Validate items before proceeding
  if (!items || items.length === 0) {
    throw new Error('No items to checkout');
  }

  // Validate each item has required fields
  for (const item of items) {
    if (!item.variantId) {
      throw new Error('Invalid cart item: missing variant ID');
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error('Invalid cart item: invalid quantity');
    }
  }

  try {
    // Format line items for checkoutCreate mutation
    const lineItems = items.map(item => ({
      quantity: item.quantity,
      variantId: item.variantId,
    }));

    console.log('Creating checkout with lineItems:', JSON.stringify(lineItems, null, 2));
    console.log('Using mutation: CHECKOUT_CREATE_MUTATION');

    const data = await storefrontApiRequest(CHECKOUT_CREATE_MUTATION, {
      input: { lineItems },
    });

    console.log('Shopify API raw response:', JSON.stringify(data, null, 2));

    if (!data) {
      throw new Error('Failed to create checkout - no response from Shopify');
    }

    if (data.data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
      const errorMessages = data.data.checkoutCreate.checkoutUserErrors.map((e: { message: string }) => e.message).join(', ');
      console.error('Shopify checkout creation errors:', errorMessages);
      throw new Error(`Checkout creation failed: ${errorMessages}`);
    }

    const checkout = data.data?.checkoutCreate?.checkout;
    console.log('Checkout object:', checkout);
    
    if (!checkout || !checkout.webUrl) {
      console.error('No checkout URL in response:', data);
      throw new Error('No checkout URL returned from Shopify');
    }

    console.log('Raw webUrl from Shopify:', checkout.webUrl);
    
    // CRITICAL: Ensure we're using the myshopify.com domain for headless checkout
    let checkoutUrl = checkout.webUrl;
    
    // Replace any custom domain with the myshopify.com domain
    if (checkoutUrl.includes('artlux8.com')) {
      checkoutUrl = checkoutUrl.replace('https://artlux8.com', `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`);
      console.log('Replaced artlux8.com with myshopify domain');
    }
    
    console.log('Final checkout URL:', checkoutUrl);
    console.log('URL contains /checkouts/:', checkoutUrl.includes('/checkouts/'));
    console.log('URL contains /cart/:', checkoutUrl.includes('/cart/'));
    console.log('=== CHECKOUT DEBUG END ===');
    
    // SAFETY CHECK: Ensure URL is a proper checkout URL
    if (checkoutUrl.includes('/cart/')) {
      console.error('WARNING: Checkout URL contains /cart/ path - this is incorrect!');
      console.error('Expected URL pattern: https://artlux8-ypxf4.myshopify.com/checkouts/...');
    }
    
    return checkoutUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

// Helper to redirect to checkout URL - instant redirect, no popups
export function redirectToCheckout(url: string): void {
  if (!url) {
    console.error('No checkout URL provided');
    return;
  }
  
  console.log('Redirecting to checkout:', url);
  // Use location.assign for instant redirect to myshopify.com checkout
  window.location.assign(url);
}
