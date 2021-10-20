const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "Amazing Vue Socks for new developers!",
    image: "../global-assets/vmSocks-green-onWhite.jpg",
    url: "http://localhost:5500/index.html",
    inventory: 14,
    inStock: true,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 1234,
        variantColor: "#309B64",
        variantImage: "../global-assets/vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 1235,
        variantColor: "#32465B",
        variantImage: "../global-assets/vmSocks-blue-onWhite.jpg",
      },
    ],
    sizes: ["Small", "Medium", "Large"],
    cart: 1,
  },
  methods: {
    addToCart() {
      console.log("active");
      if (this.inventory > 0) {
        this.cart += 1;
        this.inventory -= 1;
      }

      this.inventory === 0 && (this.inStock = false);
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.inventory += 1;
      }

      this.inventory > 0 && (this.inStock = true);
    },
    updateProductImage(variantImage) {
      console.log(variantImage);
      this.image = variantImage;
    },
  },
});
