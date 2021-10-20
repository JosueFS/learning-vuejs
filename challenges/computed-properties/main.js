const app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    description: "Amazing Vue Socks for new developers!",
    selectedVariant: 0,
    url: "http://localhost:5500/index.html",
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 1234,
        variantColor: "#309B64",
        variantImage: "../global-assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 11,
      },
      {
        variantId: 1235,
        variantColor: "#32465B",
        variantImage: "../global-assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
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
    // removeFromCart() {
    //   if (this.cart > 0) {
    //     this.cart -= 1;
    //     this.inventory += 1;
    //   }

    //   this.inventory > 0 && (this.inStock = true);
    // },
    updateProductImage(index) {
      console.log(this.variants[index].variantQuantity);
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.onSale) {
        return `${this.title} are on sale`;
      } else {
        return `${this.title} are not on sale`;
      }
    },
  },
});
