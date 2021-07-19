
PUT /reviews_new 
{
  "mappings" : {
    "properties" : {
      "author" : {
        "properties" : {
          "email" : {
            "type" : "keyword",
            "ignore_above" : 256
          },
          "first_name" : {
            "type" : "text"
          },
          "last_name" : {
            "type" : "text"
          }
        }
      },
      "content" : {
        "type" : "text"
      },
      "created_at" : {
        "type" : "date"
      },
      "product_id" : {
        "type" : "keyword"
      },
      "rating" : {
        "type" : "float"
      }
    }
  }
}

PUT /multi_field_test
{
  "mappings": {
    "properties": {
      "description": {
        "type": "text"
      },
      "ingredients": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      }
    }
  }
}



# nested mapping with dot notation
PUT /reviews_dot_notation
{
  "mappings": {
    "properties": {
      "rating": { "type": "float" },
      "content": { "type": "text" },
      "product_id": { "type": "integer" },
      "author.first_name": { "type": "text" },
      "author.last_name": { "type": "text" },
      "author.email": { "type": "keyword" }
    }
  }
}

PUT /people
{
    "mappings": {
        "dynamic": "strict",
        "properties": {
            "first_name": {
                "type": "text"
            }
        }
    }
}

# alias mapping
PUT /reviews/_mapping
{
    "properties": {
        "comment": {
            "type": "alias",
            "path": "content"
        }
    }
}

# standard analyzer defined
PUT /standard_example
{
  "settings": {
    "analysis": {
      "analyzer": {
        "rebuilt_standard": {
          "tokenizer": "standard",
          "filter": [
            "lowercase"       
          ]
        }
      }
    }
  }
}

# defining a custom analzyer

PUT /analyzer_test
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_custom_analyzer": {
          "type": "custom",
          "char_filter": ["html_strip"],
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "stop",
            "asciifolding"
          ]
        }
      }
    }
  }
}
# analyze api

POST /_analyze
{
  "char_filter": ["html_strip"],
  "tokenizer": "standard",
  "text": "I&apos;m in a <em>good</em> mood&nbsp;-&nbsp;and I <strong>love</strong> açaí!"
}

# string array are concatinated when analyzed
POST /_analyze
{
  "text": ["Strings are simply", "merged together."],
  "analyzer": "standard"
}

POST /_analyze
{
  "text": "2 guys walk into   a bar, but the third... DUCKS! :-)",
  "analyzer": "keyword"
}