const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "Amazing Vue Socks for new developers!",
    image: "../global-assets/vmSocks-green-onWhite.jpg",
    url: "http://localhost:5500/index.html",
    inStock: 0,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 1234,
        variantColor: "green",
        variantImage: "../global-assets/vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 1235,
        variantColor: "blue",
        variantImage: "../global-assets/vmSocks-blue-onWhite.jpg",
      },
    ],
    sizes: ["Small", "Medium", "Large"],
    cart: 1,
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      this.cart > 0 && (this.cart -= 1);
    },
    updateProductImage(variantImage) {
      console.log(variantImage);
      this.image = variantImage;
    },
  },
});
