// Example use:
// const user = await new QueryHandler(User.find(), req.params).filter().sort().limit().paginate().query;

class QueryHandler {
    constructor(query, queryParams = {}) {
        // The database query e.g. User.find()
        this.query = query;
        // Object containing query config params e.g. req.params
        this.queryParams = queryParams;
    }

    filter(...additionalExcludedFilterParams) {
        const queryObj = { ...this.queryParams };
        // Remove query params not wanted in filter
        ['page', 'sort', 'limit', 'fields', ...additionalExcludedFilterParams].forEach(
            el => delete queryObj[el],
        );

        let queryStr = JSON.stringify(queryObj);
        // Allow filtering by gte|gt|lte|lt if they exist in queryParams by adding the mongodb $ operator
        // E.g. localhost:5000/api/user?age[gte]=18 (filter for age > 18)
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|all|in|regex|allregex|inregex)\b/g,
            match => `$${match}`,
        );

        const newQueryObj = JSON.parse(queryStr);
        Object.keys(newQueryObj).forEach(a => {
            if (newQueryObj[a].$regex) {
                newQueryObj[a].$regex = new RegExp(newQueryObj[a].$regex, 'i');
            }

            // Turns any $in or $all queries into an array of regular expressions
            // E.g. localhost:5000/api/profile?skills[in]=html,css becomes {skills: { $all : [/html/i, /css/i]}} as required
            Object.keys(newQueryObj[a]).forEach(b => {
                if (b === '$allregex') {
                    newQueryObj[a].$all = newQueryObj[a][b].split(',').map(c => new RegExp(c, 'i'));
                    delete newQueryObj[a][b];
                }
                if (b === '$inregex') {
                    newQueryObj[a].$in = newQueryObj[a][b].split(',').map(c => new RegExp(c, 'i'));
                    delete newQueryObj[a][b];
                }
            });
        });
        this.query = this.query.find(newQueryObj);

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
            // If there's no sort param, sort by created_at date in descending order
            this.query = this.query.sort('-created_at');
        }

        return this;
    }

    limitFields() {
        if (this.queryParams.fields) {
            // Limit the fields to query and return from the database
            // E.g. localhost:5000/api/user?field=name,age (only return the name and age)
            const fields = this.queryParams.fields.split(',').join(' ');
            // Remove the fields & the mongodb field __v
            this.query = this.query.select(`${fields}`);
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

module.exports = QueryHandler;
