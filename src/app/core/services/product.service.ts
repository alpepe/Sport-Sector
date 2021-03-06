import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './auth.service';
import { ItemModel } from '../../core/models/product.model';
const appKey = 'kid_HyfK-Babf'; // APP KEY HERE;
const appSecret = 'd8535aa4159f4ca6b753a07d1558ecbe'; // APP SECRET HERE;
const createProductUrl = `https://baas.kinvey.com/appdata/${appKey}/products/`;
const getAllProductsUrl = `https://baas.kinvey.com/appdata/${appKey}/products/?query=`;
const getProductById = `https://baas.kinvey.com/appdata/${appKey}/products/`;


@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) { }

    createProduct(productModel): Observable<any> {
        if (this.authService.isAdminRole()) {
            return this.http.post(
                createProductUrl,
                JSON.stringify(productModel),
                {
                    headers: {
                        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        }
    }

    getAllProducts(query): Observable<any> {
        return this.http.get(
            getAllProductsUrl + query,
            {
                headers: {
                    'Authorization': `Kinvey 9145f332-3edb-4f3a-972c-2ce2c2195b5e.kUB+ewGz/eGw0VsszSRKESTn7P3Ity7sE0ygHfLLgpM=`
                }
            }
        );
    }

    getById(id): Observable<any> {
        return this.http.get(
            getProductById + id,
            {
                headers: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`
                }
            }
        );
    }

    deleteProduct(id): Observable<any> {
        return this.http.delete(
            getProductById + id,
            {
                headers: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`
                }
            }
        );
    }

}
