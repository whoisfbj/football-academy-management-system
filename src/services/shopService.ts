import { demoShopProducts } from "../data/demoShop";
import type {
  CartItem,
  ShopOrder,
  ShopOrderItem,
  ShopProduct,
} from "../shared/types/shop";

const PRODUCTS_KEY = "academy_shop_products";
const CART_KEY = "academy_shop_cart";
const ORDERS_KEY = "academy_shop_orders";

function initializeShopData() {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(demoShopProducts));
  }

  if (!localStorage.getItem(CART_KEY)) {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  }
}

function parseStorage<T>(key: string): T[] {
  initializeShopData();

  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
}

function saveProducts(products: ShopProduct[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function resolveStatus(stockQuantity: number): ShopProduct["status"] {
  if (stockQuantity <= 0) {
    return "Out of Stock";
  }

  if (stockQuantity <= 10) {
    return "Low Stock";
  }

  return "In Stock";
}

export function getShopProducts(): ShopProduct[] {
  return parseStorage<ShopProduct>(PRODUCTS_KEY);
}

export function getShopProductById(id: string) {
  return getShopProducts().find((product) => product.id === id);
}

export function addShopProduct(product: ShopProduct) {
  const products = getShopProducts();
  saveProducts([
    ...products,
    {
      ...product,
      status: resolveStatus(product.stockQuantity),
    },
  ]);
}

export function updateShopProduct(product: ShopProduct) {
  const products = getShopProducts().map((current) =>
    current.id === product.id
      ? {
          ...product,
          status: resolveStatus(product.stockQuantity),
        }
      : current,
  );

  saveProducts(products);
}

export function deleteShopProduct(id: string) {
  saveProducts(getShopProducts().filter((product) => product.id !== id));
}

export function getCart(): CartItem[] {
  return parseStorage<CartItem>(CART_KEY);
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(productId: string, quantity: number, size?: string) {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) => item.productId === productId && item.size === size,
  );

  const nextCart = [...cart];

  if (existingIndex >= 0) {
    nextCart[existingIndex] = {
      ...nextCart[existingIndex],
      quantity: nextCart[existingIndex].quantity + quantity,
    };
  } else {
    nextCart.push({ productId, quantity, size });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(nextCart));
  window.dispatchEvent(new Event("academy-cart-updated"));
}

export function updateCartItem(
  productId: string,
  size: string | undefined,
  quantity: number,
) {
  const nextCart = getCart()
    .map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity }
        : item,
    )
    .filter((item) => item.quantity > 0);

  localStorage.setItem(CART_KEY, JSON.stringify(nextCart));
  window.dispatchEvent(new Event("academy-cart-updated"));
}

export function removeCartItem(productId: string, size?: string) {
  const nextCart = getCart().filter(
    (item) => !(item.productId === productId && item.size === size),
  );

  localStorage.setItem(CART_KEY, JSON.stringify(nextCart));
  window.dispatchEvent(new Event("academy-cart-updated"));
}

export function clearCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
  window.dispatchEvent(new Event("academy-cart-updated"));
}

export function getDetailedCart() {
  const products = getShopProducts();

  return getCart()
    .map((item) => {
      const product = products.find((current) => current.id === item.productId);
      return product ? { item, product } : null;
    })
    .filter(
      (entry): entry is { item: CartItem; product: ShopProduct } => entry !== null,
    );
}

export function getShopOrders(): ShopOrder[] {
  return parseStorage<ShopOrder>(ORDERS_KEY).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getShopOrderById(id: string) {
  return getShopOrders().find(
    (order) => order.id === id || order.orderNumber === id,
  );
}

export function updateShopOrderStatus(
  id: string,
  status: ShopOrder["status"],
) {
  const orders = getShopOrders().map((order) =>
    order.id === id ? { ...order, status } : order,
  );

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createShopOrder(input: {
  buyerName: string;
  email: string;
  phone: string;
  fulfilment: ShopOrder["fulfilment"];
  deliveryAddress?: string;
  paymentMethod: ShopOrder["paymentMethod"];
}): ShopOrder {
  const detailedCart = getDetailedCart();

  if (detailedCart.length === 0) {
    throw new Error("Your cart is empty.");
  }

  for (const { item, product } of detailedCart) {
    if (item.quantity > product.stockQuantity) {
      throw new Error(`${product.name} does not have enough stock available.`);
    }
  }

  const orderItems: ShopOrderItem[] = detailedCart.map(({ item, product }) => ({
    productId: product.id,
    sku: product.sku,
    name: product.name,
    price: product.price,
    quantity: item.quantity,
    size: item.size,
  }));

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = input.fulfilment === "Delivery" ? 2500 : 0;
  const currentOrders = getShopOrders();
  const sequence = currentOrders.length + 1;
  const year = new Date().getFullYear();

  const order: ShopOrder = {
    id: `shop-order-${Date.now()}`,
    orderNumber: `ORD-${year}-${String(sequence).padStart(4, "0")}`,
    buyerName: input.buyerName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    fulfilment: input.fulfilment,
    deliveryAddress: input.deliveryAddress?.trim() || undefined,
    items: orderItems,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethod: input.paymentMethod,
    paymentStatus: "Paid",
    status: "Processing",
    createdAt: new Date().toISOString(),
  };

  const updatedProducts = getShopProducts().map((product) => {
    const orderedQuantity = orderItems
      .filter((item) => item.productId === product.id)
      .reduce((total, item) => total + item.quantity, 0);

    if (orderedQuantity === 0) {
      return product;
    }

    const stockQuantity = Math.max(0, product.stockQuantity - orderedQuantity);
    return {
      ...product,
      stockQuantity,
      status: resolveStatus(stockQuantity),
    };
  });

  saveProducts(updatedProducts);
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...currentOrders, order]));
  clearCart();

  return order;
}
