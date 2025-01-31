import Title from "@/components/Title";
import { products } from "./data";

const Store = () => {
  return (
    <section>
      <Title>দোকান</Title>
      <div className="flex gap-5 max-w-7xl mx-auto justify-center flex-wrap">
        {products?.map((product) => (
          <div key={product.id} className="card bg-base-200 w-96 shadow-xl">
            <figure>
              <img
                src={product?.image_url}
                alt={product?.name}
                className="w-full h-72 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product?.name}
                <span className="badge badge-primary">{product?.price}</span>
              </h2>
              <div className="badge badge-secondary">
                {product?.availability}
              </div>
              <p>{product?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Store;
