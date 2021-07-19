POST /products/_doc
{
  "name": "Coffee Maker",
  "price": 64,
  "in_stock": 10
}

PUT /products/_doc/100  
{
  "name": "Toaster",
  "price": 49,
  "in_stock": 4
}

GET /products/_doc/100


POST /products/_update/101
{
  "script": {
    "source": "ctx._source.in_stock++"
  },
  "upsert": {
    "name": "Blender",
    "price": 399,
    "in_stock": 5
  }
}

DELETE /products/_doc/101


PUT /products
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 2
  }
}

DELETE /pages


POST /products/_update/100?if_primary_term=1&if_seq_no=100
{
  "doc": {
    "in_stock": 123
  }
}