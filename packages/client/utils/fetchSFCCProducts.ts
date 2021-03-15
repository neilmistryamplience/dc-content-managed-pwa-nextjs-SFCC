import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

export function fetchProductById<T = any>(id: string, context?: NextPageContext): Promise<T> {
    return fetch(`https://zzfr-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArchGlobal/dw/shop/v20_4/products/${id}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&expand=prices,images,availability,variations`)
        .then(resp => resp.json())
        .then(body => body);
}

export function fetchProductsByIds<T = any>(ids:Array<any>[], context?: NextPageContext): Promise<T> {
    if(ids){
        var str = "(";
        for( var i=0; i < ids.length; i++){
            str+=ids[i] + ","
        }
        // replace last comma with close tag
        str = str.slice(0, -1) + ")";

        return fetch(`https://zzfr-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArchGlobal/dw/shop/v20_4/products/${str}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&expand=prices,images,availability,variations`)
        .then(resp => resp.json())
        .then(body => body.data);
    } else {
        return
    }

    
}

export function fetchProductsBySearch<T = any>(query?:String, numItems?:Number, category?:String, sortby?:String, context?: NextPageContext): Promise<T> {
    var req:String = 'https://zzfr-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArchGlobal/dw/shop/v20_4/product_search?';
    if (query) req += '&q=' + query;
    if (numItems) req += '&count=' + numItems;
    if (category) req += '&refine_1=cgid=' + category;
    if (sortby) req += '&sort=' + sortby;
    req += '&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&expand=prices,images,availability,variations';

    console.log("Request = " + req)

    return fetch(req as RequestInfo)
        .then(resp => resp.json())
        .then(body => body);

}