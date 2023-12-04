
  export default function EcomSDK() {

    this._baseurl = "https://redeyeddev.mkdlabs.com";
    this._project_id = "redeyeddev";
    this._secret = "5azui1myiukgil3romwhuah421dqrji";
    this._table = "";
  
    const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
      "Content-Type": "application/json",
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.generateUniqueNumber = function () { //length 11
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % 1000000000;
  }

  this.routes = {
    store : "/products"
  }

  this.fetch = async function (resource, options = {}) {
    // fire event
    return new Request(resource, options)
  }

  

  this.getProducts = async function (payload) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getFilteredProducts = async function (payload = {}) {
    let url = `type=product`
    payload.hasOwnProperty('price') ? url = `${url}&price=${payload.price}` : null;
    payload.hasOwnProperty('category') ? url = `${url}&category_id=${payload.category}` : null;
    payload.hasOwnProperty('is_featured') ? url = `${url}&is_featured=${payload.is_featured}` : null;
    payload.hasOwnProperty('name') ? url = `${url}&name=${payload.name}` : null;
    payload.hasOwnProperty('page') ? url = `${url}&page=${payload.page}` : null;
    payload.hasOwnProperty('limit') ? url = `${url}&limit=${payload.limit}` : `${url}&limit=${16}`;
    payload.hasOwnProperty('direction') ? url = `${url}&direction=${payload.direction}` : `${url}&direction=ASC`;
    payload.hasOwnProperty('order') ? url = `${url}&orderBy=${payload.order}` : `${url}&orderBy=id`;

    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/filters/?" + url, {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getFilteredProductsByCategory = async function (category_id) {
    const result = await fetch(this._baseurl + `/v2/api/lambda/ecom/filters/?type=category&id=${category_id}`, {
      method: "get",
      headers: this.getHeader(),
      // body: JSON.stringify(payload),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getSingleProduct = async function (id) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product/" + id, {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getCountries = async function () {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/country", {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getStates = async function (country = 0) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/state/" + country, {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getCities = async function (state = 0) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/city/" + state, {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getTax = async function (country = 0) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/tax/", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify({countryId: country})
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getCategories = async function () {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/category", {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getReviews = async function (payload) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product/review", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  } 
  this.getUserReviews = async function (userId) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product/user-review/"+ userId  , {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  } 

  this.addReview = async function (payload) {
    // review, user_id, status, product_id
    payload.user_id = localStorage.getItem("user");
    payload.status = 1;
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product/review/add", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getCart = async function () {
    let params = localStorage.hasOwnProperty('user') ? `user_id=${localStorage.getItem('user')}` 
                  : `session_id=${localStorage.getItem('cart-session')}` ;
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/cart?" + params, {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }

  this.addCartItem = async function (productId, quantity) {
    let payload = {
      status: 0
    };
    if (localStorage.hasOwnProperty('user')) {
      payload.user_id = localStorage.getItem('user');
      // payload.session_id = false
    } else {
      // payload.user_id = false;
      if (localStorage.hasOwnProperty('cart-session')) {
        payload.session_id = Number(localStorage.getItem('cart-session'));
      } else {
        let session_id = this.generateUniqueNumber();
        localStorage.setItem('cart-session', session_id);
        payload.session_id = Number(session_id);
      }
    }

    // payload.data = [
    //   {productId: productId, quantity: quantity}
    // ] 
    payload.productId = productId;
    payload.quantity = Number(quantity);
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/cart/item", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.updateCart = async function (data) {
    let payload = {
      status: 0
    };
    if (localStorage.hasOwnProperty('user')) {
      payload.user_id = localStorage.getItem('user');
      payload.session_id = false
    } else {
      payload.user_id = false;
      if (localStorage.hasOwnProperty('cart-session')) {
        payload.session_id = localStorage.getItem('cart-session');
      } else {
        let session_id = this.generateUniqueNumber();
        localStorage.setItem('cart-session', session_id);
        payload.session_id = session_id;
      }
    }

    payload.data = data;
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/cart/update", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.createCheckout = async function (data) {
    
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/create-checkout", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(data),
    });
    const json = await result.json();

    if (json.status === 401) {
      throw new Error(json.message);
    }

    if (json.status === 403) {
      throw new Error(json.message);
    }
    return json;
  }

  this.getShippingRates = async function () {
    
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/shipping-rates", {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }



  this.applyCoupon = async function (coupon) {
    
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product/coupon/apply", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify({coupon_code: coupon})
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }

  this.getOrderItems = async function (checkoutId) {
    
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/order-item/"+ checkoutId, {
      method: "get",
      headers: this.getHeader(),
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }

  this.generatePaymentIntent = async function (payload) {
    
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/checkout", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload)
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }

  this.verifyPayment = async function (paymentIntent) {
    
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/checkout-success", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify({
        paymentIntentId: paymentIntent
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }

  this.getOrders = async function (payload) {
    payload.direction = 'desc';
    payload.sortId = 'id';
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/order-history/user", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload)
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }

  this.addProduct = async function (payload) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/ecom/product/add", {
      method: "post",
      headers: this.getHeader(),
      body: JSON.stringify(payload)
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }

    return json;
  }


  // this.notes
  // this.getcity
  // this.getsettings
  // this.search
  // this.getAbandonCart

}

    