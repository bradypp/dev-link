class APIFeatures {
    constructor(query, queryParams = null) {
        // The query model e.g. User
        this.query = query;
        // Object containing query fields e.g. req.params
        this.queryParams = queryParams;
    }

    filter(excludedFilterParams = null) {
        const queryObj = { ...this.queryParams };

        // queryParams to exclude from filter
        this.excludedFilterParams = [...excludedFilterParams, 'page', 'sort', 'limit', 'fields'];

        // Remove query params not wanted in filter

        this.excludedFilterParams.forEach(el => delete queryObj[el]);

        // Allow filtering by gte|gt|lte|lt if they exist in queryParams by adding the mongodb $ operator
        // E.g. localhost:5000/api/user?age[gte]=18 (filter for age > 18)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // Query the database and filter by JSON.parse(queryStr) (the new filter object)
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryParams.sort) {
            // Split sort param by commas and add a space to get sort query fields
            // E.g. localhost:5000/api/user?sort=age,length (sort ascending by age then length)
            // For descending order, add a - before the field e.g. localhost:5000/api/user?sort=-age,-length
            const sortBy = this.queryParams.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // If there's no sort param, sort by createdAt date in descending order
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.queryParams.fields) {
            // Limit the fields to query and return from the database
            // E.g. localhost:5000/api/user?field=name,age (only return the name and age)
            const fields = this.queryParams.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            // Select and return everything except the mongodb field __v
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        // To turn string fields into numbers for pagination, limit & page * 1
        const page = this.queryParams.page * 1 || 1;
        const limit = this.queryParams.limit * 1 || 100;

        // Determines what page of data we want to query & how many results per page
        // E.g. localhost:5000/api/page=2&limit=10 would return the second 10 results
        const skip = (page - 1) * limit;

        // skip = number of results to skip, limit = number of results to return
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
module.exports = APIFeatures;
