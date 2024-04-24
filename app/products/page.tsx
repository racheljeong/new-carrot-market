import ProductList from "@/components/ProductList";
import db from "@/lib/db";

async function getProducts() {
    const productList = await db.product.findMany ({
        select : {
            id :true,      
            title : true,      
            price : true,    
            photo : true, 
            createdAt : true, 
        }
    });
    //console.log(productList);
    return productList;
}

export default async function Product() {
    const productList = await getProducts();
    //console.log(productList);

    return(
        <div>
            {productList.map((product) => (
                <ProductList key={product.id} {...product}/>
            ))}
        </div>
    );
}