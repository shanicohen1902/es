GET /products/_search
{
  "query": {
    "match_all": {}
  }
}


# Term level queries are not analyzed
GET /products/_search
{
  "query": {
    "term": {
      "name": "lobster"
    }
  }
}

GET /products/_search
{
  "query": {
    "term": {
      "name": "Lobster"
    }
  }
}

# Full-text queries are analyzed
GET /products/_search
{
  "query": {
    "match": {
      "name": "Lobster"
    }
  }
}

# explain api 
GET /products/_doc/1/_explain
{
  "query": {
    "term": {
      "name": "lobster"
    }
  }
}

# relevance 
GET /products/_search
{
  "explain": true,
  "query": {
    "term": {
      "name": "lobster"
    }
  }
}

# Retrieving documents based on IDs

GET /products/_search
{
  "query": {
    "ids": {
      "values": [ 1, 2, 3 ]
    }
  }
}

GET /products/_search
{
  "query": {
    "term": {
      "is_active": true
    }
  }
}

GET /products/_search
{
  "query": {
    "term": {
      "is_active": {
        "value": true
      }
    }
  }
}

# exist (not null)
GET /products/_search
{
  "query": {
    "exists": {
      "field": "tags"
    }
  }
}


GET /products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "now"
      }
    }
  }
}


# FUll Text

GET /recipe/_search
{
  "query": {
    "match_phrase": {
      "title": "spaghetti puttanesca"
    }
  }
}

GET /recipe/_search
{
  "query": {
    "match_phrase": {
      "title": "puttanesca spaghetti"
    }
  }
}


GET /recipe/_search
{
  "query": {
    "multi_match": {
      "query": "pasta pesto",
      "fields": [ "title", "description" ]
    }
  }
}

GET /recipe/_search
{
  "query": {
    "match": {
      "title": "Pasta with parmesan and spinach"
    }
  }
}


# Filter is boolean
GET /recipe/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "parmesan"
          }
        },
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 15
            }
          }
        }
      ]
    }
  }

GET /recipe/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "parmesan"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "ingredients.name": "tuna"
          }
        }
      ],
      "should": [
        {
          "match": {
            "ingredients.name": "parsley"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 15
            }
          }
        }
      ]
    }
  }
}