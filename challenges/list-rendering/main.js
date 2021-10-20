const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "Amazing Vue Socks for new developers!",
    image: "../../global-assets/vmSocks-green-onWhite.jpg",
    url: "http://localhost:5500/index.html",
    inStock: 0,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 1234,
        variantColor: "green",
      },
      {
        variantId: 1235,
        variantColor: "blue",
      },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
});
