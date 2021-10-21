Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="description" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <!-- <p
          v-if="variants[selectedVariant].variantQuantity <= 10 && variants[selectedVariant].variantQuantity > 0"
        >
          Almost Sold Out
        </p> -->
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <span>{{ sale }}</span>
        <p>Shipping: {{ shipping }}</p>

        <product-details :details="details"></product-details>

        <ul>
          <li v-for="size in sizes">{{size}}</li>
        </ul>

        <div class="color-variant-container">
          <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor}"
            @mouseover="updateProductImage(index)"
          ></div>
        </div>

        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Add to cart
        </button>

        <button class="alternative" v-on:click="removeFromCart">
          Remove (-1)
        </button>

        
      </div>

      <a :href="url">Details</a>
    </div>
  `,
  data() {
    return {
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
          variantQuantity: 2,
        },
      ],
      sizes: ["Small", "Medium", "Large"],
    };
  },
  methods: {
    addToCart() {
      if (this.variants[this.selectedVariant].variantQuantity > 0) {
        this.$emit(
          "add-to-cart",
          this.variants[this.selectedVariant].variantId,
          "add"
        );
        this.variants[this.selectedVariant].variantQuantity -= 1;
      }

      this.variants[this.selectedVariant].variantQuantity === 0 &&
        (this.inStock = false);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId,
        "remove"
      );
      this.variants[this.selectedVariant].variantQuantity += 1;

      this.variants[this.selectedVariant].variantQuantity > 0 &&
        (this.inStock = true);
    },
    updateProductImage(index) {
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
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    },
  },
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
});

const app = new Vue({
  el: "#app",
  data: {
    cart: [],
    premium: true,
  },
  methods: {
    updateCart(id, action) {
      switch (action) {
        case "add":
          this.cart.push(id);
          break;
        case "remove":
          const index = this.cart.indexOf(id);
          if (index > -1) {
            this.cart.splice(index, 1);
          }
          break;
        default:
          break;
      }
    },
  },
});
