/* eslint-disable no-undef */
import React from 'react';

const productsPerPage = 10;
export default function ProductList ()
{
    const [ state, setState ] = React.useState( {
        page: 0,
        product: [],
        hasMore: true
    } );

    React.useEffect( () =>
    {
        const fetchProduct = async () =>
        {
            const response = await fetch( `https://dummyjson.com/products?limit=${productsPerPage}&skip=${state.page * productsPerPage
                }` );
            const data = await response.json()
            console.log(data)
        };

        const observer = new IntersectionObserver( (item) =>
        {
            const trackingInfo = item[ 0 ];
            if ( trackingInfo.isIntersecting && state.hasMore )
            {
               fetchProduct()
            }
            console.log( "fired intersection observer function" );
        } )

        if (observer &&  LoaderRef.current){
            observer.observe(LoaderRef.current)
        }

        // clean up
        return () =>
        {
            if ( observer ) return observer.disconnect();
        }
    }, [state.hasMore, state.page] );
    
    const LoaderRef = React.useRef(null)
    return (
        <div>
            product list

            <div>
                <div ref={LoaderRef}>
                    product is loading...
                </div>
            </div>
        </div>
    );
}
