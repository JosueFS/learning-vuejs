Vue.component("product-reviews", {
  template: `
    <form class="review-form" @submit.prevent="handleSubmit">
    <p>
      <strong>Please correct the following error(s):</strong>
      <ul>
      <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="Type your name" />
      </p>

      <p>
        <label for="name">Review:</label>
        <textarea id="name" v-model="review"></textarea>
      </p>

      <p>
        <label for="name">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      
      <p>
        <p>Would you recommend this product?</p>
        
        <div class="container">
          
            <input type="radio" id="positiveRecommendation" name="recommendation" v-model="recommendation" value="true">
            <label for="positiveRecommendation">Yes</label>
          
          
          
            <input type="radio" id="negativeRecommendation" name="recommendation" v-model="recommendation" value="false">
            <label for="negativeRecommendation">No</label>
          
        </div>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: [],
    };
  },
  methods: {
    handleSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommendation) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation,
        };

        this.$emit("review-submitted", productReview);

        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommendation)
          this.errors.push("Recommendation question is required.");
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

        <div class="container">
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

      <div>
        <h2>Reviews</h2>
        <p v-show="!reviews.length">There are no reviews yet.</p>

        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p>Recommended: {{ review.recommendation }}</p>
          </li>
        </ul>
      </div>

      <product-reviews @review-submitted="addReview"></product-reviews>
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
      reviews: [],
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
    addReview(productReview) {
      this.reviews.push(productReview);
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
