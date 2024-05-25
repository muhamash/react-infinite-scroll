/* eslint-disable no-undef */
import React from 'react';
import { HashLoader } from 'react-spinners';
import Product from './Product';

const productsPerPage = 10;

export default function ProductList() {
    const [state, setState] = React.useState({
        page: 0,
        products: [],
        hasMore: true
    } );
    
    const LoaderRef = React.useRef( null );

    React.useEffect( () =>
    {
        const fetchProduct = async () =>
        {
            const response = await fetch( `https://dummyjson.com/products?limit=${productsPerPage}&skip=${state.page * productsPerPage}` );
            const data = await response.json();
            console.log( data );

            if ( data.products.length === 0 )
            {
                setState( ( prevState ) => ( {
                    ...prevState,
                    hasMore: false
                } ) );
            } else
            {
                setState( ( prevState ) => ( {
                    ...prevState,
                    page: prevState.page + 1,
                    products: [ ...prevState.products, ...data.products ]
                } ) );
            }
        };

        const observer = new IntersectionObserver( ( entries ) =>
        {
            const trackingInfo = entries[ 0 ];
            if ( trackingInfo.isIntersecting && state.hasMore )
            {
                fetchProduct();
            }
            console.log( "fired intersection observer function" );
        } );

        if ( observer && LoaderRef.current )
        {
            observer.observe( LoaderRef.current );
        }

        // Clean up
        return () =>
        {
            if ( observer ) observer.disconnect();
        };
    }, [ state.hasMore, state.page ] );

    return (
        <div>
            <div className="font-bold text-3xl text-violet-600">
                Product List
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-10">
                { state.products.map( ( product ) => (
                    <Product
                        title={ product.title }
                        price={ product.price }
                        thumbnail={ product.thumbnail }
                        key={ product.id }
                    />
                ) ) }
            </div>
            <div className="w-[300px] mx-auto">
                { state.hasMore && <div ref={ LoaderRef }>
                    <HashLoader
                        color="#20b42b"
                        size={ 100 }
                    />
                </div> }
            </div>
        </div>
    );
}