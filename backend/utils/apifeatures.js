//for search,filter and pagination feature
class ApiFeatures {
      constructor(query,querystr){//querystr is what product and whatever functionality we are searching for,ex. apple with price less than 200,etc(querystr have several components, search req.query once for it),query-->is like product.find(),..
        this.query = query;
        this.querystr = querystr;
      }
      search() {
        const keyword = this.querystr.keyword ? {//If the keyword exists, an object is created with a name field
          name:{//we can directly search for the specific name,but here we are searching for all products having this pattern as entyerd by user(as in oher websites)
            $regex:this.querystr.keyword, //(regular expression)->used to perform pattern searching on string fields in documnets(mongodb)
            $options:"i",//means case insensitive(means if we write small it will swarch for capital also)
          },
        }
        :{};
        console.log(keyword);
        this.query = this.query.find({...keyword});//Product.find() becomes Product.find().find({ name: { $regex: ..., $options: ... }})//means we will be searching for the keyword we got,Product.find() becomes Product.find().find(for the keyword which have become now having name in regex form and options)
        return this;//return this object(contains query and querystr)
      }

      filter() {
        const queryCopy = {...this.querystr};
        // removing some fields
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);//after deleting only category will be left(e.g.category->laptop)
        
        //Filter for price and rating
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        this.query = this.query.find(JSON.parse(querystr));
        return this;
      }
      
      
      pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page)||1;
        const skip = resultPerPage * (currentPage - 1);//from the starting how many we have to skip ,e.g.currentpage=3 and we have to show 10 results per page,then for this page skip first 20 pages
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
      }
    };
    module.exports = ApiFeatures;