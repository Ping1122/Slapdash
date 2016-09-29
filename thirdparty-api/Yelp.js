var Yelp = require('yelp');

var yelp = new Yelp({
                    consumer_key: 'W14FpZq4D_Dc_-zMMb5sfg',
                    consumer_secret: 'ydEMHkimR1tNmEltLSrfhoL9Z4g',
                    token: 'M4ar96_H3cclGneeUIb4nEgwF30ZCD7A',
                    token_secret: 'iTSY7zWLWIhHxOeuJn1qIxJ53ds',
                    });

/* getPlaces: searches the business using Yelp
   Inputs: location is an object used to describe location for searching.
 
   location = {
       address: 'address, neighborhood, city, state or zip, optional country',
       latitude: double,
       longtitude: double,
       ne_latitude: double,
       ne_logtitude: double,
   }
   Two ways to pass your location:
   1. Provide latitude and longtitude or address, and leave the other
      properties undefined. If you provide both, latitude and logtitude will 
      be used to disambiguate the address text.
   2. Provide latitude, longtitude, ne_latitude, and ne_logtitude. The location
      searched will be defined as a rectangle box bounded by the latitudes and
      longtitudes. The radius arguement will be ingored in this case.
 
   radius: Search radius in meters. Max value is 40000 meters.
 
   option = {
       term: string,
       limit: integer,
       offset: integer,
       sort: integer,
       category_filter: string,
       deals_filter: bool,
   }
   term: Search term (e.g. "food", "restaurants"). If term isn’t included then 
         search everything. The term keyword also accepts business names such 
         as "Starbucks".
   limit: Number of business results to return
   offset: Offset the list of returned business results by this amount
   sort: 0=Best matched (default), 1=Distance, 2=Highest Rated.
   category_filter: Category to filter search results with. The category filter 
       can be a list of comma delimited categories. For example, 'bars,french' 
       will filter by Bars and French.
       See https://www.yelp.com/developers/documentation/v2/all_category_list
       for category identifyier.
   deals_filter: Whether to exclusively search for businesses with deals 
*/

function getPlaces(location, radius, option){
    var parameter = {};
    if (location.address !== undefined){
        parameter.location = location.address;
        parameter.radius_filter = radius.toString();
        if (location.langtitude !== undefined){
            parameter.cll = location.latitude.toString()
                .concat(',')
                .concat(location.longtitude.toString());
        }
    }
    else{
        if(location.ne_latitude !== undefined){
            parameter.bounds = location.latitude.toString()
                .concat(',')
                .concat(location.longtitudes.toString())
                .concat('|')
                .concat(location.ne_latitude.toString())
                .concat(',')
                .concat(location.ne_logtitude.toString());
        }
        else{
            parameter.radius_filter = radius.toString();
            parameter.ll = location.latitude.toString()
                .concat(',')
                .concat(location.longtitudes.toString());
        }
    }
    
    if (option.term !== undefined){
        parameter.term = option.term;
    }
    if (option.limit !== undefined){
        parameter.limit = option.limit;
    }
    if (option.offset !== undefined){
        parameter.offset = option.offset;
    }
    if (option.sort !== undefined){
        parameter.sort = option.sort;
    }
    
    console.log(parameter);
    
    return yelp.search(parameter);
}