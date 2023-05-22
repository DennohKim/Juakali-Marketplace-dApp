const products = [
  {
    id: 1,
    name: "SINGLE COMMERCIAL ELECTRIC DEEP FRYER (17L CAPACITY)",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2021/02/Single-Electric-Deep-Fryer.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "40 cUSD",
  },
  {
    id: 2,
    name: "STAINLESS STEEL KITCHEN WORK TABLE FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/WhatsApp-Image-2018-04-29-at-22.21.55.jpeg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "12 cUSD",
  },
  {
    id: 3,
    name: "GAS COOKER/COOKING RANGE FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/4-burner-cooking-range-sale-kenya.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "10 cUSD",
  },
  {
    id: 4,
    name: "ELECTRIC DOUGH MIXER FOR SALE IN KENYA",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/08/dough-mixer-sale-kenya.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "1 cUSD",
  },
  {
    id: 5,
    name: "CHARCOAL OVEN FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/edit-6.png",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "9 cUSD",
  },
  {
    id: 6,
    name: "SERVING TROLLEYS/FOOD TROLLEYS FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/WhatsApp-Image-2018-04-29-at-22.21.56-1.jpeg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "2 cUSD",
  },
  {
    id: 7,
    name: "ELECTRIC FOOD WARMER DISPLAY FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/06/Electric-food-display.png",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "3 cUSD",
  },
  // More products...
];

export default function Home() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-2 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-2">
        <h2 className="text-xl font-bold text-gray-900">
          Juakali Products
        </h2>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-60"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-button py-2 px-8 text-sm font-medium text-white hover:bg-foreground/70"
                >
                  Add to cart<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
