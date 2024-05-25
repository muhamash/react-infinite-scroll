import React from 'react';

export default function ProductList ()
{
    const [ state, setState ] = React.useState( {
        page: 0,
        product: [],
        hasMore: true
    } );

    React.useEffect( () =>
    {
        const fetchProduct = () =>
        {
            
        }

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
    }, [] );
    
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
