import Link from "next/link";


interface ProductsProps {
    id : number,
    title : string,
    price : number,
    photo : string,
    createdAt : Date,
}

export default function ProductList({id,title,price,photo,createdAt} : ProductsProps) {


    return (
        <div className="grid-flow-row gap-5">
            <Link href={`product/${id}`}>
                <span>{title}</span>
                {/* <span><img src={`/defaultLatte.jpg`} id="1" className="size-28 rounded-md"/></span> */}
                <span><img src={photo ? photo : `/defaultLatte.jpg`} className="size-28 rounded-md"/></span>
            </Link>
        </div>
    );
}