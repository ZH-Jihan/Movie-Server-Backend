"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrismaQueryBuilder {
    constructor(query) {
        this.options = {};
        this.query = query;
    }
    /**
     * Adds a case-insensitive fuzzy search on the given fields.
     * E.g. if `query.search = "foo"` and fields = ['title','desc'],
     * this adds `{ OR: [ { title: { contains: "foo", mode: 'insensitive' } }, { desc: { contains: "foo", mode: 'insensitive' } } ] }` to `where`.
     * Uses Prisma’s `contains` filter with `mode: 'insensitive'` for case-insensitivity:contentReference[oaicite:1]{index=1}.
     */
    search(fields) {
        const searchTerm = this.query.search;
        if (!searchTerm)
            return this;
        // Build OR conditions for each field: { field: { contains: searchTerm, mode: 'insensitive' } }
        const orConditions = fields.map((field) => ({
            [field]: { contains: searchTerm, mode: "insensitive" },
        }));
        // Merge with existing where: if there is already a where, AND them
        if (this.options.where) {
            // @ts-ignore
            this.options.where = {
                AND: [this.options.where, { OR: orConditions }],
            };
        }
        else {
            // @ts-ignore
            this.options.where = { OR: orConditions };
        }
        return this;
    }
    /**
     * Applies exact-match filters from all query params except reserved keys.
     * Ignores keys like 'search', 'sortBy', 'sortOrder', 'page', 'limit', 'fields'.
     * For each other key/value in `query`, adds `{ key: value }` to the `where` object.
     */
    filter() {
        const reserved = [
            "search",
            "sortBy",
            "sortOrder",
            "page",
            "limit",
            "fields",
        ];
        const filters = {};
        for (const key in this.query) {
            if (reserved.includes(key))
                continue;
            const value = this.query[key];
            if (value !== undefined) {
                filters[key] = value;
            }
        }
        if (Object.keys(filters).length === 0)
            return this;
        // Merge with existing where: use AND to combine
        if (this.options.where) {
            // @ts-ignore
            this.options.where = { AND: [this.options.where, filters] };
        }
        else {
            // @ts-ignore
            this.options.where = filters;
        }
        return this;
    }
    /**
     * Applies sorting based on `sortBy` and `sortOrder` in the query params.
     * E.g. if `query.sortBy = "title"` and `query.sortOrder = "desc"`, sets `orderBy: { title: 'desc' }`.
     * Defaults to ascending if not specified. Uses Prisma’s `orderBy` parameter:contentReference[oaicite:2]{index=2}.
     */
    sortBy() {
        const sortField = this.query.sortBy;
        if (!sortField)
            return this;
        let order = "asc";
        const so = (this.query.sortOrder || "").toLowerCase();
        if (so === "desc")
            order = "desc";
        // @ts-ignore
        this.options.orderBy = { [sortField]: order };
        return this;
    }
    /**
     * Applies pagination (offset/limit) based on `page` and `limit` in the query params.
     * Calculates `skip = (page - 1) * limit` and `take = limit`. Defaults: page=1, limit=10.
     * Uses Prisma’s `skip` and `take`:contentReference[oaicite:3]{index=3}.
     */
    paginate() {
        const page = parseInt(this.query.page) || 1;
        const limit = parseInt(this.query.limit) || 10;
        this.options.skip = (page - 1) * limit;
        this.options.take = limit;
        return this;
    }
    /**
     * Applies field selection if `query.fields` exists.
     * Parses a comma-separated string like "email,name" into `{ email: true, name: true }`.
     * This builds a Prisma `select` object to return only those fields:contentReference[oaicite:4]{index=4}.
     */
    fields() {
        const fieldsParam = this.query.fields;
        if (!fieldsParam)
            return this;
        const fields = fieldsParam.split(",").map((f) => f.trim());
        const selectObj = {};
        for (const f of fields) {
            selectObj[f] = true;
        }
        // @ts-ignore
        this.options.select = selectObj;
        return this;
    }
    /**
     * Returns the assembled Prisma query options.
     * The returned object has shape `{ where?, select?, orderBy?, skip?, take? }`
     * which matches Prisma's `findMany` args for the model. You can assign it to e.g. `Prisma.MediaFindManyArgs`.
     */
    build() {
        return this.options;
    }
}
exports.default = PrismaQueryBuilder;
